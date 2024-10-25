// Elements
const startButton = document.getElementById("start-button");
const gameScreen = document.getElementById("game-screen");
const startScreen = document.getElementById("start-screen");
const endScreen = document.getElementById("end-screen");
const roomTitle = document.getElementById("room-title");
const roomDescription = document.getElementById("room-description");
const roomImage = document.getElementById("room-image");
const answerInput = document.getElementById("answer-input");
const submitAnswerButton = document.getElementById("submit-answer");
const hintButton = document.getElementById("hint");
const hintContent = document.getElementById("hint-content");
const restartButton = document.getElementById("restart-button");

// Audio
const backgroundMusic = new Audio("audio/background.mp3");
const correctSound = new Audio("audio/correct.mp3");
const hintSound = new Audio("audio/hint.mp3");

// Rooms data
const rooms = [
    {
        title: "Sala de la Esfinge",
        description: "Resuelve el enigma de la esfinge: ¿Qué criatura tiene cuatro patas al amanecer, dos al mediodía y tres al atardecer?",
        answer: "humano",
        hint: "Piensa en las etapas de la vida humana.",
        image: "images/sphinx.png"
    },
    {
        title: "Sala del Matemático",
        description: "Encuentra el número que falta: 2, 3, 5, 7, __.",
        answer: "11",
        hint: "Busca los números primos.",
        image: "images/math.png"
    },
    {
        title: "Sala del Renacimiento",
        description: "¿Quién pintó la Mona Lisa?",
        answer: "Leonardo da Vinci",
        hint: "Es un famoso inventor y pintor italiano.",
        image: "images/monalisa.png"
    }
];

let currentRoom = 0;

// Start game
startButton.addEventListener("click", () => {
    startScreen.style.display = "none";
    gameScreen.style.display = "block";
    playBackgroundMusic();
    loadRoom();
});

// Load current room
function loadRoom() {
    if (currentRoom < rooms.length) {
        const room = rooms[currentRoom];
        roomTitle.textContent = room.title;
        roomDescription.textContent = room.description;
        roomImage.src = room.image;
        hintContent.style.display = "none";
        hintContent.textContent = room.hint;
        answerInput.value = "";
    } else {
        endGame();
    }
}

// Check answer
submitAnswerButton.addEventListener("click", () => {
    const answer = answerInput.value.trim().toLowerCase();
    if (answer === rooms[currentRoom].answer.toLowerCase()) {
        playCorrectSound();
        currentRoom++;
        loadRoom();
    } else {
        alert("Respuesta incorrecta. Intenta de nuevo.");
    }
});

// Hint button toggle
hintButton.addEventListener("click", () => {
    playHintSound();
    hintContent.style.display = hintContent.style.display === "none" ? "block" : "none";
});

// Play background music
function playBackgroundMusic() {
    backgroundMusic.loop = true; // Loop the background music
    backgroundMusic.volume = 0.2; // Set lower volume for background music
    backgroundMusic.play();
}

// Play correct answer sound
function playCorrectSound() {
    correctSound.volume = 0.5;
    correctSound.play();
}

// Play hint sound
function playHintSound() {
    hintSound.volume = 0.3;
    hintSound.play();
}

// End game
function endGame() {
    backgroundMusic.pause(); // Stop music at the end of the game
    gameScreen.style.display = "none";
    endScreen.style.display = "block";
}

// Restart game
restartButton.addEventListener("click", () => {
    currentRoom = 0;
    endScreen.style.display = "none";
    startScreen.style.display = "block";
});
