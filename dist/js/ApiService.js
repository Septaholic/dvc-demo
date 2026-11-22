function isInteger(num) {
  return (num ^ 0) === num;
}

(function() {
  if (typeof window.OFFLINE_PROCEDURES === 'undefined') {
    var scripts = document.getElementsByTagName('script');
    var currentScriptPath = '';
    for (var i = 0; i < scripts.length; i++) {
      if (scripts[i].src && scripts[i].src.indexOf('ApiService.js') !== -1) {
        currentScriptPath = scripts[i].src.substring(0, scripts[i].src.lastIndexOf('/') + 1);
        break;
      }
    }
    document.write('<script src="' + (currentScriptPath || 'js/') + 'offline-data.js"><\/script>');
  }
})();

var TARGET_SERVICES_BY_EVENT = {
  // 0. Cấp Giấy phép xây dựng (Công dân - Event 313)
  "313": [
    {
      PROCEDURE_CODE: "1.002498",
      PROCEDURE_NAME: "Cấp Giấy phép xây dựng mới công trình cấp đặc biệt (bao gồm giấy phép xây dựng mới, sửa chữa, cải tạo, di dời)",
      URL: "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002498.html",
      ISNGANHDOC: 0,
      TOTAL: 2
    },
    {
      PROCEDURE_CODE: "1.003655",
      PROCEDURE_NAME: "Cấp Giấy phép xây dựng mới đối với công trình cấp I, II; nhà ở riêng lẻ đô thị",
      URL: "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.003655.html",
      ISNGANHDOC: 0,
      TOTAL: 2
    }
  ],
  // 0. Cấp Giấy phép xây dựng (Doanh nghiệp - Event 283)
  "283": [
    {
      PROCEDURE_CODE: "1.002498",
      PROCEDURE_NAME: "Cấp Giấy phép xây dựng mới công trình cấp đặc biệt (Doanh nghiệp)",
      URL: "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002498.html",
      ISNGANHDOC: 0,
      TOTAL: 2
    },
    {
      PROCEDURE_CODE: "1.003655",
      PROCEDURE_NAME: "Cấp Giấy phép xây dựng mới đối với công trình cấp I, II; dự án đầu tư",
      URL: "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.003655.html",
      ISNGANHDOC: 0,
      TOTAL: 2
    }
  ],
  // 1. Cấp Giấy chứng nhận an toàn thực phẩm (Doanh nghiệp - Event 295)
  "295": [
    {
      PROCEDURE_CODE: "1.000295",
      PROCEDURE_NAME: "Cấp Giấy chứng nhận cơ sở đủ điều kiện an toàn thực phẩm",
      URL: "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.000295.html",
      ISNGANHDOC: 0,
      TOTAL: 1
    }
  ],
  // 2. Đăng ký nuôi con nuôi (Công dân - Event 281)
  "281": [
    {
      PROCEDURE_CODE: "2.001263",
      PROCEDURE_NAME: "Đăng ký việc nuôi con nuôi trong nước",
      URL: "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=2.001263.html",
      ISNGANHDOC: 0,
      TOTAL: 3
    },
    {
      PROCEDURE_CODE: "2.001255",
      PROCEDURE_NAME: "Đăng ký lại việc nuôi con nuôi trong nước",
      URL: "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=2.001255.html",
      ISNGANHDOC: 0,
      TOTAL: 3
    },
    {
      PROCEDURE_CODE: "1.002312",
      PROCEDURE_NAME: "Thủ tục Đăng ký việc nuôi con nuôi thực tế",
      URL: "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002312.html",
      ISNGANHDOC: 0,
      TOTAL: 3
    }
  ],
  // 3. Cấp giấy phép an ninh trật tự (Doanh nghiệp - Event 268)
  "268": [
    {
      PROCEDURE_CODE: "1.000268",
      PROCEDURE_NAME: "Cấp Giấy chứng nhận đủ điều kiện về an ninh, trật tự để làm ngành, nghề đầu tư kinh doanh có điều kiện",
      URL: "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.000268.html",
      ISNGANHDOC: 0,
      TOTAL: 2
    },
    {
      PROCEDURE_CODE: "1.001029",
      PROCEDURE_NAME: "Thủ tục cấp giấy phép đủ điều kiện kinh doanh dịch vụ karaoke",
      URL: "dvc-tthc-thu-tuc-hanh-chinh-chi-tiet.html@ma_thu_tuc=1535.html",
      ISNGANHDOC: 0,
      TOTAL: 2
    }
  ],
  // 4. Cấp Giấy phép lao động cho người nước ngoài (Công dân - Event 267)
  "267": [
    {
      PROCEDURE_CODE: "1.000267",
      PROCEDURE_NAME: "Cấp Giấy phép lao động cho người lao động nước ngoài làm việc tại Việt Nam",
      URL: "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.000267.html",
      ISNGANHDOC: 0,
      TOTAL: 1
    }
  ],
  // 5. Đăng ký tạm vắng (Công dân - Event 363)
  "363": [
    {
      PROCEDURE_CODE: "1.000363",
      PROCEDURE_NAME: "Thủ tục Đăng ký tạm vắng",
      URL: "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.000363.html",
      ISNGANHDOC: 0,
      TOTAL: 1
    }
  ],
  // 6. Đăng ký trợ cấp bảo trợ xã hội (Công dân - Event 262)
  "262": [
    {
      PROCEDURE_CODE: "1.000262",
      PROCEDURE_NAME: "Đăng ký trợ cấp bảo trợ xã hội hàng tháng",
      URL: "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.000262.html",
      ISNGANHDOC: 0,
      TOTAL: 2
    },
    {
      PROCEDURE_CODE: "2.000740",
      PROCEDURE_NAME: "Người hưởng lĩnh chế độ bảo hiểm xã hội bằng tiền mặt chuyển sang lĩnh bằng tài khoản cá nhân",
      URL: "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=2.000740.html",
      ISNGANHDOC: 0,
      TOTAL: 2
    }
  ],
  // 7. Đăng ký bảo hộ nhãn hiệu, logo (Doanh nghiệp - Event 297)
  "297": [
    {
      PROCEDURE_CODE: "1.000297",
      PROCEDURE_NAME: "Thủ tục Đăng ký bảo hộ nhãn hiệu, logo thương hiệu",
      URL: "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.000297.html",
      ISNGANHDOC: 0,
      TOTAL: 1
    }
  ],
  // 8. Thông báo hoạt động khuyến mại (Doanh nghiệp - Event 292)
  "292": [
    {
      PROCEDURE_CODE: "2.000033",
      PROCEDURE_NAME: "Thông báo hoạt động khuyến mại",
      URL: "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=2.000033.html",
      ISNGANHDOC: 0,
      TOTAL: 2
    },
    {
      PROCEDURE_CODE: "2.000004",
      PROCEDURE_NAME: "Đăng ký hoạt động khuyến mại đối với chương trình khuyến mại mang tính may rủi trên địa bàn 01 tỉnh",
      URL: "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=2.000004.html",
      ISNGANHDOC: 0,
      TOTAL: 2
    }
  ],
  // 9. Cấp chứng chỉ hành nghề y dược (Công dân - Event 264)
  "264": [
    {
      PROCEDURE_CODE: "1.000264",
      PROCEDURE_NAME: "Cấp chứng chỉ hành nghề khám bệnh, chữa bệnh",
      URL: "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.000264.html",
      ISNGANHDOC: 0,
      TOTAL: 2
    },
    {
      PROCEDURE_CODE: "1.000265",
      PROCEDURE_NAME: "Cấp chứng chỉ hành nghề dược",
      URL: "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.000265.html",
      ISNGANHDOC: 0,
      TOTAL: 2
    }
  ],
  // 10. Cấp đổi Hộ chiếu (Công dân - Event 273)
  "273": [
    {
      PROCEDURE_CODE: "1.001456",
      PROCEDURE_NAME: "Cấp hộ chiếu phổ thông ở trong nước (thực hiện tại cấp tỉnh)",
      URL: "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.001456.html",
      ISNGANHDOC: 0,
      TOTAL: 2
    },
    {
      PROCEDURE_CODE: "1.001471",
      PROCEDURE_NAME: "Cấp hộ chiếu phổ thông ở trong nước (thực hiện tại cấp trung ương)",
      URL: "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.001471.html",
      ISNGANHDOC: 0,
      TOTAL: 2
    }
  ],
  // 11. Đăng ký kết hôn (Công dân - Event 274)
  "274": [
    {
      PROCEDURE_CODE: "1.000274",
      PROCEDURE_NAME: "Thủ tục Đăng ký kết hôn",
      URL: "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.000274.html",
      ISNGANHDOC: 0,
      TOTAL: 2
    },
    {
      PROCEDURE_CODE: "1.001695",
      PROCEDURE_NAME: "Thủ tục đăng ký kết hôn có yếu tố nước ngoài",
      URL: "dvc-chi-tiet-cau-hoi.html@id=17380&row_limit=1.html",
      ISNGANHDOC: 0,
      TOTAL: 2
    }
  ],
  // 12. Sang tên, đổi chủ xe (Công dân - Event 316)
  "316": [
    {
      PROCEDURE_CODE: "1.000316",
      PROCEDURE_NAME: "Thủ tục Đăng ký sang tên, di chuyển xe (Sang tên, đổi chủ xe)",
      URL: "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.000316.html",
      ISNGANHDOC: 0,
      TOTAL: 2
    },
    {
      PROCEDURE_CODE: "1.001261",
      PROCEDURE_NAME: "Cấp Giấy chứng nhận, Tem kiểm định an toàn kỹ thuật và bảo vệ môi trường đối với xe",
      URL: "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.001261.html",
      ISNGANHDOC: 0,
      TOTAL: 2
    }
  ]
};

