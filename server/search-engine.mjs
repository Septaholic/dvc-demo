import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

/**
 * Normalize Vietnamese text for accent-insensitive and case-insensitive search.
 */
export function normalizeVi(value) {
  if (value === null || value === undefined) return '';
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

function splitWordTokens(text) {
  const norm = normalizeVi(text);
  if (!norm) return [];
  return norm.match(/[a-z0-9]+/g) || [];
}

function splitQueryTokens(query) {
  const norm = normalizeVi(query);
  if (!norm) return [];
  return norm.split(/\s+/).filter(Boolean);
}

/**
 * Deterministic synthetic ID for derived categories/items not natively captured with UUIDs.
 */
function stableId(prefix, key) {
  const hex = crypto.createHash('sha1').update(`${prefix}:${key}`).digest('hex');
  return `${prefix}-${hex.slice(0, 12)}`;
}

function stripDiacriticsOnlyLower(value) {
  return String(value || '').toLowerCase().replace(/\s+/g, ' ').trim();
}

function toFormalityCode(code) {
  const s = String(code || '').trim();
  const match = s.match(/^(\d+\.\d+)\.\d+$/);
  return match ? match[1] : s;
}

function parseJsonSafe(raw, fallback = null) {
  if (!raw || typeof raw !== 'string') return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

/**
 * Extract the hardcoded procedure detail map `B` from `public/assets/dossier-CPVyX_AJ.js`
 * so procedures like 1.001193 (Đăng ký khai sinh), 1.000656 (Đăng ký khai tử),
 * 1.004222 (Đăng ký thường trú), etc. have complete realistic detail pages.
 */
function loadBundledDossierDetails() {
  const result = new Map();
  try {
    const filePath = path.resolve('public/assets/dossier-CPVyX_AJ.js');
    if (!fs.existsSync(filePath)) return result;
    const src = fs.readFileSync(filePath, 'utf8');
    const marker = src.indexOf(',B={');
    if (marker === -1) return result;
    const start = marker + 3;
    let depth = 0;
    let inStr = null;
    let esc = false;
    let end = -1;
    for (let i = start; i < src.length; i++) {
      const ch = src[i];
      if (esc) {
        esc = false;
        continue;
      }
      if (inStr) {
        if (ch === '\\') esc = true;
        else if (ch === inStr) inStr = null;
        continue;
      }
      if (ch === '"' || ch === "'" || ch === '`') {
        inStr = ch;
        continue;
      }
      if (ch === '{') depth++;
      else if (ch === '}') {
        depth--;
        if (depth === 0) {
          end = i + 1;
          break;
        }
      }
    }
    if (end === -1) return result;
    const parsed = vm.runInNewContext(`(${src.slice(start, end)})`);
    for (const [k, val] of Object.entries(parsed || {})) {
      if (!val || typeof val !== 'object') continue;
      result.set(String(k), val);
      if (val.id) result.set(String(val.id), val);
      if (val.code) result.set(String(val.code), val);
    }
  } catch {
    // Gracefully skip if bundle layout is missing or altered
  }
  return result;
}

const KNOWN_AGENCY_KEYWORDS = [
  { code: 'G15', name: 'Bộ Tư pháp', hints: ['tu phap', 'ho tich', 'quoc tich', 'ly lich tu phap', 'nuoi con nuoi', 'cong chung', 'chung thuc', 'luat su', 'dau gia', 'tro giup phap ly', 'giao dich bao dam'] },
  { code: 'G01', name: 'Bộ Công an', hints: ['cong an', 'cu tru', 'thuong tru', 'tam tru', 'can cuoc', 'xuat nhap canh', 'ho chieu', 'phong chay', 'pccc', 'giao thong duong bo', 'bien so xe', 'con dau', 'an ninh, trat tu'] },
  { code: 'G10', name: 'Bộ Nông nghiệp và Môi trường', hints: ['nong nghiep', 'moi truong', 'dat dai', 'lam nghiep', 'thuy san', 'thuy loi', 'bien va hai dao', 'tai nguyen nuoc', 'khoang san', 'chan nuoi', 'thu y', 'trong trot', 'kiem lam'] },
  { code: 'G12', name: 'Bộ Tài chính', hints: ['tai chinh', 'hai quan', 'thue', 'bao hiem xa hoi', 'bhxh', 'bhyt', 'kho bac', 'chung khoan', 'ke toan', 'kiem toan', 'dau tu', 'dau thau', 'ngan sach', 'tai san cong', 'ho kinh doanh', 'doanh nghiep'] },
  { code: 'G09', name: 'Bộ Nội vụ', hints: ['noi vu', 'lao dong', 'nguoi co cong', 'thi dua', 'khen thuong', 'van thu', 'luu tru', 'hoi, quy', 'viec lam', 'tien luong', 'can bo, cong chuc'] },
  { code: 'G06', name: 'Bộ Khoa học và Công nghệ', hints: ['khoa hoc', 'cong nghe', 'so huu tri tue', 'tieu chuan do luong', 'an toan buc xa', 'tan so vo tuyen', 'vien thong', 'buu chinh'] },
  { code: 'G03', name: 'Bộ Giáo dục và Đào tạo', hints: ['giao duc', 'dao tao', 'tuyen sinh', 'bang tot nghiep', 'hoc bong', 'nha giao', 'mam non', 'pho thong', 'dai hoc'] },
  { code: 'G18', name: 'Bộ Y tế', hints: ['y te', 'kham benh', 'chua benh', 'duoc pham', 'my pham', 'thuc pham', 'trang thiet bi y te', 'y duoc'] },
  { code: 'G16', name: 'Bộ Văn hóa, Thể thao và Du lịch', hints: ['van hoa', 'the thao', 'du lich', 'bao chi', 'xuat ban', 'phat thanh', 'truyen hinh', 'di san', 'nghe thuat', 'karaoke', 'lu hanh'] },
  { code: 'G17', name: 'Bộ Xây dựng', hints: ['xay dung', 'nha o', 'bat dong san', 'quy hoach', 'do thi', 'duong bo', 'hang hai', 'hang khong', 'duong sat', 'dang kiem', 'sat hach'] },
  { code: 'G04', name: 'Bộ xây dựng (Giao thông vận tải cũ)', hints: ['giao thong van tai', 'duong bo', 'hang hai', 'hang khong', 'duong sat', 'van tai'] },
  { code: 'G02', name: 'Bộ Công thương', hints: ['cong thuong', 'xuat nhap khau', 'xuc tien thuong mai', 'dien luc', 'nang luong', 'hoa chat', 'an toan thuc pham', 'thuong mai dien tu', 'ban hang da cap', 'c/o'] },
  { code: 'G08', name: 'Bộ Ngoại giao', hints: ['ngoai giao', 'lanh su', 'hop phap hoa', 'thi thuc', 'phien dich', 'kieu bao'] },
  { code: 'G11', name: 'Bộ Quốc phòng', hints: ['quoc phong', 'nghia vu quan su', 'dan quan', 'bien phong', 'mat ma'] },
  { code: 'G19', name: 'Ngân hàng Nhà nước Việt Nam', hints: ['ngan hang', 'ngoai hoi', 'tin dung', 'thanh toan khong dung tien mat'] },
  { code: 'G20', name: 'Thanh tra Chính phủ', hints: ['thanh tra', 'khieu nai', 'to cao', 'tiep cong dan', 'phong chong tham nhung'] },
  { code: 'G21', name: 'Bộ Dân tộc và Tôn giáo', hints: ['dan toc', 'ton giao', 'tin nguong'] },
  { code: 'G22', name: 'Văn phòng Chính phủ', hints: ['van phong chinh phu', 'thu tuc hanh chinh', 'cong dich vu cong'] },
  { code: 'D01', name: 'Tòa án nhân dân', hints: ['toa an'] },
  { code: 'G66', name: 'Ngân hàng Chính sách xã hội', hints: ['chinh sach xa hoi', 'nhcsxh'] }
];

const MINISTRY_PREFIX_CODES = new Map([
  ['G12', 'G12'],
  ['G01', 'G01'],
  ['G15', 'G15'],
  ['G10', 'G10'],
  ['G09', 'G09'],
  ['G06', 'G06'],
  ['G03', 'G03'],
  ['G18', 'G18'],
  ['G16', 'G16'],
  ['G17', 'G17'],
  ['G04', 'G04'],
  ['G02', 'G02'],
  ['G08', 'G08'],
  ['G11', 'G11'],
  ['G19', 'G19'],
  ['G20', 'G20'],
  ['G21', 'G21'],
  ['G22', 'G22'],
  ['D01', 'D01'],
  ['G66', 'G66']
]);

function deriveLevels(item) {
  const levels = new Set();
  const hay = normalizeVi([
    item.departmentPromulgate,
    ...(item.departments || []),
    item.handleDepartmentName,
    item.name
  ].join(' '));

  if (/\b(cap xa|ubnd xa|ubnd phuong|uy ban nhan dan cap xa|uy ban nhan dan xa|cong an cap xa|cong an xa|chu tich ubnd cap xa)\b/.test(hay)) {
    levels.add('COMMUNE');
    levels.add('WARD');
  }
  if (/\b(so |ubnd tinh|ubnd cap tinh|uy ban nhan dan cap tinh|uy ban nhan dan tinh|uy ban nhan dan thanh pho|chi cuc|van phong dang ky dat dai)\b/.test(hay)) {
    levels.add('PROVINCE');
  }
  if (/\b(bo |bo tai chinh|bo cong an|bo tu phap|bo y te|bo giao duc|bo nong nghiep|bo noi vu|bo khoa hoc|bo xay dung|bo van hoa|bo ngoai giao|bo quoc phong|cuc |ngan hang nha nuoc|thanh tra chinh phu|toa an nhan dan|van phong chinh phu|tong cuc)\b/.test(hay)) {
    levels.add('MINISTRY');
  }
  if (levels.size === 0) {
    levels.add('PROVINCE');
    levels.add('COMMUNE');
  }
  return levels;
}

function deriveTargetBuckets(formalityTargetTypeList, nameText, fallbackTarget = 'VIETNAMESE_CITIZEN') {
  const buckets = new Set();
  const normList = (formalityTargetTypeList || []).map(normalizeVi);
  const nameNorm = normalizeVi(nameText);

  for (const t of normList) {
    if (t.includes('cong dan') || t.includes('can bo') || t.includes('dang vien') || t.includes('nguoi nuoc ngoai')) {
      buckets.add('VIETNAMESE_CITIZEN');
      buckets.add('CITIZEN');
    }
    if (t.includes('doanh nghiep') || t.includes('hop tac xa') || t.includes('to chuc')) {
      buckets.add('ENTERPRISE');
      buckets.add('ORGANIZATION');
    }
  }

  if (buckets.size === 0) {
    if (fallbackTarget === 'ENTERPRISE' || fallbackTarget === 'ORGANIZATION') {
      buckets.add('ENTERPRISE');
      buckets.add('ORGANIZATION');
    } else {
      buckets.add('VIETNAMESE_CITIZEN');
      buckets.add('CITIZEN');
    }
    if (/\b(doanh nghiep|to chuc kinh te|hop tac xa|ho kinh doanh|nha dau tu|chu dau tu|to chuc)\b/.test(nameNorm)) {
      buckets.add('ENTERPRISE');
      buckets.add('ORGANIZATION');
    }
  }

  return buckets;
}

function buildSearchState() {
  const mocksPath = path.resolve('public/api-mocks.json');
  const mocks = JSON.parse(fs.readFileSync(mocksPath, 'utf8'));
  const bundledDetails = loadBundledDossierDetails();

  // Store exact captured detail responses for get-formality-by-citizen
  const exactDetailsById = new Map();
  for (const m of mocks) {
    if (m.path === '/api/v1/configuring/formality/get-formality-by-citizen') {
      const body = parseJsonSafe(m.bodyText, {});
      const resp = parseJsonSafe(m.text, null);
      if (resp && resp.data && (body.id || resp.data.id)) {
        exactDetailsById.set(String(resp.data.id || body.id), resp.data);
      }
    }
  }

  // 1. Provinces (34)
  const provincesMap = new Map();
  for (const m of mocks) {
    if (m.path === '/api/v1/configuring/province-vn/list-by-citizen') {
      const rows = parseJsonSafe(m.text, {})?.data?.rows || [];
      for (const r of rows) {
        if (!provincesMap.has(r.code)) {
          provincesMap.set(r.code, r);
        }
      }
    }
  }
  const provincesList = [...provincesMap.values()];

  // 2. Wards (126 for province 01)
  const wardsById = new Map();
  for (const m of mocks) {
    if (m.path === '/api/v1/configuring/ward/list-by-citizen') {
      const body = parseJsonSafe(m.bodyText, {});
      const rows = parseJsonSafe(m.text, {})?.data?.rows || [];
      for (const r of rows) {
        if (!wardsById.has(r.id)) {
          wardsById.set(r.id, { ...r, provinceCode: body.provinceCode || r.provinceCode || '01' });
        }
      }
    }
  }
  const wardsList = [...wardsById.values()];

  // 3. Departments (MINISTRY, PROVINCIAL_DEPARTMENT + synthesized PROVINCE & COMMUNE entries from captured provinces/wards)
  const deptById = new Map();
  const deptByCode = new Map();
  const addDept = (d) => {
    if (!d || !d.id) return;
    if (!deptById.has(d.id)) {
      deptById.set(d.id, d);
    }
    if (d.code && !deptByCode.has(d.code)) {
      deptByCode.set(d.code, d);
    }
  };
  for (const m of mocks) {
    if (m.path === '/api/v1/configuring/citizen/department/list-with-location') {
      const rows = parseJsonSafe(m.text, {})?.data?.rows || [];
      for (const r of rows) {
        addDept(r);
      }
    }
  }
  // Ensure provinces can also be queried in department/list-with-location (levels: ["PROVINCE"], agencyTypes: ["UBND_TINH"])
  for (const p of provincesList) {
    if (!deptByCode.has(p.code)) {
      addDept({
        id: p.id,
        name: p.name,
        parentId: null,
        type: 'PROVINCE',
        parentCode: '',
        code: p.code,
        state: p.state || 'ACTIVE',
        level: 'PROVINCE',
        agencyLevel: 'level_1',
        agencyTypes: ['UBND_TINH'],
        hasChild: true
      });
    }
  }
  // Ensure wards (communes) can be queried when parentCode matches provinceCode
  for (const w of wardsList) {
    if (!deptById.has(w.id)) {
      addDept({
        id: w.id,
        name: w.name,
        parentId: provincesMap.get(w.provinceCode)?.id || null,
        type: 'COMMUNE',
        parentCode: w.provinceCode || '01',
        code: w.code,
        state: w.state || 'ACTIVE',
        level: 'COMMUNE',
        agencyLevel: 'level_2',
        hasChild: false
      });
    }
  }
  const departmentsList = [...deptById.values()];

  // 4. Subject Types (17)
  const subjectTypesList = [];
  const subjectTypeById = new Map();
  for (const m of mocks) {
    if (m.path === '/api/v1/configuring/subject-type/get-list-by-citizen') {
      const rows = parseJsonSafe(m.text, {})?.data?.rows || [];
      for (const r of rows) {
        if (!subjectTypeById.has(r.id)) {
          subjectTypeById.set(r.id, r);
          subjectTypesList.push(r);
        }
      }
    }
  }

  // 5. Categories (merged from list-category-by-citizen, list-all-public-formality, and 2,600 formality cases)
  const categoryById = new Map();
  const categoryByNormName = new Map();
  const registerCategory = (cat) => {
    if (!cat || !cat.name) return null;
    const normName = normalizeVi(cat.name);
    if (categoryByNormName.has(normName)) {
      const existing = categoryByNormName.get(normName);
      if (cat.id && !categoryById.has(cat.id)) {
        categoryById.set(cat.id, existing);
      }
      return existing;
    }
    const id = cat.id || stableId('cat', normName);
    const entry = {
      id,
      name: cat.name,
      code: cat.code || '',
      parentId: cat.parentId || '',
      note: cat.note || '',
      state: cat.state || 'ACTIVE',
      order: cat.order ?? 0,
      createdAt: cat.createdAt || 1794387831821,
      updatedAt: cat.updatedAt || 1794387831821
    };
    categoryById.set(id, entry);
    categoryByNormName.set(normName, entry);
    return entry;
  };
  for (const m of mocks) {
    if (m.path === '/api/v1/configuring/category/list-category-by-citizen') {
      const rows = parseJsonSafe(m.text, {})?.data?.rows || [];
      rows.forEach(registerCategory);
    }
  }

  // 6. Service group -> formality links & parent tree
  const sgParentMap = new Map();
  for (const m of mocks) {
    if (m.path === '/api/v1/configuring/service-group/list-by-citizen-with-parent') {
      const rows = parseJsonSafe(m.text, {})?.data || [];
      for (const r of rows) {
        if (r.parentId) {
          if (!sgParentMap.has(r.parentId)) sgParentMap.set(r.parentId, new Set());
          sgParentMap.get(r.parentId).add(r.id);
        }
      }
    }
  }

  const sgItems = [];
  const formalityServiceGroups = new Map();
  for (const m of mocks) {
    if (m.path === '/api/v1/configuring/service-group/list-formality-by-service-group-id') {
      const body = parseJsonSafe(m.bodyText, {});
      const rows = parseJsonSafe(m.text, {})?.data || [];
      for (const r of rows) {
        sgItems.push({ ...r, _sgId: r.serviceGroupId || body.serviceGroupId || '' });
        const fid = String(r.formalityId || r.cache?.id || '');
        if (fid) {
          if (!formalityServiceGroups.has(fid)) formalityServiceGroups.set(fid, new Set());
          const sgId = r.serviceGroupId || body.serviceGroupId;
          if (sgId) formalityServiceGroups.get(fid).add(sgId);
        }
      }
    }
  }

  // 7. FAQs (7) & Outstanding (23) & Top Search (10)
  const faqMap = new Map();
  for (const m of mocks) {
    if (m.path === '/api/v1/responding/faq/list-by-citizen') {
      const rows = parseJsonSafe(m.text, {})?.data?.rows || [];
      for (const r of rows) {
        if (r.id && !faqMap.has(r.id)) {
          faqMap.set(r.id, r);
        }
      }
    }
  }
  const faqsList = [...faqMap.values()];

  const outstandingMap = new Map();
  for (const m of mocks) {
    if (m.path === '/api/v1/submitting/public/formality-case-outstanding/list') {
      const rows = parseJsonSafe(m.text, {})?.data?.rows || [];
      for (const r of rows) {
        if (r.id && !outstandingMap.has(r.id)) {
          outstandingMap.set(r.id, r);
        }
      }
    }
  }
  const outstandingList = [...outstandingMap.values()];

  const topSearchMap = new Map();
  for (const m of mocks) {
    if (m.path === '/api/v1/submitting/formality-top-search/list-by-citizen') {
      const rows = parseJsonSafe(m.text, {})?.data?.rows || [];
      for (const r of rows) {
        if (r.id && !topSearchMap.has(r.id)) {
          topSearchMap.set(r.id, r);
        }
      }
    }
  }

  // 8. Build Unified Formality Catalog & Cases Index
  const formalitiesMap = new Map();
  const formalityByCode = new Map();
  const casesMap = new Map();

  // 8a. First ingest captured list-all-public-formality-by-citizen items (preserving order & full fields)
  for (const m of mocks) {
    if (m.path === '/api/v1/submitting/formality/list-all-public-formality-by-citizen') {
      const items = parseJsonSafe(m.text, {})?.data?.items || [];
      for (const it of items) {
        if (!it || !it.id) continue;
        for (let i = 0; i < (it.categories || []).length; i++) {
          registerCategory({ id: it.categoryIds?.[i], name: it.categories[i] });
        }
        if (!formalitiesMap.has(it.id)) {
          const rec = {
            ...it,
            _priority: 2,
            _serviceGroupIds: new Set(formalityServiceGroups.get(it.id) || [])
          };
          formalitiesMap.set(it.id, rec);
          if (it.code) formalityByCode.set(String(it.code), rec);
        }
      }
    }
  }

  // 8b. Ingest 2,600 unique citizen formality cases from list-formality-case-by-citizen
  for (const m of mocks) {
    if (m.path === '/api/v1/configuring/formality/list-formality-case-by-citizen') {
      const body = parseJsonSafe(m.bodyText, {});
      const targetType = body.formalityTargetType || 'VIETNAMESE_CITIZEN';
      const rows = parseJsonSafe(m.text, {})?.data?.rows || [];
      for (const r of rows) {
        if (!r || !r.id) continue;
        const catObj = r.categoryName ? registerCategory({ name: r.categoryName }) : null;
        if (!casesMap.has(r.id)) {
          casesMap.set(r.id, {
            ...r,
            _targetType: targetType,
            _categoryId: catObj?.id || ''
          });
        }
        const fid = String(r.formalityId || r.id);
        const baseCode = toFormalityCode(r.code);
        const existing = formalitiesMap.get(fid);
        if (!existing) {
          const rec = {
            id: fid,
            name: r.name,
            code: baseCode || r.code || '',
            codeNotation: baseCode || r.code || '',
            categories: r.categoryName ? [r.categoryName] : [],
            categoryIds: catObj ? [catObj.id] : [],
            departments: r.handleDepartmentName ? [r.handleDepartmentName] : [],
            departmentPromulgate: inferPromulgateAgency(r.name, r.categoryName, r.handleDepartmentName),
            departmentPromulgateId: '',
            formalityTargetType: ['Công dân Việt Nam'],
            state: r.state || 'ACTIVE',
            type: baseCode.startsWith('3.') ? 'INTERCONNECTED' : 'STANDARD',
            _priority: 1,
            _serviceGroupIds: new Set(formalityServiceGroups.get(fid) || [])
          };
          formalitiesMap.set(fid, rec);
          if (rec.code && !formalityByCode.has(rec.code)) {
            formalityByCode.set(rec.code, rec);
          }
        } else {
          if (r.categoryName && !(existing.categories || []).includes(r.categoryName)) {
            existing.categories = [...(existing.categories || []), r.categoryName];
          }
          if (catObj && !(existing.categoryIds || []).includes(catObj.id)) {
            existing.categoryIds = [...(existing.categoryIds || []), catObj.id];
          }
          if (r.handleDepartmentName && !(existing.departments || []).includes(r.handleDepartmentName)) {
            existing.departments = [...(existing.departments || []), r.handleDepartmentName];
          }
        }
      }
    }
  }

  // 8c. Enrich & add from service-group formality items (63)
  for (const r of sgItems) {
    const fid = String(r.formalityId || r.cache?.id || '');
    if (!fid) continue;
    const baseCode = toFormalityCode(r.code || r.cache?.code);
    const existing = formalitiesMap.get(fid) || (baseCode && formalityByCode.get(baseCode));
    if (!existing) {
      const rec = {
        id: fid,
        name: r.name || r.cache?.name || '',
        code: baseCode,
        codeNotation: r.codeNotation || baseCode,
        categories: [],
        categoryIds: [],
        departments: [],
        departmentPromulgate: inferPromulgateAgency(r.name, '', ''),
        departmentPromulgateId: '',
        formalityTargetType: r.serviceGroupType === 'BUSINESS' ? ['Doanh nghiệp'] : ['Công dân Việt Nam'],
        state: 'ACTIVE',
        type: baseCode.startsWith('3.') ? 'INTERCONNECTED' : 'STANDARD',
        _priority: 1,
        _serviceGroupIds: new Set(formalityServiceGroups.get(fid) || [])
      };
      formalitiesMap.set(fid, rec);
      if (rec.code && !formalityByCode.has(rec.code)) {
        formalityByCode.set(rec.code, rec);
      }
    } else if (r._sgId) {
      existing._serviceGroupIds.add(r._sgId);
    }
  }

  // 8d. Enrich & add from outstanding (23) & topSearch (10) & exactDetailsById & bundledDetails
  for (const o of outstandingList) {
    const fid = String(o.formalityId || o.id);
    const baseCode = toFormalityCode(o.code);
    if (fid && !formalitiesMap.has(fid)) {
      const rec = {
        id: fid,
        name: o.name,
        code: baseCode,
        codeNotation: baseCode,
        categories: [],
        categoryIds: [],
        departments: [],
        departmentPromulgate: inferPromulgateAgency(o.name, '', ''),
        departmentPromulgateId: '',
        formalityTargetType: (o.subjectType || []).includes('ORGANIZATION')
          ? ['Công dân Việt Nam', 'Doanh nghiệp']
          : ['Công dân Việt Nam'],
        state: o.state || 'ACTIVE',
        type: baseCode.startsWith('3.') ? 'INTERCONNECTED' : 'STANDARD',
        _priority: 1,
        _serviceGroupIds: new Set(formalityServiceGroups.get(fid) || [])
      };
      formalitiesMap.set(fid, rec);
      if (baseCode && !formalityByCode.has(baseCode)) formalityByCode.set(baseCode, rec);
    }
    if (o.formalityCaseId && !casesMap.has(o.formalityCaseId)) {
      casesMap.set(o.formalityCaseId, {
        id: o.formalityCaseId,
        name: o.name,
        code: o.code,
        state: o.state || 'ACTIVE',
        formalityId: o.formalityId || o.id,
        level: 'ALL',
        handleDepartmentName: inferPromulgateAgency(o.name, '', ''),
        categoryName: '',
        _targetType: 'VIETNAMESE_CITIZEN',
        _categoryId: ''
      });
    }
  }

  for (const ts of topSearchMap.values()) {
    if (ts.id && !formalitiesMap.has(ts.id)) {
      const rec = {
        id: ts.id,
        name: ts.name,
        code: '',
        codeNotation: '',
        categories: [],
        categoryIds: [],
        departments: [],
        departmentPromulgate: ts.departmentPromulgate || '',
        departmentPromulgateId: '',
        formalityTargetType: ['Công dân Việt Nam'],
        state: 'ACTIVE',
        type: 'STANDARD',
        _priority: 1,
        _serviceGroupIds: new Set()
      };
      formalitiesMap.set(ts.id, rec);
    }
  }

  for (const detail of exactDetailsById.values()) {
    if (detail.id && !formalitiesMap.has(detail.id)) {
      const rec = {
        id: detail.id,
        name: detail.name,
        code: detail.code || '',
        codeNotation: detail.codeNotation || detail.code || '',
        categories: (detail.categoriesDetails || []).map((c) => c.name).filter(Boolean),
        categoryIds: (detail.categoriesDetails || []).map((c) => c.id).filter(Boolean),
        departments: (detail.departmentDetails || []).map((d) => d.name).filter(Boolean),
        departmentPromulgate: detail.departmentPromulgateName || '',
        departmentPromulgateId: detail.departmentPromulgateId || '',
        formalityTargetType: ['Công dân Việt Nam'],
        state: detail.state || 'ACTIVE',
        type: detail.type || 'STANDARD',
        _priority: 2,
        _serviceGroupIds: new Set(detail.serviceGroupIds || [])
      };
      formalitiesMap.set(detail.id, rec);
      if (rec.code && !formalityByCode.has(rec.code)) formalityByCode.set(rec.code, rec);
    }
  }

  for (const [k, b] of bundledDetails.entries()) {
    if (!/^\d+\.\d+$/.test(k)) continue;
    const code = b.code || k;
    if (!formalityByCode.has(code) && !formalitiesMap.has(b.id)) {
      const cats = (b.categoriesDetails || []).map((c) => c.name).filter(Boolean);
      const catObjs = cats.map((cname) => registerCategory({ name: cname })).filter(Boolean);
      const rec = {
        id: b.id,
        name: b.name,
        code,
        codeNotation: b.codeNotation || code,
        categories: cats,
        categoryIds: catObjs.map((c) => c.id),
        departments: (b.departmentDetails || []).map((d) => d.name).filter(Boolean),
        departmentPromulgate: b.departmentPromulgateName || inferPromulgateAgency(b.name, cats[0], ''),
        departmentPromulgateId: '',
        formalityTargetType: ['Công dân Việt Nam'],
        state: 'ACTIVE',
        type: b.formalityType === 'INTERLINKED' ? 'INTERCONNECTED' : 'STANDARD',
        _priority: 2,
        _serviceGroupIds: new Set()
      };
      formalitiesMap.set(rec.id, rec);
      formalityByCode.set(code, rec);
    }
  }

  // Finalize searchable tokens on formalities & cases
  const formalitiesList = [...formalitiesMap.values()].map((f) => {
    const clean = {
      id: f.id,
      name: f.name,
      code: f.code || '',
      codeNotation: f.codeNotation || f.code || '',
      categories: f.categories || [],
      categoryIds: f.categoryIds || [],
      departments: f.departments || [],
      departmentPromulgate: f.departmentPromulgate || '',
      departmentPromulgateId: f.departmentPromulgateId || '',
      formalityTargetType: f.formalityTargetType || ['Công dân Việt Nam'],
      state: f.state || 'ACTIVE',
      type: f.type || 'STANDARD'
    };
    const metaText = [
      ...clean.categories,
      ...clean.departments,
      clean.departmentPromulgate
    ].join(' ');
    const agencyCodes = deriveAgencyCodes(clean, categoryById);
    return {
      item: clean,
      priority: f._priority || 1,
      serviceGroupIds: f._serviceGroupIds || new Set(),
      levels: deriveLevels(clean),
      targetBuckets: deriveTargetBuckets(clean.formalityTargetType, clean.name),
      agencyCodes,
      nameLower: stripDiacriticsOnlyLower(clean.name),
      nameNorm: normalizeVi(clean.name),
      nameWords: splitWordTokens(clean.name),
      metaWords: splitWordTokens(metaText),
      codeLower: (clean.code || '').toLowerCase(),
      notationLower: (clean.codeNotation || '').toLowerCase()
    };
  });

  const casesByFormalityId = new Map();
  const casesList = [...casesMap.values()].map((c) => {
    if (c.formalityId) {
      if (!casesByFormalityId.has(c.formalityId)) casesByFormalityId.set(c.formalityId, []);
      casesByFormalityId.get(c.formalityId).push(c);
    }
    const clean = {
      id: c.id,
      name: c.name,
      code: c.code || '',
      state: c.state || 'ACTIVE',
      formalityId: c.formalityId || '',
      level: c.level || 'ALL',
      handleDepartmentName: c.handleDepartmentName || '',
      categoryName: c.categoryName || ''
    };
    const parentFormality = formalitiesMap.get(clean.formalityId);
    const metaText = [
      clean.categoryName,
      clean.handleDepartmentName,
      parentFormality?.departmentPromulgate || '',
      ...(parentFormality?.departments || [])
    ].join(' ');
    const pseudo = {
      name: clean.name,
      categoryName: clean.categoryName,
      categories: clean.categoryName ? [clean.categoryName] : parentFormality?.categories || [],
      categoryIds: c._categoryId ? [c._categoryId] : parentFormality?.categoryIds || [],
      departments: clean.handleDepartmentName ? [clean.handleDepartmentName] : parentFormality?.departments || [],
      handleDepartmentName: clean.handleDepartmentName,
      departmentPromulgate: parentFormality?.departmentPromulgate || ''
    };
    return {
      item: clean,
      categoryId: c._categoryId || '',
      levels: deriveLevels(pseudo),
      targetBuckets: deriveTargetBuckets(
        parentFormality?.formalityTargetType || ['Công dân Việt Nam'],
        clean.name,
        c._targetType || 'VIETNAMESE_CITIZEN'
      ),
      agencyCodes: deriveAgencyCodes(pseudo, categoryById),
      nameLower: stripDiacriticsOnlyLower(clean.name),
      nameNorm: normalizeVi(clean.name),
      nameWords: splitWordTokens(clean.name),
      metaWords: splitWordTokens(metaText),
      codeLower: (clean.code || '').toLowerCase(),
      notationLower: (clean.code || '').toLowerCase()
    };
  });

  const categoriesList = [...categoryById.values()];
  const uniqueCategoriesList = [...categoryByNormName.values()];

  return {
    mocks,
    bundledDetails,
    exactDetailsById,
    formalitiesMap,
    formalityByCode,
    formalitiesList,
    casesMap,
    casesByFormalityId,
    casesList,
    departmentsList,
    deptById,
    deptByCode,
    categoriesList: uniqueCategoriesList,
    categoryById,
    subjectTypesList,
    subjectTypeById,
    provincesList,
    wardsList,
    faqsList,
    outstandingList,
    sgParentMap
  };
}

function inferPromulgateAgency(name, categoryName, handleDept) {
  const hay = normalizeVi(`${name || ''} ${categoryName || ''} ${handleDept || ''}`);
  for (const entry of KNOWN_AGENCY_KEYWORDS) {
    if (entry.hints.some((h) => hay.includes(h))) {
      return entry.name;
    }
  }
  return '';
}

function deriveAgencyCodes(rec, categoryById) {
  const codes = new Set();
  for (const cid of rec.categoryIds || []) {
    const cat = categoryById.get(cid);
    if (cat?.code) {
      const prefix = cat.code.slice(0, 3).toUpperCase();
      if (MINISTRY_PREFIX_CODES.has(prefix)) codes.add(prefix);
    }
  }
  const hay = normalizeVi([
    rec.departmentPromulgate,
    rec.handleDepartmentName,
    ...(rec.departments || [])
  ].join(' '));
  for (const entry of KNOWN_AGENCY_KEYWORDS) {
    const nameNorm = normalizeVi(entry.name);
    if (hay.includes(nameNorm) || entry.hints.some((h) => hay.includes(h))) {
      codes.add(entry.code);
    }
  }
  return codes;
}

/**
 * Word-boundary-aware Vietnamese query matching + relevance scoring.
 * Prevents false substring matches across word boundaries (e.g. "c[hon nhan]" for "hon nhan").
 */
function scoreMatch(entry, rawQuery) {
  const queryNorm = normalizeVi(rawQuery);
  if (!queryNorm) return 1;

  const queryRawLower = stripDiacriticsOnlyLower(rawQuery);
  const queryTokens = splitQueryTokens(rawQuery);
  if (queryTokens.length === 0) return 1;

  // Code lookup (e.g. "1.001193", "3.000722", "1.001")
  const hasCodeToken = queryTokens.some((t) => /^\d+\.\d*/.test(t));
  if (hasCodeToken) {
    if (entry.codeLower === queryNorm || entry.notationLower === queryNorm) return 5000;
    if (entry.codeLower.startsWith(queryNorm) || entry.notationLower.startsWith(queryNorm)) return 3500;
    if (queryTokens.every((t) => entry.codeLower.includes(t) || entry.notationLower.includes(t))) return 2500;
  }

  const allWords = entry.nameWords;
  const combinedWords = [...allWords, ...entry.metaWords];

  const tokenMatchesWord = (word, tok, isLast) => (isLast ? word.startsWith(tok) : word === tok);

  const matchInName = queryTokens.every((tok, idx) => {
    const isLast = idx === queryTokens.length - 1;
    return allWords.some((w) => tokenMatchesWord(w, tok, isLast));
  });

  if (!matchInName) {
    const matchInMeta = queryTokens.every((tok, idx) => {
      const isLast = idx === queryTokens.length - 1;
      return combinedWords.some((w) => tokenMatchesWord(w, tok, isLast));
    });
    if (!matchInMeta) return 0;
    return 100 + (entry.priority || 0) * 10;
  }

  let score = 500 + (entry.priority || 0) * 25;

  // Whole-word contiguous phrase match in normalized name (e.g. " khai sinh ")
  const escapedPhrase = queryNorm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const phraseRe = new RegExp(`(?:^|[^a-z0-9])${escapedPhrase}(?:$|[^a-z0-9])`);
  if (phraseRe.test(entry.nameNorm)) {
    score += 1200;
    if (entry.nameNorm.startsWith(queryNorm)) score += 300;
  }

  // Exact accented match bonus
  if (queryRawLower && entry.nameLower.includes(queryRawLower)) {
    score += 400;
  }

  // Prefer base/concise procedure names slightly when everything else is equal
  score += Math.max(0, 80 - Math.min(80, Math.floor(entry.item.name.length / 4)));
  return score;
}

function paginateByCursor(items, limit, lastId) {
  const numLimit = Number(limit);
  const pageSize = Number.isFinite(numLimit) && numLimit > 0 ? numLimit : 10;
  let start = 0;
  if (lastId !== undefined && lastId !== null && String(lastId) !== '') {
    const idx = items.findIndex((it) => String(it.id) === String(lastId));
    if (idx !== -1) start = idx + 1;
  }
  const sliced = items.slice(start, start + pageSize);
  const hasMore = start + pageSize < items.length;
  const nextLastId = hasMore && sliced.length > 0 ? String(sliced[sliced.length - 1].id) : '';
  return {
    slice: sliced,
    total: items.length,
    lastId: nextLastId
  };
}

function matchesDepartmentFilter(entry, deptCode, deptByCode, provincesList) {
  if (!deptCode) return true;
  const code = String(deptCode).trim();
  if (!code) return true;

  if (entry.agencyCodes?.has(code.toUpperCase())) return true;

  const dept = deptByCode.get(code) || provincesList.find((p) => String(p.code) === code);
  const hay = normalizeVi([
    entry.item.departmentPromulgate,
    entry.item.handleDepartmentName,
    ...(entry.item.departments || []),
    entry.item.name
  ].join(' '));

  if (dept?.name) {
    const deptNorm = normalizeVi(dept.name);
    if (hay.includes(deptNorm)) return true;
    const stripped = deptNorm.replace(/^(tinh|thanh pho|tp\.?)\s+/, '');
    if (stripped.length >= 3 && hay.includes(stripped)) return true;
  }

  // Provincial procedures apply nationwide unless explicitly scoped to a different province
  if (dept?.level === 'PROVINCE' || /^\d{2}$/.test(code) || code.startsWith('H26')) {
    const selectedProvinceCode = code.startsWith('H26') ? '01' : code;
    const otherProvinceMentioned = provincesList.some((p) => {
      if (String(p.code) === selectedProvinceCode) return false;
      const shortNorm = normalizeVi(p.name).replace(/^(tinh|thanh pho)\s+/, '');
      return shortNorm.length >= 4 && hay.includes(shortNorm);
    });
    if (!otherProvinceMentioned && (entry.levels?.has('PROVINCE') || entry.levels?.has('COMMUNE'))) {
      return true;
    }
  }
  return false;
}

function matchesSubjectFilter(entry, subjectTypeId, formalityTargetType, subjectTypeById) {
  if (formalityTargetType) {
    const targetNorm = normalizeVi(formalityTargetType);
    const wantsCitizen = targetNorm.includes('citizen') || targetNorm.includes('cong dan');
    const wantsEnterprise = targetNorm.includes('enterprise') || targetNorm.includes('organization') || targetNorm.includes('doanh nghiep');
    if (wantsCitizen && !entry.targetBuckets.has('VIETNAMESE_CITIZEN') && !entry.targetBuckets.has('CITIZEN')) {
      return false;
    }
    if (wantsEnterprise && !entry.targetBuckets.has('ENTERPRISE') && !entry.targetBuckets.has('ORGANIZATION')) {
      return false;
    }
  }

  if (subjectTypeId) {
    const subj = subjectTypeById.get(String(subjectTypeId));
    if (subj) {
      const subjNorm = normalizeVi(subj.name);
      const targets = (entry.item.formalityTargetType || []).map(normalizeVi);
      const isCitizen = subjNorm.includes('cong dan');
      const isEnterprise = subjNorm.includes('doanh nghiep') || subjNorm.includes('hop tac xa') || subjNorm.includes('to chuc');
      if (targets.some((t) => t === subjNorm || t.includes(subjNorm) || subjNorm.includes(t))) {
        return true;
      }
      if (isCitizen && entry.targetBuckets.has('VIETNAMESE_CITIZEN')) return true;
      if (isEnterprise && entry.targetBuckets.has('ENTERPRISE')) return true;
      return false;
    }
  }
  return true;
}

function collectServiceGroupIds(state, rootGroupId) {
  const result = new Set([String(rootGroupId)]);
  const queue = [String(rootGroupId)];
  while (queue.length > 0) {
    const cur = queue.shift();
    const children = state.sgParentMap.get(cur);
    if (!children) continue;
    for (const childId of children) {
      if (!result.has(childId)) {
        result.add(childId);
        queue.push(childId);
      }
    }
  }
  return result;
}

function handleListAllPublicFormalities(state, body) {
  const q = body.q || body.keyword || '';
  const codeFilter = normalizeVi(body.code || '');
  const categoryId = String(body.categoryId || '').trim();
  const departmentCode = String(body.departmentCode || body.provinceCode || '').trim();
  const formalityType = String(body.formalityType || '').trim().toUpperCase();
  const levelFilter = String(body.level || body.implementLevel || '').trim().toUpperCase();
  const formalityTargetType = String(body.formalityTargetType || '').trim();
  const subjectTypeId = String(body.subjectTypeId || '').trim();
  const serviceGroupId = String(body.serviceGroupId || '').trim();

  const targetCat = categoryId ? state.categoryById.get(categoryId) : null;
  const targetCatNorm = targetCat ? normalizeVi(targetCat.name) : normalizeVi(categoryId);
  const sgScope = serviceGroupId ? collectServiceGroupIds(state, serviceGroupId) : null;

  const matched = [];
  for (const entry of state.formalitiesList) {
    const it = entry.item;

    if (formalityType) {
      const itemType = (it.type || 'STANDARD').toUpperCase();
      if (formalityType === 'INTERCONNECTED' && itemType !== 'INTERCONNECTED') continue;
      if (formalityType === 'STANDARD' && itemType === 'INTERCONNECTED') continue;
    }

    if (codeFilter && !entry.codeLower.includes(codeFilter) && !entry.notationLower.includes(codeFilter)) {
      continue;
    }

    if (categoryId) {
      const idMatch = (it.categoryIds || []).includes(categoryId);
      const nameMatch = targetCatNorm && (it.categories || []).some((c) => normalizeVi(c) === targetCatNorm);
      if (!idMatch && !nameMatch) continue;
    }

    if (sgScope) {
      const hasGroup = [...sgScope].some((sg) => entry.serviceGroupIds.has(sg));
      if (!hasGroup) continue;
    }

    if (levelFilter && levelFilter !== 'ALL') {
      const normLvl = levelFilter === 'WARD' ? 'COMMUNE' : levelFilter;
      if (!entry.levels.has(normLvl) && !entry.levels.has(levelFilter)) continue;
    }

    if (!matchesDepartmentFilter(entry, departmentCode, state.deptByCode, state.provincesList)) {
      continue;
    }

    if (!matchesSubjectFilter(entry, subjectTypeId, formalityTargetType, state.subjectTypeById)) {
      continue;
    }

    const score = scoreMatch(entry, q);
    if (score <= 0) continue;

    matched.push({ item: it, score });
  }

  if (normalizeVi(q)) {
    matched.sort((a, b) => b.score - a.score);
  }

  const ordered = matched.map((m) => m.item);
  const page = paginateByCursor(ordered, body.limit ?? 10, body.lastId ?? '');
  return {
    status: 201,
    body: {
      code: 'OK',
      data: {
        items: page.slice,
        total: page.total,
        lastId: page.lastId
      },
      message: 'OK'
    }
  };
}

function handleListFormalityCases(state, body) {
  const search = body.search || body.q || '';
  const formalityTargetType = String(body.formalityTargetType || '').trim();
  const departmentCode = String(body.departmentCode || '').trim();
  const departmentLevel = String(body.departmentLevel || '').trim().toUpperCase();
  const implementLevel = String(body.implementLevel || '').trim().toUpperCase();
  const subjectTypeId = String(body.subjectTypeId || '').trim();

  const matched = [];
  for (const entry of state.casesList) {
    if (departmentLevel) {
      if (departmentLevel === 'MINISTRY' && !entry.levels.has('MINISTRY') && entry.agencyCodes.size === 0) continue;
      if (departmentLevel === 'PROVINCE' && !entry.levels.has('PROVINCE') && !entry.levels.has('COMMUNE')) continue;
    }

    if (implementLevel && implementLevel !== 'ALL') {
      const caseLvl = String(entry.item.level || 'ALL').toUpperCase();
      if (caseLvl !== 'ALL' && caseLvl !== implementLevel) continue;
    }

    if (!matchesDepartmentFilter(entry, departmentCode, state.deptByCode, state.provincesList)) {
      continue;
    }

    if (!matchesSubjectFilter(entry, subjectTypeId, formalityTargetType, state.subjectTypeById)) {
      continue;
    }

    const score = scoreMatch(entry, search);
    if (score <= 0) continue;

    matched.push({ item: entry.item, score });
  }

  if (normalizeVi(search)) {
    matched.sort((a, b) => b.score - a.score);
  }

  const ordered = matched.map((m) => m.item);
  const page = paginateByCursor(ordered, body.limit ?? 20, body.lastId ?? '');
  return {
    status: 201,
    body: {
      code: 'OK',
      data: {
        rows: page.slice,
        total: page.total,
        lastId: page.lastId
      },
      message: 'OK'
    }
  };
}

function handleOutstandingList(state, body) {
  const q = body.q || body.name || '';
  const codeFilter = normalizeVi(body.code || '');
  const typeFilter = String(body.type || '').trim().toUpperCase();
  const targetType = String(body.formalityTargetType || '').trim().toUpperCase();
  const deptFilter = String(body.departmentId || body.departmentParentId || '').trim();

  // Merge outstanding items + fallback across full casesList when advanced search query is used
  const isAdvancedSearch = Boolean(body.q || body.departmentId || body.formalityTargetType || body.implementLevel);
  const sourceRows = isAdvancedSearch
    ? [
        ...state.outstandingList.map((o) => ({
          id: o.id,
          formalityCaseId: o.formalityCaseId || o.id,
          formalityId: o.formalityId,
          order: o.order ?? 0,
          name: o.name,
          code: o.code,
          state: o.state || 'ACTIVE',
          subjectType: o.subjectType || ['CITIZEN']
        })),
        ...state.casesList
          .filter((c) => !state.outstandingList.some((o) => o.formalityCaseId === c.item.id))
          .map((c, i) => ({
            id: c.item.id,
            formalityCaseId: c.item.id,
            formalityId: c.item.formalityId,
            order: state.outstandingList.length + i + 1,
            name: c.item.name,
            code: c.item.code,
            state: c.item.state || 'ACTIVE',
            subjectType: c.targetBuckets.has('ENTERPRISE') ? ['CITIZEN', 'ORGANIZATION'] : ['CITIZEN']
          }))
      ]
    : state.outstandingList;

  const dept = deptFilter ? (state.deptById.get(deptFilter) || state.deptByCode.get(deptFilter)) : null;

  const matched = [];
  for (const r of sourceRows) {
    if (typeFilter && typeFilter !== 'OTHER' && !isAdvancedSearch) {
      const subjects = r.subjectType || ['CITIZEN'];
      if (typeFilter === 'CITIZEN' && !subjects.includes('CITIZEN')) continue;
      if (typeFilter === 'ORGANIZATION' && !subjects.includes('ORGANIZATION')) continue;
    }
    if (targetType) {
      const subjects = r.subjectType || ['CITIZEN'];
      if (targetType === 'VIETNAMESE_CITIZEN' && !subjects.includes('CITIZEN')) continue;
      if (targetType === 'ENTERPRISE' && !subjects.includes('ORGANIZATION')) continue;
    }
    if (codeFilter && !(r.code || '').toLowerCase().includes(codeFilter)) continue;

    if (dept) {
      const cEntry = state.casesMap.get(r.formalityCaseId);
      const pseudo = {
        item: {
          name: r.name,
          handleDepartmentName: cEntry?.handleDepartmentName || '',
          departments: cEntry?.handleDepartmentName ? [cEntry.handleDepartmentName] : [],
          departmentPromulgate: ''
        },
        levels: deriveLevels({ name: r.name, handleDepartmentName: cEntry?.handleDepartmentName || '' }),
        agencyCodes: new Set()
      };
      if (!matchesDepartmentFilter(pseudo, dept.code || dept.id, state.deptByCode, state.provincesList)) continue;
    }

    const score = scoreMatch(
      {
        item: { name: r.name },
        priority: 1,
        nameLower: stripDiacriticsOnlyLower(r.name),
        nameNorm: normalizeVi(r.name),
        nameWords: splitWordTokens(r.name),
        metaWords: [],
        codeLower: (r.code || '').toLowerCase(),
        notationLower: (r.code || '').toLowerCase()
      },
      q
    );
    if (score <= 0) continue;
    matched.push({ item: r, score });
  }

  if (normalizeVi(q)) {
    matched.sort((a, b) => b.score - a.score);
  }

  const ordered = matched.map((m) => m.item);
  const limit = Math.max(1, Number(body.limit) || 50);
  const page = Math.max(1, Number(body.page) || 1);
  const start = (page - 1) * limit;
  const rows = ordered.slice(start, start + limit);
  const totalPages = Math.ceil(ordered.length / limit);
  const lastOrder = rows.length > 0 ? (rows[rows.length - 1].order ?? start + rows.length) : 0;

  return {
    status: 201,
    body: {
      code: 'OK',
      data: {
        count: ordered.length,
        page,
        totalPages,
        lastOrder,
        rows
      },
      message: 'OK'
    }
  };
}

function handleDepartmentListWithLocation(state, body) {
  const levels = Array.isArray(body.levels) ? body.levels.map((l) => String(l).toUpperCase()) : [];
  const typeFilter = String(body.type || '').toUpperCase();
  const provinceCode = String(body.provinceCode || '').trim();
  const parentCode = String(body.parentCode || '').trim();
  const agencyLevel = String(body.agencyLevel || '').trim();
  const agencyTypes = Array.isArray(body.agencyTypes) ? body.agencyTypes : [];
  const nameFilter = String(body.name || '');
  const codeFilter = String(body.code || '').trim().toLowerCase();

  let filtered = state.departmentsList.filter((d) => {
    const dLevel = String(d.level || '').toUpperCase();
    const dType = String(d.type || '').toUpperCase();

    if (levels.length > 0 && !levels.includes(dLevel)) return false;

    if (typeFilter) {
      const compatible =
        dType === typeFilter ||
        (typeFilter === 'PROVINCE' && dLevel === 'PROVINCE') ||
        (typeFilter === 'PROVINCIAL_DEPARTMENT' && dType === 'PROVINCIAL_DEPARTMENT');
      if (!compatible) return false;
    }

    if (agencyTypes.includes('UBND_TINH') && dType !== 'PROVINCE') return false;
    if (agencyTypes.includes('SO_BAN_NGANH') && dType !== 'PROVINCIAL_DEPARTMENT') return false;

    if (agencyLevel && d.agencyLevel && d.agencyLevel !== agencyLevel) {
      // Allow rows without explicit agencyLevel when level matches
      if (d.agencyLevel !== agencyLevel) return false;
    }

    if (provinceCode && d.parentCode && d.parentCode !== provinceCode) return false;
    if (parentCode) {
      if (d.parentCode && d.parentCode !== parentCode) return false;
      if (!d.parentCode && dLevel !== 'MINISTRY' && dType !== 'PROVINCIAL_DEPARTMENT') return false;
    }

    if (codeFilter && String(d.code || '').toLowerCase() !== codeFilter) return false;
    return true;
  });

  if (normalizeVi(nameFilter)) {
    filtered = filtered
      .map((d) => ({
        item: d,
        score: scoreMatch(
          {
            item: d,
            priority: 1,
            nameLower: stripDiacriticsOnlyLower(d.name),
            nameNorm: normalizeVi(d.name),
            nameWords: splitWordTokens(d.name),
            metaWords: [],
            codeLower: String(d.code || '').toLowerCase(),
            notationLower: String(d.code || '').toLowerCase()
          },
          nameFilter
        )
      }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((x) => x.item);
  }

  const page = paginateByCursor(filtered, body.limit ?? 10, body.lastId ?? '');
  return {
    status: 201,
    body: {
      code: 'OK',
      data: {
        rows: page.slice,
        total: page.total,
        lastId: page.lastId
      },
      message: 'OK'
    }
  };
}

function handleCategoryList(state, body) {
  const codeFilter = normalizeVi(body.code || '');
  const nameFilter = String(body.name || '');
  const deptCode = normalizeVi(body.departmentCode || '');

  let filtered = state.categoriesList.filter((c) => {
    if (codeFilter && !normalizeVi(c.code).includes(codeFilter)) return false;
    if (deptCode && c.code && !normalizeVi(c.code).startsWith(deptCode)) return false;
    return true;
  });

  if (normalizeVi(nameFilter)) {
    filtered = filtered
      .map((c) => ({
        item: c,
        score: scoreMatch(
          {
            item: c,
            priority: 1,
            nameLower: stripDiacriticsOnlyLower(c.name),
            nameNorm: normalizeVi(c.name),
            nameWords: splitWordTokens(c.name),
            metaWords: [],
            codeLower: String(c.code || '').toLowerCase(),
            notationLower: String(c.code || '').toLowerCase()
          },
          nameFilter
        )
      }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((x) => x.item);
  }

  const page = paginateByCursor(filtered, body.limit ?? 20, body.lastId ?? '');
  return {
    status: 201,
    body: {
      code: 'OK',
      data: {
        lastId: page.lastId,
        count: page.total,
        rows: page.slice
      },
      message: 'OK'
    }
  };
}

function handleSubjectTypeList(state, body) {
  const codeFilter = normalizeVi(body.code || '');
  const nameFilter = normalizeVi(body.name || body.q || '');

  const filtered = state.subjectTypesList.filter((s) => {
    if (codeFilter && !normalizeVi(s.code).includes(codeFilter)) return false;
    if (nameFilter && !normalizeVi(s.name).includes(nameFilter)) return false;
    return true;
  });

  const page = paginateByCursor(filtered, body.limit ?? 20, body.lastId ?? '');
  return {
    status: 201,
    body: {
      code: 'OK',
      data: {
        count: page.total,
        lastId: page.lastId,
        rows: page.slice
      },
      message: 'OK'
    }
  };
}

function handleProvinceList(state, body) {
  const searchTerm = String(body.searchTerm || body.name || body.q || '');
  let filtered = state.provincesList;
  if (normalizeVi(searchTerm)) {
    const qNorm = normalizeVi(searchTerm);
    filtered = filtered.filter(
      (p) => normalizeVi(p.name).includes(qNorm) || String(p.code || '').toLowerCase().includes(qNorm)
    );
  }
  const page = paginateByCursor(filtered, body.limit ?? 100, body.lastId ?? '');
  return {
    status: 201,
    body: {
      code: 'OK',
      data: {
        rows: page.slice,
        total: page.total,
        lastId: page.lastId
      },
      message: 'OK'
    }
  };
}

function handleWardList(state, body) {
  const searchTerm = String(body.searchTerm || body.name || body.q || '');
  const provinceCode = String(body.provinceCode || '').trim();
  let filtered = state.wardsList.filter((w) => !provinceCode || w.provinceCode === provinceCode);
  if (normalizeVi(searchTerm)) {
    const qNorm = normalizeVi(searchTerm);
    filtered = filtered.filter(
      (w) => normalizeVi(w.name).includes(qNorm) || String(w.code || '').toLowerCase().includes(qNorm)
    );
  }
  const page = paginateByCursor(filtered, body.limit ?? 200, body.lastId ?? '');
  return {
    status: 201,
    body: {
      code: 'OK',
      data: {
        rows: page.slice,
        total: page.total,
        lastId: page.lastId
      },
      message: 'OK'
    }
  };
}

function handleFaqList(state, body) {
  const question = String(body.question || body.q || '');
  const serviceGroupId = String(body.serviceGroupId || '').trim();
  const typeFilter = body.type && body.type !== 'ALL' ? String(body.type).toUpperCase() : '';

  const filtered = state.faqsList.filter((faq) => {
    if (serviceGroupId) {
      const sgList = faq.serviceGroupIds || [];
      if (!sgList.includes(serviceGroupId)) return false;
    }
    if (typeFilter && String(faq.type || '').toUpperCase() !== typeFilter) return false;
    if (normalizeVi(question)) {
      const qNorm = normalizeVi(question);
      if (!normalizeVi(faq.question).includes(qNorm) && !normalizeVi(faq.answer).includes(qNorm)) {
        return false;
      }
    }
    return true;
  });

  const page = paginateByCursor(filtered, body.limit ?? 10, body.lastId ?? '');
  return {
    status: 201,
    body: {
      code: 'OK',
      data: {
        total: page.total,
        lastId: page.lastId,
        rows: page.slice
      },
      message: 'OK'
    }
  };
}

function handleFaqGet(state, body) {
  const id = String(body.id || '');
  const found = state.faqsList.find((f) => String(f.id) === id);
  if (!found) return null;
  return {
    status: 201,
    body: {
      code: 'OK',
      data: found,
      message: 'OK'
    }
  };
}

function handleGetFormalityDetail(state, body) {
  const id = String(body.id || '').trim();
  if (!id) return null;

  // 1. Exact captured detail response from api-mocks.json
  if (state.exactDetailsById.has(id)) {
    return { status: 201, body: { code: 'OK', data: state.exactDetailsById.get(id), message: 'OK' } };
  }

  // 2. Bundled rich detail from dossier-CPVyX_AJ.js by id or by procedure code
  const indexed = state.formalitiesMap.get(id) || state.formalityByCode.get(id);
  const bundled = state.bundledDetails.get(id) || (indexed?.code ? state.bundledDetails.get(indexed.code) : null);
  if (bundled) {
    return {
      status: 201,
      body: {
        code: 'OK',
        data: {
          ...bundled,
          id: indexed?.id || bundled.id || id
        },
        message: 'OK'
      }
    };
  }

  // 3. Synthesize structured formality detail from indexed catalog / case record
  const caseFallback = !indexed ? state.casesMap.get(id) : null;
  const src = indexed || (caseFallback ? state.formalitiesMap.get(caseFallback.formalityId) : null) || caseFallback;
  if (!src) return null;

  const baseCode = toFormalityCode(src.code);
  const linkedCases = state.casesByFormalityId.get(src.id) || [];
  const depts = src.departments?.length
    ? src.departments
    : src.handleDepartmentName
      ? [src.handleDepartmentName]
      : ['Ủy ban nhân dân cấp có thẩm quyền'];
  const cats = src.categories?.length
    ? src.categories
    : src.categoryName
      ? [src.categoryName]
      : [];
  const levels = deriveLevels(src);
  const promName = src.departmentPromulgate || inferPromulgateAgency(src.name, cats[0], depts[0]) || depts[0];

  const synthesized = {
    id: src.id || id,
    code: baseCode || src.code || '',
    codeNotation: src.codeNotation || baseCode || src.code || '',
    name: src.name,
    description: 'Thủ tục hành chính thuộc danh mục Cổng Dịch vụ công Quốc gia (dữ liệu tra cứu ngoại tuyến).',
    decisionNo: '',
    formalityTargetType: src.formalityTargetType || ['Công dân Việt Nam'],
    formalityType: src.type === 'INTERCONNECTED' ? 'INTERLINKED' : 'STANDARD',
    type: src.type || 'STANDARD',
    state: src.state || 'ACTIVE',
    isWard: levels.has('COMMUNE') || levels.has('WARD'),
    isProvince: levels.has('PROVINCE'),
    isMinistry: levels.has('MINISTRY'),
    isOtherAgency: false,
    isUndetermined: false,
    isVertical: false,
    isFullProcess: true,
    isSharedService: true,
    isOfflineOnly: false,
    isNonTerritorial: false,
    note: '',
    keywords: src.name,
    executionSteps: [
      {
        name: 'Bước 1',
        description: `Cá nhân/tổ chức chuẩn bị đầy đủ hồ sơ theo quy định đối với "${src.name}" và nộp trực tuyến trên Cổng Dịch vụ công Quốc gia hoặc trực tiếp tại Bộ phận Một cửa / Trung tâm Phục vụ hành chính công (${depts.join('; ')}).`
      },
      {
        name: 'Bước 2',
        description: `Cơ quan có thẩm quyền (${depts.join('; ')}) tiếp nhận, kiểm tra tính hợp lệ và giải quyết hồ sơ theo quy trình.`
      },
      {
        name: 'Bước 3',
        description: 'Trả kết quả giải quyết thủ tục hành chính bản điện tử hoặc bản giấy cho người nộp hồ sơ.'
      }
    ],
    executionMethods: [
      {
        submissionMethod: 'ONLINE',
        processingTime: null,
        processingTimeUnit: 'WORKING_DAY',
        fees: [],
        description: 'Nộp hồ sơ trực tuyến qua Cổng Dịch vụ công Quốc gia / Hệ thống thông tin giải quyết TTHC.'
      },
      {
        submissionMethod: 'DIRECT',
        processingTime: null,
        processingTimeUnit: 'WORKING_DAY',
        fees: [],
        description: `Nộp trực tiếp tại ${depts.join('; ')}.`
      }
    ],
    executionCases: [],
    profileComponents: [
      {
        id: '1',
        name: 'Tờ khai / văn bản đề nghị và giấy tờ tùy thân, tài liệu chứng minh theo quy định chuyên ngành của thủ tục.',
        code: '',
        originalQty: 1,
        copyQty: 0,
        required: true,
        profileComponentId: '1',
        attachments: []
      }
    ],
    legalBasisesDetails: [],
    resultsDetails: [{ id: '1', name: `Kết quả giải quyết ${src.name}`, code: '' }],
    subjectTypesDetails: (src.formalityTargetType || ['Công dân Việt Nam']).map((t, idx) => ({ id: String(idx + 1), name: t })),
    categoriesDetails: cats.map((c, idx) => ({ id: src.categoryIds?.[idx] || String(idx + 1), name: c, code: '' })),
    category: cats[0] || '',
    departmentDetails: depts.map((d, idx) => ({ id: String(idx + 1), name: d })),
    departmentsExecuting: depts.map((d, idx) => ({ id: String(idx + 1), name: d, code: '' })),
    departmentsAuthority: depts.map((d, idx) => ({ id: String(idx + 1), name: d, code: '' })),
    departmentsAuthorized: [],
    departmentsCoordinating: [],
    executingAgencies: depts.join('; '),
    departmentPromulgateId: src.departmentPromulgateId || '',
    departmentPromulgateCode: '',
    departmentPromulgateName: promName,
    cases: linkedCases.length > 0
      ? linkedCases.map((c) => ({ id: c.id, name: c.name, code: c.code, state: c.state }))
      : [{ id: src.id || id, name: src.name, code: baseCode ? `${baseCode}.01` : '', state: 'ACTIVE' }],
    fees: [],
    requirementsAndConditions: 'Đáp ứng đầy đủ thành phần hồ sơ và điều kiện theo quy định hiện hành.',
    procedureProposal: { proposalNumber: baseCode || src.code || '' },
    relatedFormalities: [],
    procedureRelatedGroup: [],
    returningMethods: []
  };

  return {
    status: 201,
    body: {
      code: 'OK',
      data: synthesized,
      message: 'OK'
    }
  };
}

function handleListDepartmentUrlByCitizen(state, body) {
  const formalityId = String(body.formalityId || '').trim();
  const formalityCaseId = String(body.formalityCaseId || '').trim();
  const q = String(body.q || '');
  const implementLevel = String(body.implementLevel || '').trim().toUpperCase();
  const provinceCode = String(body.provinceCode || '').trim();
  const departmentId = String(body.departmentId || '').trim();

  let matchedCases = [];
  if (formalityCaseId && state.casesMap.has(formalityCaseId)) {
    matchedCases.push(state.casesMap.get(formalityCaseId));
  } else if (formalityId && state.casesByFormalityId.has(formalityId)) {
    matchedCases = state.casesByFormalityId.get(formalityId);
  } else if (formalityId && state.formalitiesMap.has(formalityId)) {
    const f = state.formalitiesMap.get(formalityId);
    matchedCases.push({
      id: f.id,
      name: f.name,
      code: f.code ? `${f.code}.01` : '',
      state: f.state || 'ACTIVE',
      formalityId: f.id,
      level: 'ALL',
      handleDepartmentName: f.departments?.[0] || f.departmentPromulgate || '',
      categoryName: f.categories?.[0] || ''
    });
  } else if (normalizeVi(q)) {
    matchedCases = state.casesList
      .filter((c) => scoreMatch(c, q) > 0)
      .slice(0, 20)
      .map((c) => c.item);
  }

  const selectedDept = (departmentId && state.deptById.get(departmentId))
    || (provinceCode && state.provincesList.find((p) => p.code === provinceCode))
    || null;

  const rows = matchedCases.map((c) => {
    const f = state.formalitiesMap.get(c.formalityId || c.id);
    const deptName = selectedDept?.name || c.handleDepartmentName || f?.departments?.[0] || f?.departmentPromulgate || 'Trung tâm Phục vụ hành chính công';
    const targetNames = f?.formalityTargetType || ['Công dân Việt Nam'];
    const baseCode = toFormalityCode(f?.code || c.code);
    return {
      id: `${c.id}-${selectedDept?.code || 'default'}`,
      formalityCaseId: c.id,
      formalityCaseName: c.name,
      formalityId: c.formalityId || f?.id || c.id,
      formalityCode: baseCode,
      formalityCaseCode: c.code || '',
      implementLevel: implementLevel === 'PARTIAL' ? 'PARTIAL' : 'FULL',
      departmentId: selectedDept?.id || '',
      departmentName: deptName,
      departmentCode: selectedDept?.code || '',
      isEssential: false,
      isTesting: false,
      formalityFormState: 'ACTIVE',
      citizenUrl: '',
      allowAuthorizationToSubmit: true,
      categoryInfo: c.categoryName ? [{ categoryId: stableId('cat', normalizeVi(c.categoryName)), categoryName: c.categoryName }] : [],
      formalityTargetType: targetNames.map((n) => ({
        name: n,
        type: normalizeVi(n).includes('doanh nghiep') ? 'ORGANIZATION' : 'CITIZEN'
      }))
    };
  });

  const page = paginateByCursor(rows, body.limit ?? 10, body.lastId ?? '');
  return {
    status: 201,
    body: {
      code: 'OK',
      data: {
        rows: page.slice,
        total: page.total,
        lastId: page.lastId
      },
      message: 'OK'
    }
  };
}

let cachedState = null;

function getState() {
  if (!cachedState) {
    cachedState = buildSearchState();
  }
  return cachedState;
}

/**
 * Route supported search, filter, dropdown, and formality lookup endpoints dynamically
 * across the offline index built from `public/api-mocks.json` + `dossier-CPVyX_AJ.js`.
 * Returns `null` for endpoints outside its scope so callers can fall back to static mocks.
 */
export function handleSearchApi(method, lookupPath, _query, bodyText) {
  if (String(method || 'GET').toUpperCase() !== 'POST') return null;

  const body = parseJsonSafe(bodyText, {});
  const state = getState();

  switch (lookupPath) {
    case '/api/v1/submitting/formality/list-all-public-formality-by-citizen':
      return handleListAllPublicFormalities(state, body);
    case '/api/v1/configuring/formality/list-formality-case-by-citizen':
      return handleListFormalityCases(state, body);
    case '/api/v1/submitting/public/formality-case-outstanding/list':
      return handleOutstandingList(state, body);
    case '/api/v1/configuring/citizen/department/list-with-location':
      return handleDepartmentListWithLocation(state, body);
    case '/api/v1/configuring/category/list-category-by-citizen':
      return handleCategoryList(state, body);
    case '/api/v1/configuring/subject-type/get-list-by-citizen':
    case '/api/v1/configuring/subject-type/list-by-formality-case':
      return handleSubjectTypeList(state, body);
    case '/api/v1/configuring/province-vn/list-by-citizen':
      return handleProvinceList(state, body);
    case '/api/v1/configuring/ward/list-by-citizen':
      return handleWardList(state, body);
    case '/api/v1/responding/faq/list-by-citizen':
      return handleFaqList(state, body);
    case '/api/v1/responding/faq/get-by-citizen':
      return handleFaqGet(state, body);
    case '/api/v1/configuring/formality/get-formality-by-citizen':
      return handleGetFormalityDetail(state, body);
    case '/api/v1/submitting/formality/list-department-url-by-citizen':
      return handleListDepartmentUrlByCitizen(state, body);
    default:
      return null;
  }
}

export function getSearchIndexStats() {
  const s = getState();
  return {
    formalities: s.formalitiesList.length,
    cases: s.casesList.length,
    categories: s.categoriesList.length,
    departments: s.departmentsList.length,
    provinces: s.provincesList.length,
    wards: s.wardsList.length,
    subjectTypes: s.subjectTypesList.length,
    faqs: s.faqsList.length,
    outstanding: s.outstandingList.length,
    bundledDetails: s.bundledDetails.size
  };
}
