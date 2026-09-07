const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "out");
const nextDir = path.join(root, ".next");
const publicDir = path.join(root, "public");
const appDir = path.join(nextDir, "server", "app");

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
if (fs.existsSync(appDir)) {
  fs.cpSync(appDir, outDir, { recursive: true });
}

// 5. Ensure 404.html exists
const notFoundHtml = path.join(outDir, "_not-found.html");
const fallback404 = path.join(outDir, "404.html");
if (fs.existsSync(notFoundHtml) && !fs.existsSync(fallback404)) {
  fs.copyFileSync(notFoundHtml, fallback404);
}

// 6. Map all Next.js 16 segments to __next.*.txt files for client prefetching
function processSegments(dir, relPath = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.endsWith(".segments")) {
        const routeName = entry.name.slice(0, -".segments".length);
        const routeRel = relPath ? `${relPath}/${routeName}` : routeName;
        const targetDir = routeRel === "index" ? outDir : path.join(outDir, routeRel);

        fs.mkdirSync(targetDir, { recursive: true });

        // Copy _tree.segment.rsc -> targetDir/__next._tree.txt
        const treeRsc = path.join(fullPath, "_tree.segment.rsc");
        if (fs.existsSync(treeRsc)) {
          fs.copyFileSync(treeRsc, path.join(targetDir, "__next._tree.txt"));
        }

        // Copy _full.segment.rsc -> targetDir/__next._full.txt
        const fullRsc = path.join(fullPath, "_full.segment.rsc");
        if (fs.existsSync(fullRsc)) {
          fs.copyFileSync(fullRsc, path.join(targetDir, "__next._full.txt"));
        }

        // Copy any *.segment.rsc files to __next.<name>.txt
        function copySubSegments(sDir) {
          const sEntries = fs.readdirSync(sDir, { withFileTypes: true });
          for (const sEntry of sEntries) {
            const sFull = path.join(sDir, sEntry.name);
            if (sEntry.isDirectory()) {
              copySubSegments(sFull);
            } else if (sEntry.name.endsWith(".segment.rsc")) {
              const segName = sEntry.name.slice(0, -".segment.rsc".length);
              fs.copyFileSync(sFull, path.join(targetDir, `__next.${segName}.txt`));
            }
          }
        }
        copySubSegments(fullPath);

        // Also ensure <route>.txt and <route>/index.txt exist from <route>.rsc if present
        const rscFile = path.join(dir, `${routeName}.rsc`);
        if (fs.existsSync(rscFile)) {
          fs.copyFileSync(rscFile, path.join(targetDir, "index.txt"));
          if (routeRel !== "index") {
            fs.copyFileSync(rscFile, path.join(outDir, `${routeRel}.txt`));
          }
        }

        // Also duplicate <route>.html as <route>/index.html for universal routing
        const htmlFile = path.join(dir, `${routeName}.html`);
        if (fs.existsSync(htmlFile) && routeRel !== "index") {
          fs.copyFileSync(htmlFile, path.join(targetDir, "index.html"));
        }
      } else {
        const nextRel = relPath ? `${relPath}/${entry.name}` : entry.name;
        processSegments(fullPath, nextRel);
      }
    }
  }
}

if (fs.existsSync(appDir)) {
  processSegments(appDir);
}

console.log("Static export successfully prepared in out/ with full RSC prefetch support!");
