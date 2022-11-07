// AUTHENTICATION
function showRegistrationUI() {
    // Shows #registration and hides #login
    document.querySelector("#registration").style.display = "flex";
    document.querySelector("#login").style.display = "none";
}

function showLoginUI() {
    // Shows #login and hides #registration
    document.querySelector("#login").style.display = "flex";
    document.querySelector("#registration").style.display = "none";
}

// LOGOUT
function toggleLogoutMenu() {
    document.querySelector("#logout-menu").classList.toggle("hidden");
}

// We need to check how many posts are in the posts container so we can add margin for scrollbar
setInterval(function () {
    // if (document.querySelector("body > div.main > div.mid > div.posts-wrap").children().length >= 4) {
    //     console.log("There are at least 4 posts");
    //     document.querySelector("body > div.main > div.mid > div.posts-wrap").style.margin = "0 0.5rem 0 0";
    // }
}, 1000);

// CHAT
function showChat() {
    // Shows #chat and hides #login and #registration
    document.querySelector("#chat").style.display = "block";
    document.querySelector("#login").style.display = "none";
    document.querySelector("#registration").style.display = "none";

    var conn;
    var msg = document.getElementById("msg");
    var log = document.getElementById("log");

    function appendLog(item) {
        var doScroll = log.scrollTop > log.scrollHeight - log.clientHeight - 1;
        log.appendChild(item);
        if (doScroll) {
            log.scrollTop = log.scrollHeight - log.clientHeight;
        }
    }

    document.getElementById("form").onsubmit = function () {
        if (!conn) {
            return false;
        }
        if (!msg.value) {
            return false;
        }
        conn.send(msg.value);
        msg.value = "";
        return false;
    };

    if (window["WebSocket"]) {
        conn = new WebSocket("ws://" + document.location.host + "/ws");
        conn.onclose = function (evt) {
            var item = document.createElement("div");
            item.innerHTML = "<b>Connection closed.</b>";
            appendLog(item);
        };
        conn.onmessage = function (evt) {
            var messages = evt.data.split("\n");
            for (var i = 0; i < messages.length; i++) {
                var item = document.createElement("div");
                item.innerText = messages[i];
                appendLog(item);
            }
        };
    } else {
        var item = document.createElement("div");
        item.innerHTML = "<b>Your browser does not support WebSockets.</b>";
        appendLog(item);
    }
}



function login(){
    let emailusername = document.getElementById('emailusername').value
    console.log('emailusername', emailusername)
    let password = document.getElementById('password').value;
    let formData = new FormData()
    formData.append('emailusername', emailusername)
    formData.append('password', password)


    fetch("http://localhost:8080/login", {
        method: 'POST',
        body: formData
    }).then(response => response.text())
    .then(response => {
        console.log("res1", response);
        alert("Login Success")
    })
}
// showLoginUI() ;
//     const data = JSON.parse(localStorage.getItem("data"));
//     let isSuccessful = false;
  
//     for (let index = 0; index < data.length; index++) {
//       if (
//         this.state.email === data[index].email &&
//         this.state.password === data[index].password
//       ) {
//         isSuccessful = true;
//         break;
//       }
//     }
  
//     if (isSuccessful) {
//       alert("login successful");
//     } else {
//       alert("login failed");
//     }
//set the timer to disappear after successful login/logout