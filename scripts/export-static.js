const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "out");
const nextDir = path.join(root, ".next");
const publicDir = path.join(root, "public");

console.log("Packaging static export into out/ ...");

// 1. Clean out dir
if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true, force: true });
}
fs.mkdirSync(outDir, { recursive: true });

// 2. Copy public directory assets
if (fs.existsSync(publicDir)) {
  fs.cpSync(publicDir, outDir, { recursive: true });
}

// 3. Copy .next/static -> out/_next/static
const nextStatic = path.join(nextDir, "static");
const outNextStatic = path.join(outDir, "_next", "static");
if (fs.existsSync(nextStatic)) {
  fs.mkdirSync(path.dirname(outNextStatic), { recursive: true });
  fs.cpSync(nextStatic, outNextStatic, { recursive: true });
}

// 4. Copy .next/server/app HTML and assets -> out
const appDir = path.join(nextDir, "server", "app");
if (fs.existsSync(appDir)) {
  fs.cpSync(appDir, outDir, { recursive: true });
}

// 5. Ensure 404.html exists
const notFoundHtml = path.join(outDir, "_not-found.html");
const fallback404 = path.join(outDir, "404.html");
if (fs.existsSync(notFoundHtml) && !fs.existsSync(fallback404)) {
  fs.copyFileSync(notFoundHtml, fallback404);
}

console.log("Static export successfully prepared in out/!");