var DEFAULT_PROVINCES = [
  { ID: "1", NAME: "Thành phố Hà Nội", CODE: "HN" },
  { ID: "2", NAME: "Thành phố Hồ Chí Minh", CODE: "HCM" },
  { ID: "3", NAME: "Thành phố Đà Nẵng", CODE: "DN" },
  { ID: "4", NAME: "Thành phố Hải Phòng", CODE: "HP" },
  { ID: "5", NAME: "Thành phố Cần Thơ", CODE: "CT" },
  { ID: "6", NAME: "Tỉnh Quảng Ninh", CODE: "QN" },
  { ID: "7", NAME: "Tỉnh Nghệ An", CODE: "NA" },
  { ID: "8", NAME: "Tỉnh Bình Dương", CODE: "BD" },
  { ID: "9", NAME: "Tỉnh Đồng Nai", CODE: "DNA" }
];

var DEFAULT_MINISTRIES = [
  { ID: "BCA", NAME: "Bộ Công an" },
  { ID: "BTP", NAME: "Bộ Tư pháp" },
  { ID: "BXD", NAME: "Bộ Xây dựng" },
  { ID: "BCT", NAME: "Bộ Công Thương" },
  { ID: "BYT", NAME: "Bộ Y tế" },
  { ID: "BLDTBXH", NAME: "Bộ Lao động - Thương binh và Xã hội" },
  { ID: "BGTVT", NAME: "Bộ Giao thông vận tải" },
  { ID: "BKHCN", NAME: "Bộ Khoa học và Công nghệ" }
];

