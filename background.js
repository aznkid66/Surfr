
var myFirebase = new Firebase("https://surfr.firebaseio.com");
var user = "patrick";
var top10 = [];
var top10_user = [];

// top10 maintainence
myFirebase.on("child_added", 
  function (userSnapshot) {
      userSnapshot.ref().on("child_changed", 
        function (siteSnapshot) {
            if (top10.length>=10) {
                top10.splice(0,1);
            }
            //if (userSnapshot.key()!==user) {
                top10.push({
                    user: userSnapshot.key(),
                    title: siteSnapshot.val().title,
                    url: siteSnapshot.val().url.full
                  });
            //}
        });
  });

// db maintainence
chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
      var url = sender.tab.url;

      var a = document.createElement("a");
      a.href = url;

      myFirebase.child(user+"/"+sender.tab.id).set({
        title: message.title,
        url: {
            full: a.href,
            hostname: a.hostname.split('.').reverse(),
            pathname: a.pathname.split('/')
        }
      });
      if (top10.length>=10) {
            top10.splice(0,1);
      }
      top10_user.push({
          title: message.title,
          url: a.href});
  });
chrome.tabs.onRemoved.addListener(
  function(tabId, removeInfo) {
      myFirebase.child(user+"/"+tabId).remove();
  });