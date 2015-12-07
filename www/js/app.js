// This is a JavaScript file

var facebookID;
var ssid;
var wifiPassword;


/**
 *  第二頁點擊繼續按鈕執行
 */
function nextPage(url) {


    if (url) {
        jQuery.getJSON('https://graph.facebook.com/?id=' + url + '&access_token=275419469142574%7CsvPvM8W-2HC09K9DArg59h5NPE4', 'likes', function (result) {
            document.getElementById("facebookName").innerHTML = result.name;
            document.getElementById("facebookLikes").innerHTML = result.likes;
            $("#qrLogo").attr("src", "http://graph.facebook.com/" + result.username + "/picture?type=large");
            facebookID = result.id;

        });
        myNavigator.pushPage('page3.html');
    } else {

        document.getElementById("myText").innerHTML = "網址不可為空白";
    }


}

/**
 *  第四頁點檢查使用者的SSID  
 */
function blinker() {
    console.log("偵測SSID中");
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

//設定機器
function setup() {
    ssid = $('#SSID').val();
    wifiPassword = $('#PW').val();
    console.log(ssid + "," + wifiPassword)
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

//http://192.168.4.1/Setting?SSID=shome&PW=88888888&FBID=215976825086182
//http://192.168.4.1/Setting
function openlink() {
    WifiWizard.getCurrentSSID(ssidHandler, fail);

    window.open("http://192.168.100.1:8080");


}

//todo:這行寫在這邊 會造成一開始就在偵測使用者的ssid
//todo:偵測完使用者ssid後 應該要斷掉這個
setInterval(blinker, 1000);
