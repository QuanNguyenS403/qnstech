const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const child_process = require("node:child_process");

const root = path.join(__dirname, "Website_Source");
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".mp4": "video/mp4",
  ".svg": "image/svg+xml",
  ".wav": "audio/wav",
  ".png": "image/png",
  ".webp": "image/webp",
  ".json": "application/json; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2"
};
const port = Number(process.env.PORT || 3000);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be a number between 1 and 65535.");
}

function streamFile(filePath, res, options) {
  const stream = fs.createReadStream(filePath, options);
  stream.on("error", (error) => {
    console.error(`Unable to read ${filePath}: ${error.message}`);
    if (res.headersSent) {
      res.destroy(error);
    } else {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Internal server error");
    }
  });
  stream.pipe(res);
}

function sendFile(req, res, filePath) {
  fs.stat(filePath, (error, stats) => {
    if (error && error.code !== "ENOENT" && error.code !== "ENOTDIR") {
      console.error(`Unable to inspect ${filePath}: ${error.message}`);
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Internal server error");
      return;
    }
    if (error || !stats.isFile()) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }

    const headers = {
      "Accept-Ranges": "bytes",
      "Content-Length": stats.size,
      "Content-Type": mimeTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream",
      "X-Content-Type-Options": "nosniff"
    };
    const range = req.headers.range;

    if (range) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(range);
      if (!match || (!match[1] && !match[2])) {
        res.writeHead(416, { "Content-Range": `bytes */${stats.size}` });
        res.end();
        return;
      }

      let start;
      let end;
      if (match[1]) {
        start = Number(match[1]);
        end = match[2] ? Number(match[2]) : stats.size - 1;
      } else {
        const suffixLength = Number(match[2]);
        start = Math.max(stats.size - suffixLength, 0);
        end = stats.size - 1;
      }

      if (start >= stats.size || end < start) {
        res.writeHead(416, { "Content-Range": `bytes */${stats.size}` });
        res.end();
        return;
      }

      end = Math.min(end, stats.size - 1);
      res.writeHead(206, {
        ...headers,
        "Content-Length": end - start + 1,
        "Content-Range": `bytes ${start}-${end}/${stats.size}`
      });
      if (req.method === "HEAD") {
        res.end();
      } else {
        streamFile(filePath, res, { start, end });
      }
      return;
    }

    res.writeHead(200, headers);
    if (req.method === "HEAD") {
      res.end();
    } else {
      streamFile(filePath, res);
    }
  });
}

function openBrowser(url) {
  const platform = process.platform;

  if (platform === "win32") {
    const chromeCandidates = [
      path.join(process.env.LOCALAPPDATA || "", "Google", "Chrome", "Application", "chrome.exe"),
      path.join(process.env.PROGRAMFILES || "C:\\Program Files", "Google", "Chrome", "Application", "chrome.exe"),
      path.join(process.env["PROGRAMFILES(X86)"] || "C:\\Program Files (x86)", "Google", "Chrome", "Application", "chrome.exe")
    ];

    const chromePath = chromeCandidates.find((p) => p && fs.existsSync(p));

    if (chromePath) {
      try {
        const child = child_process.spawn(chromePath, [url], {
          detached: true,
          stdio: "ignore"
        });
        child.unref();
        return;
      } catch (err) {
        console.warn(`Unable to spawn Chrome executable directly: ${err.message}`);
      }
    }

    // Fallback qua cmd start chrome
    child_process.exec(`start chrome "${url}"`, (error) => {
      if (error) {
        // Fallback mở trình duyệt mặc định nếu Chrome không gọi được qua lệnh tắt
        child_process.exec(`start "" "${url}"`);
      }
    });
  } else if (platform === "darwin") {
    child_process.exec(`open -a "Google Chrome" "${url}" || open "${url}"`);
  } else {
    child_process.exec(`google-chrome "${url}" || xdg-open "${url}"`);
  }
}

const server = http.createServer((req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { Allow: "GET, HEAD" });
    res.end("Method not allowed");
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  } catch {
    res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Bad request");
    return;
  }

  const requestedPath = pathname.replace(/^[/\\]+/, "") || "index.html";
  const filePath = path.resolve(root, requestedPath);
  const relativePath = path.relative(root, filePath);
  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Forbidden");
    return;
  }

  sendFile(req, res, filePath);
});

server.on("error", (error) => {
  console.error(`Unable to start the local server: ${error.message}`);
  process.exitCode = 1;
});

const host = process.env.HOST || "0.0.0.0";
const domain = process.env.DOMAIN || "quannguyens.id.vn";

server.listen(port, host, () => {
  const localUrl = `http://localhost:${port}`;
  console.log(`\n======================================================`);
  console.log(`  QNSTech Website Server - Awwwards 2026 Edition`);
  console.log(`  Local Address:  http://${host === "0.0.0.0" ? "localhost" : host}:${port}`);
  console.log(`  Public Domain:  https://${domain}`);
  console.log(`======================================================\n`);
  
  if (process.env.NODE_ENV !== "production" && !process.env.NO_BROWSER) {
    console.log(`Đang tự động mở trình duyệt tại ${localUrl}...`);
    openBrowser(localUrl);
  }
});
