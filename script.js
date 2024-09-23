let btn =  document.querySelector("#btn");
let content =document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text){
    let text_speak= new SpeechSynthesisUtterance(text);
    text_speak.rate=1;
    text_speak.pitch=1;
    text_speak.volume=1;
    text_speak.lang="hi-GB";
    window.speechSynthesis.speak(text_speak);
}


function wishMe(){
    let day=new Date();
    let hours=day.getHours();
    if(hours>=0 && hours<12){
        speak("Good Morning Sir");
    }
    else if(hours>=12 && hours<16){
        speak("Good afternoon sir");
    }
    else{
        speak("Good Evening Sir");
    }
}
window.addEventListener('load',()=>{
 wishMe();
});
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();


recognition.onResult=(event)=>{
    let currentIndex =event.resultIndex;
    let transcript=results[currentIndex][0].transcript;
    content.innerText=transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click",()=>{
    recognition.start();
    btn.Style.display="none";
    voice.Style.display="block";
});
function takeCommand(message){
 btn.Style.display="flex";
 voice.Style.display="none";
    if (message.includes("hello")||message.includes("hey")){
        speak("hello sir,what i can help you?");
    }
    else if(message.includes("who are you")){
        speak("i am virtual assistant ,created by,Antima")
    }else if(message.includes("open youtube")){
        speak("opening youtube...")
        Window.open("https://www.youtube.com/")
    }else if(message.includes("open GOOGLE")){
        speak("opening google...")
        Window.open("https://www.google.com/")
    }else if(message.includes("open facebook")){
        speak("opening facebook...")
        Window.open("https://www.facebook.com/")
    }else{
       "this is  what i found on internet regarding"+ message.replace("shifra","")||message.replace("shipra","")
        speak('finalText')
        window.open('https://www.google.com/search?q=${message.replace("shifra","")}',"_blank")
    }
}