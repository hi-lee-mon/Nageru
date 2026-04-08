import * as vscode from "vscode";
import { send } from "./commands/send.js";
import { copyOnly } from "./commands/copyOnly.js";

export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.commands.registerCommand("nageru.send", send),
    vscode.commands.registerCommand("nageru.copyOnly", copyOnly)
  );
}

export function deactivate(): void {}
