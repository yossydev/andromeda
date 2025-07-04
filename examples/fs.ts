// Basic file operations example for Andromeda
// This file demonstrates the core filesystem capabilities of Andromeda

// ----------------- WRITING FILES -----------------

// Write the raven file
const poem = `Once upon a midnight dreary, while I pondered, weak and weary,
Over many a quaint and curious volume of forgotten lore—
    While I nodded, nearly napping, suddenly there came a tapping,
As of some one gently rapping, rapping at my chamber door.
"'Tis some visitor," I muttered, "tapping at my chamber door—
            Only this and nothing more."`;

Andromeda.writeTextFileSync("raven.txt", poem);
console.log("Poem written to raven.txt");

// Write binary data
const binaryData = new Uint8Array([104, 101, 108, 108, 111]); // "hello" in ASCII
Andromeda.writeFileSync("binary.dat", binaryData);
console.log("Binary data written to binary.dat");

// ----------------- READING FILES -----------------

// Read the poem back
const readPoem = Andromeda.readTextFileSync("raven.txt");
console.log("Read from file:");
console.log(readPoem);

// Read binary data back
const readBinary = Andromeda.readFileSync("binary.dat");
console.log("Read binary data:", readBinary);

// ----------------- CHECKING FILE EXISTENCE -----------------

// Check if files exist
console.log("Does raven.txt exist?", Andromeda.existsSync("raven.txt"));
console.log(
  "Does nonexistent.txt exist?",
  Andromeda.existsSync("nonexistent.txt"),
);

// ----------------- DIRECTORY OPERATIONS -----------------

// Create a directory
try {
  Andromeda.mkdirSync("test_dir");
  console.log("Created test_dir directory");
  // deno-lint-ignore no-explicit-any
} catch (e: any) {
  console.log("Directory may already exist:", e.message);
}

// Write a file in the new directory
Andromeda.writeTextFileSync("test_dir/hello.txt", "Hello from Andromeda!");
console.log("Created file in test_dir/hello.txt");

// List directory contents (not yet available - commented out)
// const dirContents = Andromeda.readDirSync("test_dir");
// console.log("Contents of test_dir:", dirContents);
console.log(
  "Directory listing not yet available - internal function not registered",
);

// ----------------- FILE OPERATIONS -----------------

// Copy a file
Andromeda.copyFileSync("raven.txt", "raven_copy.txt");
console.log("Copied raven.txt to raven_copy.txt");

// Rename a file
Andromeda.renameSync("raven_copy.txt", "poe_poem.txt");
console.log("Renamed raven_copy.txt to poe_poem.txt");

// Get file stats (not yet available - commented out)
// const fileStats = Andromeda.statSync("poe_poem.txt");
// console.log("File stats for poe_poem.txt:", fileStats);
console.log("File stats not yet available - internal function not registered");

// ----------------- CLEANUP -----------------

// Remove files
Andromeda.removeSync("binary.dat");
console.log("Removed binary.dat");

// Remove directory recursively
Andromeda.removeAllSync("test_dir");
console.log("Removed test_dir and its contents");

// ----------------- DEMONSTRATION COMPLETE -----------------
console.log("\nFile system operations demonstration complete!");
console.log("Files remaining: raven.txt, poe_poem.txt");

// Output environment info
console.log("\nEnvironment Information:");
console.log("Runtime args:", Andromeda.args);
console.log("USER env variable:", Andromeda.env.get("USER"));
console.log("Available env variables:", Andromeda.env.keys());
