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
  sampleName: [
    "sample_name",
    "samplename",
    "name",
    "fabric_name",
    "fabricname",
    "fabric",
    "item_name",
    "itemname",
    "원단명",
    "원단 명",
    "원단",
    "샘플명",
    "원단샘플명",
    "품명",
    "상품명",
    "아이템명",
  ],
  code: [
    "code",
    "sample_code",
    "samplecode",
    "sample_no",
    "sampleno",
    "style_no",
    "styleno",
    "item_code",
    "itemcode",
    "품번",
    "코드",
    "샘플코드",
    "샘플번호",
    "원단코드",
    "품목코드",
  ],
  material: ["material", "fiber", "fabrication", "소재", "원료"],
  blendRatio: [
    "blend_ratio",
    "blendratio",
    "composition",
    "fiber_content",
    "fibercontent",
    "혼용률",
    "혼용율",
    "혼용",
    "혼용률%",
    "혼용율%",
  ],
  weave: ["weave", "structure", "construction", "조직", "조직명", "원단조직"],
  weight: ["weight", "weightgsm", "gsm", "중량", "중량gsm", "두께"],
  density: ["density", "gauge", "densitygauge", "밀도", "게이지", "밀도게이지"],
  yarn: ["yarn", "yarn_count", "yarncount", "원사", "원사명", "번수"],
  color: ["color", "colour", "컬러", "색상", "칼라"],
  finish: ["finish", "finishing", "process", "가공", "후가공", "가공명"],
  functionality: ["functionality", "function", "feature", "performance", "기능성", "기능", "특징"],
  usage: ["usage", "use", "application", "purpose", "용도", "사용처", "적용아이템"],
  location: ["location", "storage", "rack", "position", "위치", "보관위치", "보관 위치", "랙위치", "보관장소"],
};

const FIELD_KEYS = Object.keys(FIELD_ALIASES);

let samples = [...DEFAULT_SAMPLES];
let currentResults = [...samples];

function compactText(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^0-9a-z가-힣ㄱ-ㅎㅏ-ㅣ]/g, "");
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
  return FIELD_KEYS.reduce((sample, field) => {
    sample[field] = getFieldValue(row, field);
    return sample;
  }, {});
}

function hasRecognizedSampleData(sample) {
  return FIELD_KEYS.some((field) => valueOrDash(sample[field]) !== "-");
}

function normalizeUploadedRows(rows) {
  return rows.map(normalizeSample).filter(hasRecognizedSampleData);
}

function isExampleSheet(sheetName) {
  return /예시|example/i.test(sheetName);
}

function getWorksheetRows(workbook) {
  const dataSheetNames = workbook.SheetNames.filter((sheetName) => !isExampleSheet(sheetName));

  for (const sheetName of dataSheetNames) {
    const sheet = workbook.Sheets[sheetName];
    const rows = window.XLSX.utils.sheet_to_json(sheet, { defval: "", raw: false });
    const normalizedRows = normalizeUploadedRows(rows);

    if (normalizedRows.length > 0) {
      return { rows: normalizedRows, sheetName };
    }
  }

  return { rows: [], sheetName: "" };
}

const SEARCH_FIELDS = [
  { key: "code", label: "품번", weight: 1.2 },
  { key: "sampleName", label: "원단명", weight: 1.25 },
  { key: "material", label: "소재", weight: 1 },
  { key: "blendRatio", label: "혼용률", weight: 0.95 },
  { key: "weave", label: "조직", weight: 1 },
  { key: "weight", label: "중량", weight: 0.85 },
  { key: "density", label: "밀도", weight: 0.85 },
  { key: "yarn", label: "원사", weight: 0.9 },
  { key: "color", label: "컬러", weight: 0.95 },
  { key: "finish", label: "가공", weight: 0.9 },
  { key: "functionality", label: "기능성", weight: 1 },
  { key: "usage", label: "용도", weight: 0.9 },
  { key: "location", label: "보관 위치", weight: 0.8 },
];

function createBigrams(value) {
  const characters = Array.from(value);

  if (characters.length < 2) {
    return characters;
  }

  return characters.slice(0, -1).map((character, index) => `${character}${characters[index + 1]}`);
}

