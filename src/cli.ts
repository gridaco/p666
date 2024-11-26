#!/usr/bin/env node

import { exec } from "child_process";
import path from "path";

// Helper function to execute a command
function runCommand(command: string) {
  const child = exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
    }
    console.log(stdout);
  });

  // Forward stdin, stdout, and stderr to the current process
  child.stdout?.pipe(process.stdout);
  child.stderr?.pipe(process.stderr);
  process.stdin.pipe(child.stdin!);
}

// Determine the path to `server.js`
const serverPath = path.resolve(__dirname, "./server.js");

// Get CLI arguments (e.g., for custom options or debugging)
const args = process.argv.slice(2);

// Build the command string
const command = `node ${serverPath} ${args.join(" ")}`;

// Run the command
runCommand(command);
