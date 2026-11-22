/**
 * MockDB: Client-Side Database Emulation for Static Websites (GitHub Pages)
 * Uses browser localStorage for persistent state (submissions, drafts, tracking)
 * and in-memory offline datasets for catalogs (procedures, questions, agencies).
 */
(function(window) {
  'use strict';

  var STORAGE_KEY_DOSSIERS = 'dvc_emulated_dossiers';
  var STORAGE_KEY_USER = 'dvc_emulated_user';

  // Seed sample records if empty
  var INITIAL_DOSSIERS = [
    {
      code: "DVC-2026-753001",
      procedureCode: "1.000363",
      procedureName: "Đăng ký tạm vắng",
      applicantName: "Nguyễn Văn An",
      cccd: "001090012345",
      phone: "0912345678",
      createdAt: "2026-11-20 09:30:00",
      status: "Đang xử lý",
      statusClass: "info",
      agency: "Công an Phường Hàng Bài, Quận Hoàn Kiếm, Hà Nội",
      step: 2,
      history: [
        { time: "2026-11-20 09:30:00", text: "Nộp hồ sơ trực tuyến thành công qua Cổng DVCQG" },
        { time: "2026-11-20 14:15:00", text: "Cơ quan công an đã tiếp nhận và đang thẩm tra lý lịch" }
      ]
    },
    {
      code: "DVC-2026-755002",
      procedureCode: "1.002498",
      procedureName: "Cấp Giấy phép xây dựng mới đối với nhà ở riêng lẻ đô thị",
      applicantName: "Trần Thị Mai",
      cccd: "079185006789",
      phone: "0987654321",
      createdAt: "2026-11-18 10:00:00",
      status: "Có kết quả (Đã cấp phép)",
      statusClass: "success",
      agency: "UBND Quận 1, Thành phố Hồ Chí Minh",
      step: 4,
      history: [
        { time: "2026-11-18 10:00:00", text: "Nộp hồ sơ trực tuyến" },
        { time: "2026-11-19 08:30:00", text: "Kiểm tra thực địa địa điểm xây dựng" },
        { time: "2026-11-21 16:00:00", text: "Đã ký phê duyệt và cấp Giấy phép xây dựng điện tử" }
      ]
    }
  ];

  function getStoredDossiers() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY_DOSSIERS);
      if (!raw) {
        localStorage.setItem(STORAGE_KEY_DOSSIERS, JSON.stringify(INITIAL_DOSSIERS));
        return INITIAL_DOSSIERS;
      }
      return JSON.parse(raw);
    } catch (e) {
      console.warn("MockDB localStorage error:", e);
      return INITIAL_DOSSIERS;
    }
  }

  function saveStoredDossiers(list) {
    try {
      localStorage.setItem(STORAGE_KEY_DOSSIERS, JSON.stringify(list));
    } catch (e) {
      console.error("MockDB failed to save dossiers:", e);
    }
  }

  var MockDB = {
    dossiers: {
      /**
       * List all dossier records
       */
      getAll: function() {
        return getStoredDossiers();
      },

      /**
       * Find a dossier by its tracking code or CCCD
       */
      find: function(query) {
        if (!query) return [];
        var q = query.trim().toLowerCase();
        var all = getStoredDossiers();
        return all.filter(function(d) {
          return (d.code && d.code.toLowerCase().indexOf(q) !== -1) ||
                 (d.cccd && d.cccd.indexOf(q) !== -1) ||
                 (d.applicantName && d.applicantName.toLowerCase().indexOf(q) !== -1);
        });
      },

      /**
       * Create a new dossier submission (CRUD: Create)
       */
      create: function(data) {
        var all = getStoredDossiers();
        var randomNum = Math.floor(1000 + Math.random() * 9000);
        var now = new Date();
        var pad = function(n) { return n < 10 ? '0' + n : n; };
        var dateStr = now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate());
        var timeStr = dateStr + ' ' + pad(now.getHours()) + ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds());
        
        var newCode = "DVC-" + now.getFullYear() + "-" + randomNum;
        var newRecord = {
          code: newCode,
          procedureCode: data.procedureCode || "1.000000",
          procedureName: data.procedureName || "Thủ tục hành chính",
          applicantName: data.applicantName || "Người nộp hồ sơ",
          cccd: data.cccd || "001090000000",
          phone: data.phone || "0900000000",
          address: data.address || "Việt Nam",
          note: data.note || "",
          agency: data.agency || "Cơ quan hành chính có thẩm quyền",
          createdAt: timeStr,
          status: "Đã tiếp nhận trực tuyến",
          statusClass: "primary",
          step: 1,
          history: [
            { time: timeStr, text: "Đã tiếp nhận hồ sơ trực tuyến từ Cổng Dịch vụ công Quốc gia (Mã: " + newCode + ")" }
          ]
        };

        all.unshift(newRecord);
        saveStoredDossiers(all);
        return newRecord;
      },

      /**
       * Reset dossiers to initial seed state
       */
      reset: function() {
        localStorage.setItem(STORAGE_KEY_DOSSIERS, JSON.stringify(INITIAL_DOSSIERS));
        return INITIAL_DOSSIERS;
      }
    },

    /**
     * Query reference procedures (Catalog emulation)
     */
    procedures: {
      search: function(opts) {
        var list = window.OFFLINE_PROCEDURES || [];
        var kw = (opts && opts.keyword) ? opts.keyword.toLowerCase().trim() : '';
        var agency = (opts && opts.agency) ? opts.agency.toLowerCase().trim() : '';
        var field = (opts && opts.field) ? opts.field.toLowerCase().trim() : '';

        return list.filter(function(item) {
          var mKw = !kw || 
            (item.PROCEDURE_NAME && item.PROCEDURE_NAME.toLowerCase().indexOf(kw) !== -1) ||
            (item.PROCEDURE_CODE && item.PROCEDURE_CODE.toLowerCase().indexOf(kw) !== -1);
          var mAg = !agency || (item.PUBLISHED_AGENCY && item.PUBLISHED_AGENCY.toLowerCase().indexOf(agency) !== -1);
          var mFd = !field || (item.FIELD_NAME && item.FIELD_NAME.toLowerCase().indexOf(field) !== -1);
          return mKw && mAg && mFd;
        });
      },
      getByCode: function(code) {
        var list = window.OFFLINE_PROCEDURES || [];
        for (var i = 0; i < list.length; i++) {
          if (list[i].PROCEDURE_CODE === code) return list[i];
        }
        return null;
      }
    },

    /**
     * Query FAQs
     */
    questions: {
      search: function(kw) {
        var list = window.OFFLINE_QUESTIONS || [];
        if (!kw) return list;
        var q = kw.toLowerCase().trim();
        return list.filter(function(item) {
          return item.CONTENT && item.CONTENT.toLowerCase().indexOf(q) !== -1;
        });
      }
    }
  };

  window.MockDB = MockDB;
})(window);
