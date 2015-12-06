// This is a JavaScript file

var facebookID;
var ssid;
var wifiPassword;

function nextPage(url) {


    if (url) {
        jQuery.getJSON('https://graph.facebook.com/?id=' + url + '&access_token=275419469142574%7CsvPvM8W-2HC09K9DArg59h5NPE4', 'likes', function (result) {
            document.getElementById("facebookName").innerHTML = result.name;
            document.getElementById("facebookID").innerHTML =result.id;
            document.getElementById("facebookLikes").innerHTML = result.likes;
            $("#qrLogo").attr("src", "http://graph.facebook.com/" + result.username + "/picture?type=large");
            facebookID= result.id;
            
        });
        myNavigator.pushPage('page3.html');
    } else {
        
        document.getElementById("myText").innerHTML = "網址不可為空白";
    }



}

function getCurrentSSID(){
    WifiWizard.getCurrentSSID(ssidHandler, fail);

}
function ssidHandler(s){
    console.log(s);
    
     if(s=="FB_LIKE"){
         window.open("http://192.168.100.1:8080");

          document.getElementById("connectID").innerHTML =s+" (成功)";
     }else{
          document.getElementById("connectID").innerHTML =s;
     }
;
}
function fail(e){
    document.getElementById("connectID").innerHTML ="尚未連結WIFI";
}

//http://192.168.4.1/Setting?SSID=shome&PW=88888888&FBID=215976825086182
//http://192.168.4.1/Setting
function openlink(){
    WifiWizard.getCurrentSSID(ssidHandler, fail);
    
window.open("http://192.168.100.1:8080");


}

function blinker() {
    getCurrentSSID();
    $('.blink_me').fadeOut(1000);
    $('.blink_me').fadeIn(1000);
}

setInterval(blinker, 1000);

    