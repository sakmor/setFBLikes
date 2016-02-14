// This is a JavaScript file
var facebookID;
var facebookName;
var facebooklikes;
var ssid;
var wifiPassword;
var ssidTest;
var facebookID_recent = new Array();
var fromTag = false;

$body = $("body");

$(document).on({
    ajaxStart: function () {
        $body.addClass("loading");
    },
    ajaxStop: function () {
        $body.removeClass("loading");
    }
});

//存檔系統
//todo:整理、說明..還有ssid部份也要存檔
//todo:還要清除...
if (localStorage["'facebookID_recent_storage'"]) {
    facebookID_recent = JSON.parse(localStorage["'facebookID_recent_storage'"]);
}



/**
 *  顯示最近輸入的Facebook帳號
 *  todo:寫得有點奇怪..
 */
function recentFacebook() {


    var i = facebookID_recent.length;
    $("#facebook_history").empty();
    if (i >= 1) {
        i--;
        for (i; i + 1 > 0; i--) {
            $("#facebook_history").append($('<li><a onclick="tagFunction(\'' + i + '\')" value=0 class="tag" href="#">' + facebookID_recent[i].fbn + '</a></li>'));
        }
        // $('#facebook_history').addClass('animated bounceIn');
    }

}

//如果使用者點擊tag標籤...
function tagFunction(mytext) {

    // $('#facebookURL').val(facebookID_recent[mytext].facebookID);
    nextPage(facebookID_recent[mytext].fbi);
    fromTag = true;

}

/**
 *  第二頁點擊繼續按鈕執行
 */
function nextPage(url) {

    if (url) {
        jQuery.getJSON('https://graph.facebook.com/?id=' + url + '&access_token=275419469142574%7CsvPvM8W-2HC09K9DArg59h5NPE4', 'likes', function (result) {
            document.getElementById("facebookName").innerHTML = '<i style="color:blue" class="fa fa-facebook-square"></i> ' + result.name;
            document.getElementById("facebookLikes").innerHTML = result.likes;
            $("#qrLogo").attr("src", "http://graph.facebook.com/" + result.username + "/picture?type=large");
            facebookID = result.id;
            facebookName = result.name;
            facebooklikes = result.likes;
        });


        myNavigator.pushPage('page3.html', {
            onTransitionEnd: function () {
                loadTest();
            }
        });



    } else {

        // //當輸入為空值時 將輸入框搖動
        $('#facebookURL').removeClass('animated shake');
        setTimeout(
            function () {
                $('#facebookURL').addClass('animated shake');
            }, 1);
    }


}

function nextPage2(url) {

    if (url) {
        jQuery.getJSON('https://graph.facebook.com/?id=' + url + '&access_token=275419469142574%7CsvPvM8W-2HC09K9DArg59h5NPE4', 'likes', function (result) {
            facebookID = result.id;
            facebookName = result.name;
            facebooklikes = result.likes;
            document.getElementById("getFbID").innerHTML = "抓取到" + facebooklikes + "個讚 ";
        });




    } else {

        // //當輸入為空值時 將輸入框搖動
        $('#facebookURL').removeClass('animated shake');
        setTimeout(
            function () {
                $('#facebookURL').addClass('animated shake');
            }, 1);
    }


}
/**
 *  當圖片讀取完畢的狀況下，隱藏Loading動畫，顯示內容
 *  12/12新增判定: 若該facebook不是粉絲團，則顯示提示訊息。
 */
function loadTest() {
    //如果facebookName不是undefined
    if (facebookName) {
        $("#qrLogo").load("http://graph.facebook.com/" + facebookName + "/picture?type=large", function () {
            $('#page3').addClass('animated fadeInUpBig');
            $("#page3").css('visibility', 'visible');
            $("#loadIcon").css("display", "none");
            $("#page3_bad").css("display", "none");

            //如果不是透過點擊現有tag 加到最近輸入過的...
            if (!fromTag) {

                //如果輸入超過20個..則移除第一項直到小於20
                while (facebookID_recent.length >= 20) {
                    facebookID_recent.shift();
                }

                //檢查是否重複直
                //如果有重複，把舊的砍掉
                var i = 0;
                for (i; i < facebookID_recent.length; i++) {
                    if (facebookID_recent[i].fbn == facebookName) {
                        if (facebookID_recent.length > 1) {
                            facebookID_recent.remove(i);
                        }
                    }
                }

                //將新增的數值丟到arry內
                facebookID_recent.push({
                    fbn: facebookName,
                    fbi: facebookID
                });

                //回存至硬碟
                localStorage["'facebookID_recent_storage'"] = JSON.stringify(facebookID_recent);

            }
        });
    } else {
        //如果facebookName是undefined
        $("#loadIcon").css("display", "none");
        $("#page3").css("display", "none");
        $("#page3_bad").css('visibility', 'visible');
        $('#page3_bad').addClass('animated shake');

    }

    (polarbear)
    console.log("loading complete" + facebookName);
}

/**
 *  第四頁點檢查使用者的SSID  
 */
function blinker() {

    getCurrentSSID();
    $('.blink_me').fadeOut(1000);
    $('.blink_me').fadeIn(1000);
}

function getCurrentSSID() {
    WifiWizard.getCurrentSSID(ssidHandler, fail);
}

//如果連結WIFI成功
function ssidHandler(s) {
    document.getElementById("yourSSID").innerHTML = s;

    //如果連結的SSID是 "FB_LIKE"
    if (s == "FB_LIKE06") {
        if (facebookID) {
            // myNavigator.pushPage('page5.html')
        }
    } else {

    };
}

function fail() {
    console.log("fail");

}
//設定機器
function setup() {
    ssid = $('#SSID').val();
    wifiPassword = $('#PW').val();
    console.log(ssid + "," + wifiPassword);
    $.ajax({
        url: "http://192.168.100.1:8080/Setting?SSID=" + ssid + "&PW=" + wifiPassword + "&FBID=" + facebookID,
        type: "GET",
        success: function (response) {
            console.log(response); //預期回覆:想要回覆的訊息!!!
        },
        error: function () {
            console.log("ajax error!");
        }
    });
}
//設定機器
function setup2() {

    ssid = $('#SSID').val();
    wifiPassword = $('#PW').val();


    $.ajax({
        url: "http://192.168.100.1:8080/Setting?SSID=" + ssid + "&PW=" + wifiPassword + "&FBID=" + facebookID,
        type: "GET",
        success: function (response) {
            console.log(response); //預期回覆:想要回覆的訊息!!!
        },
        error: function () {
            console.log("ajax error!");
        }
    });
}

function fail(e) {
    document.getElementById("connectID").innerHTML = "尚未連結WIFI";
}

function openlink() {

    window.open("http://192.168.100.1:8080");


}

/**
 *  使app支援滑動上一頁  
 */
//$.mobile.defaultPageTransition = 'slide';
//$(document).on('swiperight', function () {
//    recentFacebook();
//    myNavigator.popPage({
//        onTransitionEnd: function () {
//            facebookName = '';
//            document.getElementById('facebookURL').focus();
//        }
//    });
//});


//==============array remove=====
// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function (from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};
