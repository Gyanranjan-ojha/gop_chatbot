var thread_id = None
// var assistant_id = None
function getCookieData(name) {
    var pairs = document.cookie.split("; "),
        count = pairs.length, parts;
    while (count--) {
        parts = pairs[count].split("=");
        if (parts[0] === name)
            return parts[1];
    }
    return false;
}


function sendScreenshots() {
    var game_id = $('#game_id').val();
    var realese_id = $('#realese_id').val();
    var platform_id = $('#platform').val();
}

async function getInput() {
    var token = getCookieData("csrftoken");
    await $.ajax({
        type: 'GET',
        url: `/getGPTAssistant`,
        headers: { "X-CSRFToken": token },

        error: function (request, error) {
            // let data1 = JSON.parse(error);
            console.log(error);
        }, success: function (data) {
            console.log(data)
            // arr = $.parseJSON(data);
            // assistant_id = arr.assistant_id
            thread_id = data.thread_id
            console.log(data);
        }


    })
}
function toggleChatPopup() {
    var chatPopup = document.getElementById("chatPopup");
    // if (thread_id === None && assistant_id === None) {
        getInput()//}
    chatPopup.style.display = (chatPopup.style.display === "block") ? "none" : "block";
}

function sendMessage() {
    var chatInput = document.getElementById("chatInput");
    var chatBody = document.getElementById("chatBody");
    console.log(chatInput.value);
    var userMessage = chatInput.value;
    var token = getCookieData("csrftoken");
    $.ajax({
        type: 'POST',
        url: "/getGPTPromt",
        // headers: { "X-CSRFToken": token ,"Content-Type":"application/json; charset=utf-8'"},
        headers: { "X-CSRFToken": token},
        contentType: "application/json; charset=utf-8",

        data: JSON.stringify({
            'message': userMessage,
            'thread_id': thread_id
        }),
        error: function (request, error) {
            // let data1 = JSON.parse(error);
            console.log(request,error);
            getInput();

        },
        success: function (data) {
            // arr = $.parseJSON(data);
            var botResponse = data.response
            
            chatInput.value = "";
            chatBody.innerHTML += "<p>User: " + userMessage + "</p>";
            chatBody.innerHTML += "<p>Chatbot: " + botResponse + "</p>";
        }
    });
}

// Add event listener for Enter key on the chat input
document.getElementById("chatInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevents the default behavior of the Enter key (form submission)
        sendMessage(); // Call the sendMessage function
    }
});

