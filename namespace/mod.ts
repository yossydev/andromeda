// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

// deno-lint-ignore-file no-unused-vars

/**
 * The `assert` function tests if a condition is `true`. If the condition is `false`, an error is thrown with an optional message.
 *
 * @example
 * ```ts
 * assert(1 === 1, "The condition is true!");
 * ```
 */
function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}

/**
 * The `assertEquals` function tests if two values are equal.
 *
 * @example
 * ```ts
 * assertEquals(1, 1, "The values are equal!");
 * ```
 */
function assertEquals<A>(value1: A, value2: A, message: string) {
  if (value1 !== value2) {
    console.error(message);
  }
}

/**
 * The `assertNotEquals` function tests if two values are not equal.
 *
 * @example
 * ```ts
 * assertNotEquals(1, 2, "The values are not equal!");
 * ```
 */
function assertNotEquals<A>(value1: A, value2: A, message: string) {
  if (value1 === value2) {
    console.error(message);
  }
}

/**
 * The `assertThrows` function tests if a function throws an error.
 *
 * @example
 * ```ts
 * assertThrows(() => {
 *  throw new Error("Hello, World!");
 * }, "An error occurred!");
 */
function assertThrows(fn: () => void, message: string) {
  try {
    fn();
  } catch (error) {
    return;
  }

  console.error(message);
}

// Signal type definition
type Signal =
  | "SIGABRT"
  | "SIGALRM"
  | "SIGBREAK"
  | "SIGBUS"
  | "SIGCHLD"
  | "SIGCONT"
  | "SIGEMT"
  | "SIGFPE"
  | "SIGHUP"
  | "SIGILL"
  | "SIGINFO"
  | "SIGINT"
  | "SIGIO"
  | "SIGPOLL"
  | "SIGUNUSED"
  | "SIGKILL"
  | "SIGPIPE"
  | "SIGPROF"
  | "SIGPWR"
  | "SIGQUIT"
  | "SIGSEGV"
  | "SIGSTKFLT"
  | "SIGSTOP"
  | "SIGSYS"
  | "SIGTERM"
  | "SIGTRAP"
  | "SIGTSTP"
  | "SIGTTIN"
  | "SIGTTOU"
  | "SIGURG"
  | "SIGUSR1"
  | "SIGUSR2"
  | "SIGVTALRM"
  | "SIGWINCH"
  | "SIGXCPU"
  | "SIGXFSZ";

// Internal signal listener storage
const signalListeners: Map<Signal, Set<() => void>> = new Map();

/**
 * Andromeda namespace for the Andromeda runtime.
 */
