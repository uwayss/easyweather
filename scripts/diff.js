// FILE: scripts/diff.js
import { GoogleGenAI } from "@google/genai";
import { execSync } from "child_process";
import { program } from "commander";
import fs from "fs";
import os from "os";
import path from "path";

function getGeminiKey() {
  console.log("🔑 Checking for Gemini API key...");
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("❌ Error: GEMINI_API_KEY environment variable not set.");
    process.exit(1);
  }
  console.log("✅ API key found");
  return apiKey;
}

async function callGemini(message, model = "gemini-2.0-flash") {
  console.log(`🤖 Calling Gemini API with model: ${model}...`);
  try {
    const ai = new GoogleGenAI({ apiKey: getGeminiKey() });
    const response = await ai.models.generateContent({
      model: model,
      contents: message,
    });
    console.log("✅ Successfully received response from Gemini");
    return response.text;
  } catch (error) {
    console.error("❌ Error calling Gemini API:", error.message);
    throw error;
  }
}

function getDesktopPath() {
  console.log("📁 Getting desktop path...");
  const desktopPath = path.join(os.homedir(), "Desktop");
  console.log(`📍 Desktop path: ${desktopPath}`);
  return desktopPath;
}

function generateFilename(prefix = "diff") {
  const timestamp = new Date().toISOString().replace(/:/g, "");
  return `${prefix}_${timestamp}.txt`;
}

function getGitDiff() {
  console.log("🔍 Getting git diff...");
  try {
    const result = execSync("git diff", { encoding: "utf-8" });
    if (!result.trim()) {
      console.log("ℹ️ No changes detected in git diff");
    } else {
      console.log("✅ Git diff retrieved successfully");
    }
    return result;
  } catch (error) {
    if (error instanceof Error && error.message.includes("Command failed")) {
      console.error("❌ Git command failed:", error.stderr);
      throw new Error(`Git command failed: ${error.stderr}`);
    } else {
      console.error("❌ Unexpected error:", error.message);
      throw error;
    }
  }
}

function saveGitDiff(diffContent, filepath) {
  console.log("💾 Saving git diff...");
  try {
    fs.writeFileSync(filepath, diffContent);
    console.log(`✅ Git diff saved to: ${filepath}`);
  } catch (error) {
    console.error(`❌ Error saving git diff: ${error.message}`);
    throw error;
  }
}

async function generateCommitMessage(diffContent) {
  console.log("📝 Generating commit message...");
  const message = `Write a well-structured git commit message (without markdown or code blocks) for the following diff. The format should be:

* A short, descriptive title (under 70 characters) on the first line.
* A blank line.
* A bulleted list summarizing all changes and their purpose. Each bullet point should be concise and focus on a specific modification.

Aim for a style similar to a normal dev. Do NOT include any "\`\`\`" delimiters.

${diffContent}`;
  return await callGemini(message);
}

function saveCommitMessage(commitMessage, filepath) {
  console.log("💾 Saving commit message...");
  try {
    fs.writeFileSync(filepath, commitMessage);
    console.log(`✅ Commit message saved to: ${filepath}`);
  } catch (error) {
    console.error(`❌ Error saving commit message: ${error.message}`);
    throw error;
  }
}

async function main() {
  console.log("🚀 Starting diff.js script...");

  program
    .option("--diff", "Save the git diff to a file on the desktop.")
    .option("--msg", "Save the commit message to a file on the desktop.")
    .parse(process.argv);

  const options = program.opts();

  try {
    const desktopPath = getDesktopPath();
    const diffContent = getGitDiff();
    const commitMessage = await generateCommitMessage(diffContent);

    if (commitMessage) {
      console.log("\n📋 Generated Commit Message:\n", commitMessage);

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
    console.log("✨ Script completed successfully");
  } catch (error) {
    console.error("❌ Script failed:", error.message);
    process.exit(1);
  }
}

main();
