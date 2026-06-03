const DEFAULT_SAMPLES = [
  {
    code: "FS-2401",
    sampleName: "코튼 트윌",
    material: "Cotton",
    blendRatio: "Cotton 100%",
    weave: "Twill",
    weight: "180gsm",
    density: "128x72",
    yarn: "40s Cotton",
    color: "Ivory",
    finish: "바이오 워싱",
    functionality: "부드러운 터치",
    usage: "셔츠, 팬츠",
    location: "A-01",
  },
  {
    code: "FS-2402",
    sampleName: "폴리 스판 저지",
    material: "Polyester, Spandex",
    blendRatio: "Polyester 92%, Spandex 8%",
    weave: "Single Jersey",
    weight: "210gsm",
    density: "32G",
    yarn: "75D/36F Poly + 40D Span",
    color: "Black",
    finish: "흡습속건",
    functionality: "스트레치",
    usage: "티셔츠, 액티브웨어",
    location: "A-02",
  },
  {
    code: "FS-2403",
    sampleName: "린넨 블렌드",
    material: "Linen, Rayon",
    blendRatio: "Linen 55%, Rayon 45%",
    weave: "Plain",
    weight: "160gsm",
    density: "72x68",
    yarn: "21s Linen/Rayon",
    color: "Natural Beige",
    finish: "소프트 워싱",
    functionality: "통기성",
    usage: "셔츠, 원피스",
    location: "B-01",
  },
  {
    code: "FS-2404",
    sampleName: "나일론 타슬란",
    material: "Nylon",
    blendRatio: "Nylon 100%",
    weave: "Taslan",
    weight: "145gsm",
    density: "110x76",
    yarn: "70D Nylon Taslan",
    color: "Khaki",
    finish: "발수 가공",
    functionality: "생활 방수",
    usage: "점퍼, 아우터",
    location: "B-02",
  },
  {
    code: "FS-2405",
    sampleName: "울 헤링본",
    material: "Wool, Polyester",
    blendRatio: "Wool 70%, Polyester 30%",
    weave: "Herringbone",
    weight: "320gsm",
    density: "88x64",
    yarn: "2/48Nm Wool Blend",
    color: "Charcoal",
    finish: "기모 가공",
    functionality: "보온성",
    usage: "코트, 자켓",
    location: "C-01",
  },
  {
    code: "FS-2406",
    sampleName: "데님 12oz",
    material: "Cotton",
    blendRatio: "Cotton 98%, Spandex 2%",
    weave: "Denim",
    weight: "407gsm",
    density: "78x46",
    yarn: "10s Cotton + 70D Span",
    color: "Indigo",
    finish: "스톤 워싱",
    functionality: "내구성, 스트레치",
    usage: "데님 팬츠",
    location: "C-02",
  },
  {
    code: "FS-2407",
    sampleName: "레이온 새틴",
    material: "Rayon",
    blendRatio: "Rayon 100%",
    weave: "Satin",
    weight: "135gsm",
    density: "96x72",
    yarn: "75D Rayon Filament",
    color: "Dusty Pink",
    finish: "광택 가공",
    functionality: "드레이프성",
    usage: "블라우스, 드레스",
    location: "D-01",
  },
  {
    code: "FS-2408",
    sampleName: "메쉬 니트",
    material: "Polyester",
    blendRatio: "Polyester 100%",
    weave: "Mesh Knit",
    weight: "120gsm",
    density: "28G",
    yarn: "75D/72F Polyester",
    color: "White",
    finish: "항균 가공",
    functionality: "통기성, 항균",
    usage: "스포츠웨어, 안감",
    location: "D-02",
  },
  {
    code: "FS-2409",
    sampleName: "코듀로이",
    material: "Cotton, Polyester",
    blendRatio: "Cotton 80%, Polyester 20%",
    weave: "Corduroy",
    weight: "280gsm",
    density: "96x48",
    yarn: "16s Cotton/Poly",
    color: "Camel",
    finish: "피치 가공",
    functionality: "보온성",
    usage: "팬츠, 스커트",
    location: "E-01",
  },
  {
    code: "FS-2410",
    sampleName: "리사이클 폴리 립스탑",
    material: "Recycled Polyester",
    blendRatio: "Recycled Polyester 100%",
    weave: "Ripstop",
    weight: "95gsm",
    density: "210T",
    yarn: "50D Recycled Poly",
    color: "Navy",
    finish: "PU 코팅",
    functionality: "방풍, 경량",
    usage: "바람막이, 가방",
    location: "E-02",
  },
];

const FIELD_ALIASES = {
  sampleName: ["sample_name", "samplename", "name", "원단명", "샘플명", "원단샘플명", "품명"],
  code: ["code", "sample_code", "품번", "코드", "샘플코드"],
  color: ["color", "컬러", "색상"],
  material: ["material", "소재"],
  blendRatio: ["blend_ratio", "blendratio", "혼용률", "혼용율"],
  weave: ["weave", "structure", "조직"],
  density: ["density", "밀도"],
  yarn: ["yarn", "원사"],
  weight: ["weight", "중량", "두께"],
  finish: ["finish", "가공"],
  functionality: ["functionality", "function", "기능성", "기능"],
  usage: ["usage", "use", "용도"],
  location: ["location", "위치", "보관위치", "보관 위치", "랙위치"],
};