function getOfflineResponse(jsonData) {
  var service = jsonData ? jsonData.service : '';
  var list = window.OFFLINE_PROCEDURES || [];
  var questions = window.OFFLINE_QUESTIONS || [];

  if (service === "procedure_get_new_procs_service_v2" || service === "procedure_advanced_search_service_v2") {
    var filtered = list.slice();
    var kw = (jsonData.keyword || jsonData.tu_khoa || '').toLowerCase().trim();
    if (kw) {
      filtered = filtered.filter(function(item) {
        return (item.PROCEDURE_NAME && item.PROCEDURE_NAME.toLowerCase().indexOf(kw) !== -1) ||
               (item.PROCEDURE_CODE && item.PROCEDURE_CODE.toLowerCase().indexOf(kw) !== -1);
      });
    }
    if (jsonData.field_id && jsonData.field_id !== '-1') {
      filtered = filtered.filter(function(item) {
        return item.FIELD_NAME == jsonData.field_id;
      });
    }
    if (jsonData.impl_agency_id && jsonData.impl_agency_id !== '-1') {
      filtered = filtered.filter(function(item) {
        return item.IMPLEMENTATION_AGENCY == jsonData.impl_agency_id;
      });
    }
    var total = filtered.length;
    var pageSize = parseInt(jsonData.records || jsonData.recordPerPage || 10, 10);
    var pageIndex = parseInt(jsonData.pageIndex || jsonData.page || 1, 10);
    var start = (pageIndex - 1) * pageSize;
    return filtered.slice(start, start + pageSize).map(function(item) {
      return Object.assign({}, item, { AMOUNT: total });
    });
  }

  if (service === "procedure_get_list_field_service_v2") {
    return window.OFFLINE_FIELDS || [];
  }

  if (service === "procedure_get_list_object_service_v2") {
    return [
      { ID: "1", NAME: "Công dân" },
      { ID: "2", NAME: "Doanh nghiệp" }
    ];
  }

  if (service === "get_list_impl_level_service") {
    return [
      { ID: "1", NAME: "Cấp Trung ương" },
      { ID: "2", NAME: "Cấp Tỉnh" },
      { ID: "3", NAME: "Cấp Huyện" },
      { ID: "4", NAME: "Cấp Xã" }
    ];
  }

  if (service === "procedure_get_list_agency_by_type_service_v2" || 
      service === "procedure_get_list_agency_by_type_service") {
    var roleType = jsonData ? jsonData.role_type : null;
    if (jsonData && jsonData.loaicoquan == 1) {
      return DEFAULT_MINISTRIES;
    }
    return window.OFFLINE_AGENCIES || DEFAULT_PROVINCES;
  }

  if (service === "dvcqg_get_bo_nganh_by_selected_v4" || service === "dvcqg_get_bo_nganh_by_selected_v2") {
    return DEFAULT_MINISTRIES;
  }

  if (service === "dvcqg_get_ubnd_tinh_thanh_by_selected_sevice" ||
      service === "dvcqg_get_tinh_thanh_by_selected_v2") {
    return DEFAULT_PROVINCES;
  }

  if (service === "dvcqg_get_quan_huyen_by_selected_v2") {
    return [
      { ID: "1", NAME: "Quận Ba Đình" },
      { ID: "2", NAME: "Quận Hoàn Kiếm" },
      { ID: "3", NAME: "Quận Cầu Giấy" },
      { ID: "4", NAME: "Quận 1" },
      { ID: "5", NAME: "Quận 3" }
    ];
  }

  if (service === "dvcqg_get_so_by_selected_v2") {
    return [
      { ID: "1", NAME: "Sở Xây dựng" },
      { ID: "2", NAME: "Sở Kế hoạch và Đầu tư" },
      { ID: "3", NAME: "Sở Y tế" },
      { ID: "4", NAME: "Sở Công Thương" },
      { ID: "5", NAME: "Sở Giao thông vận tải" },
      { ID: "6", NAME: "Sở Tư pháp" },
      { ID: "7", NAME: "Sở Lao động - Thương binh và Xã hội" }
    ];
  }

  if (service === "dvcqg_get_phuong_xa_by_selected_v2") {
    return [
      { ID: "1", NAME: "Phường Tràng Tiền" },
      { ID: "2", NAME: "Phường Hàng Bài" },
      { ID: "3", NAME: "Phường Bến Nghé" },
      { ID: "4", NAME: "Phường Bến Thành" }
    ];
  }

  if (service === "dvcqg_get_procedure_local_by_parent_id_service_v2") {
    var pCode = jsonData.parent_code || "1.000000";
    return [{
      PROCEDURE_CODE: pCode,
      LINK_DVC: "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=" + pCode + ".html",
      IS_CONNECTED: 1,
      AMOUNT: 1
    }];
  }

  if (service === "dvcqg_search_question_with_key_and_ministry_service_v2" || service === "crud_gets_news_service") {
    var filteredQ = questions.slice();
    var kw = (jsonData.tuKhoa || jsonData.keyword || '').toLowerCase().trim();
    if (kw) {
      filteredQ = filteredQ.filter(function(q) {
        return q.CONTENT && q.CONTENT.toLowerCase().indexOf(kw) !== -1;
      });
    }
    var totalQ = filteredQ.length;
    var start = parseInt(jsonData.startRecord || 0, 10);
    var end = parseInt(jsonData.endRecord || (start + 10), 10);
    return filteredQ.slice(start, end).map(function(item) {
      return Object.assign({}, item, { TOTAL_RESULT: totalQ });
    });
  }

  // Danh sach TTHC theo su kien (Accordion)
  if (service === "dvcqg_gets_procedure_by_event_id_limit_v2") {
    var eid = "" + (jsonData.event_id || "");
    if (TARGET_SERVICES_BY_EVENT[eid]) {
      var arr = TARGET_SERVICES_BY_EVENT[eid];
      return arr.map(function(item) {
        return {
          PROCEDURE_CODE: item.PROCEDURE_CODE,
          PROCEDURE_NAME: item.PROCEDURE_NAME,
          URL: item.URL,
          ISNGANHDOC: item.ISNGANHDOC || 0,
          TOTAL: arr.length
        };
      });
    }
    // Fallback: search in list by event id or generic
    return list.slice(0, 5).map(function(item) {
      return {
        PROCEDURE_CODE: item.PROCEDURE_CODE,
        PROCEDURE_NAME: item.PROCEDURE_NAME,
        URL: "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=" + item.PROCEDURE_CODE + ".html",
        ISNGANHDOC: 0,
        TOTAL: 5
      };
    });
  }

  // Danh sach TTHC theo su kien (Modal Xem them)
  if (service === "dvcqg_gets_procedure_by_event_service_v2") {
    var eid = "" + (jsonData.event_id || "");
    var arr = TARGET_SERVICES_BY_EVENT[eid] || list.slice(0, 10);
    var qname = (jsonData.procedure_name || '').toLowerCase().trim();
    if (qname) {
      arr = arr.filter(function(item) {
        return item.PROCEDURE_NAME.toLowerCase().indexOf(qname) !== -1;
      });
    }
    return arr.map(function(item) {
      return {
        PROCEDURE_CODE: item.PROCEDURE_CODE,
        PROCEDURE_NAME: item.PROCEDURE_NAME,
        URL: item.URL || ("dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=" + item.PROCEDURE_CODE + ".html"),
        ISNGANHDOC: item.ISNGANHDOC || 0,
        TOTAL: arr.length
      };
    });
  }

  if (service === "searchCountSoTTHC" || service === "searchCountSoTTHCDuDieuKienToanTrinh" || 
      service === "searchCountSoTTHCCungCapDVCToanTrinh" || service === "searchCountSoTTHCCungCapDVCMotPhan" || 
      service === "searchCountSoTTHCChuaCungCapDVC") {
    if (jsonData.isCount == 1) {
      return [{ 'COUNT(*)': list.length }];
    }
    var page = parseInt(jsonData.page || 1, 10);
    var pageSize = parseInt(jsonData.pageLength || 10, 10);
    var start = (page - 1) * pageSize;
    return list.slice(start, start + pageSize).map(function(item, idx) {
      return {
        ROW_STT: start + idx + 1,
        MATTHC: item.PROCEDURE_CODE,
        TENTTHC: item.PROCEDURE_NAME,
        LINHVUC: item.FIELD_NAME,
        TENCOQUAN: item.IMPLEMENTATION_AGENCY
      };
    });
  }

  if (service === "tk_sl_dvc_tructuyen_service") {
    return [{ SL_CONGDAN: "1.920", SL_DOANHNGHIEP: "1.250" }];
  }

  if (service === "ds_tyle_dvc_tructuyen_service") {
    return [];
  }

  return [];
}

