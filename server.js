const http = require("http");
const fs = require("fs/promises");
const path = require("path");

const ROOT_DIR = __dirname;
const DATA_DIR = path.join(ROOT_DIR, "data");
const DB_FILE = path.join(DATA_DIR, "fabric-samples.json");
const PORT = Number(process.env.PORT || 4173);

const SAMPLE_FIELDS = [
  "code",
  "sampleName",
  "material",
  "blendRatio",
  "weave",
  "weight",
  "density",
  "yarn",
  "color",
  "finish",
  "functionality",
  "usage",
  "location",
];

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};

async function ensureDatabase() {
  await fs.mkdir(DATA_DIR, { recursive: true });

  try {
    await fs.access(DB_FILE);
  } catch {
    await writeSamples([]);
  }
}

async function readSamples() {
  await ensureDatabase();
  const raw = await fs.readFile(DB_FILE, "utf8");
  const parsed = JSON.parse(raw || "[]");
  return Array.isArray(parsed) ? parsed.map(normalizeSample) : [];
}

async function writeSamples(samples) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tempFile = `${DB_FILE}.tmp`;
  await fs.writeFile(tempFile, `${JSON.stringify(samples.map(normalizeSample), null, 2)}\n`, "utf8");
  await fs.rename(tempFile, DB_FILE);
}

function normalizeSample(sample) {
  return SAMPLE_FIELDS.reduce((result, field) => {
    result[field] = String(sample?.[field] ?? "").trim();
    return result;
  }, {});
}

function compactCode(value) {
  return String(value ?? "").trim().toLowerCase();
}

function mergeSamples(currentSamples, uploadedSamples) {
  const merged = currentSamples.map(normalizeSample);
  const indexByCode = new Map();

  merged.forEach((sample, index) => {
    const code = compactCode(sample.code);
    if (code) {
      indexByCode.set(code, index);
    }
  });

  uploadedSamples.map(normalizeSample).forEach((sample) => {
    const code = compactCode(sample.code);

    if (code && indexByCode.has(code)) {
      merged[indexByCode.get(code)] = sample;
      return;
    }

    if (SAMPLE_FIELDS.some((field) => sample[field])) {
      if (code) {
        indexByCode.set(code, merged.length);
      }
      merged.push(sample);
    }
  });

  return merged;
}

async function readRequestBody(request) {
  const chunks = [];
  let size = 0;

  for await (const chunk of request) {
    size += chunk.length;
    if (size > 5 * 1024 * 1024) {
      throw Object.assign(new Error("Request body too large"), { statusCode: 413 });
    }
    chunks.push(chunk);
  }

  return Buffer.concat(chunks).toString("utf8");
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, { "content-type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload));
}

function sendError(response, statusCode, message) {
  sendJson(response, statusCode, { error: message });
}

async function handleApi(request, response, pathname) {
  if (pathname !== "/api/samples") {
    sendError(response, 404, "API endpoint not found");
    return;
  }

  if (request.method === "GET") {
    sendJson(response, 200, { samples: await readSamples() });
    return;
  }

  if (request.method === "POST") {
    const body = await readRequestBody(request);
    const payload = JSON.parse(body || "{}");

    if (!Array.isArray(payload.samples)) {
      sendError(response, 400, "samples must be an array");
      return;
    }

    const currentSamples = await readSamples();
    const mergedSamples = mergeSamples(currentSamples, payload.samples);
    await writeSamples(mergedSamples);
    sendJson(response, 200, { samples: mergedSamples, savedCount: payload.samples.length });
    return;
  }

  response.writeHead(405, { allow: "GET, POST" });
  response.end();
}

async function serveStatic(response, pathname) {
  const requestedPath = pathname === "/" ? "/index.html" : pathname;
  const filePath = path.normalize(path.join(ROOT_DIR, requestedPath));

  if (!filePath.startsWith(ROOT_DIR)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const content = await fs.readFile(filePath);
    const contentType = MIME_TYPES[path.extname(filePath)] || "application/octet-stream";
    response.writeHead(200, { "content-type": contentType });
    response.end(content);
  } catch (error) {
    if (error.code === "ENOENT") {
      response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }
    throw error;
  }
}

const server = http.createServer(async (request, response) => {
  try {
    const { pathname } = new URL(request.url, `http://${request.headers.host}`);

    if (pathname.startsWith("/api/")) {
      await handleApi(request, response, pathname);
      return;
    }

    await serveStatic(response, decodeURIComponent(pathname));
  } catch (error) {
    const statusCode = error.statusCode || 500;
    sendError(response, statusCode, statusCode === 500 ? "Internal server error" : error.message);
  }
});

server.listen(PORT, () => {
  console.log(`Fabric sample server running at http://localhost:${PORT}`);
});
