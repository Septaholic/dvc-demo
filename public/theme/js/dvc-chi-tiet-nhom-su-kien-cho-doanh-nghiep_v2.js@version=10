
// Params
var PAGE_SIZE = 10;
var PAGE_SIZE_PROCEDURE = 5;
var CURRENT_EVENT;

// Init data
$(document).ready(function () {
   $('.list-document').on('click', function () {
      event.stopPropagation();
   });

   $("#tuKhoa").keyup(function (e) {
      if (e.which == 13) {
          searchProcedureEnterprise();
      }
   });
});


// Danh sach TTHC theo su kien
function getProcedureByEvent(id) {
   var obj = new Object();
   obj.service = "dvcqg_gets_procedure_by_event_id_limit_v2";
   obj.type = "ref";
   obj.limit = PAGE_SIZE;
   obj.event_id = id;

   var result = apiservice.AjaxJson.executeQuery(obj);
   console.log(result);
   var _html = '';
   if (result != null && result.length > 0) {
      $.each(result, function (i) {
         var targetUrl = result[i].URL || ('dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=' + result[i].PROCEDURE_CODE + '.html');
         _html += '<li><a href="' + targetUrl + '">' + result[i].PROCEDURE_NAME + '</a></li>';
      });
      $('#event_' + id).html(_html);
      if (result[0] .TOTAL > PAGE_SIZE) $('#eventViewMore_' + id).show();
      else $('#eventViewMore_' + id).hide();
   } else $('#eventViewMore_' + id).hide();
}

function actionSearchProcedure() {
   if (event.keyCode == 13){
      getsProcedure(1);
   }
}


// Search Procedure
function  searchProcedureEnterprise() {
   var tuKhoa = $("#tuKhoa").val().trim();
   if (tuKhoa === undefined || tuKhoa === "") {
      toastr.warning('Cần nhập từ khóa cần tìm.');
      return;
   }
   var href = 'dvc-ket-qua-thu-tuc-cho-doanh-nghiep.html?keyword=' + encodeURIComponent(tuKhoa);
   window.location.href = href;
}

// View list procedure by event
function actionViewMore(id, name) {
   event.stopPropagation();
   CURRENT_EVENT = id;
   $('#txtProcedureName').val('');
   getsProcedure(1);
   $('#modalMoreTTHC').modal('show');
   $('#procedures_title').html(name);
   
}

function getsProcedure(currentPage) {
   var obj = new Object();
   obj.service = "dvcqg_gets_procedure_by_event_service_v2";
   obj.type = "ref";
   obj.page_index = currentPage;
   obj.procedure_name = $('#txtProcedureName').val().toLowerCase().trim();
   obj.page_size = PAGE_SIZE_PROCEDURE;
   obj.event_id = CURRENT_EVENT;
   var results = apiservice.AjaxJson.executeQuery(obj);
   console.log(results);
   if (results && results != null && results.length > 0) {
      renderHTML(results, currentPage, results[0].TOTAL);
   }
   else {
      $('#procedures_body').html('<li>Không tìm thấy bất kỳ kết quả nào</li>');
      loadPagination(0, 0, "paginationTTBySK", "changePageTTBySK", results, PAGE_SIZE_PROCEDURE);
   }
}

function renderHTML(result, currentPage, totalCnt) {
   var _html = '';
   $.each(result, function(i){
      var targetUrl = result[i].URL || ('dvc-chi-tiet-thu-tuc-hanh-chinh.html@ma_thu_tuc=' + result[i].PROCEDURE_CODE + '.html');
         _html += '<li><a href="' + targetUrl + '">' + result[i].PROCEDURE_NAME + '</a></li>';
   });
   $('#procedures_body').html(_html);
   loadPagination(parseInt(totalCnt), currentPage, "paginationTTBySK", "changePageTTBySK", result, PAGE_SIZE_PROCEDURE);
}

function changePageTTBySK(currentPage) {
   getsProcedure(currentPage);
}