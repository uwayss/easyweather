// FILE: scripts/diff.js
import { GoogleGenAI } from "@google/genai";
import { execSync } from "child_process";
import { program } from "commander"; // Using the 'commander' package for argument parsing
import fs from "fs";
import os from "os";
import path from "path";

function getGeminiKey() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("Error: GEMINI_API_KEY environment variable not set.");
    process.exit(1);
  }
  return apiKey;
}

async function callGemini(message, model = "gemini-2.0-flash") {
  const ai = new GoogleGenAI({ apiKey: getGeminiKey() });
  const response = await ai.models.generateContent({
    model: model,
    contents: message,
  });
  return response.text;
}

function getDesktopPath() {
  if (process.platform === "win32") {
    return path.join(os.homedir(), "Desktop");
  } else {
    return path.join(os.homedir(), "Desktop");
  }
}

function generateFilename(prefix = "diff") {
  const timestamp = new Date().toISOString().replace(/:/g, "");
  return `${prefix}_${timestamp}.txt`;
}

function getGitDiff() {
  try {
    const result = execSync("git diff", { encoding: "utf-8" });
    return result;
  } catch (error) {
    if (error instanceof Error && error.message.includes("Command failed")) {
      throw new Error(`Git command failed: ${error.stderr}`);
    } else {
      throw error;
    }
  }
}

function saveGitDiff(diffContent, filepath) {
  try {
    fs.writeFileSync(filepath, diffContent);
    console.log(`Git diff saved to: ${filepath}`);
  } catch (error) {
    console.error(`Error saving git diff: ${error.message}`);
  }
}

async function generateCommitMessage(diffContent) {
  const message = `Write a well-structured git commit message (without markdown or code blocks) for the following diff. The format should be:

* A short, descriptive title (under 70 characters) on the first line.
* A blank line.
* A bulleted list summarizing all changes and their purpose. Each bullet point should be concise and focus on a specific modification.

Aim for a style similar to a normal dev. Do NOT include any "\`\`\`" delimiters.

${diffContent}`;
  return await callGemini(message);
}

function saveCommitMessage(commitMessage, filepath) {
  try {
    fs.writeFileSync(filepath, commitMessage);
    console.log(`Commit message saved to: ${filepath}`);
  } catch (error) {
    console.error(`Error saving commit message: ${error.message}`);
  }
}

async function main() {
  program
    .option("--diff", "Save the git diff to a file on the desktop.")
    .option("--msg", "Save the commit message to a file on the desktop.")
    .parse(process.argv);

  const options = program.opts();

  const desktopPath = getDesktopPath();

  const diffContent = getGitDiff();

  const commitMessage = await generateCommitMessage(diffContent);

  if (commitMessage) {
    console.log("\nGenerated Commit Message:\n", commitMessage);

    if (options.diff) {
      const diffFilename = generateFilename("diff");
      const diffFilePath = path.join(desktopPath, diffFilename);
      saveGitDiff(diffContent, diffFilePath);
    }

    if (options.msg) {
      const commitMessageFilename = generateFilename("commit_message");
      const commitMessageFilePath = path.join(
        desktopPath,
        commitMessageFilename
      );
      saveCommitMessage(commitMessage, commitMessageFilePath);
    }
  }
}

main();
