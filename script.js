// SpeechRecognition API not working in FireFox! Use chrome!

const msgEl = document.getElementById('msg');
const mic = document.getElementById('mic');

window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Returns a rand[1,100]
const getRandomNumber = () => {
    return Math.floor(Math.random() * 100) + 1;
};

const randomNum = getRandomNumber();

// Capture user speech
const onSpeak = (e) => {
    const msg = e.results[0][0].transcript;

    writeMessage(msg);
    checkNumber(msg);
};

// Add user transcript to DOM
const writeMessage = (msg) => {
    console.log(msg);

    msgEl.innerHTML = `
    <div>You Said</div>
    <span class="box">${msg}</span>
    `;
};

const checkNumber = (msg) => {
    const num = +msg;

    // Check if entry is a valid num
    if (Number.isNaN(num)) {
        msgEl.innerHTML = `<div>That's not a number!</div>`;
        return;
    }

    // Check if in range (1-100)
    if (num > 100 || num < 1) {
        msgEl.innerHTML = '<div>Number must be from 1 to 100</div>';
    }

    //Check if correct num
    if (num === randomNum) {
        document.body.innerHTML = `
        <h2>🎯 Nailed it!</h2><br><br>
        <h3> The number was ${randomNum} </h3>
        <button class="play-again>Play Again</button>"
        `;
    } else if (num > randomNum) {
        msgEl.innerHTML = '<div>GO LOWER</div>';
    }
};

// Start listening for speech
recognition.start();

// Speak result
recognition.addEventListener('result', onSpeak);

recognition.addEventListener('soundstart', () => {
    mic.classList.add('live');
});

recognition.addEventListener('soundend', () => {
    mic.classList.remove('live');
});
