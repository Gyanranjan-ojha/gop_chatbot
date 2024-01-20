// // const chatbotToggler = document.querySelector(".chatbot-toggler");
// // const closeBtn = document.querySelector(".close-btn");
// // const chatbox = document.querySelector(".chatbox");
// // const chatInput = document.querySelector(".chat-input textarea");
// // const sendChatBtn = document.querySelector(".chat-input span");

// // let userMessage = null; // Variable to store user's message
// // // const API_KEY = "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"; // Paste your API key here
// // const inputInitHeight = chatInput.scrollHeight;

// // const createChatLi = (message, className) => {
// //     // Create a chat <li> element with passed message and className
// //     const chatLi = document.createElement("li");
// //     chatLi.classList.add("chat", `${className}`);
// //     let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
// //     chatLi.innerHTML = chatContent;
// //     chatLi.querySelector("p").textContent = message;
// //     return chatLi; // return chat <li> element
// // }

// // // const generateResponse = (chatElement) => {
// // //     const API_URL = "https://api.openai.com/v1/chat/completions";
// // //     const messageElement = chatElement.querySelector("p");

// // //     // Define the properties and message for the API request
// // //     const requestOptions = {
// // //         method: "POST",
// // //         headers: {
// // //             "Content-Type": "application/json",
// // //             "Authorization": `Bearer ${API_KEY}`
// // //         },
// // //         body: JSON.stringify({
// // //             model: "gpt-3.5-turbo",
// // //             messages: [{role: "user", content: userMessage}],
// // //         })
// // //     }

// // //     // Send POST request to API, get response and set the reponse as paragraph text
// // //     fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
// // //         messageElement.textContent = data.choices[0].message.content.trim();
// // //     }).catch(() => {
// // //         messageElement.classList.add("error");
// // //         messageElement.textContent = "Oops! Something went wrong. Please try again.";
// // //     }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
// // // }

// // const handleChat = () => {
// //     userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
// //     if(!userMessage) return;

// //     // Clear the input textarea and set its height to default
// //     chatInput.value = "";
// //     chatInput.style.height = `${inputInitHeight}px`;

// //     // Append the user's message to the chatbox
// //     chatbox.appendChild(createChatLi(userMessage, "outgoing"));
// //     chatbox.scrollTo(0, chatbox.scrollHeight);
    
// //     setTimeout(() => {
// //         // Display "Thinking..." message while waiting for the response
// //         const incomingChatLi = createChatLi("Thinking...", "incoming");
// //         chatbox.appendChild(incomingChatLi);
// //         chatbox.scrollTo(0, chatbox.scrollHeight);
// //         generateResponse(incomingChatLi);
// //     }, 600);
// // }

// // chatInput.addEventListener("input", () => {
// //     // Adjust the height of the input textarea based on its content
// //     chatInput.style.height = `${inputInitHeight}px`;
// //     chatInput.style.height = `${chatInput.scrollHeight}px`;
// // });

// // chatInput.addEventListener("keydown", (e) => {
// //     // If Enter key is pressed without Shift key and the window 
// //     // width is greater than 800px, handle the chat
// //     if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
// //         e.preventDefault();
// //         handleChat();
// //     }
// // });

// // sendChatBtn.addEventListener("click", handleChat);
// // closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
// // chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

// const chatbotToggler = document.querySelector(".chatbot-toggler");
// const closeBtn = document.querySelector(".close-btn");
// const chatbox = document.querySelector(".chatbox");
// const chatInput = document.querySelector(".chat-input textarea");
// const sendChatBtn = document.querySelector(".chat-input span");

// let userMessage = null; // Variable to store user's message
// let assistant_id = null; // Variable to store assistant ID
// let thread_id = null; // Variable to store thread ID
// const inputInitHeight = chatInput.scrollHeight;

// const createChatLi = (message, className) => {
//     const chatLi = document.createElement("li");
//     chatLi.classList.add("chat", `${className}`);
//     let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
//     chatLi.innerHTML = chatContent;
//     chatLi.querySelector("p").textContent = message;
//     return chatLi;
// }

// async function getInput() {
//     var token = getCookieData("csrftoken");
//     await $.ajax({
//         type: 'GET',
//         url: `/getGPTAssistant`,
//         headers: { "X-CSRFToken": token },
//         error: function (request, error) {
//             console.log(error);
//         },
//         success: function (data) {
//             arr = $.parseJSON(data);
//             assistant_id = arr.assistant_id;
//             thread_id = arr.thread_id;
//             console.log(arr);
//         }
//     });
// }

