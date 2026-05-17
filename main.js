const DEFAULT_SAMPLES = [
  {
    sampleName: "린넨 내추럴",
    code: "LN-001",
    color: "내추럴 베이지",
    material: "Linen 100%",
    width: "145cm",
    weight: "180gsm",
    location: "A-1-03",
    quantity: 12,
    note: "셔츠, 원피스용",
  },
  {
    sampleName: "코튼 트윌",
    code: "CT-014",
    color: "카키",
    material: "Cotton 98%, Span 2%",
    width: "150cm",
    weight: "240gsm",
    location: "B-2-07",
    quantity: 8,
    note: "팬츠용",
  },
  {
    sampleName: "울 헤링본",
    code: "WH-203",
    color: "차콜",
    material: "Wool 70%, Poly 30%",
    width: "148cm",
    weight: "310gsm",
    location: "C-4-01",
    quantity: 5,
    note: "자켓, 코트용",
  },
  {
    sampleName: "실크 새틴",
    code: "SS-077",
    color: "아이보리",
    material: "Silk 92%, Span 8%",
    width: "136cm",
    weight: "95gsm",
    location: "A-3-12",
    quantity: 3,
    note: "블라우스용",
  },
  {
    sampleName: "데님 인디고",
    code: "DN-550",
    color: "인디고",
    material: "Cotton 100%",
    width: "155cm",
    weight: "12oz",
    location: "D-1-05",
    quantity: 16,
    note: "데님 팬츠용",
  },
];

const FIELD_ALIASES = {
  sampleName: ["sample_name", "samplename", "name", "원단명", "샘플명", "원단샘플명", "품명"],
  code: ["code", "sample_code", "품번", "코드", "샘플코드"],
  color: ["color", "컬러", "색상"],
  material: ["material", "소재", "혼용률"],
  width: ["width", "폭", "원단폭"],
  weight: ["weight", "중량", "두께"],
  location: ["location", "위치", "보관위치", "랙위치"],
  quantity: ["quantity", "qty", "수량", "재고"],
  note: ["note", "memo", "비고", "메모"],
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
    color: getFieldValue(row, "color"),
    material: getFieldValue(row, "material"),
    width: getFieldValue(row, "width"),
    weight: getFieldValue(row, "weight"),
    location: getFieldValue(row, "location"),
    quantity: getFieldValue(row, "quantity"),
    note: getFieldValue(row, "note"),
  };
}

function searchSamples(sampleList, query) {
  const searchTerm = compactText(query);

  if (!searchTerm) {
    return [];
  }

  return sampleList.filter((sample) => {
    const haystack = [
      sample.sampleName,
      sample.code,
      sample.color,
      sample.material,
      sample.location,
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

function renderResults(results, query) {
  const resultsContainer = document.querySelector("#results");

  if (!resultsContainer) {
    return;
  }

  if (!query) {
    resultsContainer.innerHTML = "";
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
            <div><dt>컬러</dt><dd>${escapeHtml(sample.color)}</dd></div>
            <div><dt>소재</dt><dd>${escapeHtml(sample.material)}</dd></div>
            <div><dt>폭</dt><dd>${escapeHtml(sample.width)}</dd></div>
            <div><dt>중량</dt><dd>${escapeHtml(sample.weight)}</dd></div>
            <div><dt>위치</dt><dd>${escapeHtml(sample.location)}</dd></div>
            <div><dt>수량</dt><dd>${escapeHtml(sample.quantity)}</dd></div>
            <div><dt>비고</dt><dd>${escapeHtml(sample.note)}</dd></div>
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

    if (!query) {
      searchInput.focus();
      renderResults([], "");
      return;
    }

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
  });
}

if (typeof document !== "undefined") {
  bindSearch();
  bindExcelUpload();
}

if (typeof module !== "undefined") {
  module.exports = {
    DEFAULT_SAMPLES,
    normalizeSample,
    searchSamples,
  };
}
