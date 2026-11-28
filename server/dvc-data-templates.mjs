import { normalizeVi } from './search-engine.mjs';

export const PLACEHOLDER_CITIZEN = {
  id: '019a0000-0000-7000-8000-000000000001',
  name: 'Nguyễn Văn A',
  nameUpper: 'NGUYỄN VĂN A',
  citizenId: '012345678912',
  oldCitizenId9: '012345678',
  birthDateIso: '2000-01-01',
  birthDateSlash: '01/01/2000',
  birthYear: '2000',
  gender: 'MALE',
  phone: '0912345678',
  email: 'nguyenvana@example.com',
  citizenIdIssueDate: '01/01/2022',
  citizenIdIssuePlace: 'Cục Cảnh sát quản lý hành chính về trật tự xã hội',
  address: 'Số 10, Phường Ba Đình, Thành phố Hà Nội',
  streetAddress: 'Số 10 Phan Đình Phùng',
  provinceCode: '01',
  provinceName: 'Thành phố Hà Nội',
  communeCode: '00004',
  communeName: 'Phường Ba Đình',
  type: 'CITIZEN'
};

export const BADINH_DEPT = {
  id: '019d2be3-6a97-765e-810b-522409d94bfd',
  name: 'UBND phường Ba Đình',
  code: 'H26.107',
  address: 'Số 12-14 Phan Đình Phùng, Phường Ba Đình, Thành phố Hà Nội',
  provinceCode: '01',
  parentCode: '01',
  level: 'COMMUNE',
  type: 'COMMUNE',
  agencyLevel: 'level_2',
  commune: {
    id: '019bad30-cd82-76ed-b1cc-18990a0e76bc',
    name: 'Phường Ba Đình',
    code: '00004',
    state: 'ACTIVE',
    provinceCode: '01'
  }
};

export const CONGAN_HANOI_DEPT = {
  id: '019d2be3-6ada-753f-9ac6-dca1733982ee',
  name: 'Công an Thành phố Hà Nội',
  code: 'H26.CA',
  address: 'Số 87 Trần Hưng Đạo, Thành phố Hà Nội',
  provinceCode: '01',
  parentCode: 'G01',
  level: 'PROVINCE',
  type: 'PROVINCIAL_DEPARTMENT',
  agencyLevel: 'level_2',
  commune: {
    id: '019bad30-cd82-76ed-b1cc-18990a0e76bc',
    name: 'Phường Ba Đình',
    code: '00004',
    state: 'ACTIVE',
    provinceCode: '01'
  }
};

// Well-known IDs captured from demo.har & services.har
export const CORE_SERVICE_IDS = {
  KHAI_SINH_FORMALITY_ID: '019d2bfd-3fe0-70ac-b9d6-5e9e20d6eef7',
  KHAI_SINH_CASE_ID: '019dd20f-6f0d-72cd-9eca-fbc9d34053a6',
  KHAI_SINH_LIEN_THONG_FID: '019dfb48-d8b5-75df-9e99-75e7dd0d7405',
  KHAI_SINH_LIEN_THONG_DT_FID: '019ff40e-c013-704a-be47-cee8794be2e2',
  LLTP_FORMALITY_ID: '019d2bf7-bd79-75fb-a4c6-ba1bf85d20ad',
  LLTP_ALT_FORMALITY_ID: '019d2bf7-bd6e-77de-83d1-c3c4f8bdb14e',
  LLTP_CASE_ID: '019dd333-0001-7000-8000-000000300333',
  HON_NHAN_FORMALITY_ID: '019d2bfd-6eb3-7019-bf3f-fc58c9ee44b9',
  HON_NHAN_CASE_ID: '019db0ca-2db5-749f-8967-9cd8d16b1b80',
  KHAI_TU_FORMALITY_ID: '019d2bfd-3fac-7489-b53b-9c6c958f2da4',
  KHAI_TU_CASE_ID: '019d6642-b82d-75cb-b429-16055891d02c',
  KHAI_TU_LIEN_THONG_FID: '019dfb6a-b51b-702a-9faf-8303e274c635',
  KHAI_TU_LIEN_THONG_DT_FID: '01a03d95-035a-701a-af30-45899ccb145c'
};