// function generateResponse() {
//     var token = getCookieData("csrftoken");
//     $.ajax({
//         type: 'POST',
//         url: "/getGPTPromt",
//         headers: { "X-CSRFToken": token },
//         data: {
//             'text_field': userMessage,
//             'thread_id': thread_id
//         },
//         error: function (request, error) {
//             console.log(error, "Error in sending message");
//         },
//         success: function (data) {
//             arr = $.parseJSON(data);
//             var botResponse = arr.m;
//             console.log(botResponse)
//             chatbox.appendChild(createChatLi(botResponse, "incoming"));
//             chatbox.scrollTo(0, chatbox.scrollHeight);
//         }
//     });
// }

// const handleChat = () => {
//     userMessage = chatInput.value.trim();
//     if(!userMessage) return;

//     chatInput.value = "";
//     chatInput.style.height = `${inputInitHeight}px`;

//     chatbox.appendChild(createChatLi(userMessage, "outgoing"));
//     chatbox.scrollTo(0, chatbox.scrollHeight);

//     setTimeout(() => {
//         const incomingChatLi = createChatLi("Thinking...", "incoming");
//         chatbox.appendChild(incomingChatLi);
//         chatbox.scrollTo(0, chatbox.scrollHeight);
//         generateResponse();
//     }, 600);
// }

// chatInput.addEventListener("input", () => {
//     chatInput.style.height = `${inputInitHeight}px`;
//     chatInput.style.height = `${chatInput.scrollHeight}px`;
// });

// chatInput.addEventListener("keydown", (e) => {
//     if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
//         e.preventDefault();
//         handleChat();
//     }
// });

// sendChatBtn.addEventListener("click", handleChat);
// closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
// chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

// // Call getInput() when the script loads to initialize assistant ID and thread ID
// getInput();


document.addEventListener("DOMContentLoaded", function() {
    // Variables to manage chatbot elements
    const chatbot = document.querySelector('.chatbot');
    const chatbotToggler = document.querySelector('.chatbot-toggler');
    const sendButton = document.getElementById('send-btn');
    const chatInput = document.querySelector('.chat-input textarea');
    const chatBox = document.querySelector('.chatbox');
    let threadId = null;

    // Toggle Chatbot Visibility
    chatbotToggler.addEventListener('click', function() {
        document.body.classList.toggle('show-chatbot');
        if (!threadId) {
            startConversation();
        }
    });

    // Start a conversation and get threadId
    function startConversation() {
        fetch('/getGPTAssistant', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            threadId = data.thread_id;
        })
        .catch(error => {
            console.error('Error starting conversation:', error);
        });
    }

    // Send Message
    sendButton.addEventListener('click', function() {
        const message = chatInput.value.trim();
        if (message) {
            sendMessage(message);
            showThinking();
        }
    });

    // Show thinking indicator
    function showThinking() {
        const thinkingMsg = document.createElement('li');
        thinkingMsg.classList.add('chat', 'incoming');
        thinkingMsg.innerHTML = `<p>Processing your request...</p>`; // Custom thinking message
        chatBox.appendChild(thinkingMsg);
    }

    // Function to send message
    function sendMessage(message) {
        // Add message to chatbox as 'outgoing'
        const outgoingMsg = document.createElement('li');
        outgoingMsg.classList.add('chat', 'outgoing');
        outgoingMsg.innerHTML = `<p>${message}</p>`;
        chatBox.appendChild(outgoingMsg);

        // Clear input area
        chatInput.value = '';

        // Make request to Flask server
        fetch('/getGPTPromt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message, thread_id: threadId })  // Use extracted thread_id
        })
        .then(response => response.json())
        .then(data => {
            // Remove thinking indicator
            chatBox.lastChild.remove();

            // Add response to chatbox as 'incoming'
            const incomingMsg = document.createElement('li');
            incomingMsg.classList.add('chat', 'incoming');
            incomingMsg.innerHTML = `<p>${data.response}</p>`;
            chatBox.appendChild(incomingMsg);
        })
        .catch(error => {
            // Remove thinking indicator and show error
            chatBox.lastChild.remove();
            console.error('Error:', error);
            const errorMsg = document.createElement('li');
            errorMsg.classList.add('chat', 'incoming');
            errorMsg.innerHTML = `<p>Sorry, we encountered an issue processing your request. Please try again.</p>`; // Custom error message
            chatBox.appendChild(errorMsg);
        });
    }
});
