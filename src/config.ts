import * as vscode from "vscode";

export type Format = "claude-code" | "codex" | "custom";
export type PathType = "relative" | "absolute";
export type SendMethod = "both" | "clipboard" | "terminal";

export interface Config {
  format: Format;
  customFormat: string;
  pathType: PathType;
  sendMethod: SendMethod;
  focusTerminal: boolean;
  appendSpace: boolean;
}

export function getConfig(): Config {
  const cfg = vscode.workspace.getConfiguration("nageru");
  return {
    format: cfg.get<Format>("format", "claude-code"),
    customFormat: cfg.get<string>(
      "customFormat",
      "${filePath}:${startLine}-${endLine}"
    ),
    pathType: cfg.get<PathType>("pathType", "relative"),
    sendMethod: cfg.get<SendMethod>("sendMethod", "both"),
    focusTerminal: cfg.get<boolean>("focusTerminal", true),
    appendSpace: cfg.get<boolean>("appendSpace", true),
  };
}
