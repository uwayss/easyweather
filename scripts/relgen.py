# FILE: scripts/relgen.py
import subprocess
import os
import re
# Removed argparse import
import sys
from google import generativeai as genai

# --- Constants ---
GRADLE_FILE_PATH = os.path.join("android", "app", "build.gradle")
LANG_TAG_EN = "<en-US>"
LANG_TAG_AR = "<ar>"
LANG_TAG_TR = "<tr-TR>"
LANG_TAG_END_SUFFIX = "</"
DEFAULT_NUM_COMMITS = 5 # Default value if user enters nothing or invalid input

# --- Helper Functions ---

def get_api_key():
    """Retrieves the Gemini API key from environment variables."""
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("Error: GEMINI_API_KEY environment variable not set.", file=sys.stderr)
        sys.exit(1)
    return api_key

def get_last_commits(n: int) -> list[str]:
    """Gets the subject lines of the last n git commits."""
    if n <= 0:
        print("Error: Number of commits must be positive.", file=sys.stderr)
        return []
    try:
        result = subprocess.run(
            ["git", "log", f"-{n}", "--pretty=format:%s"],
            capture_output=True,
            text=True,
            check=True,
            encoding='utf-8'
        )
        commits = result.stdout.strip().split("\n")
        commits = [commit for commit in commits if commit]
        if not commits:
             print("Warning: No non-empty commit messages found.", file=sys.stderr)
             return []
        print(f"Fetched {len(commits)} commit messages.")
        return commits
    except FileNotFoundError:
        print("Error: 'git' command not found. Make sure Git is installed and in your PATH.", file=sys.stderr)
        sys.exit(1)
    except subprocess.CalledProcessError as e:
        print(f"Error running git log: {e}", file=sys.stderr)
        print(f"Stderr: {e.stderr}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"An unexpected error occurred while fetching commits: {e}", file=sys.stderr)
        sys.exit(1)


def increment_version_code(file_path: str) -> int:
    """Increments the versionCode in the specified build.gradle file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        pattern = r'(\bversionCode\s+)(\d+)'
        match = re.search(pattern, content)

        if not match:
            print(f"Error: Could not find 'versionCode' in {file_path}", file=sys.stderr)
            sys.exit(1)

        current_version_code = int(match.group(2))
        new_version_code = current_version_code + 1

        new_content = re.sub(pattern, rf'\g<1>{new_version_code}', content, count=1)

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)

        print(f"Incremented versionCode in {file_path} from {current_version_code} to {new_version_code}")
        return new_version_code

    except FileNotFoundError:
        print(f"Error: Gradle file not found at {file_path}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"Error processing gradle file: {e}", file=sys.stderr)
        sys.exit(1)

def generate_content(prompt: str) -> str: # Removed api_key argument here
    """Generates content using the Gemini API. Assumes genai is configured."""
    try:
        # genai.configure should be called once in main()
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)

        # Robust text extraction
        text_content = None
        try:
            if response.text:
                 text_content = response.text.strip()
        except ValueError:
             print("Warning: Accessing response.text failed. Checking candidates.", file=sys.stderr)

        if text_content is None and response.candidates:
             candidate = response.candidates[0]
             if candidate.content and candidate.content.parts:
                 text_content = "".join(part.text for part in candidate.content.parts).strip()

        if text_content is None:
             print("Error: Could not extract text from Gemini response.", file=sys.stderr)
             print(f"Prompt Feedback: {response.prompt_feedback}", file=sys.stderr)
             if response.candidates:
                 print(f"Finish Reason: {response.candidates[0].finish_reason}", file=sys.stderr)
             return ""
        else:
             return text_content

    except Exception as e:
        print(f"Error during Gemini API call: {e}", file=sys.stderr)
        return ""

def generate_and_translate_notes(commits: list[str]) -> dict[str, str]: # Removed api_key arg
    """Generates and translates release notes in a single API call."""
    commit_list_str = chr(10).join(f"- {commit}" for commit in commits)

    prompt = f"""Analyze the following recent git commit messages and perform the tasks below:

Commit Messages:
{commit_list_str}

Tasks:
1.  Generate a user-friendly release note summary in English, suitable for the Google Play Store.
    - Keep it concise and easy for non-technical users to understand.
    - Focus on the user-visible changes or improvements.
    - Use very few emojis, if any.
    - Do NOT use any markdown formatting (like *, -, #).
2.  Translate the generated English release note into Arabic.
3.  Translate the generated English release note into Turkish.
4.  Format the output *exactly* as follows, including the tags, with each note on its own lines:
    {LANG_TAG_EN}
    [English release note here]
    {LANG_TAG_EN.replace('<','</')}
    {LANG_TAG_AR}
    [Arabic translation here]
    {LANG_TAG_AR.replace('<','</')}
    {LANG_TAG_TR}
    [Turkish translation here]
    {LANG_TAG_TR.replace('<','</')}

Output only the formatted notes with the tags. Do not include any other text before or after this structure.
"""
    print("\nGenerating and translating release notes (single API call)...")
    full_response = generate_content(prompt) # Removed api_key arg

    if not full_response:
        print("Error: Failed to get response from Gemini.", file=sys.stderr)
        return {}

    # Attempt to parse the response
    notes = {}
    try:
        # Use regex to find content within tags, handling potential whitespace/newlines
        en_match = re.search(rf'{re.escape(LANG_TAG_EN)}(.*?){re.escape(LANG_TAG_EN.replace("<","</"))}', full_response, re.DOTALL)
        ar_match = re.search(rf'{re.escape(LANG_TAG_AR)}(.*?){re.escape(LANG_TAG_AR.replace("<","</"))}', full_response, re.DOTALL)
        tr_match = re.search(rf'{re.escape(LANG_TAG_TR)}(.*?){re.escape(LANG_TAG_TR.replace("<","</"))}', full_response, re.DOTALL)

        if en_match:
            notes['en'] = en_match.group(1).strip()
        else:
             print(f"Warning: Could not parse English note ({LANG_TAG_EN}) from response.", file=sys.stderr)

        if ar_match:
            notes['ar'] = ar_match.group(1).strip()
        else:
            print(f"Warning: Could not parse Arabic note ({LANG_TAG_AR}) from response.", file=sys.stderr)

        if tr_match:
            notes['tr'] = tr_match.group(1).strip()
        else:
             print(f"Warning: Could not parse Turkish note ({LANG_TAG_TR}) from response.", file=sys.stderr)

    except Exception as e:
        print(f"Error parsing Gemini response: {e}", file=sys.stderr)
        print("--- Raw Gemini Response ---", file=sys.stderr)
        print(full_response, file=sys.stderr)
        print("---------------------------", file=sys.stderr)
        return notes

    if 'en' not in notes or not notes['en']:
         print("Error: Failed to extract mandatory English note from Gemini response.", file=sys.stderr)
         print("--- Raw Gemini Response ---", file=sys.stderr)
         print(full_response, file=sys.stderr)
         print("---------------------------", file=sys.stderr)
         return {}

    return notes

def get_commit_count_from_user() -> int:
    """Prompts the user for the number of commits and validates the input."""
    while True:
        try:
            user_input = input(f"Enter the number of last commits to use (default: {DEFAULT_NUM_COMMITS}): ")
            if not user_input: # User pressed Enter
                return DEFAULT_NUM_COMMITS
            num_commits = int(user_input)
            if num_commits > 0:
                return num_commits
            else:
                print("Please enter a positive number.")
        except ValueError:
            print("Invalid input. Please enter a number.")
        except EOFError: # Handle Ctrl+D or unexpected end of input
             print("\nInput cancelled. Exiting.")
             sys.exit(1)


# --- Main Execution ---

def main():
    # Removed ArgumentParser setup

    api_key = get_api_key()
    # Configure Gemini API client ONCE
    try:
         genai.configure(api_key=api_key)
         print("Gemini API configured.")
    except Exception as e:
         print(f"Error configuring Gemini API: {e}", file=sys.stderr)
         sys.exit(1)

    num_commits = get_commit_count_from_user() # Get n interactively

    commits = get_last_commits(num_commits) # Use the user-provided number

    if not commits:
        print("No commit messages found or fetched. Exiting.", file=sys.stderr)
        sys.exit(1)

    increment_version_code(GRADLE_FILE_PATH)

    # Single call to generate and translate
    notes = generate_and_translate_notes(commits) # Removed api_key arg

    if not notes or 'en' not in notes or not notes['en']:
        print("Failed to generate essential release notes. Exiting.", file=sys.stderr)
        sys.exit(1)

    en_note = notes.get('en', "Error: English note missing.")
    ar_note = notes.get('ar', en_note)
    tr_note = notes.get('tr', en_note)

    if ar_note == en_note and 'ar' not in notes:
         print("Warning: Using English text for Arabic translation.", file=sys.stderr)
    if tr_note == en_note and 'tr' not in notes:
         print("Warning: Using English text for Turkish translation.", file=sys.stderr)
    toPrint = LANG_TAG_EN+'\n'+en_note+'\n'+LANG_TAG_EN.replace('<','</')+'\n'+LANG_TAG_AR+'\n'+ar_note+'\n'+LANG_TAG_AR.replace('<','</')+'\n'+LANG_TAG_TR+'\n'+tr_note+'\n'+LANG_TAG_TR.replace('<','</')
    with open('latest-release-note.txt','w', encoding='utf-8') as file:
        file.write(toPrint)
    
    print("\n--- Play Store Release Notes ---")
    print(toPrint)
    print("---------------------------------")


if __name__ == "__main__":
    main()