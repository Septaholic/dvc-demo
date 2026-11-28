import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import {
  BADINH_DEPT,
  CONGAN_HANOI_DEPT,
  CORE_SERVICE_IDS,
  EXTRA_SERVICE_GROUPS,
  LLTP_FEES,
  LLTP_FORM_JSON,
  LLTP_PROFILE_COMPONENTS,
  PLACEHOLDER_CITIZEN,
  buildCitizenProfilePayload,
  buildCsdlqgCitizenRecord,
  buildGenericEformJson,
  generateCaptchaSvgDataUri,
  generateSimplePdfBuffer
} from './dvc-data-templates.mjs';
import { getSearchIndexStats, handleSearchApi, normalizeVi } from './search-engine.mjs';

const STATE_FILE = path.resolve('.astro/dvc-state.json');
const UPLOAD_DIR = path.resolve('.astro/dvc-uploads');
const QR_SAMPLE_FILE = path.resolve('server/vneid-qr-sample.json');
let cachedVneidQr = null;
let cachedVneidQrMtime = 0;

function getVneidQrBase64() {
  try {
    const mtime = fs.statSync(QR_SAMPLE_FILE).mtimeMs;
    if (cachedVneidQr !== null && cachedVneidQrMtime === mtime) return cachedVneidQr;
    const parsed = JSON.parse(fs.readFileSync(QR_SAMPLE_FILE, 'utf8'));
    cachedVneidQr = String(parsed?.qrcode || '');
    cachedVneidQrMtime = mtime;
  } catch {
    cachedVneidQr = '';
  }
  return cachedVneidQr;
}

