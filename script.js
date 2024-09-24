let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");
let stopBtn = document.getElementById("stopBtn"); 
let recognizedText = document.querySelector("#recognizedText"); 
let transcriptDisplay = document.querySelector("#transcriptDisplay"); 

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();
recognition.interimResults = true;  // Set to true for real-time display
recognition.maxAlternatives = 1;

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "hi-GB";
    window.speechSynthesis.speak(text_speak);

    stopBtn.style.display = "block";
    text_speak.onend = () => {
        stopBtn.style.display = "none";
    };
}

stopBtn.addEventListener("click", () => {
    window.speechSynthesis.cancel();
    recognition.stop();  // Stop voice recognition
    stopBtn.style.display = "none";
});

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir");
    } else if (hours >= 12 && hours < 16) {
        speak("Good afternoon sir");
    } else {
        speak("Good Evening Sir");
    }
}

window.addEventListener('load', () => {
    wishMe();
});

// Handle result from Speech Recognition
recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    transcriptDisplay.innerText = transcript;  // Display recognized text in real time

    if (event.results[currentIndex].isFinal) {
        takeCommand(transcript.toLowerCase());
    }
};

// Start recognition when button is clicked
btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
});

function takeCommand(message) {
    // Show mic button and hide voice gif after command is processed
    btn.style.display = "flex";
    voice.style.display = "none";
    
    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello sir, what can I help you with?");
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
