import * as vscode from "vscode";

/**
 * Send text to the active terminal without pressing Enter.
 * Returns true if text was sent, false if no terminal is available.
 */
export async function sendToTerminal(
  text: string,
  focusTerminal: boolean
): Promise<boolean> {
  const terminal =
    vscode.window.activeTerminal ?? vscode.window.terminals[0];

  if (!terminal) {
    return false;
  }

  terminal.show(true);
  terminal.sendText(text, false);

  if (focusTerminal) {
    await vscode.commands.executeCommand("workbench.action.terminal.focus");
  }

  return true;
}
