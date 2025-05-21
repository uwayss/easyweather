# FILE: scripts/diff.py
import subprocess
import os
import time
import platform
from google import genai  # Assuming you have google-generativeai installed
import argparse  # For handling command-line arguments


def get_desktop_path():
    """Returns the path to the user's Desktop, handling different OSs."""
    if platform.system() == "Windows":
        return os.path.join(os.path.expanduser("~"), "Desktop")
    else:  # Linux/macOS (often the same, but allows for customization)
        return os.path.join(os.path.expanduser("~"), "Desktop")


def generate_filename(prefix="diff"):
    """Generates a filename with a timestamp."""
    timestamp = time.strftime("%H%M")
    return f"{prefix}_{timestamp}.txt"


def get_git_diff():
    """Executes git diff and returns the output as a string."""
    try:
        result = subprocess.run(["git", "diff"], capture_output=True, text=True, check=True, encoding='utf-8')
        return result.stdout
    except subprocess.CalledProcessError as e:
        raise  # Re-raise the subprocess error for the caller to handle
    except Exception as e:
        raise  # Re-raise other exceptions


def save_git_diff(diff_content, filepath):
    """Saves the git diff content to the specified file."""
    try:
        with open(filepath, "w") as outfile:
            outfile.write(diff_content)
        print(f"Git diff saved to: {filepath}")
    except Exception as e:
        print(f"Error saving git diff: {e}")


def generate_commit_message(diff_content, api_key):
    """Generates a commit message using the Gemini API."""
    try:
        # Initialize the Gemini client
        client = genai.Client(api_key=api_key)

        # Generate the commit message
        prompt = f"""Write a well-structured git commit message (without markdown or code blocks) for the following diff.  The format should be:

*   A short, descriptive title (under 70 characters) on the first line.
*   A blank line.
*   A bulleted list summarizing all changes and their purpose. Each bullet point should be concise and focus on a specific modification.

Aim for a style similar to a normal dev. Do NOT include any "```" delimiters.

{diff_content}"""


        response = client.models.generate_content(
            model="gemini-2.0-flash",  # Or whatever model you prefer
            contents=prompt
        )

        return response.text

    except Exception as e:
        print(f"Error generating commit message: {e}")
        return None


def save_commit_message(commit_message, filepath):
    """Saves the generated commit message to a file."""
    try:
        with open(filepath, "w") as outfile:
            outfile.write(commit_message)
        print(f"Commit message saved to: {filepath}")
    except Exception as e:
        print(f"Error saving commit message: {e}")


def main():
    """Generates a git diff, generates a commit message, and handles output."""
    parser = argparse.ArgumentParser(description="Generate git diff and commit messages using Gemini API.")
    parser.add_argument("--diff", action="store_true", help="Save the git diff to a file on the desktop.")
    parser.add_argument("--msg", action="store_true", help="Save the commit message to a file on the desktop.")
    args = parser.parse_args()

    #  IMPORTANT:  Replace with your actual Gemini API key
    API_KEY = os.environ.get("GEMINI_API_KEY")
    if not API_KEY:
        print("Error: GEMINI_API_KEY environment variable not set.")
        exit()

    try:
        desktop_path = get_desktop_path()

        # Get the git diff
        diff_content = get_git_diff()

        # Generate the commit message
        commit_message = generate_commit_message(diff_content, API_KEY)

        if commit_message:
            # Print the commit message (always)
            print("\nGenerated Commit Message:\n", commit_message)

            # Save the diff to a file if --diff is specified
            if args.diff:
                diff_filename = generate_filename(prefix="diff")
                diff_filepath = os.path.join(desktop_path, diff_filename)
                save_git_diff(diff_content, diff_filepath)

            # Save the commit message to a file if --msg is specified
            if args.msg:
                commit_message_filename = generate_filename(prefix="commit_message")
                commit_message_filepath = os.path.join(desktop_path, commit_message_filename)
                save_commit_message(commit_message, commit_message_filepath)

    except subprocess.CalledProcessError as e:
        print(f"Error executing git diff: {e}")  # Handle specifically
    except Exception as e:
        print(f"An error occurred: {e}")  # General error handling


if __name__ == "__main__":
    main()