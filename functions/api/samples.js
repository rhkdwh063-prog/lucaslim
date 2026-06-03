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


function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

function errorResponse(message, status = 500) {
  return jsonResponse({ error: message }, status);
}

function assertDb(env) {
  if (!env.DB) {
    throw Object.assign(new Error("D1 binding DB is not configured"), { status: 500 });
  }

  return env.DB;
}

function normalizeSample(sample) {
  return SAMPLE_FIELDS.reduce((result, field) => {
    result[field] = String(sample?.[field] ?? "").trim();
    return result;
  }, {});
}

function hasRecognizedData(sample) {
  return SAMPLE_FIELDS.some((field) => sample[field]);
}

function toApiSample(row) {
  return {
    code: row.code || "",
    sampleName: row.sample_name || "",
    material: row.material || "",
    blendRatio: row.blend_ratio || "",
    weave: row.weave || "",
    weight: row.weight || "",
    density: row.density || "",
    yarn: row.yarn || "",
    color: row.color || "",
    finish: row.finish || "",
    functionality: row.functionality || "",
    usage: row.usage || "",
    location: row.location || "",
  };
}

async function listSamples(db) {
  const { results } = await db
    .prepare(
      `SELECT code, sample_name, material, blend_ratio, weave, weight, density, yarn,
              color, finish, functionality, usage, location
         FROM fabric_samples
        ORDER BY id ASC`
    )
    .all();

  return results.map(toApiSample);
}

function createUpsertStatement(db, sample) {
  const normalized = normalizeSample(sample);
  const code = normalized.code || null;

  if (code) {
    return db
      .prepare(
        `INSERT INTO fabric_samples (
           code, sample_name, material, blend_ratio, weave, weight, density, yarn,
           color, finish, functionality, usage, location, updated_at
         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
         ON CONFLICT(code) DO UPDATE SET
           sample_name = excluded.sample_name,
           material = excluded.material,
           blend_ratio = excluded.blend_ratio,
           weave = excluded.weave,
           weight = excluded.weight,
           density = excluded.density,
           yarn = excluded.yarn,
           color = excluded.color,
           finish = excluded.finish,
           functionality = excluded.functionality,
           usage = excluded.usage,
           location = excluded.location,
           updated_at = CURRENT_TIMESTAMP`
      )
      .bind(
        normalized.code,
        normalized.sampleName,
        normalized.material,
        normalized.blendRatio,
        normalized.weave,
        normalized.weight,
        normalized.density,
        normalized.yarn,
        normalized.color,
        normalized.finish,
        normalized.functionality,
        normalized.usage,
        normalized.location
      );
  }

  return db
    .prepare(
      `INSERT INTO fabric_samples (
         code, sample_name, material, blend_ratio, weave, weight, density, yarn,
         color, finish, functionality, usage, location, updated_at
       ) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`
    )
    .bind(
      normalized.sampleName,
      normalized.material,
      normalized.blendRatio,
      normalized.weave,
      normalized.weight,
      normalized.density,
      normalized.yarn,
      normalized.color,
      normalized.finish,
      normalized.functionality,
      normalized.usage,
      normalized.location
    );
}

export async function onRequestGet({ env }) {
  try {
    const db = assertDb(env);
    return jsonResponse({ samples: await listSamples(db) });
  } catch (error) {
    return errorResponse(error.message, error.status || 500);
  }
}

export async function onRequestPost({ request, env }) {
  try {
    const db = assertDb(env);
    const payload = await request.json();

    if (!Array.isArray(payload.samples)) {
      return errorResponse("samples must be an array", 400);
    }

    const uploadedSamples = payload.samples.map(normalizeSample).filter(hasRecognizedData);

    if (uploadedSamples.length > 0) {
      await db.batch(uploadedSamples.map((sample) => createUpsertStatement(db, sample)));
    }

    return jsonResponse({
      savedCount: uploadedSamples.length,
      samples: await listSamples(db),
    });
  } catch (error) {
    return errorResponse(error.message, error.status || 500);
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      allow: "GET, POST, OPTIONS",
    },
  });
}
