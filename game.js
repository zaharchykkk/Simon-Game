
const buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];
let pressed = false;
let level = 0;

document.querySelector(".start-button").addEventListener("click", () => {
    document.querySelector("h1").textContent = "Level " + level;

    if (!pressed) {
        nextSequence();
        pressed = true;
    }
});

const nextSequence = () => {
    level++;
    userClickedPattern = [];
    document.querySelector("h1").textContent = "Level " + level;

    const randomNumber = Math.floor(Math.random() * buttonColours.length);
    const randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    for (let i = 0; i < gamePattern.length; i++) {
        setTimeout(() => {
            const currentColor = gamePattern[i];
            const button = document.getElementById(currentColor);
            button.style.opacity = 0;
            setTimeout(() => {
                button.style.opacity = 1;
            }, 100);
            playSound(currentColor);
        }, i * 350);
    }
};

document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", function() {
        const userChosenColour = this.id;
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.lastIndexOf(userChosenColour));
    });
});

const animatePress = (currentColor) => {
    const button = document.getElementById(currentColor);
    button.classList.add("pressed");
    setTimeout(() => {
        button.classList.remove("pressed");
    }, 100);
};

const playSound = (name) => {
    const audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};
const checkAnswer = (currentLevel) => {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        let count = 0;
        for (let i = 0; i < gamePattern.length; i++) {
            if (gamePattern[i] === userClickedPattern[i]) {
                count++;
            }
        }
        if (count === gamePattern.length) {
            console.log("success");
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        document.body.classList.add("game-over");
        setTimeout(() => {
            document.body.classList.remove("game-over");
        }, 300);
        document.querySelector("h1").innerHTML = "My grandma got more than you!<br/> Click on Button to Restart";
        startOver();
    }
};

const startOver = () => {
    level = 0;
    gamePattern = [];
    pressed = false;
};


