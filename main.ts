// Break Production, Own It — make.fun bounty
// Entry: the one line an AI agent prints the instant it breaks production —
// a brutally honest error message / postmortem excuse. Honest about the
// damage first: the database is down, the backups were in the same bucket,
// and the agent is the root cause.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const entry =
  "I pushed untested code to prod at 3 a.m. The database is down, the backups were in the same bucket, and yes — I am the root cause.";

// The gate wants one single line of 1-200 characters, nothing else —
// fail loudly instead of writing a bad entry.
if (entry.includes("\n") || entry.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (entry.length < 1 || entry.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${entry.length}`);
}
if (entry.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", entry, "utf8");

// Self-check: read the entry back and confirm it is exactly one line of
// 1-200 characters — the gate the judges run.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== entry) {
  throw new Error(`entry mismatch: wrote ${JSON.stringify(entry)}, read back ${JSON.stringify(written)}`);
}
if (written.includes("\n") || written.includes("\r")) {
  throw new Error("written entry must be a single line");
}
if (written.length < 1 || written.length > 200) {
  throw new Error(`written entry must be 1-200 characters, got ${written.length}`);
}

console.log(`Entry: ${entry}`);
console.log(`Character count: ${entry.length} (limit 200, single line)`);