let samples = [...DEFAULT_SAMPLES];

function compactText(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "");
}

function getFieldValue(row, field) {
  const aliases = FIELD_ALIASES[field];
  const normalizedRow = Object.entries(row).reduce((result, [key, value]) => {
    result[compactText(key)] = value;
    return result;
  }, {});

  const matchingKey = aliases.find((alias) => compactText(alias) in normalizedRow);
  return matchingKey ? normalizedRow[compactText(matchingKey)] : "";
}

function normalizeSample(row) {
  return {
    sampleName: getFieldValue(row, "sampleName"),
    code: getFieldValue(row, "code"),
    material: getFieldValue(row, "material"),
    blendRatio: getFieldValue(row, "blendRatio"),
    weave: getFieldValue(row, "weave"),
    weight: getFieldValue(row, "weight"),
    density: getFieldValue(row, "density"),
    yarn: getFieldValue(row, "yarn"),
    color: getFieldValue(row, "color"),
    finish: getFieldValue(row, "finish"),
    functionality: getFieldValue(row, "functionality"),
    usage: getFieldValue(row, "usage"),
    location: getFieldValue(row, "location"),
  };
}

function searchSamples(sampleList, query) {
  const searchTerm = compactText(query);

  if (!searchTerm) {
    return sampleList;
  }

  return sampleList.filter((sample) => {
    const haystack = [
      sample.sampleName,
      sample.code,
      sample.color,
      sample.material,
      sample.weave,
      sample.functionality,
      sample.usage,
    ]
      .map(compactText)
      .join(" ");

    return haystack.includes(searchTerm);
  });
}

function valueOrDash(value) {
  return value === undefined || value === null || value === "" ? "-" : value;
}

function escapeHtml(value) {
  return String(valueOrDash(value)).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}

function renderResults(results, query = "") {
  const resultsContainer = document.querySelector("#results");

  if (!resultsContainer) {
    return;
  }

  if (results.length === 0) {
    resultsContainer.innerHTML = `<p class="empty-state">"${escapeHtml(query)}" 검색 결과가 없습니다.</p>`;
    return;
  }

  resultsContainer.innerHTML = results
    .map(
      (sample) => `
        <article class="result-card">
          <h2>${escapeHtml(sample.sampleName)}</h2>
          <dl class="result-grid">
            <div><dt>품번</dt><dd>${escapeHtml(sample.code)}</dd></div>
            <div><dt>소재</dt><dd>${escapeHtml(sample.material)}</dd></div>
            <div><dt>조직</dt><dd>${escapeHtml(sample.weave)}</dd></div>
            <div><dt>컬러</dt><dd>${escapeHtml(sample.color)}</dd></div>
            <div><dt>기능성</dt><dd>${escapeHtml(sample.functionality)}</dd></div>
            <div><dt>보관 위치</dt><dd>${escapeHtml(sample.location)}</dd></div>
          </dl>
        </article>
      `
    )
    .join("");
}

function bindSearch() {
  const searchForm = document.querySelector("#sample-search-form");
  const searchInput = document.querySelector("#sample-search");

  searchForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const query = searchInput.value.trim();
    renderResults(searchSamples(samples, query), query);
  });

  searchInput?.addEventListener("input", (event) => {
    const query = event.target.value.trim();
    renderResults(searchSamples(samples, query), query);
  });
}

function bindExcelUpload() {
  const fileInput = document.querySelector("#sample-file");
  const status = document.querySelector("#data-status");

  fileInput?.addEventListener("change", async (event) => {
    const [file] = event.target.files;

    if (!file) {
      return;
    }

    if (!window.XLSX) {
      status.textContent = "엑셀 업로드 라이브러리를 불러오지 못했습니다.";
      return;
    }

    const buffer = await file.arrayBuffer();
    const workbook = window.XLSX.read(buffer);
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = window.XLSX.utils.sheet_to_json(firstSheet, { defval: "" });
    const uploadedSamples = rows.map(normalizeSample).filter((sample) => sample.sampleName);

    if (uploadedSamples.length === 0) {
      status.textContent = "인식 가능한 원단명이 없습니다.";
      return;
    }

    samples = uploadedSamples;
    status.textContent = `${uploadedSamples.length}개 원단 데이터를 불러왔습니다.`;
    renderResults(samples);
  });
}

if (typeof document !== "undefined") {
  bindSearch();
  bindExcelUpload();
  renderResults(samples);
}

if (typeof module !== "undefined") {
  module.exports = {
    DEFAULT_SAMPLES,
    normalizeSample,
    searchSamples,
  };
}