const Andromeda = {
  /**
   * The `args` property contains the command-line arguments passed to the program.
   */
  args: internal_get_cli_args(),

  // File operations
  /**
   * The readTextFileSync function reads a text file from the filesystem.
   *
   * @example
   * ```ts
   * const data = Andromeda.readTextFileSync("hello.txt");
   * console.log(data);
   * ```
   */
  readTextFileSync(path: string): string {
    return internal_read_text_file(path);
  },

  /**
   * The writeTextFileSync function writes text data to a file on the filesystem.
   *
   * @example
   * ```ts
   * Andromeda.writeTextFileSync("hello.txt", "Hello, World!");
   * ```
   */
  writeTextFileSync(path: string, data: string): void {
    internal_write_text_file(path, data);
  },

  /**
   * The readFileSync function reads a file as binary data from the filesystem.
   *
   * @example
   * ```ts
   * const data = Andromeda.readFileSync("image.png");
   * console.log(data);
   * ```
   */
  readFileSync(path: string): Uint8Array {
    return internal_read_file(path);
  },

  /**
   * The writeFileSync function writes binary data to a file on the filesystem.
   *
   * @example
   * ```ts
   * const data = new Uint8Array([72, 101, 108, 108, 111]);
   * Andromeda.writeFileSync("data.bin", data);
   * ```
   */
  writeFileSync(path: string, data: Uint8Array): void {
    internal_write_file(path, data);
  },

  /**
   * The openSync function opens a file and returns a file descriptor.
   *
   * @example
   * ```ts
   * const fd = Andromeda.openSync("hello.txt", "r");
   * console.log("File descriptor:", fd);
   * ```
   */
  openSync(path: string, mode: string): number {
    return internal_open_file(path, mode);
  },

  /**
   * The createSync function creates a new file in the file system.
   *
   * @example
   * ```ts
   * Andromeda.createSync("hello.txt");
   * ```
   */
  createSync(path: string): void {
    internal_create_file(path);
  },

  /**
   * The copyFileSync function copies a file in the file system.
   *
   * @example
   * ```ts
   * Andromeda.copyFileSync("hello.txt", "world.txt");
   * ```
   */
  copyFileSync(source: string, destination: string): void {
    internal_copy_file(source, destination);
  },

  /**
   * The removeSync function removes a file from the file system.
   *
   * @example
   * ```ts
   * Andromeda.removeSync("hello.txt");
   * ```
   */
  removeSync(path: string): void {
    internal_remove(path);
  },

  /**
   * The removeAllSync function recursively removes a file or directory from the file system.
   *
   * @example
   * ```ts
   * Andromeda.removeAllSync("my_directory");
   * ```
   */
  removeAllSync(path: string): void {
    internal_remove_all(path);
  },

  /**
   * The renameSync function renames/moves a file or directory in the file system.
   *
   * @example
   * ```ts
   * Andromeda.renameSync("old_name.txt", "new_name.txt");
   * ```
   */
  renameSync(oldPath: string, newPath: string): void {
    internal_rename(oldPath, newPath);
  },

  /**
   * The existsSync function checks if a file or directory exists in the file system.
   *
   * @example
   * ```ts
   * if (Andromeda.existsSync("hello.txt")) {
   *   console.log("File exists!");
   * }
   * ```
   */
  existsSync(path: string): boolean {
    return internal_exists(path);
  },

  /**
   * The truncateSync function truncates a file to a specified length.
   *
   * @example
   * ```ts
   * Andromeda.truncateSync("hello.txt", 100);
   * ```
   */
  truncateSync(path: string, length: number): void {
    internal_truncate(path, length);
  },

  /**
   * The chmodSync function changes the permissions of a file or directory.
   *
   * @example
   * ```ts
   * Andromeda.chmodSync("hello.txt", 0o644);
   * ```
   */
  chmodSync(path: string, mode: number): void {
    internal_chmod(path, mode);
  },

  // Directory operations
  /**
   * The mkdirSync function creates a directory in the file system.
   *
   * @example
   * ```ts
   * Andromeda.mkdirSync("hello");
   * ```
   */
  mkdirSync(path: string): void {
    internal_mk_dir(path);
  },

  // These filesystem functions are implemented in Rust but not yet exposed
  // TODO: Uncomment when the internal functions are registered in the runtime
  /*
  readDirSync(path: string): Array<{name: string, isFile: boolean, isDirectory: boolean, isSymlink: boolean}> {
    return internal_read_dir(path);
  },

  statSync(path: string): {
    isFile: boolean,
    isDirectory: boolean,
    isSymlink: boolean,
    size: number,
    modified: number,
    accessed: number,
    created: number,
    mode: number
  } {
    return internal_stat(path);
  },

  mkdirAllSync(path: string): void {
    internal_mk_dir_all(path);
  },

  lstatSync(path: string): {
    isFile: boolean,
    isDirectory: boolean,
    isSymlink: boolean,
    size: number,
    modified: number,
    accessed: number,
    created: number,
    mode: number
  } {
    return internal_lstat(path);
  },
  */
  // System operations
  /**
   * The `exit` function exits the program with an optional exit code.
   *
   * @example
   * ```ts
   * Andromeda.exit(0);
   * ```
   */
  exit(code?: number): void {
    internal_exit(code || 0);
  },

  /**
   * The `sleep` function returns a Promise to be resolved after the specified time in milliseconds.
   *
   * @example
   * ```ts
   * Andromeda.sleep(1000).then(() => {
   *  console.log("Hello, World!");
   * });
   * ```
   */
  sleep(duration: number): Promise<void> {
    return internal_sleep(duration);
  },

  /**
   * stdin namespace for reading from standard input.
   */
  stdin: {
    /**
     * The `readLine` function reads a line from standard input.
     *
     * @example
     * ```ts
     * const name = Andromeda.stdin.readLine();
     * console.log(`Hello, ${name}!`);
     * ```
     */
    readLine(): string {
      return internal_read_line();
    },
  },

  /**
   * stdout namespace for writing to standard output.
   */
  stdout: {
    /**
     * The `write` function writes a string to standard output.
     *
     * @example
     * ```ts
     * Andromeda.stdout.write("Hello, World!");
     * ```
     */
    write(message: string): void {
      internal_write(message);
    },

    /**
     * The `writeLine` function writes a string followed by a newline to standard output.
     *
     * @example
     * ```ts
     * Andromeda.stdout.writeLine("Hello, World!");
     * ```
     */
    writeLine(message: string): void {
      internal_write_line(message + "\n");
    },
  },

  /**
   * env namespace for environment variables.
   */
  env: {
    /**
     * The `get` function gets the environment variable.
     *
     * @example
     * ```ts
     * const value = Andromeda.env.get("PATH");
     * console.log(value);
     * ```
     */
    get(key: string): string {
      return internal_get_env(key);
    },

    /**
     * The `set` function sets the environment variable.
     *
     * @example
     * ```ts
     * Andromeda.env.set("HI", "Hello, World!");
     * ```
     */
    set(key: string, value: string): void {
      internal_set_env(key, value);
    },

    /**
     * The `remove` function deletes the environment variable.
     *
     * @example
     * ```ts
     * Andromeda.env.delete("HI");
     * ```
     */
    remove(key: string): void {
      internal_delete_env(key);
    }, /**
     * The `keys` function gets the environment variable keys.
     *
     * @example
     * ```ts
     * const keys = Andromeda.env.keys();
     * console.log(keys);
     * ```
     */
    keys(): string[] {
      return internal_get_env_keys();
    },
  },

  // Signal handling functions
  /**
   * Registers the given function as a listener of the given signal event.
   *
   * @example
   * ```ts
   * Andromeda.addSignalListener(
   *   "SIGTERM",
   *   () => {
   *     console.log("SIGTERM!")
   *   }
   * );
   * ```
   *
   * Note: On Windows only "SIGINT" (Ctrl+C) and "SIGBREAK" (Ctrl+Break) are supported.
   */
  addSignalListener(signal: Signal, handler: () => void): void {
    if (typeof handler !== "function") {
      throw new TypeError("Handler must be a function");
    }

    // Get or create the set of listeners for this signal
    let listeners = signalListeners.get(signal);
    if (!listeners) {
      listeners = new Set();
      signalListeners.set(signal, listeners);
    }

    // Add the handler to the set
    listeners.add(handler);

    // Register with the native signal handler (only once per signal type)
    if (listeners.size === 1) {
      const result = internal_add_signal_listener(signal, () => {
        // Call all registered handlers for this signal
        const currentListeners = signalListeners.get(signal);
        if (currentListeners) {
          for (const listener of currentListeners) {
            try {
              listener();
            } catch (error) {
              console.error(`Error in signal handler for ${signal}:`, error);
            }
          }
        }
      });

      if (typeof result === "string") {
        throw new Error(result);
      }
    }
  },

  /**
   * Removes the given function as a listener of the given signal event.
   *
   * @example
   * ```ts
   * Andromeda.removeSignalListener("SIGTERM", myHandler);
   * ```
   */
  removeSignalListener(signal: Signal, handler: () => void): void {
    const listeners = signalListeners.get(signal);
    if (listeners) {
      listeners.delete(handler);

      // If no more listeners, unregister the native handler
      if (listeners.size === 0) {
        signalListeners.delete(signal);
        internal_remove_signal_listener(signal, () => {});
      }
    }
  },
};