export const EXTRA_SERVICE_GROUPS = {
  // Parent group: "Cư trú và giấy tờ tùy thân"
  CU_TRU_PARENT_ID: '019b6e13-0cf4-70b7-b443-45281c901b6e',
  LLTP_GROUP_ID: '019d9064-0001-7000-8000-000000000001',
  // Parent group: "Hôn nhân và gia đình"
  HON_NHAN_PARENT_ID: '019b6e14-5b92-776a-ab2b-af9f0c261d97',
  TINH_TRANG_HN_GROUP_ID: '019d9064-0002-7000-8000-000000000002',
  // Existing "Khai sinh" child group
  KHAI_SINH_GROUP_ID: '019d9063-067f-74c8-a884-c017c367fd6a',
  // Existing "Khai tử" child group
  KHAI_TU_GROUP_ID: '019d9061-1969-7475-b107-ff1c89753a63'
};

export const LLTP_FORM_JSON = {
  triggers: [],
  headerView: 'basic',
  elements: [
    {
      type: 'panel',
      name: 'ThongTinNguoiNop[bca]LyLichTuPhap3000333Catalog',
      title: 'TỜ KHAI YÊU CẦU CẤP PHIẾU LÝ LỊCH TƯ PHÁP',
      elements: [
        {
          type: 'radiogroup',
          name: 'applicantType',
          title: 'Đối tượng thực hiện',
          defaultValue: 'CITIZEN',
          isRequired: true,
          choices: [{ value: 'CITIZEN', text: 'Công dân Việt Nam' }]
        },
        {
          type: 'panel',
          name: 'ThongTinNguoiYeuCauPanel',
          title: 'I. THÔNG TIN NGƯỜI YÊU CẦU CẤP PHIẾU LÝ LỊCH TƯ PHÁP',
          elements: [
            {
              type: 'text',
              name: 'hoVaTen',
              title: 'Họ, chữ đệm và tên',
              'Field Type': 'citizenName',
              isRequired: true,
              startWithNewLine: false
            },
            {
              type: 'text',
              name: 'soDinhDanh',
              title: 'Số CCCD / Định danh cá nhân',
              'Field Type': 'citizenIdentity',
              isRequired: true,
              startWithNewLine: false
            },
            {
              type: 'text',
              name: 'ngaySinh',
              title: 'Ngày, tháng, năm sinh',
              'Field Type': 'citizenDateOfBirth',
              inputType: 'date',
              isRequired: true,
              startWithNewLine: false
            },
            {
              type: 'dropdown',
              name: 'gioiTinh',
              title: 'Giới tính',
              'Field Type': 'citizenGender',
              isRequired: true,
              choices: [
                { value: 'MALE', text: 'Nam' },
                { value: 'FEMALE', text: 'Nữ' }
              ],
              startWithNewLine: false
            },
            {
              type: 'text',
              name: 'soDienThoai',
              title: 'Số điện thoại liên hệ',
              'Field Type': 'citizenPhone',
              isRequired: true,
              startWithNewLine: false
            },
            {
              type: 'text',
              name: 'diaChiThuongTru',
              title: 'Nơi thường trú hiện nay',
              'Field Type': 'citizenAddress',
              isRequired: true
            },
            {
              type: 'text',
              name: 'noiSinh',
              title: 'Nơi sinh (Tỉnh/Thành phố)',
              defaultValue: 'Thành phố Hà Nội',
              isRequired: true
            },
            {
              type: 'dropdown',
              name: 'danToc',
              title: 'Dân tộc',
              defaultValue: '01',
              choices: [
                { value: '01', text: 'Kinh' },
                { value: '02', text: 'Tày' },
                { value: '03', text: 'Thái' },
                { value: '04', text: 'Hoa' },
                { value: '05', text: 'Khơ-me' },
                { value: '06', text: 'Mường' }
              ],
              startWithNewLine: false
            },
            {
              type: 'text',
              name: 'quocTich',
              title: 'Quốc tịch',
              defaultValue: 'Việt Nam',
              startWithNewLine: false
            }
          ]
        },
        {
          type: 'panel',
          name: 'ThongTinPhieuPanel',
          title: 'II. NỘI DUNG YÊU CẦU CẤP PHIẾU LÝ LỊCH TƯ PHÁP',
          elements: [
            {
              type: 'radiogroup',
              name: 'loaiPhieuLltp',
              title: 'Loại Phiếu Lý lịch tư pháp yêu cầu cấp',
              isRequired: true,
              defaultValue: 'PHIEU_SO_1',
              choices: [
                { value: 'PHIEU_SO_1', text: 'Phiếu Lý lịch tư pháp số 1 (Xin việc, cấp giấy phép, hành nghề)' },
                { value: 'PHIEU_SO_2', text: 'Phiếu Lý lịch tư pháp số 2 (Cơ quan tố tụng / Thị thực định cư nước ngoài)' }
              ]
            },
            {
              type: 'text',
              name: 'mucDichYeuCau',
              title: 'Mục đích yêu cầu cấp Phiếu Lý lịch tư pháp',
              defaultValue: 'Bổ sung hồ sơ xin việc / hành nghề',
              isRequired: true
            },
            {
              type: 'text',
              name: 'soLuongBanGiay',
              title: 'Số lượng Phiếu Lý lịch tư pháp bản giấy đề nghị cấp thêm (ngoài bản điện tử)',
              inputType: 'number',
              defaultValue: 2,
              min: 0,
              max: 20,
              isRequired: true
            },
            {
              type: 'radiogroup',
              name: 'doiTuongNopPhi',
              title: 'Đối tượng nộp phí cung cấp thông tin lý lịch tư pháp',
              isRequired: true,
              defaultValue: 'CHUAN_200K',
              choices: [
                { value: 'CHUAN_200K', text: 'Đối tượng nộp phí thông thường (200.000 VNĐ)' },
                { value: 'GIAM_50', text: 'Sinh viên, người có công, thân nhân liệt sĩ (100.000 VNĐ)' },
                { value: 'MIEN_PHI', text: 'Trẻ em, người cao tuổi (>= 60 tuổi), hộ nghèo, người khuyết tật (0 VNĐ)' }
              ]
            }
          ]
        },
        {
          type: 'panel',
          name: 'ThongTinGiaDinhPanel',
          title: 'III. THÔNG TIN CHA, MẸ, VỢ/CHỒNG',
          elements: [
            { type: 'text', name: 'hoTenCha', title: 'Họ và tên Cha', defaultValue: 'Nguyễn Văn B', startWithNewLine: false },
            { type: 'text', name: 'namSinhCha', title: 'Năm sinh Cha', defaultValue: '1970', startWithNewLine: false },
            { type: 'text', name: 'hoTenMe', title: 'Họ và tên Mẹ', defaultValue: 'Trần Thị C', startWithNewLine: false },
            { type: 'text', name: 'namSinhMe', title: 'Năm sinh Mẹ', defaultValue: '1972', startWithNewLine: false },
            { type: 'text', name: 'hoTenVoChong', title: 'Họ và tên Vợ/Chồng (nếu có)' }
          ]
        },
        {
          type: 'paneldynamic',
          name: 'quaTrinhCuTru',
          title: 'IV. QUÁ TRÌNH CƯ TRÚ, NGHỀ NGHIỆP TỪ KHI ĐỦ 14 TUỔI ĐẾN NAY',
          panelAddText: 'Thêm giai đoạn cư trú',
          panelRemoveText: 'Xóa',
          minPanelCount: 1,
          defaultValue: [
            {
              tuThangNam: '01/2014',
              denThangNam: '11/2026',
              noiThuongTruTamTru: 'Phường Ba Đình, Thành phố Hà Nội',
              ngheNghiep: 'Sinh viên / Nhân viên văn phòng'
            }
          ],
          templateElements: [
            { type: 'text', name: 'tuThangNam', title: 'Từ tháng/năm', isRequired: true, startWithNewLine: false },
            { type: 'text', name: 'denThangNam', title: 'Đến tháng/năm', isRequired: true, startWithNewLine: false },
            { type: 'text', name: 'noiThuongTruTamTru', title: 'Nơi thường trú / tạm trú', isRequired: true },
            { type: 'text', name: 'ngheNghiep', title: 'Nghề nghiệp / Nơi làm việc' }
          ]
        }
      ]
    }
  ]
};

