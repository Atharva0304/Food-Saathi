document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  inputField.addEventListener("keydown", (e) => {
    if (e.code === "Enter" || e.keyCode === 13) {
      const input = inputField.value;
      inputField.value = "";
      output(input);
    }
  });
});

function output(input) {
  const cleaned = input.toLowerCase().replace(/[^\w\s]/gi, "").trim();

  let response = "";

  // ✅ Donation amount
  if (cleaned.includes("how much") && cleaned.includes("donate")) {
    response = "You can donate food up to 10kg.";
  } 
  // ✅ Expiry of donation
  else if ((cleaned.includes("till") || cleaned.includes("until")) && cleaned.includes("donate")) {
    response = "You can donate food up to 2 days from its preparation date.";
  } 
  // ✅ How to donate
  else if (cleaned.includes("how") && cleaned.includes("donate")) {
    response = "You can donate food by clicking on the Donate Food option on the Home page.";
  } 
  // ✅ Process free?
  else if (cleaned.includes("free") || cleaned.includes("cost")) {
    response = "Yes, the process is completely free.";
  } 
  // ✅ Contact admin
  else if (cleaned.includes("contact") && cleaned.includes("admin")) {
    response = "Yes, you can contact the admin on the Contact Us page.";
  } 
  // ✅ Track order
  else if (cleaned.includes("track") && cleaned.includes("order")) {
    response = "Yes, you can track the order by using the location option under the About Us page.";
  } 
  // ✅ Feedback
  else if (cleaned.includes("feedback")) {
    response = "Yes, you can give feedback in the feedback option on the Contact Us page.";
  } 
  // ✅ Fallback
  else {
    response = "I'm sorry, I can only answer specific questions about food donation.";
  }

  addChat(input, response);
}

function addChat(input, response) {
  const messagesContainer = document.getElementById("messages");

  const userDiv = document.createElement("div");
  userDiv.className = "user response";
  userDiv.innerHTML = `<span><strong>You:</strong> ${input}</span>`;
  messagesContainer.appendChild(userDiv);

  const botDiv = document.createElement("div");
  botDiv.className = "bot response";
  botDiv.innerHTML = `<span><strong>Bot:</strong> ${response}</span>`;
  messagesContainer.appendChild(botDiv);

  messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;

  textToSpeech(response);
}

function textToSpeech(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
}
