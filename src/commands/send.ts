import * as vscode from "vscode";
import { getConfig } from "../config.js";
import { formatContext, FileContext } from "../formatter.js";
import { sendToTerminal } from "../terminal.js";
import { resolveFileContext } from "./shared.js";

export async function send(): Promise<void> {
  const ctx = resolveFileContext();
  if (!ctx) {
    return;
  }

  const config = getConfig();
  const text = formatContext(ctx, config.format, config.customFormat);

  const shouldTerminal =
    config.sendMethod === "both" || config.sendMethod === "terminal";
  const shouldClipboard =
    config.sendMethod === "both" || config.sendMethod === "clipboard";

  let terminalSent = false;

  if (shouldTerminal) {
    const terminalText = config.appendSpace ? text + " " : text;
    terminalSent = await sendToTerminal(terminalText, config.focusTerminal);
    if (!terminalSent) {
      // fallback to clipboard only
      await vscode.env.clipboard.writeText(text);
      vscode.window.setStatusBarMessage(
        `$(warning) No terminal found. Copied to clipboard: ${text}`,
        3000
      );
      return;
    }
  }

  if (shouldClipboard) {
    await vscode.env.clipboard.writeText(text);
  }

  const parts: string[] = [];
  if (terminalSent) {
    parts.push("Sent to terminal");
  }
  if (shouldClipboard) {
    parts.push("Copied to clipboard");
  }

  vscode.window.setStatusBarMessage(
    `$(check) ${parts.join(" & ")}: ${text}`,
    3000
  );
}
