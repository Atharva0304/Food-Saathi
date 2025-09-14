const prompts = [
  ["how much food can i donate", "how many kilos can i donate"],
  ["can i track the order", "how do i track my order"],
  ["can i contact the admin", "how to contact admin"],
  ["is the process free", "do i have to pay"],
  ["can i give feedback", "how to give feedback"],
  ["how to donate food", "how do i donate food", "can i donate food"]
];

const replies = [
  ["You can donate food up to 10kg."],
  ["Yes, you can track the order by using the location option under the About Us page."],
  ["Yes, you can contact the admin under the Contact Us page."],
  ["Yes, the process is free."],
  ["Yes, you can give feedback in the feedback option on the Contact Us page."],
  ["You can donate food by clicking on the Donate Food option on the Home page."]
];

const coronavirus = [
  "Stay safe! Wash your hands regularly.",
  "Maintain social distancing and wear a mask.",
  "COVID-19 is a global pandemic. Follow local guidelines."
];

const alternative = [
  "I'm not sure I understand. Could you rephrase?",
  "Can you ask that in a different way?",
  "Let's try something else. What would you like to know?"
];

// 🎤 Voice Input Setup
document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  const micButton = document.getElementById("mic");

  inputField.addEventListener("keydown", (e) => {
    if (e.code === "Enter" || e.keyCode === 13) {
      let input = inputField.value;
      inputField.value = "";
      output(input);
    }
  });

  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.interimResults = false;

  micButton.addEventListener("click", () => {
    recognition.start();
  });

  recognition.onresult = (event) => {
    const voiceInput = event.results[0][0].transcript;
    inputField.value = voiceInput;
    output(voiceInput);
  };
});

function output(input) {
  let product;
  let text = input.toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/[\d]/gi, "")
    .trim();

  text = text
    .replace(/ a /g, " ")
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "")
    .replace(/r u/g, "are you")
    .replace(/tell about /g, "");

  // 👋 Greeting check - specific response to "hi" or "hello"
  if (text === "hi" || text === "hello") {
    product = "Hello";
  } else if (compare(prompts, replies, text)) {
    product = compare(prompts, replies, text);
  } else if (text.match(/thank/gi)) {
    product = "You're welcome!";
  } else if (text.match(/(corona|covid|virus)/gi)) {
    product = coronavirus[Math.floor(Math.random() * coronavirus.length)];
  } else {
    product = alternative[Math.floor(Math.random() * alternative.length)];
  }

  addChat(input, product);
}

function compare(promptsArray, repliesArray, string) {
  let reply;
  let replyFound = false;
  for (let x = 0; x < promptsArray.length; x++) {
    for (let y = 0; y < promptsArray[x].length; y++) {
      if (promptsArray[x][y] === string) {
        let replies = repliesArray[x];
        reply = replies[Math.floor(Math.random() * replies.length)];
        replyFound = true;
        break;
      }
    }
    if (replyFound) break;
  }
  return reply;
}

function addChat(input, product) {
  const messagesContainer = document.getElementById("messages");

  let userDiv = document.createElement("div");
  userDiv.className = "user response";
  userDiv.innerHTML = `<span>${input}</span>`;
  messagesContainer.appendChild(userDiv);

  let botDiv = document.createElement("div");
  botDiv.className = "bot response";
  botDiv.innerHTML = `<span>Typing...</span>`;
  messagesContainer.appendChild(botDiv);

  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  setTimeout(() => {
    botDiv.innerHTML = `<span>${product}</span>`;
    speak(product); // 🔊 Voice Output
  }, 1500);
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
}