function formatDdmmyyyyHhmmss(tsMs) {
  const d = new Date(tsMs);
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function parseJsonSafe(raw, fallback = null) {
  if (!raw || typeof raw !== 'string') return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function createInitialSeedState() {
  const now = Date.now();
  const demoCompletedId = '019a0000-0000-7000-8000-d0551e000001';
  const demoCode = '000.00.04.H26-20261128-0001';
  const demoResultFileId = 'demo-res-ks-001';
  const demoLltpId = '019a0000-0000-7000-8000-d0551e000002';
  const demoLltpCode = '000.00.01.H26-20261128-0002';
  const demoTrx = 'TRX-20261128-0002';

  return {
    users: [
      {
        ...PLACEHOLDER_CITIZEN,
        password: 'Demo@123',
        createdAt: 1735689600000
      }
    ],
    sessions: {},
    dossiers: [
      {
        id: demoCompletedId,
        code: demoCode,
        trackingNumber: demoCode,
        name: 'Thủ tục đăng ký khai sinh',
        ownerCitizenId: PLACEHOLDER_CITIZEN.citizenId,
        isDraft: false,
        state: 'COMPLETED',
        formalityId: CORE_SERVICE_IDS.KHAI_SINH_FORMALITY_ID,
        formalityName: 'Thủ tục đăng ký khai sinh',
        formalityCode: '1.001193',
        formalityCaseId: CORE_SERVICE_IDS.KHAI_SINH_CASE_ID,
        departmentId: BADINH_DEPT.id,
        departmentName: BADINH_DEPT.name,
        departmentCode: BADINH_DEPT.code,
        categoryId: '019d2bbb-69ee-7079-a6b4-536173b5e483',
        categoryName: 'Hộ tịch',
        type: 'CITIZEN',
        isBeneficiary: false,
        returning: 'AT_SUBMISSION_PLACE',
        formJson: JSON.stringify({
          citizenName: PLACEHOLDER_CITIZEN.name,
          citizenIdentity: PLACEHOLDER_CITIZEN.citizenId,
          citizenDateOfBirth: PLACEHOLDER_CITIZEN.birthDateIso,
          citizenPhone: PLACEHOLDER_CITIZEN.phone,
          citizenAddress: PLACEHOLDER_CITIZEN.address,
          treHoTen: 'NGUYỄN MINH ANH',
          treNgaySinh: '2026-11-15',
          treGioiTinh: 'Nữ',
          noiSinh: 'Bệnh viện Phụ sản Hà Nội'
        }),
        miniFormJson: JSON.stringify({
          hoVaTenNguoiYeuCau: PLACEHOLDER_CITIZEN.name,
          soCccdNguoiYeuCau: PLACEHOLDER_CITIZEN.citizenId,
          hoVaTenTreEm: 'Nguyễn Minh Anh'
        }),
        profileComponents: [
          {
            profileComponentId: '019d2bb8-71b7-70f3-80d4-3eff5e6c3591',
            name: 'Giấy chứng sinh bản điện tử',
            originalQty: 1,
            copyQty: 0,
            attachments: [
              {
                fileId: 'demo-att-gcs-001',
                fileName: 'giay-chung-sinh-mau.pdf',
                filePath: '/submitting/preview-attachment-by-citizen',
                description: 'Giấy chứng sinh (bản mẫu)'
              }
            ]
          }
        ],
        fees: [],
        feeSummary: { unpaidAmount: 0, paidAmount: 0, totalAmount: 0 },
        needsPayment: false,
        hasFees: false,
        hasReceipt: false,
        createdAt: now - 86400000 * 3,
        submittedAt: now - 86400000 * 3,
        acceptPendingSubmissionAt: now - 86400000 * 2,
        estimateReturnAt: now + 86400000,
        completedAt: now - 3600000,
        citizenRating: null,
        citizenRatingContent: '',
        isAllowWithdraw: false,
        isCancelling: false,
        returnResults: [
          {
            name: 'Giấy khai sinh điện tử (Bản sao mẫu)',
            type: 'ELECTRONIC',
            date: now - 3600000,
            status: 'Đã phát hành',
            attachment: {
              fileId: demoResultFileId,
              oldFileId: demoResultFileId,
              fileName: 'giay-khai-sinh-dien-tu.pdf',
              filePath: '/submitting/preview-attachment-by-citizen'
            }
          }
        ],
        history: [
          { action: 'Nộp hồ sơ trực tuyến', status: 'PENDING_PROCESSING', actor: PLACEHOLDER_CITIZEN.name, note: 'Công dân gửi hồ sơ hợp lệ trên Cổng DVCQG', createdAt: now - 86400000 * 3 },
          { action: 'Tiếp nhận giải quyết', status: 'PROCESSING', actor: 'Công chức Tư pháp - Hộ tịch', note: 'UBND phường Ba Đình đã tiếp nhận hồ sơ', createdAt: now - 86400000 * 2 },
          { action: 'Trả kết quả điện tử', status: 'COMPLETED', actor: 'Lãnh đạo UBND phường Ba Đình', note: 'Đã cấp Giấy khai sinh điện tử', createdAt: now - 3600000 }
        ]
      },
      {
        id: demoLltpId,
        code: demoLltpCode,
        trackingNumber: demoLltpCode,
        name: 'Cấp Phiếu Lý lịch tư pháp cho công dân Việt Nam, người nước ngoài đang cư trú tại Việt Nam, người Việt Nam đang cư trú ở nước ngoài',
        ownerCitizenId: PLACEHOLDER_CITIZEN.citizenId,
        isDraft: false,
        state: 'PROCESSING',
        formalityId: CORE_SERVICE_IDS.LLTP_FORMALITY_ID,
        formalityName: 'Cấp Phiếu Lý lịch tư pháp cho công dân Việt Nam, người nước ngoài đang cư trú tại Việt Nam, người Việt Nam đang cư trú ở nước ngoài',
        formalityCode: '3.000333',
        formalityCaseId: CORE_SERVICE_IDS.LLTP_CASE_ID,
        departmentId: CONGAN_HANOI_DEPT.id,
        departmentName: CONGAN_HANOI_DEPT.name,
        departmentCode: CONGAN_HANOI_DEPT.code,
        categoryId: 'cat-lltp',
        categoryName: 'Lý lịch tư pháp',
        type: 'CITIZEN',
        isBeneficiary: false,
        returning: 'AT_SUBMISSION_PLACE',
        formJson: JSON.stringify({
          citizenName: PLACEHOLDER_CITIZEN.name,
          citizenIdentity: PLACEHOLDER_CITIZEN.citizenId,
          loaiPhieuLltp: 'PHIEU_SO_1',
          mucDichYeuCau: 'Bổ sung hồ sơ xin việc',
          soLuongBanGiay: 2
        }),
        miniFormJson: JSON.stringify({
          hoVaTen: PLACEHOLDER_CITIZEN.name,
          soDinhDanh: PLACEHOLDER_CITIZEN.citizenId,
          loaiPhieuLltp: 'Phiếu Lý lịch tư pháp số 1'
        }),
        profileComponents: [
          {
            profileComponentId: 'comp-lltp-01',
            name: 'Tờ khai yêu cầu cấp Phiếu lý lịch tư pháp',
            originalQty: 1,
            copyQty: 0,
            attachments: []
          }
        ],
        fees: [
          {
            id: 'fee-lltp-01',
            feeId: 'fee-lltp-200k',
            name: 'Phí cung cấp thông tin lý lịch tư pháp',
            amount: 200000,
            quantity: 1,
            qty: 1,
            currency: 'VND',
            paymentStatus: 'PAID',
            beneficiary: CONGAN_HANOI_DEPT.name,
            transactionCode: demoTrx,
            receipt: { hasReceipt: true }
          }
        ],
        feeSummary: { unpaidAmount: 0, paidAmount: 200000, totalAmount: 200000 },
        needsPayment: false,
        hasFees: true,
        hasReceipt: true,
        createdAt: now - 86400000,
        submittedAt: now - 86400000,
        acceptPendingSubmissionAt: now - 86000000,
        estimateReturnAt: now + 86400000 * 9,
        isAllowWithdraw: true,
        isCancelling: false,
        returnResults: [],
        history: [
          { action: 'Nộp hồ sơ trực tuyến', status: 'FEE_REQUESTED', actor: PLACEHOLDER_CITIZEN.name, note: 'Đã khởi tạo hồ sơ và yêu cầu nộp lệ phí', createdAt: now - 86400000 },
          { action: 'Hoàn tất thanh toán phí', status: 'PROCESSING', actor: 'Cổng thanh toán DVCQG', note: `Đã thanh toán 200.000 VNĐ (${demoTrx})`, createdAt: now - 86000000 }
        ]
      }
    ],
    payments: {
      [demoTrx]: {
        transactionId: demoTrx,
        dossierId: demoLltpId,
        dossierCode: demoLltpCode,
        amount: 200000,
        status: 'PAID',
        date: now - 86000000
      }
    },
    uploads: {
      [demoResultFileId]: {
        fileId: demoResultFileId,
        fileName: 'giay-khai-sinh-dien-tu.pdf',
        mimeType: 'application/pdf',
        kind: 'GENERATED_PDF',
        pdfTitle: 'GIAY KHAI SINH DIEN TU (BAN MAU)',
        pdfLines: [
          `Ma ho so: ${demoCode}`,
          'Co quan cap: UBND Phuong Ba Dinh - TP Ha Noi',
          `Nguoi yeu cau: ${PLACEHOLDER_CITIZEN.name} (CCCD: ${PLACEHOLDER_CITIZEN.citizenId})`,
          'Ho va ten tre em: Nguyen Minh Anh (Nu - 15/11/2026)',
          'Noi sinh: Benh vien Phu san Ha Noi',
          `Noi dang ky: ${PLACEHOLDER_CITIZEN.address}`
        ]
      },
      'demo-att-gcs-001': {
        fileId: 'demo-att-gcs-001',
        fileName: 'giay-chung-sinh-mau.pdf',
        mimeType: 'application/pdf',
        kind: 'GENERATED_PDF',
        pdfTitle: 'GIAY CHUNG SINH (BAN MAU THAM KHAO)',
        pdfLines: [
          'Co so y te: Benh vien Phu san Ha Noi',
          `Ho ten me: Tran Thi C | Ho ten bo: ${PLACEHOLDER_CITIZEN.name}`,
          'Ngay sinh tre: 15/11/2026 | Gioi tinh: Nu | Can nang: 3200g'
        ]
      }
    }
  };
}

let cachedState = null;
let cachedMocks = null;
const activeCaptchas = new Map([['demo-default-captcha', 'DVC26']]);
const ssoCorrelationUsers = new Map();

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function getMocks() {
  if (!cachedMocks) {
    cachedMocks = JSON.parse(fs.readFileSync(path.resolve('public/api-mocks.json'), 'utf8'));
  }
  return cachedMocks;
}

function getState() {
  if (cachedState) return cachedState;
  ensureDir(path.dirname(STATE_FILE));
  ensureDir(UPLOAD_DIR);
  if (fs.existsSync(STATE_FILE)) {
    const loaded = parseJsonSafe(fs.readFileSync(STATE_FILE, 'utf8'), null);
    if (loaded && Array.isArray(loaded.users) && Array.isArray(loaded.dossiers)) {
      cachedState = loaded;
      return cachedState;
    }
  }
  cachedState = createInitialSeedState();
  persistState();
  return cachedState;
}

function persistState() {
  if (!cachedState) return;
  try {
    ensureDir(path.dirname(STATE_FILE));
    fs.writeFileSync(STATE_FILE, JSON.stringify(cachedState, null, 2), 'utf8');
  } catch {
    // Non-fatal in read-only environments
  }
}

function ok(data, status = 201) {
  return { status, body: { code: 'OK', data, message: 'OK' } };
}

function fail(status, code, message, data = null) {
  return { status, body: { code, message, data } };
}

function getActiveUser(state, req) {
  const auth = req?.headers?.authorization || '';
  const token = auth.replace(/^Bearer\s+/i, '').trim();
  const citizenId = (token && state.sessions[token]) || state.users[0]?.citizenId || PLACEHOLDER_CITIZEN.citizenId;
  return state.users.find((u) => u.citizenId === citizenId) || state.users[0];
}

function makeSessionTokens(state, user) {
  const token = `demo-token-${user.citizenId}-${crypto.randomBytes(6).toString('hex')}`;
  const refresh = `demo-refresh-${user.citizenId}-${crypto.randomBytes(6).toString('hex')}`;
  state.sessions[token] = user.citizenId;
  state.sessions[refresh] = user.citizenId;
  persistState();
  const expireAt = Date.now() + 86400000 * 7;
  return {
    accessToken: { token, expireAt },
    refreshToken: { token: refresh, expireAt }
  };
}

function parseMultipartSingleFile(req, rawBuffer) {
  const contentType = String(req?.headers?.['content-type'] || '');
  const m = contentType.match(/boundary=(?:"([^"]+)"|([^;\s]+))/i);
  if (!m || !Buffer.isBuffer(rawBuffer)) return null;
  const boundary = `--${m[1] || m[2]}`;
  const rawLatin = rawBuffer.toString('latin1');
  const partStart = rawLatin.indexOf(boundary);
  if (partStart === -1) return null;
  const headerEnd = rawLatin.indexOf('\r\n\r\n', partStart);
  if (headerEnd === -1) return null;
  const headerText = rawLatin.slice(partStart, headerEnd);
  const fileNameMatch = headerText.match(/filename="([^"]+)"/i);
  const mimeMatch = headerText.match(/Content-Type:\s*([^\r\n]+)/i);
  const bodyStart = headerEnd + 4;
  let bodyEnd = rawLatin.indexOf(`\r\n${boundary}`, bodyStart);
  if (bodyEnd === -1) bodyEnd = rawBuffer.length;

  const fileName = fileNameMatch ? Buffer.from(fileNameMatch[1], 'latin1').toString('utf8') : 'uploaded-file.pdf';
  const mimeType = mimeMatch ? mimeMatch[1].trim() : 'application/octet-stream';
  const fileBuf = rawBuffer.subarray(bodyStart, bodyEnd);
  return { fileName, mimeType, buffer: fileBuf };
}

function formatDossierRow(d) {
  return {
    id: d.id,
    name: d.formalityName || d.name,
    code: d.code,
    formalityName: d.formalityName || d.name,
    formalityCode: d.formalityCode || '',
    state: d.state,
    departmentName: d.departmentName || BADINH_DEPT.name,
    departmentCode: d.departmentCode || BADINH_DEPT.code,
    submittedAt: d.submittedAt || null,
    createdAt: d.createdAt,
    estimateReturnAt: d.estimateReturnAt || null,
    citizenRating: d.citizenRating ?? null,
    citizenRatingContent: d.citizenRatingContent || '',
    citizenRatedAt: d.citizenRatedAt || null,
    returnEstimateAt: d.estimateReturnAt || null,
    acceptPendingSubmissionAt: d.acceptPendingSubmissionAt || null,
    receptionsCount: d.isDraft ? 0 : 1,
    needsPayment: !!d.needsPayment,
    hasFees: !!d.hasFees,
    hasReceipt: !!d.hasReceipt,
    category: {
      id: d.categoryId || '019d2bbb-69ee-7079-a6b4-536173b5e483',
      name: d.categoryName || 'Hộ tịch',
      code: d.formalityCode || '',
      state: 'ACTIVE'
    },
    timeline: {
      createdAt: d.createdAt,
      submittedAt: d.submittedAt || null,
      estimateReturnAt: d.estimateReturnAt || null,
      returnedAt: null,
      cancelledAt: d.cancelledAt || null,
      processedAt: d.completedAt || null,
      completedAt: d.completedAt || null,
      acceptPendingSubmissionAt: d.acceptPendingSubmissionAt || null
    },
    isFormalityCaseTest: false,
    isCancelling: !!d.isCancelling,
    isAllowWithdraw: d.isAllowWithdraw !== false && !d.isDraft && !['COMPLETED', 'FINISHED', 'CANCELLED', 'TERMINATED'].includes(d.state),
    trackingNumber: d.code,
    isSyncing: false,
    isRedirectDVCLT: false
  };
}

function buildDossierDetail(d) {
  return {
    ...formatDossierRow(d),
    formality: {
      id: d.formalityId,
      code: d.formalityCode,
      name: d.formalityName,
      caseId: d.formalityCaseId,
      formalityTargetType: 'VIETNAMESE_CITIZEN',
      case: {
        id: d.formalityCaseId,
        name: d.formalityName,
        code: `${d.formalityCode}.01`,
        isEssential: true,
        profileComponents: d.profileComponents || []
      },
      profileComponents: d.profileComponents || []
    },
    department: {
      id: d.departmentId || BADINH_DEPT.id,
      name: d.departmentName || BADINH_DEPT.name,
      code: d.departmentCode || BADINH_DEPT.code
    },
    category: {
      id: d.categoryId || '019d2bbb-69ee-7079-a6b4-536173b5e483',
      name: d.categoryName || 'Hộ tịch',
      code: d.formalityCode || ''
    },
    formJson: d.formJson || '{}',
    miniFormJson: d.miniFormJson || '{}',
    profileComponents: d.profileComponents || [],
    returning: d.returning || 'AT_SUBMISSION_PLACE',
    homeReturnInfo: d.homeReturnInfo || null,
    returnResult: d.homeReturnInfo || null,
    fees: d.fees || [],
    feeSummary: d.feeSummary || { unpaidAmount: 0, paidAmount: 0, totalAmount: 0 },
    returnResults: d.returnResults || [],
    returnResultAttachments: [],
    profileComponentAmendments: d.amendments || [],
    qnaRequests: []
  };
}

function buildElectronicOutcomeForDossier(d, state) {
  const code = d.formalityCode || '';
  const fileId = `res-${d.id}`;
  const isBirth = code === '1.001193' || code === '3.000722' || code === '2.002868';
  const isLltp = code.startsWith('3.00033');
  const isHonNhan = code === '1.004873';
  const isKhaiTu = code === '1.000656' || code === '2.002913' || code === '2.002869';

  const resultTitle = isBirth
    ? 'Giấy khai sinh điện tử (Bản sao mẫu)'
    : isLltp
      ? 'Phiếu Lý lịch tư pháp điện tử (Bản mẫu)'
      : isHonNhan
        ? 'Giấy xác nhận tình trạng hôn nhân điện tử (Bản mẫu)'
        : isKhaiTu
          ? 'Trích lục khai tử điện tử (Bản mẫu)'
          : `Kết quả giải quyết ${d.formalityName}`;

  const pdfLines = [
    `Ma ho so: ${d.code}`,
    `Thu tuc: ${d.formalityCode} - ${d.formalityName}`,
    `Co quan giai quyet: ${d.departmentName}`,
    `Nguoi yeu cau: ${PLACEHOLDER_CITIZEN.name} (CCCD: ${PLACEHOLDER_CITIZEN.citizenId})`,
    `Ngay sinh: ${PLACEHOLDER_CITIZEN.birthDateSlash} | Dia chi: ${PLACEHOLDER_CITIZEN.address}`,
    `Trang thai xu ly: ${d.state}`
  ];

  state.uploads[fileId] = {
    fileId,
    fileName: `${d.formalityCode || 'ket-qua'}.pdf`,
    mimeType: 'application/pdf',
    kind: 'GENERATED_PDF',
    pdfTitle: resultTitle,
    pdfLines
  };

  return {
    name: resultTitle,
    type: 'ELECTRONIC',
    date: Date.now(),
    status: 'Sẵn sàng tra cứu mẫu',
    attachment: {
      fileId,
      oldFileId: fileId,
      fileName: `${d.formalityCode || 'ket-qua'}.pdf`,
      filePath: '/submitting/preview-attachment-by-citizen'
    }
  };
}

function findCapturedFormEntry(formalityCaseId, formalityId) {
  const mocks = getMocks();
  const matches = mocks.filter((m) => m.path === '/api/v1/configuring/formality/get-formality-form-by-citizen');
  for (const m of matches) {
    const req = parseJsonSafe(m.bodyText, {});
    if (formalityCaseId && req.formalityCaseId === formalityCaseId) {
      return parseJsonSafe(m.text, {})?.data || null;
    }
  }
  const caseMapByFid = {
    [CORE_SERVICE_IDS.KHAI_SINH_FORMALITY_ID]: CORE_SERVICE_IDS.KHAI_SINH_CASE_ID,
    [CORE_SERVICE_IDS.KHAI_SINH_LIEN_THONG_FID]: CORE_SERVICE_IDS.KHAI_SINH_CASE_ID,
    [CORE_SERVICE_IDS.KHAI_SINH_LIEN_THONG_DT_FID]: CORE_SERVICE_IDS.KHAI_SINH_CASE_ID,
    [CORE_SERVICE_IDS.HON_NHAN_FORMALITY_ID]: CORE_SERVICE_IDS.HON_NHAN_CASE_ID,
    [CORE_SERVICE_IDS.KHAI_TU_FORMALITY_ID]: CORE_SERVICE_IDS.KHAI_TU_CASE_ID,
    [CORE_SERVICE_IDS.KHAI_TU_LIEN_THONG_FID]: CORE_SERVICE_IDS.KHAI_TU_CASE_ID,
    [CORE_SERVICE_IDS.KHAI_TU_LIEN_THONG_DT_FID]: CORE_SERVICE_IDS.KHAI_TU_CASE_ID
  };
  const mappedCaseId = caseMapByFid[formalityId];
  if (mappedCaseId) {
    for (const m of matches) {
      const req = parseJsonSafe(m.bodyText, {});
      if (req.formalityCaseId === mappedCaseId) {
        return parseJsonSafe(m.text, {})?.data || null;
      }
    }
  }
  return null;
}

function findCapturedComponentsEntry(formalityCaseId, formalityId) {
  const mocks = getMocks();
  const matches = mocks.filter((m) => m.path === '/api/v1/configuring/formality/get-profile-components-by-department-and-case');
  for (const m of matches) {
    const req = parseJsonSafe(m.bodyText, {});
    if (formalityCaseId && req.formalityCaseId === formalityCaseId) {
      return parseJsonSafe(m.text, {})?.data || null;
    }
  }
  const fidByCase = {
    [CORE_SERVICE_IDS.KHAI_SINH_CASE_ID]: CORE_SERVICE_IDS.KHAI_SINH_CASE_ID,
    [CORE_SERVICE_IDS.HON_NHAN_CASE_ID]: CORE_SERVICE_IDS.HON_NHAN_CASE_ID,
    [CORE_SERVICE_IDS.KHAI_TU_CASE_ID]: CORE_SERVICE_IDS.KHAI_TU_CASE_ID
  };
  const fidFallback = {
    [CORE_SERVICE_IDS.KHAI_SINH_LIEN_THONG_FID]: CORE_SERVICE_IDS.KHAI_SINH_CASE_ID,
    [CORE_SERVICE_IDS.KHAI_SINH_LIEN_THONG_DT_FID]: CORE_SERVICE_IDS.KHAI_SINH_CASE_ID,
    [CORE_SERVICE_IDS.KHAI_TU_LIEN_THONG_FID]: CORE_SERVICE_IDS.KHAI_TU_CASE_ID,
    [CORE_SERVICE_IDS.KHAI_TU_LIEN_THONG_DT_FID]: CORE_SERVICE_IDS.KHAI_TU_CASE_ID
  }[formalityId] || fidByCase[formalityCaseId];
  if (fidFallback) {
    for (const m of matches) {
      const req = parseJsonSafe(m.bodyText, {});
      if (req.formalityCaseId === fidFallback) {
        return parseJsonSafe(m.text, {})?.data || null;
      }
    }
  }
  return null;
}

function lookupFormalityMeta(formalityId, formalityCaseId) {
  if (formalityId === CORE_SERVICE_IDS.LLTP_FORMALITY_ID || formalityCaseId === CORE_SERVICE_IDS.LLTP_CASE_ID) {
    return {
      id: CORE_SERVICE_IDS.LLTP_FORMALITY_ID,
      caseId: CORE_SERVICE_IDS.LLTP_CASE_ID,
      code: '3.000333',
      name: 'Cấp Phiếu Lý lịch tư pháp cho công dân Việt Nam, người nước ngoài đang cư trú tại Việt Nam, người Việt Nam đang cư trú ở nước ngoài',
      categoryName: 'Lý lịch tư pháp',
      categoryId: 'cat-lltp'
    };
  }
  if (formalityId) {
    const det = handleSearchApi('POST', '/api/v1/configuring/formality/get-formality-by-citizen', '', JSON.stringify({ id: formalityId }));
    const data = det?.body?.data;
    if (data) {
      return {
        id: data.id,
        caseId: formalityCaseId || data.cases?.[0]?.id || data.id,
        code: data.code || '',
        name: data.name || '',
        categoryName: data.category || data.categoriesDetails?.[0]?.name || 'Hộ tịch',
        categoryId: data.categoriesDetails?.[0]?.id || '019d2bbb-69ee-7079-a6b4-536173b5e483'
      };
    }
  }
  return {
    id: formalityId || '',
    caseId: formalityCaseId || '',
    code: '',
    name: 'Thủ tục hành chính trực tuyến',
    categoryName: 'Hộ tịch',
    categoryId: '019d2bbb-69ee-7079-a6b4-536173b5e483'
  };
}

function makeDeptUrlRow(meta, dept, caseId, targetTypes = [{ name: 'Công dân Việt Nam', type: 'CITIZEN' }]) {
  return {
    id: `du-${caseId}-${dept.code}`,
    formalityCaseId: caseId,
    formalityCaseName: meta.name,
    formalityId: meta.id,
    formalityCode: meta.code,
    formalityCaseCode: meta.code ? `${meta.code}.01` : '',
    implementLevel: 'FULL',
    departmentId: dept.id,
    departmentName: dept.name,
    departmentCode: dept.code,
    isEssential: true,
    isTesting: false,
    formalityFormState: 'APPROVED',
    citizenUrl: '',
    allowAuthorizationToSubmit: true,
    categoryInfo: [
      {
        categoryId: meta.categoryId,
        categoryName: meta.categoryName,
        categoryCode: meta.code,
        formalityCaseId: caseId
      }
    ],
    formalityTargetType: targetTypes
  };
}

function handleEnrichedDepartmentUrls(body) {
  const formalityId = String(body.formalityId || '').trim();
  const formalityCaseId = String(body.formalityCaseId || '').trim();
  const mocks = getMocks();

  // Check exact captured real agency rows from services.har for Ba Đình (01 / 00004)
  const capturedRows = [];
  for (const m of mocks) {
    if (m.path !== '/api/v1/submitting/formality/list-department-url-by-citizen') continue;
    const rows = parseJsonSafe(m.text, {})?.data?.rows || [];
    for (const r of rows) {
      if (formalityId && r.formalityId !== formalityId && formalityCaseId && r.formalityCaseId !== formalityCaseId) continue;
      if (formalityId && r.formalityId === formalityId) capturedRows.push(r);
      else if (formalityCaseId && r.formalityCaseId === formalityCaseId) capturedRows.push(r);
    }
  }

  // Deduplicate captured rows
  const byKey = new Map();
  for (const r of capturedRows) {
    byKey.set(`${r.formalityCaseId}:${r.departmentId}`, { ...r, isEssential: true, formalityFormState: 'APPROVED' });
  }

  const meta = lookupFormalityMeta(formalityId, formalityCaseId);
  const resolvedCaseId = formalityCaseId || meta.caseId || meta.id;

  // Ensure LLTP (3.000333 / 3.000330) has Công an TP. Hà Nội + UBND Phường Ba Đình
  if (
    formalityId === CORE_SERVICE_IDS.LLTP_FORMALITY_ID ||
    formalityId === CORE_SERVICE_IDS.LLTP_ALT_FORMALITY_ID ||
    meta.code === '3.000333' ||
    meta.code === '3.000330'
  ) {
    byKey.set(`${resolvedCaseId}:${CONGAN_HANOI_DEPT.id}`, makeDeptUrlRow(meta, CONGAN_HANOI_DEPT, resolvedCaseId));
    byKey.set(`${resolvedCaseId}:${BADINH_DEPT.id}`, makeDeptUrlRow(meta, BADINH_DEPT, resolvedCaseId));
  }

  // If no exact match yet (e.g., linked khai sinh/khai tử or user picked any province/ward), provide Ba Đình / Hà Nội essential channel
  if (byKey.size === 0 && (formalityId || formalityCaseId)) {
    const dept = { ...BADINH_DEPT };
    if (body.departmentId && body.departmentId !== BADINH_DEPT.id && body.departmentId !== CONGAN_HANOI_DEPT.id) {
      const deptLookup = handleSearchApi('POST', '/api/v1/configuring/citizen/department/list-with-location', '', JSON.stringify({ limit: 500, lastId: '' }));
      const found = (deptLookup?.body?.data?.rows || []).find((d) => d.id === body.departmentId);
      if (found) {
        dept.id = found.id;
        dept.name = found.name;
        dept.code = found.code;
      }
    }
    byKey.set(`${resolvedCaseId}:${dept.id}`, makeDeptUrlRow(meta, dept, resolvedCaseId));
  }

  if (byKey.size > 0) {
    let list = [...byKey.values()];
    if (body.departmentId) {
      const exactDept = list.filter((x) => x.departmentId === body.departmentId);
      if (exactDept.length > 0) list = exactDept;
    }
    if (body.q) {
      const qn = normalizeVi(body.q);
      const qFiltered = list.filter((x) => normalizeVi(x.formalityCaseName).includes(qn) || normalizeVi(x.departmentName).includes(qn));
      if (qFiltered.length > 0) list = qFiltered;
    }
    return ok({ rows: list, total: list.length, lastId: '' });
  }
  return null;
}

function handleEnrichedServiceGroups(pathName, body) {
  const mocks = getMocks();
  if (pathName === '/api/v1/configuring/service-group/list-by-citizen-with-parent') {
    const parentId = String(body.parentId || '').trim();
    const matched = mocks.find((m) => m.path === pathName && parseJsonSafe(m.bodyText, {}).parentId === parentId);
    const baseList = matched ? [...(parseJsonSafe(matched.text, {})?.data || [])] : [];

    if (parentId === EXTRA_SERVICE_GROUPS.CU_TRU_PARENT_ID && !baseList.some((x) => x.id === EXTRA_SERVICE_GROUPS.LLTP_GROUP_ID)) {
      baseList.push({
        id: EXTRA_SERVICE_GROUPS.LLTP_GROUP_ID,
        name: 'Lý lịch tư pháp',
        code: 'LYLICHTUPHAP',
        state: 'ACTIVE',
        order: baseList.length + 1,
        type: 'CITIZEN',
        parentId: EXTRA_SERVICE_GROUPS.CU_TRU_PARENT_ID
      });
    }
    if (parentId === EXTRA_SERVICE_GROUPS.HON_NHAN_PARENT_ID && !baseList.some((x) => x.id === EXTRA_SERVICE_GROUPS.TINH_TRANG_HN_GROUP_ID)) {
      baseList.push({
        id: EXTRA_SERVICE_GROUPS.TINH_TRANG_HN_GROUP_ID,
        name: 'Xác nhận tình trạng hôn nhân',
        code: 'TINHTRANGHONNHAN',
        state: 'ACTIVE',
        order: baseList.length + 1,
        type: 'CITIZEN',
        parentId: EXTRA_SERVICE_GROUPS.HON_NHAN_PARENT_ID
      });
    }
    if (matched || baseList.length > 0) {
      return ok(baseList);
    }
  }

  if (pathName === '/api/v1/configuring/service-group/list-formality-by-service-group-id') {
    const sgId = String(body.serviceGroupId || '').trim();
    const matched = mocks.find((m) => m.path === pathName && parseJsonSafe(m.bodyText, {}).serviceGroupId === sgId);
    const baseList = matched ? [...(parseJsonSafe(matched.text, {})?.data || [])] : [];

    if (sgId === EXTRA_SERVICE_GROUPS.KHAI_SINH_GROUP_ID && !baseList.some((x) => x.formalityId === CORE_SERVICE_IDS.KHAI_SINH_FORMALITY_ID)) {
      baseList.unshift({
        formalityId: CORE_SERVICE_IDS.KHAI_SINH_FORMALITY_ID,
        serviceGroupId: sgId,
        state: 'ACTIVE',
        serviceGroupType: 'CITIZEN',
        code: '1.001193',
        codeNotation: '1.001193',
        cache: { id: CORE_SERVICE_IDS.KHAI_SINH_FORMALITY_ID, name: 'Thủ tục đăng ký khai sinh' },
        name: 'Thủ tục đăng ký khai sinh'
      });
    }
    if (sgId === EXTRA_SERVICE_GROUPS.LLTP_GROUP_ID) {
      return ok([
        {
          formalityId: CORE_SERVICE_IDS.LLTP_FORMALITY_ID,
          serviceGroupId: sgId,
          state: 'ACTIVE',
          serviceGroupType: 'CITIZEN',
          code: '3.000333',
          codeNotation: '3.000333',
          cache: {
            id: CORE_SERVICE_IDS.LLTP_FORMALITY_ID,
            name: 'Cấp Phiếu Lý lịch tư pháp cho công dân Việt Nam, người nước ngoài đang cư trú tại Việt Nam, người Việt Nam đang cư trú ở nước ngoài'
          },
          name: 'Cấp Phiếu Lý lịch tư pháp cho công dân Việt Nam, người nước ngoài đang cư trú tại Việt Nam, người Việt Nam đang cư trú ở nước ngoài'
        },
        {
          formalityId: CORE_SERVICE_IDS.LLTP_ALT_FORMALITY_ID,
          serviceGroupId: sgId,
          state: 'ACTIVE',
          serviceGroupType: 'CITIZEN',
          code: '3.000330',
          codeNotation: '3.000330',
          cache: {
            id: CORE_SERVICE_IDS.LLTP_ALT_FORMALITY_ID,
            name: 'Cấp Phiếu lý lịch tư pháp cho công dân Việt Nam mà không xác định được nơi thường trú hoặc nơi tạm trú; người nước ngoài đã cư trú tại Việt Nam'
          },
          name: 'Cấp Phiếu lý lịch tư pháp cho công dân Việt Nam mà không xác định được nơi thường trú hoặc nơi tạm trú; người nước ngoài đã cư trú tại Việt Nam'
        }
      ]);
    }
    if (sgId === EXTRA_SERVICE_GROUPS.TINH_TRANG_HN_GROUP_ID) {
      return ok([
        {
          formalityId: CORE_SERVICE_IDS.HON_NHAN_FORMALITY_ID,
          serviceGroupId: sgId,
          state: 'ACTIVE',
          serviceGroupType: 'CITIZEN',
          code: '1.004873',
          codeNotation: '1.004873',
          cache: { id: CORE_SERVICE_IDS.HON_NHAN_FORMALITY_ID, name: 'Thủ tục cấp Giấy xác nhận tình trạng hôn nhân' },
          name: 'Thủ tục cấp Giấy xác nhận tình trạng hôn nhân'
        }
      ]);
    }
    if (sgId === EXTRA_SERVICE_GROUPS.KHAI_TU_GROUP_ID && !baseList.some((x) => x.formalityId === CORE_SERVICE_IDS.KHAI_TU_FORMALITY_ID)) {
      baseList.unshift({
        formalityId: CORE_SERVICE_IDS.KHAI_TU_FORMALITY_ID,
        serviceGroupId: sgId,
        state: 'ACTIVE',
        serviceGroupType: 'CITIZEN',
        code: '1.000656',
        codeNotation: '1.000656',
        cache: { id: CORE_SERVICE_IDS.KHAI_TU_FORMALITY_ID, name: 'Thủ tục đăng ký khai tử' },
        name: 'Thủ tục đăng ký khai tử'
      });
    }
    if (matched) return ok(baseList);
  }

  return null;
}

function handleOrganizingDepartments(pathName, body) {
  if (pathName === '/api/v1/organizing/citizen/get-department-by-id') {
    const id = String(body.id || '');
    if (id === CONGAN_HANOI_DEPT.id) return ok(CONGAN_HANOI_DEPT);
    if (id === BADINH_DEPT.id) return ok(BADINH_DEPT);
    const list = handleSearchApi('POST', '/api/v1/configuring/citizen/department/list-with-location', '', JSON.stringify({ limit: 500, lastId: '' }));
    const found = (list?.body?.data?.rows || []).find((d) => d.id === id);
    if (found) {
      return ok({
        ...found,
        address: found.address || 'Trung tâm Phục vụ hành chính công',
        commune: found.level === 'COMMUNE' ? found : BADINH_DEPT.commune
      });
    }
    return ok(BADINH_DEPT);
  }

  if (pathName === '/api/v1/organizing/citizen/get-department-info-by-id') {
    const id = String(body.id || '');
    if (id === CONGAN_HANOI_DEPT.id) return ok(CONGAN_HANOI_DEPT);
    return ok(BADINH_DEPT);
  }

  // list-department, list-department-by-ministry, list-department-by-province, list-department-by-ward, list-department-by-provincial-department
  const reqBody = { ...body };
  if (pathName.endsWith('-by-ministry')) reqBody.levels = ['MINISTRY'];
  else if (pathName.endsWith('-by-province')) { reqBody.levels = ['PROVINCE']; reqBody.agencyTypes = ['UBND_TINH']; }
  else if (pathName.endsWith('-by-ward')) { reqBody.levels = ['COMMUNE']; }
  else if (pathName.endsWith('-by-provincial-department')) { reqBody.type = 'PROVINCIAL_DEPARTMENT'; }
  else if (body.level === 'WARD') { reqBody.levels = ['COMMUNE']; }
  else if (body.level === 'PROVINCE') { reqBody.levels = ['PROVINCE']; reqBody.agencyTypes = ['UBND_TINH']; }
  else if (body.level === 'MINISTRY') { reqBody.levels = ['MINISTRY']; }
  else if (body.level === 'PROVINCIAL_DEPARTMENT') { reqBody.type = 'PROVINCIAL_DEPARTMENT'; }

  if (!reqBody.parentCode && body.parentId) {
    const allDepts = handleSearchApi('POST', '/api/v1/configuring/citizen/department/list-with-location', '', JSON.stringify({ limit: 500, lastId: '' }));
    const parent = (allDepts?.body?.data?.rows || []).find((d) => d.id === body.parentId);
    if (parent?.code) reqBody.parentCode = parent.code;
  }

  const res = handleSearchApi('POST', '/api/v1/configuring/citizen/department/list-with-location', '', JSON.stringify(reqBody));
  if (res) {
    const rows = res.body?.data?.rows || [];
    if (rows.length > 0 && pathName.includes('list-department-by-ministry') && !rows.some((r) => r.id === CONGAN_HANOI_DEPT.id)) {
      rows.unshift(CONGAN_HANOI_DEPT);
    }
    return res;
  }
  return null;
}

/**
 * Stateful offline portal handler for Auth, E-Form, Uploads, Fees, Dossiers, and Payments.
 * Returns `{ status, body }` (JSON) OR `{ status, isBinary: true, mime, buffer }` OR `null` to fall through.
 */
export function handlePortalApi(method, _host, lookupPath, query, rawBodyBuffer, req) {
  const upperMethod = String(method || 'GET').toUpperCase();
  const state = getState();

  // Preview uploaded / generated PDF or image attachments (POST or GET)
  if (
    lookupPath === '/api/v1/submitting/preview-attachment-by-citizen' ||
    lookupPath === '/api/v1/submitting/preview-attachment' ||
    lookupPath === '/api/v1/submitting/get-dossier-receipt' ||
    lookupPath === '/api/v1/submitting/download-edocument-resource-by-citizen'
  ) {
    const bodyText = Buffer.isBuffer(rawBodyBuffer) ? rawBodyBuffer.toString('utf8') : String(rawBodyBuffer || '');
    const body = parseJsonSafe(bodyText, {});
    const qp = new URLSearchParams(String(query || '').replace(/^\?/, ''));
    const fileId = String(body.fileId || qp.get('fileId') || '').trim();
    const receiptCode = String(body.code || qp.get('code') || '').trim();

    if (lookupPath === '/api/v1/submitting/get-dossier-receipt' || receiptCode) {
      const pay = state.payments[receiptCode] || Object.values(state.payments)[0];
      const dossier = state.dossiers.find((d) => d.id === pay?.dossierId || d.code === receiptCode || d.code === pay?.dossierCode);
      const buf = generateSimplePdfBuffer({
        title: 'BIEN LAI THU PHI, LE PHI DIEN TU',
        lines: [
          `Ma giao dich: ${receiptCode || pay?.transactionId || 'TRX-DEMO-001'}`,
          `Ma ho so: ${dossier?.code || pay?.dossierCode || 'DVC-2026-DEMO'}`,
          `Thu tuc: ${dossier?.formalityName || 'Dich vu cong truc tuyen'}`,
          `Nguoi nop: ${PLACEHOLDER_CITIZEN.name} (CCCD: ${PLACEHOLDER_CITIZEN.citizenId})`,
          `So tien da thanh toan: ${(pay?.amount || 200000).toLocaleString('en-US')} VND`,
          'Trang thai: DA THANH TOAN THANH CONG'
        ]
      });
      return { status: 200, isBinary: true, mime: 'application/pdf', buffer: buf };
    }

    const stored = state.uploads[fileId];
    if (stored?.diskPath && fs.existsSync(stored.diskPath)) {
      return { status: 200, isBinary: true, mime: stored.mimeType || 'application/octet-stream', buffer: fs.readFileSync(stored.diskPath) };
    }
    const buf = generateSimplePdfBuffer({
      title: stored?.pdfTitle || 'TAI LIEU / TO KHAI DIEN TU',
      lines: stored?.pdfLines || [
        `Ma tai lieu: ${fileId || 'DEMO-DOC'}`,
        `Chu ho so: ${PLACEHOLDER_CITIZEN.name} (CCCD: ${PLACEHOLDER_CITIZEN.citizenId})`,
        `Dia chi: ${PLACEHOLDER_CITIZEN.address}`,
        'Tai lieu dien tu duoc tao boi he thong mo phong ngoai tuyen CSDL.'
      ]
    });
    return { status: 200, isBinary: true, mime: 'application/pdf', buffer: buf };
  }

  if (upperMethod !== 'POST') return null;

  // Handle multipart binary upload BEFORE parsing JSON body
  if (lookupPath === '/api/v1/submitting/prepare-upload-dossier-attachment-by-citizen') {
    ensureDir(UPLOAD_DIR);
    const parsedFile = parseMultipartSingleFile(req, rawBodyBuffer);
    const fileId = `up-${crypto.randomUUID()}`;
    const fileName = parsedFile?.fileName || 'tai-lieu-dinh-kem.pdf';
    const mimeType = parsedFile?.mimeType || 'application/pdf';
    const diskPath = path.join(UPLOAD_DIR, fileId);
    const fileBytes = parsedFile?.buffer?.length ? parsedFile.buffer : generateSimplePdfBuffer({ title: fileName, lines: [`Uploaded file ${fileName}`] });
    fs.writeFileSync(diskPath, fileBytes);

    state.uploads[fileId] = {
      fileId,
      fileName,
      mimeType,
      diskPath,
      kind: 'DISK'
    };
    persistState();

    const checksum = crypto.createHash('sha256').update(fileBytes).digest('hex');
    return ok({
      fileId,
      putUrl: `/api/v1/submitting/preview-attachment-by-citizen?fileId=${fileId}`,
      fileName,
      filePath: '/submitting/preview-attachment-by-citizen',
      checksum,
      hashAlgorithm: 'SHA-256'
    });
  }

  const bodyText = Buffer.isBuffer(rawBodyBuffer) ? rawBodyBuffer.toString('utf8') : String(rawBodyBuffer || '');

  // ======================= 0. VNEID OFFICIAL SSO PORTAL (/api/idp/...) =======================
  if (lookupPath === '/api/idp/sso/login-actions/authenticate') {
    const formParams = new URLSearchParams(bodyText);
    const jsonFallback = parseJsonSafe(bodyText, {});
    const username = String(formParams.get('username') ?? jsonFallback.username ?? '').trim();
    const password = String(formParams.get('password') ?? jsonFallback.password ?? '');
    const submittedUrl = String(formParams.get('url') ?? jsonFallback.url ?? '').trim();

    if (!username) {
      return {
        status: 200,
        body: { status: false, sessionId: crypto.randomUUID() }
      };
    }

    const user = state.users.find((u) => u.citizenId === username);
    if (!user || !password) {
      return {
        status: 200,
        body: {
          errorMessage: 'Số định danh cá nhân hoặc mật khẩu không chính xác (tài khoản mẫu: 012345678912 / Demo@123).'
        }
      };
    }

    let redirectBase = '/sso';
    try {
      if (submittedUrl) {
        const parsedAuthUrl = new URL(submittedUrl, `http://${req?.headers?.host || 'localhost:4321'}`);
        const rawRedirect = parsedAuthUrl.searchParams.get('redirect_uri');
        if (rawRedirect) redirectBase = rawRedirect;
      }
    } catch {
      redirectBase = '/sso';
    }
    const sep = redirectBase.includes('?') ? '&' : '?';
    const location = `${redirectBase}${sep}code=vneid-${encodeURIComponent(user.citizenId)}&encrypt_key=vneid-demo`;
    return {
      status: 200,
      headers: {
        Location: location,
        'Access-Control-Expose-Headers': 'Location'
      },
      body: { status: true }
    };
  }

  if (lookupPath === '/api/idp/sso/login-qrcode' || lookupPath === '/api/idp/login-qrcode') {
    return {
      status: 200,
      body: {
        qrcode: getVneidQrBase64(),
        qrId: `JWT_AUTH_SSO_V2.${crypto.randomUUID()}`,
        expiredTime: formatDdmmyyyyHhmmss(Date.now() + 5 * 60 * 1000)
      }
    };
  }

  if (lookupPath === '/api/idp/mobile/reload-captcha') {
    return { status: 200, body: { captcha: '' } };
  }

  const body = parseJsonSafe(bodyText, {});

  // ======================= 1. AUTHENTICATION & PROFILE =======================
  if (lookupPath === '/api/v1/auth/citizen/sign-in') {
    const citizenId = String(body.citizenId || '').trim();
    const password = String(body.password || '');
    const user = state.users.find((u) => u.citizenId === citizenId && u.password === password);
    if (!user) {
      return fail(401, 'UNAUTHORIZED', 'Số CCCD/CMND hoặc mật khẩu không đúng (tài khoản mẫu: 012345678912 / Demo@123)');
    }
    const tokens = makeSessionTokens(state, user);
    const profilePayload = buildCitizenProfilePayload(user);
    return ok({
      ...tokens,
      credentials: { userId: user.id, ...profilePayload.credentials },
      info: profilePayload.profile
    });
  }

  if (lookupPath === '/api/v1/auth/citizen/sign-up') {
    const citizenId = String(body.citizenId || '').trim();
    if (!citizenId) return fail(400, 'BAD_REQUEST', 'Thiếu số CCCD/CMND');
    if (state.users.some((u) => u.citizenId === citizenId)) {
      return fail(409, 'USER_EXISTS', 'Tài khoản CCCD/CMND này đã tồn tại');
    }
    const newUser = {
      id: `user-${crypto.randomUUID()}`,
      name: body.name || PLACEHOLDER_CITIZEN.name,
      nameUpper: String(body.name || PLACEHOLDER_CITIZEN.name).toUpperCase(),
      citizenId,
      password: body.password || 'Demo@123',
      address: body.address || PLACEHOLDER_CITIZEN.address,
      streetAddress: body.address || PLACEHOLDER_CITIZEN.streetAddress,
      phone: body.phone || PLACEHOLDER_CITIZEN.phone,
      email: body.email || PLACEHOLDER_CITIZEN.email,
      citizenIdIssueDate: body.citizenIdIssueDate || PLACEHOLDER_CITIZEN.citizenIdIssueDate,
      citizenIdIssuePlace: body.citizenIdIssuePlace || PLACEHOLDER_CITIZEN.citizenIdIssuePlace,
      gender: body.gender || 'MALE',
      birthPlace: body.birthPlace || PLACEHOLDER_CITIZEN.provinceName,
      birthDateIso: body.birthDate || PLACEHOLDER_CITIZEN.birthDateIso,
      birthDateSlash: (body.birthDate || '').includes('-') ? body.birthDate.split('-').reverse().join('/') : PLACEHOLDER_CITIZEN.birthDateSlash,
      type: body.type || 'CITIZEN',
      provinceCode: '01',
      communeCode: '00004',
      createdAt: Date.now()
    };
    state.users.push(newUser);
    persistState();
    return ok({ userId: newUser.id, citizenId: newUser.citizenId });
  }

  if (lookupPath === '/api/v1/auth/citizen/sso') {
    const rawCode = String(body.code || 'vneid-demo');
    const extractedId = rawCode.startsWith('vneid-') && /^\d{9,12}$/.test(rawCode.slice(6))
      ? rawCode.slice(6)
      : (state.users[0]?.citizenId || PLACEHOLDER_CITIZEN.citizenId);
    const correlationId = `corr-${crypto.randomUUID()}`;
    ssoCorrelationUsers.set(correlationId, extractedId);
    return ok({
      code: rawCode,
      encryptKey: body.encryptKey || 'vneid-demo',
      correlationId,
      ipAddress: '127.0.0.1',
      userAgent: 'LocalDemo'
    });
  }

  if (lookupPath === '/api/v1/auth/citizen/get-sso-data') {
    const targetId = ssoCorrelationUsers.get(body.correlationId) || state.users[0]?.citizenId;
    const user = state.users.find((u) => u.citizenId === targetId) || state.users[0] || PLACEHOLDER_CITIZEN;
    const tokens = makeSessionTokens(state, user);
    const profilePayload = buildCitizenProfilePayload(user);
    return ok({
      status: 'SUCCESS',
      ...tokens,
      credentials: { userId: user.id, ...profilePayload.credentials },
      info: profilePayload.profile,
      externalInfo: profilePayload.externalInfo
    });
  }

  if (lookupPath === '/api/v1/auth/citizen/profile') {
    const user = getActiveUser(state, req);
    return ok(buildCitizenProfilePayload(user));
  }

  if (lookupPath === '/api/v1/auth/citizen/refresh-token') {
    const user = getActiveUser(state, req);
    return ok(makeSessionTokens(state, user));
  }

  if (lookupPath === '/api/v1/auth/citizen/sign-out') {
    return ok({ success: true });
  }

  if (
    lookupPath === '/api/v1/auth/citizen/update-identity' ||
    lookupPath === '/api/v1/auth/citizen/update-other-info' ||
    lookupPath === '/api/v1/auth/citizen/update-extended-info' ||
    lookupPath === '/api/v1/auth/citizen/update-profile' ||
    lookupPath === '/api/v1/auth/citizen/sync-from-national-db'
  ) {
    const user = getActiveUser(state, req);
    Object.assign(user, {
      ...(body.phone ? { phone: body.phone } : {}),
      ...(body.email ? { email: body.email } : {}),
      ...(body.address ? { address: body.address } : {}),
      ...(body.name ? { name: body.name, nameUpper: String(body.name).toUpperCase() } : {})
    });
    persistState();
    return ok(buildCitizenProfilePayload(user));
  }

  // ======================= 2. CITIZEN LOOKUP & PHOTO =======================
  if (lookupPath === '/api/v1/submitting/get-citizen-by-code' || lookupPath === '/api/v1/submitting/get-citizen-address-by-code') {
    const user = getActiveUser(state, req);
    return ok(buildCsdlqgCitizenRecord(user, body.citizenCode));
  }

  if (lookupPath === '/api/v1/submitting/extract-citizen-photo-by-citizen') {
    return ok({
      status: 'SUCCESS',
      fileId: 'demo-att-gcs-001',
      photoUrl: '/imgs/user-avatar.png'
    });
  }

  // ======================= 3. CAPTCHA & SYS PARAMS =======================
  if (lookupPath === '/api/v1/configuring/captcha') {
    const id = `cap-${crypto.randomUUID()}`;
    const pool = ['DVC26', 'HN001', 'VNEID', 'KSHN1', 'CT889'];
    const code = pool[Math.floor(Math.random() * pool.length)];
    activeCaptchas.set(id, code);
    if (activeCaptchas.size > 100) {
      const oldest = activeCaptchas.keys().next().value;
      activeCaptchas.delete(oldest);
    }
    return ok({
      captchaId: id,
      captchaImage: generateCaptchaSvgDataUri(code),
      expiresAt: new Date(Date.now() + 300000).toISOString()
    });
  }

  if (lookupPath === '/api/v1/configuring/system-parameter/list') {
    const search = String(body.search || '');
    const allParams = [
      { id: 'sys-1', code: 'ENABLE_CITIZEN_REPORT_766', value: 'true', state: 'ACTIVE' },
      { id: 'sys-2', code: 'DISABLE_CREATE_DOSSIER_BY_CITIZEN_CAPTCHA', value: 'true', state: 'ACTIVE' }
    ];
    const filtered = search ? allParams.filter((p) => p.code.includes(search)) : allParams;
    return ok({ total: filtered.length, lastId: '', items: filtered });
  }

  // ======================= 4. SERVICE GROUPS & AGENCIES =======================
  if (lookupPath === '/api/v1/configuring/service-group/list-by-citizen-with-parent' || lookupPath === '/api/v1/configuring/service-group/list-formality-by-service-group-id') {
    const sgRes = handleEnrichedServiceGroups(lookupPath, body);
    if (sgRes) return sgRes;
  }

  if (lookupPath === '/api/v1/submitting/formality/list-department-url-by-citizen') {
    const deptRes = handleEnrichedDepartmentUrls(body);
    if (deptRes) return deptRes;
  }

  if (lookupPath === '/api/v1/configuring/citizen/department/list-with-location') {
    const res = handleSearchApi('POST', lookupPath, '', JSON.stringify(body));
    if (!res) return null;
    const rows = res.body?.data?.rows || [];
    const parentCode = String(body.parentCode || '').trim();
    const provCode = String(body.provinceCode || '').trim();
    const typeFilter = String(body.type || '').toUpperCase();
    const qNorm = normalizeVi(body.name || '');
    if (
      (parentCode === 'G01' || (provCode === '01' && typeFilter === 'PROVINCIAL_DEPARTMENT')) &&
      !rows.some((r) => r.id === CONGAN_HANOI_DEPT.id) &&
      (!qNorm || normalizeVi(CONGAN_HANOI_DEPT.name).includes(qNorm))
    ) {
      rows.unshift(CONGAN_HANOI_DEPT);
      res.body.data.total = Math.max(res.body.data.total || 0, rows.length);
    }
    return res;
  }

  if (lookupPath.startsWith('/api/v1/organizing/citizen/')) {
    const orgRes = handleOrganizingDepartments(lookupPath, body);
    if (orgRes) return orgRes;
  }

  // ======================= 5. E-FORM, COMPONENTS, FEES & ROUTING =======================
  if (lookupPath === '/api/v1/configuring/formality/get-formality-form-by-citizen') {
    const fCaseId = String(body.formalityCaseId || '').trim();
    const fid = String(body.formalityId || '').trim();
    const captured = findCapturedFormEntry(fCaseId, fid);
    if (captured) {
      return ok({ ...captured, hasEformTemplate: true });
    }
    const meta = lookupFormalityMeta(fid, fCaseId);
    const isLltp = fid === CORE_SERVICE_IDS.LLTP_FORMALITY_ID || fid === CORE_SERVICE_IDS.LLTP_ALT_FORMALITY_ID || meta.code.startsWith('3.00033');
    const jsonObj = isLltp ? LLTP_FORM_JSON : buildGenericEformJson(meta.name, meta.code);
    return ok({
      formId: `form-${meta.code || 'generic'}`,
      version: 1,
      formJson: JSON.stringify(jsonObj),
      layoutStyle: 'FLAT',
      createdAt: 1769669944168,
      conditions: [],
      digitalSignature: false,
      hasEformTemplate: true,
      returningMethods: [
        { type: 'ONLINE', value: ['AT_SUBMISSION_PLACE', 'AT_HOME'] }
      ]
    });
  }

  if (lookupPath === '/api/v1/configuring/formality/get-profile-components-by-department-and-case') {
    const fCaseId = String(body.formalityCaseId || '').trim();
    const captured = findCapturedComponentsEntry(fCaseId, '');
    if (captured) return ok(captured);

    if (fCaseId === CORE_SERVICE_IDS.LLTP_CASE_ID) {
      return ok({ profileComponents: LLTP_PROFILE_COMPONENTS, executionCases: [] });
    }
    return ok({
      profileComponents: [
        {
          id: `comp-gen-${fCaseId || '01'}`,
          name: 'Tờ khai điện tử và bản chụp giấy tờ tùy thân / chứng minh theo quy định của thủ tục.',
          code: 'TP-GEN-01',
          originalQty: 1,
          copyQty: 0,
          required: false,
          hasEform: false,
          attachments: []
        }
      ],
      executionCases: []
    });
  }

  if (lookupPath === '/api/v1/submitting/get-formality-case-fees') {
    const fCaseId = String(body.formalityCaseId || '').trim();
    if (fCaseId === CORE_SERVICE_IDS.LLTP_CASE_ID) {
      const discount = body?.options?.doiTuongNopPhi;
      if (discount === 'MIEN_PHI') return ok({ formalityCaseFees: [] });
      if (discount === 'GIAM_50') {
        return ok({ formalityCaseFees: [{ ...LLTP_FEES[0], amount: 100000 }] });
      }
      return ok({ formalityCaseFees: LLTP_FEES });
    }
    return ok({ formalityCaseFees: [] });
  }

  if (lookupPath === '/api/v1/submitting/get-formality-case-shipping-fees') {
    return ok({ price: 25000, currency: 'VND' });
  }

  if (lookupPath === '/api/v1/submitting/citizen/check-dossier-routing') {
    return ok({ matched: true });
  }

  if (lookupPath === '/api/v1/submitting/citizen/export-eform-template-by-citizen') {
    const fileId = `eform-${crypto.randomUUID()}`;
    const mini = parseJsonSafe(body.miniFormJson, {});
    const lines = Object.entries(mini || {})
      .filter(([, v]) => v !== null && v !== undefined && typeof v !== 'object')
      .map(([k, v]) => `${k}: ${String(v)}`);
    state.uploads[fileId] = {
      fileId,
      fileName: 'to-khai-dien-tu.pdf',
      mimeType: 'application/pdf',
      kind: 'GENERATED_PDF',
      pdfTitle: 'TO KHAI DIEN TU - XEM TRUOC',
      pdfLines: [
        `Nguoi khai bao: ${PLACEHOLDER_CITIZEN.name} (${PLACEHOLDER_CITIZEN.citizenId})`,
        `Dia chi: ${PLACEHOLDER_CITIZEN.address}`,
        ...(lines.length ? lines : ['Da ke khai thong tin hop le tren Cong Dich vu cong'])
      ]
    };
    persistState();
    return ok({ fileId });
  }

  // ======================= 6. STATEFUL DOSSIER LIFECYCLE =======================
  if (lookupPath === '/api/v1/submitting/create-dossier-by-citizen' || lookupPath === '/api/v1/submitting/update-dossier-by-citizen') {
    const user = getActiveUser(state, req);
    const meta = lookupFormalityMeta(body.formalityId, body.formalityCaseId);
    const now = Date.now();
    const isDraft = !!body.isDraft;
    const isUpdate = lookupPath.endsWith('update-dossier-by-citizen') && body.dossierId;
    const existing = isUpdate ? state.dossiers.find((d) => d.id === body.dossierId) : null;

    const dossierId = existing?.id || body.dossierId || `dos-${crypto.randomUUID()}`;
    const dossierCode = existing?.code || `000.00.04.H26-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(state.dossiers.length + 1).padStart(4, '0')}`;

    const isLltp = meta.code.startsWith('3.00033') || body.formalityCaseId === CORE_SERVICE_IDS.LLTP_CASE_ID;
    const dept = isLltp ? CONGAN_HANOI_DEPT : BADINH_DEPT;

    const rawFees = Array.isArray(body.fees) ? body.fees : [];
    const totalFee = rawFees.reduce((s, f) => s + Number(f.amount || 0) * Number(f.qty || 1), 0);
    const needsPayment = !isDraft && totalFee > 0;
    const dossierState = isDraft ? 'DRAFT' : needsPayment ? 'FEE_REQUESTED' : 'PENDING_PROCESSING';

    const mappedFees = rawFees.map((f, i) => ({
      id: f.formalityCaseFeeId || f.id || `fee-${i + 1}`,
      feeId: f.feeId || `fee-${i + 1}`,
      name: isLltp ? 'Phí cung cấp thông tin lý lịch tư pháp' : 'Lệ phí giải quyết thủ tục',
      amount: Number(f.amount || 0),
      quantity: Number(f.qty || 1),
      qty: Number(f.qty || 1),
      currency: 'VND',
      paymentStatus: 'UNPAID',
      beneficiary: dept.name,
      transactionCode: '',
      receipt: { hasReceipt: false }
    }));

    const comps = (body.profileComponents || []).map((pc) => ({
      profileComponentId: pc.profileComponentId,
      name: pc.name || 'Thành phần hồ sơ đính kèm',
      originalQty: pc.originalQty ?? 1,
      copyQty: pc.copyQty ?? 0,
      attachments: pc.attachments || [],
      ...(pc.formJson ? { formJson: pc.formJson } : {}),
      ...(pc.miniFormJson ? { miniFormJson: pc.miniFormJson } : {})
    }));

    const record = {
      id: dossierId,
      code: dossierCode,
      trackingNumber: dossierCode,
      name: meta.name,
      ownerCitizenId: user.citizenId,
      isDraft,
      state: dossierState,
      formalityId: meta.id || body.formalityId,
      formalityName: meta.name,
      formalityCode: meta.code,
      formalityCaseId: body.formalityCaseId || meta.caseId,
      departmentId: body.departmentId || dept.id,
      departmentName: dept.name,
      departmentCode: dept.code,
      categoryId: body.categoryId || meta.categoryId,
      categoryName: meta.categoryName,
      type: body.type || 'CITIZEN',
      isBeneficiary: !!body.isBeneficiary,
      returning: body.returning || 'AT_SUBMISSION_PLACE',
      homeReturnInfo: body.homeReturnInfo || null,
      formJson: body.formJson || '{}',
      miniFormJson: body.miniFormJson || '{}',
      profileComponents: comps,
      fees: mappedFees,
      feeSummary: { unpaidAmount: totalFee, paidAmount: 0, totalAmount: totalFee },
      needsPayment,
      hasFees: mappedFees.length > 0 && totalFee > 0,
      hasReceipt: false,
      createdAt: existing?.createdAt || now,
      submittedAt: isDraft ? null : now,
      acceptPendingSubmissionAt: null,
      estimateReturnAt: isDraft ? null : now + 86400000 * 3,
      citizenRating: null,
      citizenRatingContent: '',
      isAllowWithdraw: !isDraft,
      isCancelling: false,
      returnResults: []
    };
    if (!isDraft) {
      record.returnResults = [buildElectronicOutcomeForDossier(record, state)];
    }
    record.history = [
      ...(existing?.history || []),
      {
        action: isDraft ? 'Lưu nháp hồ sơ' : 'Nộp hồ sơ trực tuyến',
        status: dossierState,
        actor: user.name,
        note: isDraft ? 'Công dân đã lưu nháp thông tin hồ sơ' : `Đã nộp hồ sơ tới ${dept.name}`,
        createdAt: now
      }
    ];

    if (existing) {
      Object.assign(existing, record);
    } else {
      state.dossiers.unshift(record);
    }
    persistState();

    return ok({
      dossierId: record.id,
      dossierCode: record.code,
      createdAt: record.createdAt
    });
  }

  if (lookupPath === '/api/v1/submitting/delete-dossier-by-citizen') {
    const id = String(body.dossierId || '');
    state.dossiers = state.dossiers.filter((d) => d.id !== id);
    persistState();
    return ok({ dossierId: id, state: 'DELETED' });
  }

  if (lookupPath === '/api/v1/submitting/count-dossier') {
    const user = getActiveUser(state, req);
    const mine = state.dossiers.filter((d) => !d.ownerCitizenId || d.ownerCitizenId === user.citizenId);
    const completed = mine.filter((d) => ['COMPLETED', 'FINISHED'].includes(d.state)).length;
    const processing = mine.filter((d) => !['DRAFT', 'COMPLETED', 'FINISHED', 'CANCELLED', 'TERMINATED'].includes(d.state)).length;
    return ok({ totalDossierComplete: completed, totalDossierProcessing: processing });
  }

  if (lookupPath === '/api/v1/submitting/list-dossier-by-citizen-id' || lookupPath === '/api/v1/submitting/list-dossier-by-citizen-id-in-home') {
    const user = getActiveUser(state, req);
    const kw = normalizeVi(body.keyword || '');
    const stateFilter = String(body.state || '').trim().toUpperCase();
    const tab = String(body.tab || '').trim().toUpperCase();

    const filtered = state.dossiers
      .filter((d) => !d.ownerCitizenId || d.ownerCitizenId === user.citizenId)
      .filter((d) => {
        if (stateFilter && d.state !== stateFilter) return false;
        if (tab === 'DRAFT' && d.state !== 'DRAFT') return false;
        if (tab === 'PROCESSING' && ['DRAFT', 'COMPLETED', 'FINISHED', 'CANCELLED', 'TERMINATED'].includes(d.state)) return false;
        if (tab === 'COMPLETE' && !['COMPLETED', 'FINISHED'].includes(d.state)) return false;
        if (kw && !normalizeVi(`${d.code} ${d.formalityName} ${d.departmentName}`).includes(kw)) return false;
        return true;
      })
      .map(formatDossierRow);

    const limit = Number(body.limit) || 10;
    let start = 0;
    if (body.lastId) {
      const idx = filtered.findIndex((r) => r.id === body.lastId);
      if (idx !== -1) start = idx + 1;
    }
    const rows = filtered.slice(start, start + limit);
    const nextLastId = start + limit < filtered.length && rows.length ? rows[rows.length - 1].id : '';
    return ok({ lastId: nextLastId, total: filtered.length, rows });
  }

  if (lookupPath === '/api/v1/submitting/get-detail-dossier-by-citizen') {
    const found = state.dossiers.find((d) => d.id === body.dossierId || d.code === body.dossierId);
    if (!found) return fail(404, 'NOT_FOUND', 'Không tìm thấy hồ sơ');
    return ok(buildDossierDetail(found));
  }

  if (lookupPath === '/api/v1/submitting/get-dossier-by-code') {
    const code = normalizeVi(body.code || '');
    const rows = state.dossiers
      .filter((d) => !d.isDraft && (!code || normalizeVi(d.code).includes(code)))
      .map(formatDossierRow);
    return ok({ rows, total: rows.length });
  }

  if (lookupPath === '/api/v1/submitting/list-dossier-by-implementing-agency') {
    const inc = normalizeVi(body.dossierIncrementCode || '');
    const rows = state.dossiers
      .filter((d) => !d.isDraft && (!inc || normalizeVi(d.code).includes(inc)))
      .map(formatDossierRow);
    return ok({ rows, total: rows.length });
  }

  if (lookupPath === '/api/v1/submitting/citizen/get-dossier-update-history') {
    const d = state.dossiers.find((x) => x.id === body.dossierId);
    return ok({ rows: d?.history || [], history: d?.history || [] });
  }

  if (lookupPath === '/api/v1/submitting/request-cancel-dossier-by-citizen') {
    const d = state.dossiers.find((x) => x.id === body.dossierId);
    if (!d) return fail(404, 'NOT_FOUND', 'Không tìm thấy hồ sơ');
    d.state = 'CANCELLED';
    d.isCancelling = true;
    d.isAllowWithdraw = false;
    d.cancelledAt = Date.now();
    d.history = [...(d.history || []), { action: 'Rút hồ sơ', status: 'CANCELLED', actor: PLACEHOLDER_CITIZEN.name, note: body.citizenReason || 'Công dân yêu cầu rút hồ sơ', createdAt: Date.now() }];
    persistState();
    return ok({ dossierId: d.id, state: d.state });
  }

  if (lookupPath === '/api/v1/submitting/dossier/rate') {
    const d = state.dossiers.find((x) => x.id === body.dossierId);
    if (!d) return fail(404, 'NOT_FOUND', 'Không tìm thấy hồ sơ');
    d.citizenRating = body.rating ?? 5;
    d.citizenRatingContent = body.content || '';
    d.citizenRatedAt = Date.now();
    persistState();
    return ok({ dossierId: d.id, citizenRating: d.citizenRating });
  }

  if (lookupPath === '/api/v1/submitting/get-dossier-shipping-info') {
    const d = state.dossiers.find((x) => x.code === body.dossierCode || x.id === body.dossierCode);
    return ok(
      d?.homeReturnInfo
        ? {
            dossierCode: d.code,
            status: 'CREATED',
            partnerCode: d.homeReturnInfo.partnerCode || 'VNPOST',
            recipientName: d.homeReturnInfo.recipientName || PLACEHOLDER_CITIZEN.name,
            recipientPhone: d.homeReturnInfo.recipientPhone || PLACEHOLDER_CITIZEN.phone,
            recipientAddress: d.homeReturnInfo.recipientAddress || PLACEHOLDER_CITIZEN.address
          }
        : null
    );
  }

  if (lookupPath === '/api/v1/submitting/list-edocument-by-citizen') {
    const type = String(body.type || 'UPLOADED').toUpperCase();
    const rows = [];
    for (const d of state.dossiers) {
      if (type === 'OUTCOME') {
        for (const r of d.returnResults || []) {
          if (r.attachment) {
            rows.push({
              id: r.attachment.fileId,
              name: r.name,
              code: d.formalityCode,
              dossierCode: d.code,
              type: 'OUTCOME',
              catalog: 0,
              metadata: { formality: { name: d.formalityName }, files: [r.attachment] }
            });
          }
        }
      } else {
        for (const pc of d.profileComponents || []) {
          if ((pc.attachments || []).length > 0) {
            rows.push({
              id: pc.attachments[0].fileId,
              name: pc.name,
              code: pc.profileComponentId,
              dossierCode: d.code,
              type: 'UPLOADED',
              catalog: 0,
              metadata: { formality: { name: d.formalityName }, files: pc.attachments }
            });
          }
        }
      }
    }
    return ok({ rows, total: rows.length, lastId: '' });
  }

  // ======================= 7. PAYMENT & RECEIPTS =======================
  if (lookupPath === '/api/v1/submitting/request-dossier-payment-by-citizen' || lookupPath === '/api/v1/submitting/request-dossier-payment-by-citizen-public') {
    const d = state.dossiers.find((x) => x.id === body.dossierId || x.code === body.dossierId || x.code === body.dossierCode);
    if (!d) return fail(404, 'NOT_FOUND', 'Không tìm thấy hồ sơ để thanh toán');
    const amount = d.feeSummary?.unpaidAmount || d.fees?.reduce((s, f) => s + Number(f.amount || 0) * Number(f.qty || 1), 0) || 200000;
    const trxId = `TRX-${Date.now().toString().slice(-8)}`;
    state.payments[trxId] = {
      transactionId: trxId,
      dossierId: d.id,
      dossierCode: d.code,
      amount,
      status: 'PENDING',
      date: Date.now()
    };
    persistState();
    const host = req?.headers?.host || 'localhost:4321';
    return ok({
      transactionId: trxId,
      redirectUrl: `http://${host}/thanh-toan-truc-tuyen/ket-qua-thanh-toan-phi-le-phi/${trxId}`
    });
  }

  if (lookupPath === '/api/v1/submitting/check-dossier-payment-status') {
    const code = String(body.code || '').trim();
    const pay = state.payments[code];
    if (!pay) return fail(404, 'NOT_FOUND', 'Không tìm thấy giao dịch');
    pay.status = 'PAID';
    pay.date = Date.now();
    const d = state.dossiers.find((x) => x.id === pay.dossierId);
    if (d) {
      d.fees = (d.fees || []).map((f) => ({
        ...f,
        paymentStatus: 'PAID',
        transactionCode: code,
        receipt: { hasReceipt: true }
      }));
      d.feeSummary = { unpaidAmount: 0, paidAmount: pay.amount, totalAmount: pay.amount };
      d.needsPayment = false;
      d.hasReceipt = true;
      if (d.state === 'FEE_REQUESTED' || d.state === 'PENDING_SUBMISSION') {
        d.state = 'PROCESSING';
      }
      d.acceptPendingSubmissionAt = d.acceptPendingSubmissionAt || Date.now();
      d.history = [
        ...(d.history || []),
        { action: 'Thanh toán trực tuyến thành công', status: 'PROCESSING', actor: 'Cổng thanh toán DVCQG', note: `Đã nộp ${pay.amount.toLocaleString('vi-VN')} VNĐ (${code})`, createdAt: Date.now() }
      ];
    }
    persistState();
    return ok({
      transactionId: code,
      status: 'PAID',
      amount: pay.amount,
      date: pay.date
    });
  }

  if (lookupPath === '/api/v1/submitting/get-successful-payment-by-dossier') {
    const list = Object.values(state.payments).filter((p) => p.dossierId === body.dossierId && p.status === 'PAID');
    return ok({ rows: list });
  }

  if (lookupPath === '/api/v1/submitting/get-list-transaction-history') {
    const rows = Object.values(state.payments).map((p) => {
      const d = state.dossiers.find((x) => x.id === p.dossierId);
      return {
        id: p.transactionId,
        transactionCode: p.transactionId,
        dossierId: p.dossierId,
        dossierCode: p.dossierCode || d?.code || '',
        formalityName: d?.formalityName || 'Thanh toán phí/lệ phí hồ sơ',
        amount: p.amount,
        status: p.status,
        paymentStatus: p.status,
        createdAt: p.date
      };
    });
    return ok({ rows, total: rows.length, lastId: '' });
  }

  if (lookupPath === '/api/v1/payment/get-dossier-by-code' || lookupPath === '/api/v1/payment/get-fee-by-dossier') {
    const code = normalizeVi(body.code || body.dossierCode || '');
    const d = state.dossiers.find((x) => normalizeVi(x.code) === code || x.id === body.dossierId);
    if (!d) return fail(404, 'NOT_FOUND', 'Không tìm thấy thông tin phí hồ sơ');
    return ok(buildDossierDetail(d));
  }

  if (lookupPath === '/api/v1/submitting/list-qna-dossier-by-citizen-id') {
    return ok({ rows: [], total: 0, lastId: '' });
  }

  return null;
}

export function getPortalEngineStats() {
  const s = getState();
  return {
    users: s.users.length,
    dossiers: s.dossiers.length,
    payments: Object.keys(s.payments).length,
    ...getSearchIndexStats()
  };
}
