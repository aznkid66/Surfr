var bg;

function updateUserHistory() {
    $("#user-history").empty();
    console.log(bg.top10_user);
    for (var i = 0; i < bg.top10_user.length; i++) {    
        $("#user-history").append('<a target="_blank" href="'
              + bg.top10_user[i].url
              + '">'
              + bg.top10_user[i].title
              + '</a><br>'
           );
    }
}

$(document).ready(function () {
    bg = chrome.extension.getBackgroundPage();
    updateUserHistory();
    $("#clear").click(function () {
        bg.myFirebase.child(bg.user).remove();
        bg.top10_user = [];
      });
});