function diceSimilarity(left, right) {
  if (!left || !right) {
    return 0;
  }

  if (left === right) {
    return 1;
  }

  const leftBigrams = createBigrams(left);
  const rightBigrams = createBigrams(right);
  const remaining = new Map();
  let matches = 0;

  leftBigrams.forEach((bigram) => {
    remaining.set(bigram, (remaining.get(bigram) || 0) + 1);
  });

  rightBigrams.forEach((bigram) => {
    const count = remaining.get(bigram) || 0;

    if (count > 0) {
      matches += 1;
      remaining.set(bigram, count - 1);
    }
  });

  return (2 * matches) / (leftBigrams.length + rightBigrams.length);
}

function levenshteinSimilarity(left, right) {
  const leftCharacters = Array.from(left);
  const rightCharacters = Array.from(right);
  const maxLength = Math.max(leftCharacters.length, rightCharacters.length);

  if (maxLength === 0) {
    return 1;
  }

  const distances = Array.from({ length: leftCharacters.length + 1 }, (_, leftIndex) =>
    Array.from({ length: rightCharacters.length + 1 }, (_, rightIndex) =>
      leftIndex === 0 ? rightIndex : rightIndex === 0 ? leftIndex : 0
    )
  );

  for (let leftIndex = 1; leftIndex <= leftCharacters.length; leftIndex += 1) {
    for (let rightIndex = 1; rightIndex <= rightCharacters.length; rightIndex += 1) {
      const cost = leftCharacters[leftIndex - 1] === rightCharacters[rightIndex - 1] ? 0 : 1;
      distances[leftIndex][rightIndex] = Math.min(
        distances[leftIndex - 1][rightIndex] + 1,
        distances[leftIndex][rightIndex - 1] + 1,
        distances[leftIndex - 1][rightIndex - 1] + cost
      );
    }
  }

  return 1 - distances[leftCharacters.length][rightCharacters.length] / maxLength;
}

function scoreField(value, searchTerm) {
  const fieldText = compactText(value);

  if (!fieldText) {
    return 0;
  }

  if (fieldText === searchTerm) {
    return 1;
  }

  if (fieldText.includes(searchTerm)) {
    return 0.8 + Math.min(searchTerm.length / fieldText.length, 1) * 0.18;
  }

  if (searchTerm.includes(fieldText)) {
    return 0.55 + Math.min(fieldText.length / searchTerm.length, 1) * 0.2;
  }

  return Math.max(diceSimilarity(fieldText, searchTerm), levenshteinSimilarity(fieldText, searchTerm));
}

function getSearchFields(fieldKey = "all") {
  if (fieldKey === "all") {
    return SEARCH_FIELDS;
  }

  return SEARCH_FIELDS.filter((field) => field.key === fieldKey);
}

function rankSample(sample, searchTerm, fieldKey = "all") {
  return getSearchFields(fieldKey).reduce((bestScore, field) => {
    const fieldScore = scoreField(sample[field.key], searchTerm) * field.weight;
    return Math.max(bestScore, fieldScore);
  }, 0);
}