function initApiService(restUrl){
  apiservice={};
  apiservice.AjaxJson = new ApiService(restUrl);
}

function ApiService(url){
  this.serviceURL = (url == null) ? "/jsp/rest.jsp" : url;
}

ApiService.prototype.executeQuery = function(jsonData, isNormalHtml){
  var self = apiservice.AjaxJson;
  var objJson = new Object();
  objJson.params = JSON.stringify(jsonData);
  var rt = null;
  try {
    rt = $.ajax({
      url: self.serviceURL,
      type: 'POST',
      async: false,
      dataType:'json',
      data: objJson,
      error: function(data){
        // offline fallback
      }
    }).responseJSON;
  } catch (e) {}

  if (rt === undefined || rt === null) {
    rt = getOfflineResponse(jsonData);
  }

  return isNormalHtml ? rt : ((rt && !isInteger(rt) && rt.length > 0) ? JSON.parse(escapeHTML(JSON.stringify(rt))) : rt);
}

function escapeHTML(string){
  var pre = document.createElement('pre');
  var text = document.createTextNode(string);
  pre.appendChild(text);
  return pre.innerHTML.replace(/&amp;/g,'&');
}

ApiService.prototype.executeQueryAsync = function(jsonData, callbackFunction, callbackOnError) {
  var self = apiservice.AjaxJson;
  var objJson = new Object();
  objJson.params = JSON.stringify(jsonData);
  $.ajax({
    url: self.serviceURL,
    type: 'POST',
    async: true,
    dataType: 'json',
    data: objJson,
    error: function(error) {
      var offline = getOfflineResponse(jsonData);
      if (callbackFunction) callbackFunction(offline);
    },
    success: function(data) {
      callbackFunction(data);
    }
  });
}

ApiService.prototype.executeQueryAsync2 = function(jsonData, callbackFunction){
  var self = apiservice.AjaxJson;
  var objJson = new Object();
  objJson.params = JSON.stringify(jsonData);
  var rt = null;
  try {
    rt = $.ajax({
      url: self.serviceURL,
      type: 'POST',
      async: true,
      dataType: 'json',
      data: objJson,
      error: function(data){
        var offline = getOfflineResponse(jsonData);
        if (callbackFunction) callbackFunction(offline);
      },
      success: function(data) {
        callbackFunction(data);
      }
    }).responseJSON;
  } catch(e) {}
  if (rt === undefined || rt === null) {
    rt = getOfflineResponse(jsonData);
  }
  return true ? rt : ((rt && !Number.isInteger(rt) && rt.length > 0) ? JSON.parse(escapeHTML(JSON.stringify(rt))) : rt);
}
