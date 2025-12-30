let startTime = null;
let lastKeyTime = null;

let keyCount = 0;
let backspaceCount = 0;
let pauseCount = 0;
let keyTimes = [];
const PAUSE_THRESHOLD = 1000;

const textarea = document.getElementById("userInput");

textarea.addEventListener("keydown", (e) => {
    const currentTime = Date.now();
    if (e.key === "Backspace" || e.key.length === 1) {
        keyTimes.push(currentTime);
    }
    if (!startTime) {
        startTime = currentTime;
        lastKeyTime = currentTime;
    }
    if (currentTime - lastKeyTime > PAUSE_THRESHOLD) {
        pauseCount++;
    }
    if (e.key === "Backspace") {
        backspaceCount++;
    } else if (e.key.length === 1) {
        keyCount++;
    }

    lastKeyTime = currentTime;
});


const displayedText = document.getElementById("displayedText").innerText;

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    let delays = [];
    e.preventDefault();
    for (let i = 1; i < keyTimes.length; i++) {
        delays.push(keyTimes[i] - keyTimes[i - 1]);
    }
     if(textarea.value.trim() !== displayedText){
        alert("Please make sure your input matches the displayed text exactly.");
        return;
    }
    let avg_key_delay = delays.reduce((a, b) => a + b, 0) / delays.length / 1000;
    jsonData = {
        userInput: textarea.value,
        keyCount: keyCount,
        backspace_count: backspaceCount,
        pause_count: pauseCount,
        error_rate: keyCount > 0 ? backspaceCount / keyCount : 0,
        total_time: (Date.now() - startTime) / 1000,
        avg_key_delay: avg_key_delay,
        typing_speed: (keyCount / ((Date.now() - startTime) / 1000)) * 60
    };
    fetch("/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ userInput: jsonData })
    }).then(res => {
        if (!res.ok) {
            throw new Error("Server error");
        }
        return res.json();
    })
    .then(data => {
        window.location.href = `/about?level=${data.typing_level}`;
    })
    .catch(err => {
        console.error("Fetch error:", err);
        alert("Something went wrong. Please try again.");
    });
});