function searchSamples(sampleList, query, fieldKey = "all") {
  const searchTerm = compactText(query);

  if (!searchTerm) {
    return sampleList;
  }

  const minimumScore = searchTerm.length <= 2 ? 0.62 : 0.42;

  return sampleList
    .map((sample, index) => ({ index, sample, score: rankSample(sample, searchTerm, fieldKey) }))
    .filter((result) => result.score >= minimumScore)
    .sort((left, right) => right.score - left.score || left.index - right.index)
    .map((result) => result.sample);
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
  currentResults = results;

  if (!resultsContainer) {
    return;
  }

  if (results.length === 0) {
    resultsContainer.innerHTML = `<p class="empty-state">"${escapeHtml(query)}" 검색 결과가 없습니다.</p>`;
    return;
  }

  resultsContainer.innerHTML = results
    .map(
      (sample, index) => `
        <article class="result-card">
          <label class="label-select">
            <input type="checkbox" class="label-select__input" data-result-index="${index}">
            <span class="label-select__box" aria-hidden="true"></span>
            <span class="label-select__text">인쇄할 라벨 선택</span>
          </label>
          <div class="result-card__header">
            <h2>${escapeHtml(sample.sampleName || sample.code || "원단 샘플")}</h2>
          </div>
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

function getSelectedLabelSamples() {
  return Array.from(document.querySelectorAll(".label-select__input:checked"))
    .map((checkbox) => currentResults[Number(checkbox.dataset.resultIndex)])
    .filter(Boolean);
}

function renderPrintLabels(labelSamples) {
  const labelContainer = document.querySelector("#print-labels-area");

  if (!labelContainer) {
    return;
  }

  labelContainer.innerHTML = labelSamples
    .map(
      (sample) => `
        <article class="print-label">
          <header class="print-label__header">
            <div class="print-label__code">${escapeHtml(sample.code)}</div>
            <div class="print-label__location">${escapeHtml(sample.location)}</div>
          </header>
          <div class="print-label__name">${escapeHtml(sample.sampleName || "원단 샘플")}</div>
          <dl class="print-label__grid">
            <dt class="print-label__term">소재</dt><dd class="print-label__desc">${escapeHtml(sample.material)}</dd>
            <dt class="print-label__term">혼용</dt><dd class="print-label__desc">${escapeHtml(sample.blendRatio)}</dd>
            <dt class="print-label__term">조직</dt><dd class="print-label__desc">${escapeHtml(sample.weave)}</dd>
            <dt class="print-label__term">중량</dt><dd class="print-label__desc">${escapeHtml(sample.weight)}</dd>
            <dt class="print-label__term">밀도</dt><dd class="print-label__desc">${escapeHtml(sample.density)}</dd>
            <dt class="print-label__term">원사</dt><dd class="print-label__desc">${escapeHtml(sample.yarn)}</dd>
            <dt class="print-label__term">컬러</dt><dd class="print-label__desc">${escapeHtml(sample.color)}</dd>
            <dt class="print-label__term">가공</dt><dd class="print-label__desc">${escapeHtml(sample.finish)}</dd>
            <dt class="print-label__term">기능</dt><dd class="print-label__desc print-label__desc--wide">${escapeHtml(sample.functionality)}</dd>
            <dt class="print-label__term">용도</dt><dd class="print-label__desc print-label__desc--wide">${escapeHtml(sample.usage)}</dd>
          </dl>
        </article>
      `
    )
    .join("");
}

function bindPrintLabels() {
  const printButton = document.querySelector("#print-labels");
  const status = document.querySelector("#data-status");

  printButton?.addEventListener("click", () => {
    const selectedSamples = getSelectedLabelSamples();

    if (currentResults.length === 0) {
      status.textContent = "인쇄할 원단 데이터가 없습니다.";
      return;
    }

    if (selectedSamples.length === 0) {
      status.textContent = "라벨로 인쇄할 원단을 선택하세요.";
      return;
    }

    renderPrintLabels(selectedSamples);
    window.print();
  });
}

function bindSearch() {
  const searchForm = document.querySelector("#sample-search-form");
  const searchInput = document.querySelector("#sample-search");
  const fieldSelect = document.querySelector("#sample-field");

  const renderFilteredResults = () => {
    const query = searchInput.value.trim();
    const fieldKey = fieldSelect?.value || "all";
    renderResults(searchSamples(samples, query, fieldKey), query);
  };

  searchForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    renderFilteredResults();
  });

  searchInput?.addEventListener("input", renderFilteredResults);
  fieldSelect?.addEventListener("change", renderFilteredResults);
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
    const { rows: uploadedSamples, sheetName } = getWorksheetRows(workbook);

    if (uploadedSamples.length === 0) {
      status.textContent = "인식 가능한 원단 데이터가 없습니다.";
      return;
    }

    samples = uploadedSamples;
    status.textContent = `${sheetName} 시트에서 ${uploadedSamples.length}개 원단 데이터를 불러왔습니다.`;
    renderResults(samples);
  });
}

if (typeof document !== "undefined") {
  bindSearch();
  bindExcelUpload();
  bindPrintLabels();
  renderResults(samples);
}

if (typeof module !== "undefined") {
  module.exports = {
    DEFAULT_SAMPLES,
    FIELD_KEYS,
    SEARCH_FIELDS,
    normalizeSample,
    getSelectedLabelSamples,
    normalizeUploadedRows,
    renderPrintLabels,
    searchSamples,
  };
}
