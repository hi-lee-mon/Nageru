# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nageru は、VS Code エディタで選択した行範囲をフォーマットして AI CLI ツール（Claude Code / Codex CLI）のターミナル入力欄に配置する VS Code 拡張機能。パッケージマネージャーは pnpm を使用。

## Common Commands

```bash
pnpm run compile      # 型チェック → リント → esbuild バンドル
pnpm run watch        # TypeScript + esbuild のウォッチモード（開発時）
pnpm run check-types  # TypeScript 型チェックのみ
pnpm run lint         # ESLint (src/)
pnpm run test         # vscode-test によるテスト実行
pnpm run package      # プロダクションビルド（ミニファイ有効）
```

デバッグ実行は VS Code で F5 キーを押して Extension Development Host を起動。

## Architecture

データフロー: エディタ選択 → `resolveFileContext()` → `FileContext` → `formatContext()` → ターミナル送信 or クリップボードコピー

```
src/
├── extension.ts          # エントリーポイント。コマンド登録のみ
├── config.ts             # VS Code 設定の読み取り（Format, PathType, SendMethod）
├── formatter.ts          # FileContext → フォーマット済みテキスト変換
├── terminal.ts           # ターミナルへの sendText ラッパー（Enter なし）
└── commands/
    ├── shared.ts         # resolveFileContext(): エディタから FileContext を抽出
    ├── send.ts           # メインコマンド: ターミナル送信 + クリップボード
    └── copyOnly.ts       # クリップボードのみコピー
```

- ランタイム依存なし。`vscode` は外部依存として esbuild でバンドル対象外
- esbuild で `src/extension.ts` → `dist/extension.js` (CommonJS) にバンドル
- TypeScript strict モード、ターゲット ES2022
