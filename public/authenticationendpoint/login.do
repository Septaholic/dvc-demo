







































<!doctype html>
<html>
<head>
    <!-- header -->
    
    












<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<link rel="icon" href="images/quoc_huy.ico" type="image/x-icon"/>
<link href="libs/themes/default/theme.min.css" rel="stylesheet">
<title>Cổng Dịch vụ công Quốc gia</title>

<script src="libs/jquery_3.4.1/jquery-3.4.1.js"></script>
<link href="css/custom-common.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="css/style.css">
<link href="fonts/Roboto.css" rel="stylesheet">
<link href="fonts/NunitoSans.css" rel="stylesheet">
<link href="fonts/Lora.css" rel="stylesheet">
<script src="js/config.js"></script>
    

    
</head>
<body class="login-portal layout authentication-portal-layout"
      style="background-color:#FBFBFB; font-family: Nunito Sans !important; width:100%; height: 850px;"
      onload="checkSessionKey()">
<main class="center-segment" style="margin-top:20px">
    <div class="ui container medium center aligned middle aligned" style="max-width: 660px !important;">

        <!-- product-title -->
        
        












<div class="">
      <div class="d-flex justify-content-center" id="logoHeader" style="margin-bottom:30px">
              <div class="col text-center mt-2 flex-column">
                  <a href="#" id="imgHeader" onclick="if(!is_mobile()){location.href=homeUrl;return false;}">
                      <img src="./images/quoc_huy.svg" alt="Smiley face" height="60" width="60">
                  </a>
                  <div class="d-flex justify-content-center" style="margin:0 auto">
                      <img src="./images/GroupTextHeader.svg">
                  </div>
              </div>
      </div>
</div>

        

        <div class="ui segment">
            <div class="ui header">
                <div class="text-center">
                    <h4
                            style="color: #333333;font-weight: bold; font-family: Nunito Sans !important;margin-bottom: 20px;font-size: 30px;
                                line-height: 24px;
                                font-weight: 600;">
                        Đăng nhập</h4>
                </div>
            </div>

            

            <div class="segment-form">
                
                
                
                
                <div class="field">
                    <div class="grid-container" style="max-width: 570px; margin: 0 auto; display: flex !important;">
                        
                    </div>
                </div>
                
                <div class="field" style="background-color: antiquewhite;padding: 30px;border-radius: 5px; margin: 10px">
                    <em class="text-uppercase" style="font-weight: bold">Thông báo từ hệ thống:</em>
                    <p>Khi đăng nhập các thông tin cá nhân (Họ và tên, ngày sinh, giới tính, số điện thoại,...) được đồng bộ từ VNeID sang Cổng Dịch vụ công Quốc gia để phục vụ giải quyết TTHC</p>
                </div>
            </div>
        </div>
    </div>
</main>

<!-- product-footer -->














<!-- footer -->
<footer  class="footer" id="sticky-footer" style="max-height: 9%; background-color:#913938;color: #fff;;width:100%; margin-left:0px; padding:10px;" >
            <div class="row text-white-200 fixed-bottom row d-flex justify-content-center" >
              <div class="footer-block"><h6 class="text-footer">Cơ quan chủ quản: Văn phòng Chính phủ</h6></div>
              <div class="footer-block"><h6 class="text-footer">www.dichvucong.gov.vn</h6></div>
              <div class="footer-block"><h6 class="text-footer">Tổng đài hỗ trợ: 18001096</h6></div>
              <div class="footer-block"><h6 class="text-footer">Email: dichvucong@chinhphu.vn</h6></div>
            </div>


</footer>



<!-- footer -->



<script src="libs/themes/default/semantic.min.js"></script>



<script>
    function checkSessionKey() {
        $.ajax({
            type: "GET",
            url: "../logincontext?sessionDataKey=null&relyingParty=null&tenantDomain=null",
            success: function (data) {
                if (data && data.status == 'redirect' && data.redirectUrl && data.redirectUrl.length > 0) {
                    window.location.href = data.redirectUrl;
                }
            },
            cache: false
        });
    }

    function getParameterByName(name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, '\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return "";
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    function is_mobile() {
        var agents = ['Android', 'webOs', 'iPhone', 'iPad', 'blackberry'];
        const device = localStorage.getItem('DEVICE');
        if (device == 'MOBILE') {
            return true;
        }
        for (i in agents) {
            if (navigator.userAgent.match(agents[i])) {
                return true;
            }
        }
        return false;
    }

    function hideFooterMobile() {
        if (is_mobile()) {
            $('#sticky-footer').hide();
        }
    }

    $(document).ready(function () {
        hideFooterMobile();
        $('.main-link').click(function () {
            $('.main-link').next().hide();
            $(this).next().toggle('fast');
            var w = $(document).width();
            var h = $(document).height();
            $('.overlay').css("width", w + "px").css("height", h + "px").show();
        });

        $('.overlay').click(function () {
            $(this).hide();
            $('.main-link').next().hide();
        });

        
    });

    function myFunction(key, value, name) {
        var object = document.getElementById(name);
        var domain = object.value;


        if (domain != "") {
            document.location = "../commonauth?idp=" + key + "&authenticator=" + value +
                "&sessionDataKey=null&domain=" +
                domain;
        } else {
            document.location = "../commonauth?idp=" + key + "&authenticator=" + value +
                "&sessionDataKey=null";
        }
    }

    function handleNoDomain(elem, key, value) {
        var linkClicked = "link-clicked";
        if ($(elem).hasClass(linkClicked)) {
            console.warn("Preventing multi click.")
        } else {
            $(elem).addClass(linkClicked);
            
            document.location = "../commonauth?idp=" + key + "&authenticator=" + value +
                "&sessionDataKey=null" +
                "";
        }
    }

    window.onunload = function () {
    };

    function changeUsername(e) {
        document.getElementById("changeUserForm").submit();
    }

    $('.isHubIdpPopupButton').popup({
        popup: '.isHubIdpPopup',
        on: 'click',
        position: 'top left',
        delay: {
            show: 300,
            hide: 800
        }
    });


    $(document).ready(function () {
        console.log("ready!");
        const queryString = window.location.search;
        console.log("\n\n\n\n\n\nqueryString" + queryString)
        if (queryString.includes("IDPBCA")) {
            console.log("thanhnd20 Click======");
            document.getElementsByClassName("login-IDP BCA")[0].click();
        }
    })


</script>


</body>
</html>
