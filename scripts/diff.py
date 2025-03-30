import subprocess
import os
import time
import platform

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

def save_git_diff(filepath):
    """Executes git diff and saves the output to the specified file."""
    try:
        with open(filepath, "w") as outfile:
            subprocess.run(["git", "diff"], stdout=outfile, check=True)
        print(f"Git diff saved to: {filepath}")
    except subprocess.CalledProcessError as e:
        raise  # Re-raise the subprocess error for the caller to handle
    except Exception as e:
        raise  # Re-raise other exceptions


def generate_and_save_diff():
    """Generates a git diff and saves it to a file on the Desktop."""
    try:
        desktop_path = get_desktop_path()
        filename = generate_filename()
        filepath = os.path.join(desktop_path, filename)
        save_git_diff(filepath)

    except subprocess.CalledProcessError as e:
        print(f"Error executing git diff: {e}")  # Handle specifically
    except Exception as e:
        print(f"An error occurred: {e}")  # General error handling


if __name__ == "__main__":
    generate_and_save_diff()