export const LLTP_PROFILE_COMPONENTS = [
  {
    id: 'comp-lltp-01',
    name: '- Tờ khai yêu cầu cấp Phiếu lý lịch tư pháp theo mẫu quy định (Đã điền trực tuyến trên Cổng).',
    code: 'TP-LLTP-01',
    originalQty: 1,
    copyQty: 0,
    required: false,
    hasEform: false,
    attachments: []
  },
  {
    id: 'comp-lltp-02',
    name: '- Bản chụp/bản điện tử Thẻ căn cước công dân hoặc Hộ chiếu còn giá trị sử dụng của người được cấp Phiếu lý lịch tư pháp (nếu hệ thống cần đối chiếu thêm).',
    code: 'TP-LLTP-02',
    originalQty: 0,
    copyQty: 1,
    required: false,
    hasEform: false,
    attachments: []
  },
  {
    id: 'comp-lltp-03',
    name: '- Giấy tờ chứng minh thuộc đối tượng được miễn hoặc giảm phí cung cấp thông tin lý lịch tư pháp (Thẻ sinh viên, giấy xác nhận hộ nghèo... - nếu có).',
    code: 'TP-LLTP-03',
    originalQty: 0,
    copyQty: 1,
    required: false,
    hasEform: false,
    attachments: []
  }
];

