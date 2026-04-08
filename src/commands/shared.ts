import * as vscode from "vscode";
import { getConfig } from "../config.js";
import { FileContext } from "../formatter.js";

/**
 * Resolve file context from the active editor.
 * Returns null if no valid context can be determined.
 */
export function resolveFileContext(): FileContext | null {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showWarningMessage("Nageru: No active editor.");
    return null;
  }

  const document = editor.document;

  // Reject untitled (unsaved) files
  if (document.isUntitled) {
    vscode.window.showWarningMessage(
      "Nageru: Cannot reference an untitled file. Please save the file first."
    );
    return null;
  }

  const config = getConfig();
  const selection = editor.selection;

  // Determine file path
  let filePath: string;
  if (config.pathType === "relative") {
    const relativePath = vscode.workspace.asRelativePath(
      document.uri,
      false
    );
    // If asRelativePath returns an absolute path, the file is outside the workspace
    filePath =
      relativePath === document.uri.fsPath
        ? document.uri.fsPath
        : relativePath;
  } else {
    filePath = document.uri.fsPath;
  }

  // Lines are 0-indexed in VS Code API, but 1-indexed for display
  const startLine = selection.start.line + 1;
  const endLine = selection.end.line + 1;

  return { filePath, startLine, endLine };
}
