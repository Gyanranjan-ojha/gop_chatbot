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

    // Enter key pressed in textarea
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const message = chatInput.value.trim();
            if (message) {
                sendMessage(message);
                showThinking();
            }
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
//     function sendMessage(message) {
//         // Add message to chatbox as 'outgoing'
//         const outgoingMsg = document.createElement('li');
//         outgoingMsg.classList.add('chat', 'outgoing');
//         outgoingMsg.innerHTML = `<p>${message}</p>`;
//         chatBox.appendChild(outgoingMsg);

//         // Clear input area
//         chatInput.value = '';
//  // Static response (replace this with your actual static data)
//  const staticResponse = {
//     "title": "Hollow Knight",
//     "staff_link": "https://gameopedia.com/staff/games/25291",
//     "category": {
//         "Business Model": "No Microtransactions ,Ads ,No Ads ,Subscription Model ,Game Acquisition ,No Subscription Model ,Buy to Acquire ,Microtransactions ,Buy to Acquire ",
//         "Genre": "Platform ",
//         "Sub-genre": "Fighting ,Adventure ",
//         "Theme": "Animal ,Fantasy ,Mystery ,Anthropomorphism ,Anthropomorphic Animals ,High Fantasy ,Insect "
//     },
//     "developer": "Team Cherry Pty. Ltd.,",
//     "release data": "24-02-2017",
//     "locality": "United States (US)",
//     "screenshot": ["https://s3.amazonaws.com/gameopedia_covers/screenshots/5128715/c87bc9dfe840548d3e1cafe0c87489ba.jpg"]
// };

// // Remove thinking indicator
// chatBox.lastChild.remove();


// const incomingMsg = document.createElement('li');
// incomingMsg.classList.add('chat', 'incoming');

// const htmlContent = `
//     <div>
//         <h3 class="title">${staticResponse.title}</h3>
//         <div class="ss-container">
//             <div class="screenshot-container">
//                 <h4>Screenshots</h4>
//                 <img src="${staticResponse.screenshot[0]}" alt="Screenshot">
//             </div>
//             <div class="details-container">
//                 <h5>Details</h5>
//                 <ul>
//                     <li>Developer: ${staticResponse.developer}</li>
//                     <li>Release Date: ${staticResponse["release data"]}</li>
//                     <li>Locality: ${staticResponse.locality}</li>
//                 </ul>
//             </div>
//         </div>
//         <div class="categories-container">
//             <h2 class="cat">Categories</h2>
//             <table class="categories-table">
//                 <tr>
//                     <td>Business Model:</td>
//                     <td>${staticResponse.category["Business Model"]}</td>
//                 </tr>
//                 <tr>
//                     <td>Genre:</td>
//                     <td>${staticResponse.category.Genre}</td>
//                 </tr>
//                 <tr>
//                     <td>Sub-genre:</td>
//                     <td>${staticResponse.category["Sub-genre"]}</td>
//                 </tr>
//                 <tr>
//                     <td>Theme:</td>
//                     <td>${staticResponse.category.Theme}</td>
//                 </tr>
//             </table>
//         </div>
//     </div>
// `;

// // Apply CSS styles
// const styles = `
//     .categories-table {
//         border: 1px solid #ccc;
//         border-collapse: collapse;
//         width: 100%;
//     }
//     .screenshot-container img{
//         height: 200px;
//         width: 240px;
//     }
// .cat{
//     margin-top:"20px"
// }
// .categories-container{
//     margin-top:"10%"
// }
//     .categories-table td, .categories-table th {
//         border: 1px solid #ccc;
//         padding: 8px;
//         text-align: left;
//     }

//     .ss-container {
//         display: flex;
//         margin-bottom:38px;
//     }
//     .details-container{
//         margin-top: 50px;
//     }
//     .screenshot-container {
//         margin-top: 10px; /* Adjust as needed */
//     }
//     .ss-container {
//         display: flex;
       
//     }

//     .screenshot-container,
//     .details-container {
//         margin-right: 50px; /* Adjust as needed */
//     }
//     .title{
//         margin-top:20px;
//     }
// `;

// // Set the HTML content to the element with the class incomingMsg
// incomingMsg.innerHTML = htmlContent;

// // Add styles to the head of the document
// const styleElement = document.createElement('style');
// styleElement.innerHTML = styles;
// document.head.appendChild(styleElement);

// // Append the incoming message to the chatbox
// chatBox.appendChild(incomingMsg);
// }


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
        console.log(data,"DATAAAAAAAAA");
        // Remove thinking indicator
        chatBox.lastChild.remove();

        // Add response to chatbox as 'incoming'
        const incomingMsg = document.createElement('li');
        incomingMsg.classList.add('chat', 'incoming');
        if(data.source == true){
            incomingMsg.innerHTML = `<p>${data.message}</p>`;
        }else if(data.source == false){           
        const htmlContent = `
            <div>
                <h3 class="title">${data.message.title}</h3>
                <div class="ss-container">
                    <div class="screenshot-container">
                        <h4>Screenshots</h4>
                        <img src="${data.message.screenshots[0]}" alt="Screenshot">
                    </div>
                    <div class="details-container">
                        <h5>Details</h5>
                        <ul>
                            <li>Developer: ${data.message.developer}</li>
                            <li>Release Date: ${data.message["release data"]}</li>
                            <li>Locality: ${data.message.locality}</li>
                        </ul>
                    </div>
                </div>
                <div class="categories-container">
                    <h2 class="cat">Categories</h2>
                    <table class="categories-table">
                        <tr>
                            <td>Business Model:</td>
                            <td>${data.message.category["Business Model"]}</td>
                        </tr>
                        <tr>
                            <td>Genre:</td>
                            <td>${data.message.category.Genre}</td>
                        </tr>
                        <tr>
                            <td>Sub-genre:</td>
                            <td>${data.message.category["Sub-genre"]}</td>
                        </tr>
                        <tr>
                            <td>Theme:</td>
                            <td>${data.message.category.Theme}</td>
                        </tr>
                    </table>
                </div>
            </div>
        `;

        // Apply CSS styles
        const styles = `
            .categories-table {
                border: 1px solid #ccc;
                border-collapse: collapse;
                width: 100%;
            }
            .screenshot-container img{
                height: 200px;
                width: 240px;
            }
        .cat{
            margin-top:"20px"
        }
        .categories-container{
            margin-top:"10%"
        }
            .categories-table td, .categories-table th {
                border: 1px solid #ccc;
                padding: 8px;
                text-align: left;
            }

            .ss-container {
                display: flex;
                margin-bottom:38px;
            }
            .details-container{
                margin-top: 50px;
            }
            .screenshot-container {
                margin-top: 10px; /* Adjust as needed */
            }
            .ss-container {
                display: flex;
            
            }

            .screenshot-container,
            .details-container {
                margin-right: 50px; /* Adjust as needed */
            }
            .title{
                margin-top:20px;
            }
        `;

        // Set the HTML content to the element with the class incomingMsg
        incomingMsg.innerHTML = htmlContent;

        // Add styles to the head of the document
        const styleElement = document.createElement('style');
        styleElement.innerHTML = styles;
        document.head.appendChild(styleElement);
        }
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
