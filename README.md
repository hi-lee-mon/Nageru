<h1 align="center">
  <img src="assets/logo.png" alt="Nageru" width="400">
</h1>

<p align="center">
  Throw file context from VS Code to AI CLI tools
</p>

<p align="center">
  English | <a href="./README_ja.md">日本語</a>
</p>

**Nageru** is a VS Code extension that formats selected line ranges and places them in the terminal input for AI CLI tools (Claude Code / Codex CLI). Select code, throw it to the AI.

## Quick Start

1. Install the `.vsix` file in VS Code
2. Select lines in the editor
3. Press `Cmd+Shift+;` (Mac) / `Ctrl+Shift+;`
4. The formatted context appears in your terminal input

## Commands

| Command | Description | Keybinding |
|---------|-------------|------------|
| `Nageru: Send File Context to Terminal` | Send to terminal + copy to clipboard | `Cmd+Shift+;` (Mac) / `Ctrl+Shift+;` |
| `Nageru: Copy File Context to Clipboard` | Copy to clipboard only | - |

Also available from the editor context menu (right-click).

## Format Examples

| Setting | Output |
|---------|--------|
| `claude-code` | `@src/index.ts#L15-L23` |
| `codex` | `src/index.ts:15-23` |
| `custom` | User-defined template |

## Settings

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `nageru.format` | enum | `claude-code` | Output format (`claude-code` / `codex` / `custom`) |
| `nageru.customFormat` | string | `${filePath}:${startLine}-${endLine}` | Custom format template |
| `nageru.pathType` | enum | `relative` | `relative` (workspace-relative) / `absolute` |
| `nageru.sendMethod` | enum | `both` | `both` / `clipboard` / `terminal` |
| `nageru.focusTerminal` | boolean | `true` | Move focus to terminal after sending |
| `nageru.appendSpace` | boolean | `true` | Append a trailing space to the sent text |

`relative` is the safer default for privacy. If you switch to `absolute`, the generated context can include local path details such as your username and home directory.

## Development

```bash
pnpm install
pnpm run compile
# Press F5 to launch the Extension Development Host
```

## Build & Install VSIX

```bash
pnpm run geni
```

## License

MIT
