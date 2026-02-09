### VSCode settings

```JSON
{
  // ---- Editor ----
  "editor.autoClosingBrackets": "always",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.fontFamily": "Lab Mono, JetBrains Mono Semibold",
  "editor.largeFileOptimizations": true,
  "editor.tabCompletion": "on",
  "editor.cursorStyle": "underline",
  "editor.fontSize": 12,
  "editor.lineHeight": 1.3,
  "editor.wordWrap": "on",
  "editor.formatOnSave": true,
  "markdown.preview.fontFamily": "Lab Mono",

  // ---- File Associations ----
  "files.associations": {
    "*.css": "tailwindcss"
  },

  // ---- File Watcher / Search Exclude ----
  "files.watcherExclude": {
    "**/node_modules": true,
    "**/.git": true,
    "**/dist/**": true,
    "**/build/**": true
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/.git": true,
    "**/dist/**": true,
    "**/build/**": true
  },

  // ---- Explorer / Workbench UI ----
  "explorer.compactFolders": false,
  "explorer.confirmDelete": false,
  "explorer.confirmPasteNative": false,
  "explorer.confirmDragAndDrop": false,
  "workbench.enableExperiments": false,
  "workbench.tree.indent": 20,
  "workbench.tree.renderIndentGuides": "none",

  // ---- Terminal ----
  "terminal.integrated.cursorStyle": "underline",
  "terminal.integrated.fontSize": 12,

  // ---- Language-Specific Formatters ----
  "[prisma]": { "editor.defaultFormatter": "Prisma.prisma-insider" },
  "[snippets]": { "editor.defaultFormatter": "vscode.json-language-features" },
  "[go]": { "editor.defaultFormatter": "golang.go" },

  // ---- Typescript ----
  "typescript.updateImportsOnFileMove.enabled": "always",

  // ---- Extensions Behavior ----
  "extensions.autoUpdate": true,
  "extensions.ignoreRecommendations": true,

  // ---- Misc ----
  "json.schemaDownload.enable": true,
  "update.mode": "default",
  "window.zoomLevel": 1,
  "workbench.fontAliasing": "none",

  // ---- Hide UI Elements ----
  "window.commandCenter": false,
  "breadcrumbs.enabled": false,
  "editor.minimap.autohide": true,
  "redhat.telemetry.enabled": true,
  "workbench.startupEditor": "none",
  "workbench.iconTheme": "flow-deep",
  "flow-icons.hidesExplorerArrows": true    ,
  "editor.accessibilitySupport": "off"
}
```

### TypeScript snippets

```JSON
{
	"Set type number": {
		"scope": "typescript,typescriptreact,vue",
		"prefix": "n",
		"body": "number",
	},
	"Set type number[]": {
		"scope": "typescript,typescriptreact,vue",
		"prefix": "nn",
		"body": "number[]",
	},
	"Set type number[][]": {
		"scope": "typescript,typescriptreact,vue",
		"prefix": "nnn",
		"body": "number[][]",
	},
	"Set type string": {
		"scope": "typescript,typescriptreact,vue",
		"prefix": "s",
		"body": "string",
	},
	"Set type string[]": {
		"scope": "typescript,typescriptreact,vue",
		"prefix": "ss",
		"body": "string[]",
	},
	"Set type string[][]": {
		"scope": "typescript,typescriptreact,vue",
		"prefix": "sss",
		"body": "string[][]",
	},
	"Set type boolean": {
		"scope": "typescript,typescriptreact,vue",
		"prefix": "b",
		"body": "boolean",
	},
	"Set type boolean[]": {
		"scope": "typescript,typescriptreact,vue",
		"prefix": "bb",
		"body": "boolean[]",
	},
	"Set type boolean[][]": {
		"scope": "typescript,typescriptreact,vue",
		"prefix": "bbb",
		"body": "boolean[][]",
	},
}
```

### General code blocks

```JSON
{
	"Fast Console Log": {
		"scope": "typescript,javascript,typescriptreact,javascriptreact,vue,html,svelte",
		"prefix": "cl",
		"body": "console.log($0);",
		"description": "Fast console.log"
	},
	"Debug log (labeled)": {
		"scope": "typescript,javascript,typescriptreact,javascriptreact,vue,svelte",
		"prefix": "dbg",
		"body": "console.log('$1:', $1);",
		"description": "Debug log with variable label"
	},
	"Destructure rename": {
		"scope": "typescript,javascript,typescriptreact,javascriptreact,vue,svelte",
		"prefix": "dr",
		"body": "const { $2 } = $1;",
		"description": "Object destructuring with rename"
	},
	"Frequency map (counter)": {
		"scope": "typescript,typescriptreact,vue",
		"prefix": "counter",
		"body": [
			"const freq = new Map<$1, number>();",
			"for (const x of $2) {",
			"    freq.set(x, (freq.get(x) ?? 0) + 1);",
			"}",
			"$0"
		],
		"description": "Frequency map using Map<K, number>"
	},
	"Traditional for loop": {
		"scope": "typescript,javascript,typescriptreact,javascriptreact,vue",
		"prefix": "defor",
		"body": [
			"for (let i = 0; i < $1; i++) {",
			"  $2",
			"}"
		],
		"description": "Traditional indexed for loop"
	}
}

```

### Codeforces template

```JSON
{
	"TypeScript Template": {
		"prefix": "ts",
		"body": [
			"import * as fs from \"fs\";",
			"",
			"const readInput = () => {",
			"    const debug = process.env.DEBUG_FILE_INPUT;",
			"    return fs.readFileSync(debug ?? 0, \"utf-8\");",
			"};",
			"",
			"const data = readInput();",
			"const tokens = data.split(/\\s+/g).filter(Boolean);",
			"const lines = data.split(/\\r?\\n/);",
			"",
			"let t = 0;",
			"let l = 0;",
			"",
			"const read = () => tokens[t++]",
			"const int = () => Number(read())",
			"const line = () => lines[l++]",
			"const readline = () => line().trim().split(/\\s+/g)",
			"",
			"let out = '';",
			"const write = (...s: any[]) => (out += s.join(' ') + \"\\n\");",
			"const flush = () => process.stdout.write(out);",
			"",
			"function solve() {",
			"    $0",
			"}",
			"",
			"function main() {",
			"    solve();",
			"    flush();",
			"}",
			"",
			"main();"
		],
		"description": "Codeforces TypeScript template with fast I/O + debug input support"
	},
}

```