/**
 * The `prompt` function prompts the user for input.
 *
 * @example
 * ```ts
 * const name = prompt("What is your name?");
 * console.log(`Hello, ${name}!`);
 * ```
 */
function prompt(message: string): string {
  internal_print(message + ": ");
  return Andromeda.stdin.readLine();
}

/**
 * The `confirm` function prompts the user for confirmation.
 *
 * @example
 * ```ts
 * if (confirm("Are you sure?")) {
 *  console.log("The user is sure!");
 * }
 * ```
 */
function confirm(message: string): boolean {
  internal_print(message + " [y/N]: ");
  const response = Andromeda.stdin.readLine();
  return response.includes("y");
}

/**
 * The `alert` function displays a message to the user and waits for the user to hit enter.
 */
function alert(message: string) {
  internal_print(message + " [Enter]");
  Andromeda.stdin.readLine();
}

/**
 * Takes the input data, in the form of a Unicode string containing only characters in the range U+0000 to U+00FF,
 * each representing a binary byte with values 0x00 to 0xFF respectively, and converts it to its base64 representation,
 * which it returns.
 */
function btoa(input: string): string {
  return internal_btoa(input);
}

/**
 * Takes the input data, in the form of a Unicode string containing base64-encoded binary data,
 * decodes it, and returns a string consisting of characters in the range U+0000 to U+00FF,
 * each representing a binary byte with values 0x00 to 0xFF respectively,
 * corresponding to that binary data.
 */
function atob(input: string): string {
  return internal_atob(input);
}
