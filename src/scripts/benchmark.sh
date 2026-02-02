#!/usr/bin/env bash
set -e

INPUT="src/test.txt"
OUT="src/main.js"
PROFILE="cpu-profile.cpuprofile"

echo "==============================="
echo "      Benchmark + Profiler     "
echo "==============================="

echo "⏳ Bundling TypeScript..."
esbuild src/main.ts --bundle --platform=node --outfile=$OUT --format=cjs --target=node18 > /dev/null
echo "✔ Build complete: $OUT ($(wc -c < $OUT) bytes)"
echo ""

if [ ! -f "$INPUT" ]; then
  echo "❌ Input file not found: $INPUT"
  exit 1
fi

FILE_SIZE=$(wc -c < "$INPUT")
LINES=$(wc -l < "$INPUT")

echo "📥 Input:"
echo "   • Size: $FILE_SIZE bytes"
echo "   • Lines: $LINES"
echo ""

# Run CPU profiler
echo "🧠 Running node with CPU profiler..."
node --cpu-prof --cpu-prof-name="$PROFILE" $OUT < $INPUT > .benchmark_output.txt

echo ""
echo "📊 CPU Profile saved: $PROFILE"

# Extract top heavy functions
echo ""
echo "🔍 Analyzing hotspots..."

node - << 'EOF'
const fs = require('fs');

const file = 'cpu-profile.cpuprofile';

const data = JSON.parse(fs.readFileSync(file, 'utf-8'));

let nodes = data.nodes.map(n => ({
    id: n.id,
    function: n.callFrame.functionName || "(anonymous)",
    url: n.callFrame.url || "",
    line: n.callFrame.lineNumber,
    hits: n.hitCount || 0,
}));

// Sum child times
let total = nodes.reduce((a, b) => a + b.hits, 0);

nodes = nodes
    .filter(n => n.hits > 0)
    .sort((a, b) => b.hits - a.hits)
    .slice(0, 12);

console.log("🔥 Top Hot Functions:");
console.log("--------------------------");
nodes.forEach(n => {
    const pct = ((n.hits / total) * 100).toFixed(2);
    console.log(
        `• ${n.function.padEnd(30)}  ${n.hits} samples  (${pct}%)`
    );
});
console.log("--------------------------");

EOF

echo ""
echo "==============================="
echo " 🏁 Benchmark & Profiling Done"
echo "==============================="
