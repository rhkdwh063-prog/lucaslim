CREATE TABLE IF NOT EXISTS fabric_samples (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT UNIQUE,
  sample_name TEXT NOT NULL DEFAULT '',
  material TEXT NOT NULL DEFAULT '',
  blend_ratio TEXT NOT NULL DEFAULT '',
  weave TEXT NOT NULL DEFAULT '',
  weight TEXT NOT NULL DEFAULT '',
  density TEXT NOT NULL DEFAULT '',
  yarn TEXT NOT NULL DEFAULT '',
  color TEXT NOT NULL DEFAULT '',
  finish TEXT NOT NULL DEFAULT '',
  functionality TEXT NOT NULL DEFAULT '',
  usage TEXT NOT NULL DEFAULT '',
  location TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_fabric_samples_code ON fabric_samples(code);
CREATE INDEX IF NOT EXISTS idx_fabric_samples_sample_name ON fabric_samples(sample_name);

INSERT INTO fabric_samples (
  code, sample_name, material, blend_ratio, weave, weight, density, yarn,
  color, finish, functionality, usage, location
) VALUES
  ('FS-2401', '코튼 트윌', 'Cotton', 'Cotton 100%', 'Twill', '180gsm', '128x72', '40s Cotton', 'Ivory', '바이오 워싱', '부드러운 터치', '셔츠, 팬츠', 'A-01'),
  ('FS-2402', '폴리 스판 저지', 'Polyester, Spandex', 'Polyester 92%, Spandex 8%', 'Single Jersey', '210gsm', '32G', '75D/36F Poly + 40D Span', 'Black', '흡습속건', '스트레치', '티셔츠, 액티브웨어', 'A-02'),
  ('FS-2403', '린넨 블렌드', 'Linen, Rayon', 'Linen 55%, Rayon 45%', 'Plain', '160gsm', '72x68', '21s Linen/Rayon', 'Natural Beige', '소프트 워싱', '통기성', '셔츠, 원피스', 'B-01'),
  ('FS-2404', '나일론 타슬란', 'Nylon', 'Nylon 100%', 'Taslan', '145gsm', '110x76', '70D Nylon Taslan', 'Khaki', '발수 가공', '생활 방수', '점퍼, 아우터', 'B-02'),
  ('FS-2405', '울 헤링본', 'Wool, Polyester', 'Wool 70%, Polyester 30%', 'Herringbone', '320gsm', '88x64', '2/48Nm Wool Blend', 'Charcoal', '기모 가공', '보온성', '코트, 자켓', 'C-01'),
  ('FS-2406', '데님 12oz', 'Cotton', 'Cotton 98%, Spandex 2%', 'Denim', '407gsm', '78x46', '10s Cotton + 70D Span', 'Indigo', '스톤 워싱', '내구성, 스트레치', '데님 팬츠', 'C-02'),
  ('FS-2407', '레이온 새틴', 'Rayon', 'Rayon 100%', 'Satin', '135gsm', '96x72', '75D Rayon Filament', 'Dusty Pink', '광택 가공', '드레이프성', '블라우스, 드레스', 'D-01'),
  ('FS-2408', '메쉬 니트', 'Polyester', 'Polyester 100%', 'Mesh Knit', '120gsm', '28G', '75D/72F Polyester', 'White', '항균 가공', '통기성, 항균', '스포츠웨어, 안감', 'D-02'),
  ('FS-2409', '코듀로이', 'Cotton, Polyester', 'Cotton 80%, Polyester 20%', 'Corduroy', '280gsm', '96x48', '16s Cotton/Poly', 'Camel', '피치 가공', '보온성', '팬츠, 스커트', 'E-01'),
  ('FS-2410', '리사이클 폴리 립스탑', 'Recycled Polyester', 'Recycled Polyester 100%', 'Ripstop', '95gsm', '210T', '50D Recycled Poly', 'Navy', 'PU 코팅', '방풍, 경량', '바람막이, 가방', 'E-02')
ON CONFLICT(code) DO NOTHING;
