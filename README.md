## VSCode Settings

### 🏎️ TypeScript Template for competitive programming (Node.js + esbuild + ts-node)

### 📄 package.json

```JSON
{
	"name": "cp",
	"version": "1.0.0",
	"main": "index.js",
	"keywords": [],
	"author": "devought",
	"license": "ISC",
	"type": "commonjs",
	"scripts": {
		"format": "prettier --write \"src/**/*.ts\"",
		"test": "ts-node src/main.ts < src/test.txt",
		"bundle": "npx esbuild src/main.ts --bundle --platform=node --target=node18 --outfile=src/main.js --minify && cat src/main.js | pbcopy && rm src/main.js",
		"benchmark": "chmod +x src/scripts/benchmark.sh && ./src/scripts/benchmark.sh"
	},
	"devDependencies": {
		"@trivago/prettier-plugin-sort-imports": "^6.0.0",
		"@types/node": "^24.10.1",
		"esbuild": "^0.27.0",
		"prettier": "^3.7.4",
		"ts-node": "^10.9.2",
		"typescript": "^5.9.3"
	}
}
```

### 📦 Install Dependencies

```bash
npm ci
```

### ⚙️ Initialize TypeScript

```bash
tsc --init
```

#### `launch.json` for debug

```json
{
	"version": "0.2.0",
	"configurations": [
		{
			"type": "node",
			"request": "launch",
			"name": "Debug CP (ts-node)",
			"runtimeExecutable": "node",
			"runtimeArgs": ["-r", "ts-node/register/transpile-only"],
			"program": "${workspaceFolder}/src/main.ts",
			"cwd": "${workspaceFolder}",
			"console": "integratedTerminal",
			"internalConsoleOptions": "neverOpen",
			"env": {
				"DEBUG_FILE_INPUT": "${workspaceFolder}/src/test.txt",
				"TS_NODE_PROJECT": "${workspaceFolder}/tsconfig.json"
			},
			"sourceMaps": true,
			"resolveSourceMapLocations": [
				"${workspaceFolder}/**",
				"!**/node_modules/**"
			]
		}
	]
}
```

#### `tsconfig.json`

```json
{
	"compilerOptions": {
		"target": "ES2020",
		"module": "commonjs",
		"lib": ["ES2024", "DOM"],
		"outDir": "dist",
		"rootDir": "src",
		"strict": true,
		"esModuleInterop": true,
		"forceConsistentCasingInFileNames": true,
		"skipLibCheck": true
	},
	"include": ["src/**/*", "*.ts"]
}
```

---

### 📝 VSCode Snippet — Codeforces TypeScript Template

Create file:
`~/.config/Code/User/snippets/typescript.json`

Add:

```json
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
	}
}
```

- _Create a test.txt and main.ts file in src/_

### 📝 VSCode Settings

```json
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
	// "terminal.integrated.fontWeight": "599",

	// ---- Language-Specific Formatters ----
	"[prisma]": { "editor.defaultFormatter": "Prisma.prisma" },
	"[snippets]": {
		"editor.defaultFormatter": "vscode.json-language-features"
	},
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
	"workbench.editor.showTabs": "single",
	"breadcrumbs.enabled": false,
	"editor.minimap.autohide": true,
	"redhat.telemetry.enabled": true,
	"go.toolsManagement.autoUpdate": true,
	"prisma.hidePrisma6Prompts": true,
	"workbench.startupEditor": "none",
	"workbench.iconTheme": "flow-deep",
	"editor.accessibilitySupport": "off",
	"git.openRepositoryInParentFolders": "never",
	"flow-icons.hidesExplorerArrows": true
}
```

### ✨ Prettier settings

```JSON
{
	"trailingComma": "none",
	"tabWidth": 4,
	"useTabs": true,
	"semi": false,
	"singleQuote": true,
	"jsxSingleQuote": true,
	"arrowParens": "always",

	"importOrderSeparation": true,
	"importOrderSortSpecifiers": true,
	"importOrderCaseInsensitive": true,
	"importOrderParserPlugins": [
		"classProperties",
		"decorators-legacy",
		"typescript"
	],
	"importOrder": ["<THIRD_PARTY_MODULES>", "^@/(.*)$", "^../(.*)", "^./(.*)"],
	"plugins": ["@trivago/prettier-plugin-sort-imports"]
}
```

### ✨ blocks.code-snippets

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
			"for (let ${1:i} = 0; ${1:i} < ${2:array}.length; ${1:i}++) {",
			"  $0",
			"}"
		],
		"description": "Traditional indexed for loop"
	}
}
```

### ✨ types.code-snippets

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

### 🧑‍💻 Several extensions

VSCode Extensions:

- GraphQL: Language Feature Support
- JavaScript (ES6) code snippets
- Template String Converter
- Prettier - Code Formatter
- Github Pull Requests
- HashiCorp Terraform
- Path Intellisense
- HTML CSS Support
- Dev Containers
- Tailwind CSS
- Prettier SQL
- Code Runner
- Live Server
- Error Lens
- Remote SSH
- Kubernetes
- Live Share
- Live Share
- GitLens
- Jupyter
- DotENV
- Prisma
- ESLint
- Docker
- YAML

Chrome Extensions:

- Dark Reader
- AdGuard AdBlocker
- React Devtools
- Redux Devtools
- Lighthouse

CLI & Terminal Tools:

- homebrew
- zoxide
- fzf
- ripgrep
- bat
- eza
- starship
- docker
- kubectl
- gh
- aws
- tldr
- mole
- nest
- ffmpeg
- exiftool
- nmap
- make

Compilers & Runtime:

- tsc
- ts-node
- npm
- yarn
- pnpm
- bun
