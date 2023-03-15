"use strict";

const chat = {
    author: "yourName",
    message: [],
    init() {
        this.fetchMessages();
        document.querySelector("#sendButton").addEventListener("click", this.sendMessage);
    },
    sendMessage() {
        const messageInput = document.querySelector("#chatInput");
        console.log(messageInput.value);
        let data = { author: 'Jhon Doe', message: messageInput.value };

        fetch("https://dev2chat.onrender.com/message", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }).then((res) => {
            console.log("Request complete! response:", res);
        });

        this.fetchMessages();
    },

    fetchMessages() {
        fetch("https://dev2chat.onrender.com/messages")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                chat.renderMessage(data);
            });
    },
    renderMessage(messages) {
        const messageContainer = document.querySelector("#messageContainer");
        // itterate over the messages and write them to the end of the message container
        // clear the DOM
        messageContainer.innerHTML = "";
        // write the messages to the DOM
        messages.forEach((message) => {
            const messageElement = document.createElement("div");
            messageElement.classList.add("messageItem");

            messageElement.innerHTML = `
                <div class="header">
                    <span class="author">${message.author}</span>
                    <span class="time">${message.created_at}</span>
                </div>
                <p>
                    ${message.message}
                </p>
            `;
            console.log("writing message to the DOM", message);
            messageContainer.append(messageElement);
        });
    },
};


chat.init();