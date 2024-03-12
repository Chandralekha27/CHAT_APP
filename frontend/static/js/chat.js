var input = document.getElementById("chat-input");

input.addEventListener("keypress", function(event){
    if(event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
})


function sendMessage() {
  var messageInput = document.getElementById("chat-input");
  var message = messageInput.value;

  if (message.trim() !== "") {
      var chatContainer = document.getElementById("chat-container");
      var messageDiv = document.createElement("div");
      messageDiv.className = "message";
      messageDiv.innerText = message;
      chatContainer.appendChild(messageDiv);

      chatContainer.scrollTop = chatContainer.scrollHeight;

      const ws = new WebSocket();

      fetch("http://localhost:8080/api/message/send", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({receiver: "John Doe", sender: "John Doer",content: messageInput.value
          })
      })
      .then(response => {
          if (response.ok) {
              console.log("test - sent", response)
              alert("Message sent successfully")
          }
      })
      .then(data => {
          console.log("Data received:", data);
          // Do something with the received data
      })
      .catch(error => {
          console.error("Error:", error);
      });

      // Clear input field after sending message
      messageInput.value = "";
  }
}


//.message-container{
//align-items:flex-start;
//}
//        #chat-container{
//    align-items:flex-start;
//    overflow:hidden;
//}