export const LLTP_FEES = [
  {
    id: 'fee-lltp-01',
    feeId: 'fee-lltp-200k',
    amount: 200000,
    paymentTiming: 'AT_SUBMISSION',
    qty: 1,
    defaultQty: 1,
    isAddFee: false,
    fee: {
      id: 'fee-lltp-200k',
      name: 'Phí cung cấp thông tin lý lịch tư pháp',
      code: 'LP-LLTP-200',
      type: 'FEE',
      note: '200.000 VNĐ/lần/người theo Thông tư 244/2016/TT-BTC'
    }
  }
];

export function buildGenericEformJson(procedureName, code) {
  return {
    triggers: [],
    headerView: 'basic',
    elements: [
      {
        type: 'panel',
        name: `ThongTinNguoiNop[dvc]${String(code || 'Generic').replace(/[^a-zA-Z0-9]/g, '')}Catalog`,
        title: `TỜ KHAI ĐIỆN TỬ - ${procedureName || 'THỦ TỤC HÀNH CHÍNH'}`,
        elements: [
          {
            type: 'text',
            name: 'hoVaTen',
            title: 'Họ và tên người nộp hồ sơ',
            'Field Type': 'citizenName',
            isRequired: true,
            startWithNewLine: false
          },
          {
            type: 'text',
            name: 'soDinhDanh',
            title: 'Số CCCD/CMND',
            'Field Type': 'citizenIdentity',
            isRequired: true,
            startWithNewLine: false
          },
          {
            type: 'text',
            name: 'ngaySinh',
            title: 'Ngày sinh',
            'Field Type': 'citizenDateOfBirth',
            inputType: 'date',
            startWithNewLine: false
          },
          {
            type: 'text',
            name: 'soDienThoai',
            title: 'Số điện thoại',
            'Field Type': 'citizenPhone',
            isRequired: true,
            startWithNewLine: false
          },
          {
            type: 'text',
            name: 'diaChi',
            title: 'Địa chỉ thường trú / liên hệ',
            'Field Type': 'citizenAddress',
            isRequired: true
          },
          {
            type: 'comment',
            name: 'noiDungYeuCau',
            title: 'Nội dung đề nghị giải quyết',
            defaultValue: `Đề nghị cơ quan có thẩm quyền giải quyết thủ tục: ${procedureName || ''}`,
            isRequired: true
          }
        ]
      }
    ]
  };
}

