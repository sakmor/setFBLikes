// This is a JavaScript file
var facebookID;
var facebookName;
var facebooklikes;
var ssid;
var wifiPassword;
var ssidTest;


/**
 *  第二頁點擊繼續按鈕執行
 */
function nextPage(url) {


    if (url) {

        jQuery.getJSON('https://graph.facebook.com/?id=' + url + '&access_token=275419469142574%7CsvPvM8W-2HC09K9DArg59h5NPE4', 'likes', function(result) {
            document.getElementById("facebookName").innerHTML ='<i style="color:blue" class="fa fa-facebook-square"></i> '+ result.name;
            document.getElementById("facebookLikes").innerHTML = result.likes;
            $("#qrLogo").attr("src", "http://graph.facebook.com/" + result.username + "/picture?type=large");
            facebookID = result.id;
            facebookName = result.name;
            facebooklikes = result.likes;
        });


        myNavigator.pushPage('page3.html', {
            onTransitionEnd: function() {
                loadTest();
            }
        });



    } else {

        document.getElementById("emptyText").innerHTML = "網址不可為空白";
    }


}
/**
 *  當圖片讀取完畢的狀況下，隱藏Loading動畫，顯示內容
 *  12/12新增判定: 若該facebook不是粉絲團，則顯示提示訊息。
 */
function loadTest() {
    //如果facebookName不是undefined
    if (facebookName) {
        $("#qrLogo").load("http://graph.facebook.com/" + facebookName + "/picture?type=large", function() {
            $('#page3').addClass('animated fadeInUpBig');
            $("#page3").css('visibility', 'visible');
            $("#loadIcon").css("display", "none");
            $("#page3_bad").css("display", "none");

        });
    } else {
    //如果facebookName是undefined
            $("#loadIcon").css("display", "none");
            $("#page3").css("display", "none");
            $("#page3_bad").css('visibility', 'visible');
            $('#page3_bad').addClass('animated shake');

    }


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
    console.log(ssid + "," + wifiPassword)
    $.ajax({
        url: "http://192.168.100.1:8080/Setting?SSID=" + ssid + "&PW=" + wifiPassword + "&FBID=" + facebookID,
        type: "GET",
        success: function(response) {
            console.log(response); //預期回覆:想要回覆的訊息!!!
        },
        error: function() {
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



//todo:這行寫在這邊 會造成一開始就在偵測使用者的ssid
//todo:偵測完使用者ssid後 應該要斷掉這個