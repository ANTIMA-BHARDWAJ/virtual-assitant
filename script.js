let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");
let stopBtn = document.getElementById("stopBtn");
let transcriptDisplay = document.querySelector("#transcriptDisplay");

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();
recognition.interimResults = true;  
recognition.maxAlternatives = 1;
function speak(text) {
    console.log("Speaking:", text);
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-US"; 

    if ('speechSynthesis' in window) {
        window.speechSynthesis.speak(text_speak);
    } else {
        console.error("Speech synthesis not supported");
    }

    stopBtn.style.display = "block";
    text_speak.onend = () => {
        stopBtn.style.display = "none";
    };
}

stopBtn.addEventListener("click", () => {
    window.speechSynthesis.cancel();
    recognition.stop();  
    updateButtonVisibility(false);
});

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon Sir");
    } else {
        speak("Good Evening Sir");
    }
}

window.addEventListener('load', () => {
    wishMe();
});

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    transcriptDisplay.innerText = transcript;

    if (event.results[currentIndex].isFinal) {
        takeCommand(transcript.toLowerCase());
    }
};

recognition.onstart = () => {
    updateButtonVisibility(true);
};

recognition.onend = () => {
    updateButtonVisibility(false);
};

function updateButtonVisibility(isListening) {
    if (isListening) {
        btn.style.display = "none";
        stopBtn.style.display = "block";
        voice.style.display = "block";
    } else {
        btn.style.display = "flex";
        stopBtn.style.display = "none";
        voice.style.display = "none";
    }
}

btn.addEventListener("click", () => {
    recognition.start();
});

function takeCommand(message) {
    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello Sir, what can I help you with?");
        wishMe();
    } else if (message.includes("who are you")) {
        speak("I am a virtual assistant, created by Antima.");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://www.youtube.com/");
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://www.google.com/");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://www.facebook.com/");
    } else {
        let finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message}`, "_blank");
    }
}