export function generateCaptchaSvgDataUri(code) {
  const chars = String(code || 'DVC26').split('');
  const palette = ['#903938', '#1E2F41', '#CE7A58', '#155E75', '#7C2D12'];
  const charSvg = chars
    .map((ch, idx) => {
      const x = 18 + idx * 24;
      const y = 30 + ((idx % 2) * 4 - 2);
      const rot = (idx - 2) * 8;
      const color = palette[idx % palette.length];
      return `<text x="${x}" y="${y}" transform="rotate(${rot} ${x} ${y})" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="${color}">${ch}</text>`;
    })
    .join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="150" height="44" viewBox="0 0 150 44"><rect width="150" height="44" rx="4" fill="#F8FAFC"/><line x1="10" y1="14" x2="140" y2="31" stroke="#CBD5E1" stroke-width="1.5"/><line x1="15" y1="32" x2="135" y2="12" stroke="#E2E8F0" stroke-width="1.2"/>${charSvg}</svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg, 'utf8').toString('base64')}`;
}

function toAsciiPdfSafe(text) {
  return normalizeVi(text)
    .replace(/[^a-z0-9\s.,:/()\-\[\]_@+#]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function escapePdfString(text) {
  return String(text || '').replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

/**
 * Generate a standards-compliant PDF 1.4 buffer so iframe preview and download endpoints
 * satisfy MIME check `application/pdf` natively in any browser.
 */
export function generateSimplePdfBuffer({ title, lines = [] }) {
  const safeLines = [
    toAsciiPdfSafe(title || 'CONG DICH VU CONG QUOC GIA').toUpperCase(),
    '----------------------------------------------------------------------',
    ...lines.map((l) => toAsciiPdfSafe(l)).filter(Boolean)
  ].slice(0, 38);

  const ops = ['BT', '/F1 12 Tf', '48 770 Td', '16 TL'];
  safeLines.forEach((line, idx) => {
    const chunk = line.slice(0, 86);
    if (idx === 0) {
      ops.push(`(${escapePdfString(chunk)}) Tj`);
    } else {
      ops.push(`T* (${escapePdfString(chunk)}) Tj`);
    }
  });
  ops.push('ET');
  const stream = ops.join('\n');

  const objects = [
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
    '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n',
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n',
    '4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n',
    `5 0 obj\n<< /Length ${Buffer.byteLength(stream, 'ascii')} >>\nstream\n${stream}\nendstream\nendobj\n`
  ];

  let body = '%PDF-1.4\n';
  const offsets = [0];
  for (const obj of objects) {
    offsets.push(Buffer.byteLength(body, 'ascii'));
    body += obj;
  }
  const xrefOffset = Buffer.byteLength(body, 'ascii');
  body += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= objects.length; i++) {
    body += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  body += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  return Buffer.from(body, 'ascii');
}

export function buildCitizenProfilePayload(user) {
  return {
    id: user.id,
    state: 'ACTIVE',
    createdAt: user.createdAt || 1735689600000,
    credentials: {
      citizenId: user.citizenId,
      phone: user.phone,
      email: user.email
    },
    profile: {
      name: user.name,
      citizenId: user.citizenId,
      oldCitizenId9: user.oldCitizenId9 || PLACEHOLDER_CITIZEN.oldCitizenId9,
      citizenIdIssueDate: user.citizenIdIssueDate || PLACEHOLDER_CITIZEN.citizenIdIssueDate,
      citizenIdIssuePlace: user.citizenIdIssuePlace || PLACEHOLDER_CITIZEN.citizenIdIssuePlace,
      phone: user.phone,
      email: user.email,
      address: user.address,
      gender: user.gender || 'MALE',
      birthPlace: user.birthPlace || `${PLACEHOLDER_CITIZEN.communeName}, ${PLACEHOLDER_CITIZEN.provinceName}`,
      birthDate: user.birthDateIso || PLACEHOLDER_CITIZEN.birthDateIso,
      type: user.type || 'CITIZEN',
      hometown: user.hometown || `${PLACEHOLDER_CITIZEN.communeName}, ${PLACEHOLDER_CITIZEN.provinceName}`,
      currentAddress: user.address,
      driverLicenseNumber: '',
      passportNumber: '',
      socialInsuranceCode: '0123456789',
      taxCode: user.citizenId,
      provinceCode: user.provinceCode || '01',
      communeCode: user.communeCode || '00004'
    },
    verification: { verified: true, level: 2 },
    externalInfo: JSON.stringify({
      name: user.name,
      citizenId: user.citizenId,
      phone: user.phone,
      address: user.address
    })
  };
}

export function buildCsdlqgCitizenRecord(user, requestedCode) {
  const targetCode = String(requestedCode || user.citizenId || PLACEHOLDER_CITIZEN.citizenId).trim();
  const isOwner = targetCode === user.citizenId;
  const displayName = isOwner ? user.name.toUpperCase() : 'NGUYỄN VĂN B';
  const birthSlash = isOwner ? (user.birthDateSlash || PLACEHOLDER_CITIZEN.birthDateSlash) : '15/05/1998';
  const birthYear = birthSlash.slice(-4) || '2000';
  const provinceCode = user.provinceCode || '01';
  const communeCode = user.communeCode || '00004';

  return {
    IdNguonDuLieu: 'CSDLQGVDC',
    MaLoaiDuLieu: 'CONGDAN',
    IdBanGhi: `DEMO-CSDL-${targetCode}`,
    PhienBan: 1,
    CitizenCode: targetCode,
    SoDinhDanh: targetCode,
    HoVaTen: displayName,
    TenKhac: null,
    GioiTinh: isOwner && user.gender === 'FEMALE' ? '2' : '1',
    TonGiao: 'Không',
    QuocTich: 'VN',
    NhomMau: null,
    NgayThangNamSinh: {
      NgayThangNam: birthSlash,
      ThangNam: null,
      Nam: birthYear
    },
    NoiSinh: {
      DiaChiChiTiet: PLACEHOLDER_CITIZEN.address,
      MaXa: communeCode,
      MaTinh: provinceCode,
      QuocGia: 'VN'
    },
    NoiDKKhaiSinh: {
      DiaChiChiTiet: null,
      MaXa: communeCode,
      MaTinh: provinceCode,
      QuocGia: 'VN'
    },
    QueQuan: {
      DiaChiChiTiet: null,
      MaXa: communeCode,
      MaTinh: provinceCode,
      QuocGia: 'VN'
    },
    DanToc: '01',
    NoiThuongTru: {
      DiaChiChiTiet: user.streetAddress || PLACEHOLDER_CITIZEN.streetAddress,
      MaXa: communeCode,
      MaTinh: provinceCode,
      QuocGia: 'VN'
    },
    NoiTamTru: {
      DiaChiChiTiet: null,
      MaXa: null,
      MaTinh: null,
      QuocGia: null
    },
    NoiOHienTai: {
      DiaChiChiTiet: user.streetAddress || PLACEHOLDER_CITIZEN.streetAddress,
      MaXa: communeCode,
      MaTinh: provinceCode,
      QuocGia: 'VN'
    },
    TTKhaiBaoTamVang: null,
    TrangThai: {
      LoaiTrangThai: '1',
      ThoiGianChetMatTich: { NgayThangNam: null, ThangNam: null, Nam: null }
    },
    DSGiayToDinhDanhCN: {
      GiayToDinhDanhCN: [
        {
          LoaiGiayTo: 'CCCD',
          SoGiayTo: targetCode,
          NgayCap: {
            NgayThangNam: PLACEHOLDER_CITIZEN.citizenIdIssueDate,
            ThangNam: null,
            Nam: birthYear
          },
          NoiCap: PLACEHOLDER_CITIZEN.citizenIdIssuePlace,
          NgayHetHan: {
            NgayThangNam: '01/01/2040',
            ThangNam: null,
            Nam: null
          }
        }
      ]
    },
    HoGD: {
      SoHosoCuTru: '010000001',
      SoDinhDanh: targetCode,
      QuanHe: 'Chủ hộ'
    },
    ThanhVienGD: {
      ThongTinBo: { HoVaTen: 'NGUYỄN VĂN B', SoCCCD: '012345678900', QuocTich: 'VN', SoCMND: '' },
      ThongTinMe: { HoVaTen: 'TRẦN THỊ C', SoCCCD: '012345678901', QuocTich: 'VN', SoCMND: '' },
      ThongTinVoChong: { HoVaTen: null, SoCCCD: null, QuocTich: 'VN', SoCMND: null }
    },
    TinhTrangHonNhan: '1',
    TrinhDoHV: null,
    NgheNghiep: null,
    DiaChiThuDienTu: user.email || PLACEHOLDER_CITIZEN.email,
    DSSoDienThoai: user.phone || PLACEHOLDER_CITIZEN.phone,
    IsDeleted: null
  };
}
