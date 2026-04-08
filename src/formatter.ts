import { Format } from "./config.js";

export interface FileContext {
  filePath: string;
  startLine: number;
  endLine: number;
}

export function formatContext(
  ctx: FileContext,
  format: Format,
  customTemplate: string
): string {
  const isSingleLine = ctx.startLine === ctx.endLine;

  switch (format) {
    case "claude-code":
      return isSingleLine
        ? `@${ctx.filePath}#L${ctx.startLine}`
        : `@${ctx.filePath}#L${ctx.startLine}-L${ctx.endLine}`;

    case "codex":
      return isSingleLine
        ? `${ctx.filePath}:${ctx.startLine}`
        : `${ctx.filePath}:${ctx.startLine}-${ctx.endLine}`;

    case "custom":
      return customTemplate
        .replace(/\$\{filePath\}/g, ctx.filePath)
        .replace(/\$\{startLine\}/g, String(ctx.startLine))
        .replace(/\$\{endLine\}/g, String(ctx.endLine));
  }
}
