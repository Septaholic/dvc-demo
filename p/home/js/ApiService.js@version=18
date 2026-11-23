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
  "250": [
    {
      "PROCEDURE_CODE": "1.000689",
      "PROCEDURE_NAME": "Liên thông thủ tục đăng ký khai sinh, đăng ký thường trú và cấp thẻ BHYT cho trẻ dưới 6 tuổi",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.000689.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.001193",
      "PROCEDURE_NAME": "Thủ tục đăng ký khai sinh",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.001193.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    }
  ],
  "251": [
    {
      "PROCEDURE_CODE": "1.001193",
      "PROCEDURE_NAME": "Thủ tục đăng ký khai sinh",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.001193.html",
      "TOTAL": 5,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.000110",
      "PROCEDURE_NAME": "Thủ tục đăng ký khai sinh có yếu tố nước ngoài tại khu vực biên giới",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.000110.html",
      "TOTAL": 5,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.000893",
      "PROCEDURE_NAME": "Thủ tục đăng ký khai sinh có yếu tố nước ngoài cho người đã có hồ sơ, giấy tờ cá nhân",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.000893.html",
      "TOTAL": 5,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.000689",
      "PROCEDURE_NAME": "Thủ tục đăng ký khai sinh kết hợp đăng ký nhận cha, mẹ, con",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.000689.html",
      "TOTAL": 5,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.001695",
      "PROCEDURE_NAME": "Thủ tục đăng ký khai sinh kết hợp đăng ký nhận cha, mẹ, con có yếu tố nước ngoài",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.001695.html",
      "TOTAL": 5,
      "ISNGANHDOC": 0
    }
  ],
  "252": [],
  "253": [
    {
      "PROCEDURE_CODE": "1.000363",
      "PROCEDURE_NAME": "Thủ tục Đăng ký tạm vắng",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.000363.html",
      "TOTAL": 3,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.002691",
      "PROCEDURE_NAME": "Thủ tục đăng ký thường trú",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002691.html",
      "TOTAL": 3,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.002701",
      "PROCEDURE_NAME": "Thủ tục đăng ký tạm trú",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002701.html",
      "TOTAL": 3,
      "ISNGANHDOC": 0
    }
  ],
  "254": [
    {
      "PROCEDURE_CODE": "1.002541",
      "PROCEDURE_NAME": "Tuyển sinh vào các trường trung học phổ thông chuyên",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002541.html",
      "TOTAL": 4,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.002542",
      "PROCEDURE_NAME": "Tuyển sinh vào lớp 10 trung học phổ thông",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002542.html",
      "TOTAL": 4,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.002543",
      "PROCEDURE_NAME": "Tuyển sinh vào các lớp đầu cấp mầm non, tiểu học, trung học cơ sở",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002543.html",
      "TOTAL": 4,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.002544",
      "PROCEDURE_NAME": "Tuyển sinh đào tạo trình độ trung cấp, cao đẳng",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002544.html",
      "TOTAL": 4,
      "ISNGANHDOC": 0
    }
  ],
  "255": [
    {
      "PROCEDURE_CODE": "1.002551",
      "PROCEDURE_NAME": "Chuyển trường đối với học sinh trung học phổ thông",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002551.html",
      "TOTAL": 4,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.002552",
      "PROCEDURE_NAME": "Chuyển trường đối với học sinh tiểu học",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002552.html",
      "TOTAL": 4,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.002553",
      "PROCEDURE_NAME": "Chuyển trường đối với học sinh trung học cơ sở",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002553.html",
      "TOTAL": 4,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.002554",
      "PROCEDURE_NAME": "Tiếp nhận học sinh Việt Nam về nước học tập tại các trường trung học phổ thông",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002554.html",
      "TOTAL": 4,
      "ISNGANHDOC": 0
    }
  ],
  "256": [
    {
      "PROCEDURE_CODE": "1.003702",
      "PROCEDURE_NAME": "Hỗ trợ học tập đối với trẻ mẫu giáo, học sinh tiểu học, học sinh trung học cơ sở, sinh viên các dân tộc thiểu số rất ít người",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.003702.html",
      "TOTAL": 4,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.002561",
      "PROCEDURE_NAME": "Miễn, giảm học phí và hỗ trợ chi phí học tập đối với học sinh, sinh viên",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002561.html",
      "TOTAL": 4,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.002562",
      "PROCEDURE_NAME": "Xét cấp học bổng khuyến khích học tập cho học sinh, sinh viên",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002562.html",
      "TOTAL": 4,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.002563",
      "PROCEDURE_NAME": "Hỗ trợ chi phí học tập đối với sinh viên người dân tộc thiểu số học tại các cơ sở giáo dục đại học",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002563.html",
      "TOTAL": 4,
      "ISNGANHDOC": 0
    }
  ],
  "257": [
    {
      "PROCEDURE_CODE": "1.002571",
      "PROCEDURE_NAME": "Cấp bản sao văn bằng, chứng chỉ từ sổ gốc",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002571.html",
      "TOTAL": 4,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.002572",
      "PROCEDURE_NAME": "Công nhận văn bằng giáo dục nghề nghiệp do cơ sở giáo dục nước ngoài cấp",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002572.html",
      "TOTAL": 4,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.002573",
      "PROCEDURE_NAME": "Công nhận văn bằng do cơ sở giáo dục nước ngoài cấp để sử dụng tại Việt Nam",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002573.html",
      "TOTAL": 4,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.002574",
      "PROCEDURE_NAME": "Chỉnh sửa nội dung văn bằng, chứng chỉ",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002574.html",
      "TOTAL": 4,
      "ISNGANHDOC": 0
    }
  ],
  "259": [
    {
      "PROCEDURE_CODE": "1.002499",
      "PROCEDURE_NAME": "Tiếp nhận du học sinh học bổng ngân sách nhà nước tốt nghiệp về nước",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002499.html",
      "TOTAL": 5,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.002500",
      "PROCEDURE_NAME": "Tuyển sinh công dân Việt Nam ra nước ngoài học tập bằng học bổng ngân sách nhà nước",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002500.html",
      "TOTAL": 5,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.002501",
      "PROCEDURE_NAME": "Cử đi học nước ngoài",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002501.html",
      "TOTAL": 5,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.002502",
      "PROCEDURE_NAME": "Gia hạn thời gian học tập ở nước ngoài",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002502.html",
      "TOTAL": 5,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.002503",
      "PROCEDURE_NAME": "Cấp chính sách nội trú cho học sinh, sinh viên tham gia chương trình đào tạo trình độ cao đẳng, trung cấp tại các cơ sở giáo dục nghề nghiệp tư thục hoặc cơ sở giáo dục có vốn đầu tư nước ngoài",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002503.html",
      "TOTAL": 5,
      "ISNGANHDOC": 0
    }
  ],
  "260": [
    {
      "PROCEDURE_CODE": "1.002601",
      "PROCEDURE_NAME": "Tư vấn, giới thiệu việc làm cho người lao động",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002601.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.002602",
      "PROCEDURE_NAME": "Hỗ trợ học nghề đối với người lao động tham gia bảo hiểm thất nghiệp",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002602.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    }
  ],
  "261": [
    {
      "PROCEDURE_CODE": "1.002611",
      "PROCEDURE_NAME": "Thi tuyển công chức, viên chức",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002611.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.002612",
      "PROCEDURE_NAME": "Xét tuyển công chức, viên chức",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002612.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    }
  ],
  "262": [
    {
      "PROCEDURE_CODE": "1.000262",
      "PROCEDURE_NAME": "Đăng ký trợ cấp bảo trợ xã hội hàng tháng",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.000262.html",
      "TOTAL": 3,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "2.000740",
      "PROCEDURE_NAME": "Người hưởng lĩnh chế độ bảo hiểm xã hội bằng tiền mặt chuyển sang lĩnh bằng tài khoản cá nhân",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=2.000740.html",
      "TOTAL": 3,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.002621",
      "PROCEDURE_NAME": "Giải quyết hưởng trợ cấp thất nghiệp",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002621.html",
      "TOTAL": 3,
      "ISNGANHDOC": 0
    }
  ],
  "264": [
    {
      "PROCEDURE_CODE": "1.000264",
      "PROCEDURE_NAME": "Cấp chứng chỉ hành nghề khám bệnh, chữa bệnh",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.000264.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.001288",
      "PROCEDURE_NAME": "Cấp chứng chỉ hành nghề tư vấn về phòng cháy và chữa cháy",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.001288.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    }
  ],
  "265": [
    {
      "PROCEDURE_CODE": "1.002651",
      "PROCEDURE_NAME": "Thi nâng ngạch công chức",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002651.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.002652",
      "PROCEDURE_NAME": "Xét thăng hạng chức danh nghề nghiệp viên chức",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002652.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    }
  ],
  "266": [
    {
      "PROCEDURE_CODE": "1.002661",
      "PROCEDURE_NAME": "Quyết toán thuế thu nhập cá nhân đối với cá nhân trực tiếp quyết toán",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002661.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.002662",
      "PROCEDURE_NAME": "Đăng ký người phụ thuộc giảm trừ gia cảnh thuế TNCN",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002662.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    }
  ],
  "267": [
    {
      "PROCEDURE_CODE": "1.000267",
      "PROCEDURE_NAME": "Cấp Giấy phép lao động cho người lao động nước ngoài làm việc tại Việt Nam",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.000267.html",
      "TOTAL": 1,
      "ISNGANHDOC": 0
    }
  ],
  "269": [
    {
      "PROCEDURE_CODE": "1.002691",
      "PROCEDURE_NAME": "Thủ tục đăng ký thường trú",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002691.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.002692",
      "PROCEDURE_NAME": "Thủ tục tách hộ khẩu",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002692.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    }
  ],
  "270": [
    {
      "PROCEDURE_CODE": "1.002701",
      "PROCEDURE_NAME": "Thủ tục đăng ký tạm trú",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002701.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.002702",
      "PROCEDURE_NAME": "Thủ tục gia hạn tạm trú",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002702.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    }
  ],
  "271": [
    {
      "PROCEDURE_CODE": "1.002711",
      "PROCEDURE_NAME": "Thủ tục thông báo lưu trú",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002711.html",
      "TOTAL": 1,
      "ISNGANHDOC": 0
    }
  ],
  "272": [
    {
      "PROCEDURE_CODE": "1.002721",
      "PROCEDURE_NAME": "Cấp thẻ Căn cước công dân gắn chíp",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002721.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.002722",
      "PROCEDURE_NAME": "Đổi, cấp lại thẻ Căn cước công dân",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002722.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    }
  ],
  "273": [
    {
      "PROCEDURE_CODE": "1.001456",
      "PROCEDURE_NAME": "Cấp hộ chiếu phổ thông ở trong nước (thực hiện tại cấp tỉnh)",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.001456.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.001471",
      "PROCEDURE_NAME": "Cấp hộ chiếu phổ thông ở trong nước (thực hiện tại cấp trung ương)",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.001471.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    }
  ],
  "363": [
    {
      "PROCEDURE_CODE": "1.000363",
      "PROCEDURE_NAME": "Thủ tục Đăng ký tạm vắng",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.000363.html",
      "TOTAL": 1,
      "ISNGANHDOC": 0
    }
  ],
  "274": [
    {
      "PROCEDURE_CODE": "1.000274",
      "PROCEDURE_NAME": "Thủ tục Đăng ký kết hôn",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.000274.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.002245",
      "PROCEDURE_NAME": "Thủ tục đăng ký kết hôn có yếu tố nước ngoài",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002245.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    }
  ],
  "275": [
    {
      "PROCEDURE_CODE": "2.000547",
      "PROCEDURE_NAME": "Thủ tục ghi vào Sổ hộ tịch việc hộ tịch khác của công dân Việt Nam đã được giải quyết tại cơ quan có thẩm quyền của nước ngoài",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=2.000547.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.002751",
      "PROCEDURE_NAME": "Đăng ký giám hộ cử",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002751.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    }
  ],
  "279": [
    {
      "PROCEDURE_CODE": "1.001022",
      "PROCEDURE_NAME": "Thủ tục đăng ký nhận cha, mẹ, con",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.001022.html",
      "TOTAL": 3,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.000080",
      "PROCEDURE_NAME": "Thủ tục đăng ký nhận cha, mẹ, con có yếu tố nước ngoài tại khu vực biên giới",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.000080.html",
      "TOTAL": 3,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "2.000779",
      "PROCEDURE_NAME": "Thủ tục đăng ký nhận cha, mẹ, con có yếu tố nước ngoài",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=2.000779.html",
      "TOTAL": 3,
      "ISNGANHDOC": 0
    }
  ],
  "281": [
    {
      "PROCEDURE_CODE": "2.001263",
      "PROCEDURE_NAME": "Đăng ký việc nuôi con nuôi trong nước",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=2.001263.html",
      "TOTAL": 4,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "2.001255",
      "PROCEDURE_NAME": "Đăng ký lại việc nuôi con nuôi trong nước",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=2.001255.html",
      "TOTAL": 4,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.002312",
      "PROCEDURE_NAME": "Thủ tục Đăng ký việc nuôi con nuôi thực tế",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002312.html",
      "TOTAL": 4,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.004878",
      "PROCEDURE_NAME": "Giải quyết việc nuôi con nuôi có yếu tố nước ngoài đối với trường hợp cha dượng, mẹ kế nhận con riêng của vợ hoặc chồng",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.004878.html",
      "TOTAL": 4,
      "ISNGANHDOC": 0
    }
  ],
  "286": [
    {
      "PROCEDURE_CODE": "1.002861",
      "PROCEDURE_NAME": "Thủ tục đăng ký thay đổi, cải chính, bổ sung hộ tịch, xác định lại dân tộc",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002861.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.002862",
      "PROCEDURE_NAME": "Thủ tục cấp bản sao trích lục hộ tịch",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002862.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    }
  ],
  "287": [
    {
      "PROCEDURE_CODE": "1.002871",
      "PROCEDURE_NAME": "Đăng ký quyền sở hữu nhà ở và tài sản khác gắn liền với đất",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002871.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.002872",
      "PROCEDURE_NAME": "Cấp Giấy chứng nhận quyền sử dụng đất, quyền sở hữu nhà ở (Sổ đỏ)",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002872.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    }
  ],
  "288": [
    {
      "PROCEDURE_CODE": "1.002881",
      "PROCEDURE_NAME": "Đăng ký chuyển nhượng, tặng cho, thừa kế quyền sử dụng đất",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002881.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.001856",
      "PROCEDURE_NAME": "Công chứng hợp đồng ủy quyền, chuyển nhượng quyền sử dụng đất",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.001856.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    }
  ],
  "290": [
    {
      "PROCEDURE_CODE": "1.002901",
      "PROCEDURE_NAME": "Đăng ký thế chấp quyền sử dụng đất, tài sản gắn liền với đất",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002901.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.002902",
      "PROCEDURE_NAME": "Xóa đăng ký thế chấp quyền sử dụng đất",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002902.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    }
  ],
  "311": [
    {
      "PROCEDURE_CODE": "1.003111",
      "PROCEDURE_NAME": "Chuyển mục đích sử dụng đất phải được phép của cơ quan nhà nước có thẩm quyền",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.003111.html",
      "TOTAL": 1,
      "ISNGANHDOC": 0
    }
  ],
  "313": [
    {
      "PROCEDURE_CODE": "1.002498",
      "PROCEDURE_NAME": "Cấp Giấy phép xây dựng mới công trình cấp đặc biệt (bao gồm giấy phép xây dựng mới, sửa chữa, cải tạo, di dời)",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002498.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.003655",
      "PROCEDURE_NAME": "Cấp Giấy phép xây dựng mới đối với công trình cấp I, II; nhà ở riêng lẻ đô thị",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.003655.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    }
  ],
  "323": [
    {
      "PROCEDURE_CODE": "1.003231",
      "PROCEDURE_NAME": "Cấp điện sinh hoạt từ lưới điện hạ áp (220/380V)",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.003231.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.003232",
      "PROCEDURE_NAME": "Thay đổi chủ thể hợp đồng mua bán điện sinh hoạt",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.003232.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    }
  ],
  "312": [
    {
      "PROCEDURE_CODE": "1.000264",
      "PROCEDURE_NAME": "Cấp chứng chỉ hành nghề khám bệnh, chữa bệnh",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.000264.html",
      "TOTAL": 3,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.001656",
      "PROCEDURE_NAME": "Thanh toán trực tiếp chi phí khám, chữa bệnh BHYT",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.001656.html",
      "TOTAL": 3,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.001759",
      "PROCEDURE_NAME": "Khám chữa bệnh bảo hiểm y tế",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.001759.html",
      "TOTAL": 3,
      "ISNGANHDOC": 0
    }
  ],
  "314": [
    {
      "PROCEDURE_CODE": "1.002012",
      "PROCEDURE_NAME": "Cấp lại, đổi, điều chỉnh thông tin trên sổ BHXH, thẻ BHYT",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002012.html",
      "TOTAL": 9,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.003141",
      "PROCEDURE_NAME": "Đăng ký đóng, cấp thẻ BHYT đối với người chỉ tham gia BHYT",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.003141.html",
      "TOTAL": 9,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.003142",
      "PROCEDURE_NAME": "Giải quyết hưởng chế độ thai sản",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.003142.html",
      "TOTAL": 9,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.003143",
      "PROCEDURE_NAME": "Giải quyết hưởng chế độ ốm đau",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.003143.html",
      "TOTAL": 9,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.003144",
      "PROCEDURE_NAME": "Giải quyết hưởng trợ cấp nghỉ DSPHSK sau ốm đau, thai sản, TNLĐ, BNN",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.003144.html",
      "TOTAL": 9,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.001656",
      "PROCEDURE_NAME": "Thanh toán trực tiếp chi phí khám, chữa bệnh BHYT/Cấp giấy chứng nhận không cùng chi trả trong năm",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.001656.html",
      "TOTAL": 9,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.003145",
      "PROCEDURE_NAME": "Giải quyết hưởng chế độ TNLĐ, BNN đối với trường hợp bị TNLĐ lần đầu",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.003145.html",
      "TOTAL": 9,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.003146",
      "PROCEDURE_NAME": "Giải quyết hưởng chế độ TNLĐ, BNN đối với trường hợp đã bị TNLĐ, BNN nay tiếp tục bị TNLĐ hoặc BNN",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.003146.html",
      "TOTAL": 9,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.003147",
      "PROCEDURE_NAME": "Giải quyết hưởng chế độ TNLĐ, BNN do thương tật, bệnh tật tái phát",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.003147.html",
      "TOTAL": 9,
      "ISNGANHDOC": 0
    }
  ],
  "315": [
    {
      "PROCEDURE_CODE": "1.002821",
      "PROCEDURE_NAME": "Đổi Giấy phép lái xe do ngành Giao thông vận tải cấp",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002821.html",
      "TOTAL": 3,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.002822",
      "PROCEDURE_NAME": "Cấp lại Giấy phép lái xe",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002822.html",
      "TOTAL": 3,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.002823",
      "PROCEDURE_NAME": "Cấp Giấy phép lái xe quốc tế",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002823.html",
      "TOTAL": 3,
      "ISNGANHDOC": 0
    }
  ],
  "316": [
    {
      "PROCEDURE_CODE": "1.000316",
      "PROCEDURE_NAME": "Thủ tục Đăng ký sang tên, di chuyển xe (Sang tên, đổi chủ xe)",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.000316.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.003161",
      "PROCEDURE_NAME": "Đăng ký, cấp biển số xe mô tô, xe gắn máy lần đầu",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.003161.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    }
  ],
  "317": [
    {
      "PROCEDURE_CODE": "1.001261",
      "PROCEDURE_NAME": "Cấp Giấy chứng nhận, Tem kiểm định an toàn kỹ thuật và bảo vệ môi trường đối với phương tiện giao thông cơ giới đường bộ",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.001261.html",
      "TOTAL": 1,
      "ISNGANHDOC": 0
    }
  ],
  "318": [
    {
      "PROCEDURE_CODE": "1.003181",
      "PROCEDURE_NAME": "Hướng dẫn hoàn thiện hồ sơ hưởng chế độ hưu trí",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.003181.html",
      "TOTAL": 1,
      "ISNGANHDOC": 0
    }
  ],
  "319": [
    {
      "PROCEDURE_CODE": "2.000740",
      "PROCEDURE_NAME": "Người hưởng lĩnh chế độ bảo hiểm xã hội bằng tiền mặt chuyển sang lĩnh bằng tài khoản cá nhân",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=2.000740.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.003191",
      "PROCEDURE_NAME": "Giải quyết hưởng chế độ hưu trí hàng tháng",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.003191.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    }
  ],
  "320": [
    {
      "PROCEDURE_CODE": "1.000656",
      "PROCEDURE_NAME": "Thủ tục đăng ký khai tử",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.000656.html",
      "TOTAL": 3,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.000419",
      "PROCEDURE_NAME": "Thủ tục đăng ký khai tử lưu động",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.000419.html",
      "TOTAL": 3,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.001766",
      "PROCEDURE_NAME": "Thủ tục đăng ký khai tử có yếu tố nước ngoài",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.001766.html",
      "TOTAL": 3,
      "ISNGANHDOC": 0
    }
  ],
  "321": [
    {
      "PROCEDURE_CODE": "1.003211",
      "PROCEDURE_NAME": "Giải quyết hưởng trợ cấp mai táng phí",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.003211.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.003212",
      "PROCEDURE_NAME": "Giải quyết hưởng chế độ tử tuất một lần hoặc hàng tháng",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.003212.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    }
  ],
  "343": [
    {
      "PROCEDURE_CODE": "1.003431",
      "PROCEDURE_NAME": "Tiếp nhận, xử lý và thụ lý đơn khiếu nại của công dân",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.003431.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.003432",
      "PROCEDURE_NAME": "Tiếp nhận và giải quyết đơn tố cáo của công dân",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.003432.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    }
  ],
  "258": [
    {
      "PROCEDURE_CODE": "2.002043",
      "PROCEDURE_NAME": "Đăng ký thành lập công ty cổ phần",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=2.002043.html",
      "TOTAL": 4,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "2.002042",
      "PROCEDURE_NAME": "Đăng ký thành lập công ty hợp danh",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=2.002042.html",
      "TOTAL": 4,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.005176",
      "PROCEDURE_NAME": "Đăng ký thành lập, đăng ký thay đổi nội dung đăng ký hoạt động của doanh nghiệp",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.005176.html",
      "TOTAL": 4,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "2.002000",
      "PROCEDURE_NAME": "Đăng ký thay đổi chủ doanh nghiệp tư nhân trong trường hợp bán, tặng cho doanh nghiệp, chủ doanh nghiệp chết",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=2.002000.html",
      "TOTAL": 4,
      "ISNGANHDOC": 0
    }
  ],
  "263": [
    {
      "PROCEDURE_CODE": "1.000103",
      "PROCEDURE_NAME": "Thay đổi, bổ sung các thông tin của nhà thầu, nhà đầu tư đăng ký tham gia vào Hệ thống mạng đấu thầu quốc gia",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.000103.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "2.002097",
      "PROCEDURE_NAME": "Thẩm định báo cáo nghiên cứu tiền khả thi dự án đầu tư",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=2.002097.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    }
  ],
  "268": [
    {
      "PROCEDURE_CODE": "1.000268",
      "PROCEDURE_NAME": "Cấp Giấy chứng nhận đủ điều kiện về an ninh, trật tự để làm ngành, nghề đầu tư kinh doanh có điều kiện",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.000268.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.001029",
      "PROCEDURE_NAME": "Thủ tục cấp giấy phép đủ điều kiện kinh doanh dịch vụ karaoke",
      "URL": "dvc-tthc-thu-tuc-hanh-chinh-chi-tiet.html@ma_thu_tuc=1535.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    }
  ],
  "276": [
    {
      "PROCEDURE_CODE": "1.000267",
      "PROCEDURE_NAME": "Cấp Giấy phép lao động cho người lao động nước ngoài làm việc tại Việt Nam",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.000267.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.002761",
      "PROCEDURE_NAME": "Đăng ký nội quy lao động của doanh nghiệp",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002761.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    }
  ],
  "277": [
    {
      "PROCEDURE_CODE": "1.002011",
      "PROCEDURE_NAME": "Đăng ký, điều chỉnh đóng BHXH, BHYT, BHTN, BHTNLĐ-BNN; cấp sổ BHXH, thẻ BHYT",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002011.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.002012",
      "PROCEDURE_NAME": "Cấp lại, đổi, điều chỉnh thông tin sổ BHXH, thẻ BHYT",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002012.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    }
  ],
  "278": [
    {
      "PROCEDURE_CODE": "1.000762",
      "PROCEDURE_NAME": "Khai thuế GTGT năm theo phương pháp tính trực tiếp trên doanh thu",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.000762.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.007040",
      "PROCEDURE_NAME": "Khai thuế tiêu thụ đặc biệt đối với sản xuất, kinh doanh",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.007040.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    }
  ],
  "280": [
    {
      "PROCEDURE_CODE": "2.000482",
      "PROCEDURE_NAME": "Thủ tục trả nợ, trả lãi trực tiếp bằng tiền mặt của người vay vốn",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=2.000482.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "2.000436",
      "PROCEDURE_NAME": "Thủ tục phê duyệt cho hộ nghèo, hộ cận nghèo vay vốn tín dụng",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=2.000436.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    }
  ],
  "282": [
    {
      "PROCEDURE_CODE": "1.002821",
      "PROCEDURE_NAME": "Giao đất, cho thuê đất, cho phép chuyển mục đích sử dụng đất đối với tổ chức",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002821.html",
      "TOTAL": 1,
      "ISNGANHDOC": 0
    }
  ],
  "283": [
    {
      "PROCEDURE_CODE": "1.002498",
      "PROCEDURE_NAME": "Cấp Giấy phép xây dựng mới công trình cấp đặc biệt (Doanh nghiệp)",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002498.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.003655",
      "PROCEDURE_NAME": "Cấp Giấy phép xây dựng mới đối với công trình cấp I, II; dự án đầu tư",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.003655.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    }
  ],
  "284": [
    {
      "PROCEDURE_CODE": "1.000858",
      "PROCEDURE_NAME": "Nghiệm thu về phòng cháy và chữa cháy (thực hiện tại cấp trung ương)",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.000858.html",
      "TOTAL": 3,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.001013",
      "PROCEDURE_NAME": "Thẩm duyệt thiết kế về phòng cháy và chữa cháy đối với các dự án, công trình",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.001013.html",
      "TOTAL": 3,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.001288",
      "PROCEDURE_NAME": "Cấp chứng chỉ hành nghề tư vấn về phòng cháy và chữa cháy",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.001288.html",
      "TOTAL": 3,
      "ISNGANHDOC": 0
    }
  ],
  "285": [
    {
      "PROCEDURE_CODE": "1.002851",
      "PROCEDURE_NAME": "Thẩm định, phê duyệt báo cáo đánh giá tác động môi trường (ĐTM)",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002851.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.002852",
      "PROCEDURE_NAME": "Cấp Giấy phép môi trường đối với dự án đầu tư",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002852.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    }
  ],
  "324": [
    {
      "PROCEDURE_CODE": "1.003241",
      "PROCEDURE_NAME": "Cấp điện trung áp qua lưới điện phân phối đối với khách hàng doanh nghiệp",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.003241.html",
      "TOTAL": 1,
      "ISNGANHDOC": 0
    }
  ],
  "289": [
    {
      "PROCEDURE_CODE": "1.000533",
      "PROCEDURE_NAME": "Cấp Giấy chứng nhận xuất xứ hàng hoá (C/O) ưu đãi một chiều mẫu A",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.000533.html",
      "TOTAL": 1,
      "ISNGANHDOC": 0
    }
  ],
  "291": [
    {
      "PROCEDURE_CODE": "1.000490",
      "PROCEDURE_NAME": "Cấp Giấy chứng nhận xuất xứ hàng hoá (C/O) ưu đãi một chiều mẫu A",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.000490.html",
      "TOTAL": 1,
      "ISNGANHDOC": 0
    }
  ],
  "292": [
    {
      "PROCEDURE_CODE": "2.000033",
      "PROCEDURE_NAME": "Thông báo hoạt động khuyến mại",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=2.000033.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "2.000004",
      "PROCEDURE_NAME": "Đăng ký hoạt động khuyến mại đối với chương trình khuyến mại mang tính may rủi",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=2.000004.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    }
  ],
  "293": [
    {
      "PROCEDURE_CODE": "1.000694",
      "PROCEDURE_NAME": "Cấp Giấy chứng nhận xuất xứ hàng hoá (C/O) ưu đãi mẫu AANZ",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.000694.html",
      "TOTAL": 1,
      "ISNGANHDOC": 0
    }
  ],
  "294": [
    {
      "PROCEDURE_CODE": "1.002941",
      "PROCEDURE_NAME": "Thủ tục hải quan đối với hàng hóa xuất khẩu, nhập khẩu thương mại",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002941.html",
      "TOTAL": 1,
      "ISNGANHDOC": 0
    }
  ],
  "295": [
    {
      "PROCEDURE_CODE": "1.000295",
      "PROCEDURE_NAME": "Cấp Giấy chứng nhận cơ sở đủ điều kiện an toàn thực phẩm",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.000295.html",
      "TOTAL": 1,
      "ISNGANHDOC": 0
    }
  ],
  "296": [
    {
      "PROCEDURE_CODE": "1.002961",
      "PROCEDURE_NAME": "Yêu cầu áp dụng biện pháp tự vệ, chống bán phá giá",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002961.html",
      "TOTAL": 1,
      "ISNGANHDOC": 0
    }
  ],
  "297": [
    {
      "PROCEDURE_CODE": "1.000297",
      "PROCEDURE_NAME": "Thủ tục Đăng ký bảo hộ nhãn hiệu, logo thương hiệu",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.000297.html",
      "TOTAL": 1,
      "ISNGANHDOC": 0
    }
  ],
  "298": [
    {
      "PROCEDURE_CODE": "1.005323",
      "PROCEDURE_NAME": "Thủ tục đăng ký kiểu dáng công nghiệp",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.005323.html",
      "TOTAL": 1,
      "ISNGANHDOC": 0
    }
  ],
  "299": [
    {
      "PROCEDURE_CODE": "1.002991",
      "PROCEDURE_NAME": "Đăng ký hợp đồng chuyển giao công nghệ",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.002991.html",
      "TOTAL": 1,
      "ISNGANHDOC": 0
    }
  ],
  "300": [
    {
      "PROCEDURE_CODE": "1.005253",
      "PROCEDURE_NAME": "Thủ tục đăng ký sáng chế",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.005253.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.005256",
      "PROCEDURE_NAME": "Thủ tục đăng ký sáng chế theo Hiệp ước PCT có chỉ định Việt Nam",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.005256.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    }
  ],
  "301": [
    {
      "PROCEDURE_CODE": "1.003011",
      "PROCEDURE_NAME": "Đăng ký quyền tác giả, quyền liên quan",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.003011.html",
      "TOTAL": 1,
      "ISNGANHDOC": 0
    }
  ],
  "302": [
    {
      "PROCEDURE_CODE": "2.002069",
      "PROCEDURE_NAME": "Đăng ký hoạt động chi nhánh, văn phòng đại diện",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=2.002069.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "2.002070",
      "PROCEDURE_NAME": "Thông báo lập chi nhánh, văn phòng đại diện ở nước ngoài",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=2.002070.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    }
  ],
  "303": [
    {
      "PROCEDURE_CODE": "2.002045",
      "PROCEDURE_NAME": "Đăng ký thay đổi nội dung đăng ký hoạt động chi nhánh, văn phòng đại diện",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=2.002045.html",
      "TOTAL": 1,
      "ISNGANHDOC": 0
    }
  ],
  "304": [
    {
      "PROCEDURE_CODE": "1.000103",
      "PROCEDURE_NAME": "Thay đổi, bổ sung các thông tin của nhà thầu, nhà đầu tư đăng ký tham gia vào Hệ thống mạng đấu thầu quốc gia",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.000103.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "2.000124",
      "PROCEDURE_NAME": "Cấp chứng chỉ hành nghề hoạt động đấu thầu",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=2.000124.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    }
  ],
  "305": [
    {
      "PROCEDURE_CODE": "2.002097",
      "PROCEDURE_NAME": "Thẩm định báo cáo nghiên cứu tiền khả thi",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=2.002097.html",
      "TOTAL": 1,
      "ISNGANHDOC": 0
    }
  ],
  "306": [
    {
      "PROCEDURE_CODE": "1.003061",
      "PROCEDURE_NAME": "Đăng ký doanh nghiệp đối với trường hợp hợp nhất, sáp nhập công ty",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.003061.html",
      "TOTAL": 1,
      "ISNGANHDOC": 0
    }
  ],
  "307": [
    {
      "PROCEDURE_CODE": "1.003071",
      "PROCEDURE_NAME": "Đăng ký chuyển đổi loại hình doanh nghiệp",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.003071.html",
      "TOTAL": 1,
      "ISNGANHDOC": 0
    }
  ],
  "308": [
    {
      "PROCEDURE_CODE": "1.003081",
      "PROCEDURE_NAME": "Đăng ký doanh nghiệp đối with trường hợp chia, tách công ty",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.003081.html",
      "TOTAL": 1,
      "ISNGANHDOC": 0
    }
  ],
  "309": [
    {
      "PROCEDURE_CODE": "1.005176",
      "PROCEDURE_NAME": "Thông báo tạm ngừng kinh doanh của doanh nghiệp, chi nhánh, văn phòng đại diện",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.005176.html",
      "TOTAL": 1,
      "ISNGANHDOC": 0
    }
  ],
  "310": [
    {
      "PROCEDURE_CODE": "2.002023",
      "PROCEDURE_NAME": "Giải thể doanh nghiệp, giải thể trong trường hợp bị thu hồi Giấy chứng nhận đăng ký doanh nghiệp hoặc theo quyết định của Tòa án",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=2.002023.html",
      "TOTAL": 1,
      "ISNGANHDOC": 0
    }
  ],
  "344": [
    {
      "PROCEDURE_CODE": "1.003441",
      "PROCEDURE_NAME": "Giải quyết tranh chấp hợp đồng thương mại thông qua Trọng tài thương mại",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.003441.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
    },
    {
      "PROCEDURE_CODE": "1.003442",
      "PROCEDURE_NAME": "Hòa giải tranh chấp thương mại",
      "URL": "dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=1.003442.html",
      "TOTAL": 2,
      "ISNGANHDOC": 0
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
    // Fallback: if not mapped, filter list or return empty
    return [];
  }

  // Danh sach TTHC theo su kien (Modal Xem them)
  if (service === "dvcqg_gets_procedure_by_event_service_v2") {
    var eid = "" + (jsonData.event_id || "");
    var arr = TARGET_SERVICES_BY_EVENT[eid] || [];
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
