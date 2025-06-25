const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
    },

    values: {
        timerId: null,
        gameVelociy: 1000,
        hitPosition: 0,
        result: 0,
        curretTime: 60,
        lives: 3
    },

    actions: {
        countDownTimerId: null
    }
};

function countDown() {
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;

    if (state.values.curretTime <= 0 || state.values.lives <= 0) {
        clearInterval(state.actions.countDownTimerId)
        clearInterval(state.actions.timerId)
        alert("⏰ O tempo se esgotou! O seu resultado foi: " + state.values.result);
    }
}

function playSound() {
    let audio = new Audio("./src/audios/hit.m4a")
    audio.volume = 0.2;
    audio.play();
}

function playErrorSound() {
    const errorSound = new Audio("./src/audios/wrong.m4a");
    errorSound.volume = 0.8;
    errorSound.play();
}

function playGameOverSound() {
    const gameOverSound = new Audio("./src/audios/GameOver.m4a");
    gameOverSound.volume = 0.2;
    gameOverSound.play();
}


function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelociy);
}

function decreaseLives() {
    state.values.lives--;
    state.view.lives.textContent = "x" + state.values.lives;

    if (state.values.lives <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.values.timerId);
        playGameOverSound(); // toca som de game over
        alert("💀 Game Over! Você perdeu todas as vidas. Pontuação: " + state.values.result);
    }

}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            } else {
                playErrorSound();
                decreaseLives();
            }
        });
    });
}


function initalize() {
    state.actions.countDownTimerId = setInterval(countDown, 1000);
    moveEnemy();
    addListenerHitBox();
}

initalize();