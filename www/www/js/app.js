// This is a JavaScript file

function nextPage(url) {

    if (url) {
        jQuery.getJSON('https://graph.facebook.com/?id=' + url + '&access_token=275419469142574%7CsvPvM8W-2HC09K9DArg59h5NPE4', 'likes', function (result) {
            console.log(result.id);
            document.getElementById("facebookName").innerHTML = result.name;
            document.getElementById("facebookID").innerHTML = '(ID) ' + result.id;
            document.getElementById("facebookLikes").innerHTML = result.likes;
        });
        myNavigator.pushPage('page3.html');
    } else {
        console.log("error");
        document.getElementById("myText").innerHTML = "網址不可為空白";
    }

}