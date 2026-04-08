import * as vscode from "vscode";
import { getConfig } from "../config.js";
import { formatContext } from "../formatter.js";
import { resolveFileContext } from "./shared.js";

export async function copyOnly(): Promise<void> {
  const ctx = resolveFileContext();
  if (!ctx) {
    return;
  }

  const config = getConfig();
  const text = formatContext(ctx, config.format, config.customFormat);

  await vscode.env.clipboard.writeText(text);
  vscode.window.setStatusBarMessage(
    `$(check) Copied to clipboard: ${text}`,
    3000
  );
}
