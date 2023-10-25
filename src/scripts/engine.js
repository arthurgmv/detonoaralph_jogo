const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        time: document.querySelector("#timeLeft"),
        score: document.querySelector("#score"),
    },
    values: {
        timerId: null,
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        countDownTimerId: null,
    },
};

function playSound() {
    let audio = new Audio("./src/audios/music.mp4"); // Corrected path
    audio.volume = 0.5;
    audio.play();
}
document.addEventListener('DOMContentLoaded', function () {
    playSound();
});


function countDown() {
    state.values.currentTime--;
    state.view.time.textContent = state.values.currentTime;
    if (state.values.currentTime <= 0) {
        clearInterval(state.values.countDownTimerId);
        alert("Game Over! O seu resultado foi: " + state.values.result);
    }
}

function randomSquare() {
    state.view.squares.forEach((square) => square.classList.remove("enemy"));

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
            }
        });
    });
}

function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function init() {
    state.values.countDownTimerId = setInterval(countDown, 1000);
    moveEnemy();
    addListenerHitBox();
}



init();
