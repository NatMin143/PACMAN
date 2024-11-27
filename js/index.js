import { playGame } from "./game.js";
import { Ghost } from "./ghost.js";
import { Player } from "./player.js";
import { map1, map2, map3 } from "./maps.js";
import { Boundary } from "./boundary.js";

const mainAudio = new Audio('./assets/musics/Pac-man theme remix - By Arsenic1987.mp3')
export const winnerScreen = document.getElementById("winnerScreen")

mainAudio.loop = true;

// Play the audio when the page loads
mainAudio.volume = 0.3
mainAudio.play()
audioPlayer.volume = 1

const map1Button = document.getElementById("map1Button")
const map2Button = document.getElementById("map2Button")
const map3Button = document.getElementById("map3Button")

const lvlEasy = document.getElementById("lvlEasy")
const lvlMedium = document.getElementById("lvlMedium")
const lvlHard = document.getElementById("lvlHard")
const lvlImpossible = document.getElementById("lvlImpossible")

const mapButtons = [map1Button, map2Button, map3Button];
const lvlButtons = [lvlEasy, lvlMedium, lvlHard, lvlImpossible];

export const mainScreen = document.getElementById("mainScreen")
export const gameScreen = document.getElementById("gameScreen")
export const gameOverScreen = document.getElementById("gameOverScreen")

const mapSelector = document.getElementById("mapSelector")
const wAfterGame = document.getElementById("wAfterGame");
const oAfterGame = document.getElementById("oAfterGame");
const backButton = document.getElementById("backButtonLS")
const afterGame = [wAfterGame, oAfterGame]

let startPacmanMusic = new Audio('/assets/musics/start-pacman.mp3');

const gameMapLvl = { map: '', lvl: '' }

const buttonAudio = new Audio('./assets/musics/clickButton.mp3')
mapButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        // Hide map selector and show level selector
        mapSelector.style.display = 'none';
        lvlSelector.style.display = 'flex';


        switch (index) {
            case 0:
                gameMapLvl.map = map1
                break
            case 1:
                gameMapLvl.map = map2
                break
            case 2:
                gameMapLvl.map = map3
                break
        }
        // Play button click sound
        buttonAudio.pause();
        buttonAudio.currentTime = 0;
        buttonAudio.play();
    });
});

lvlButtons.forEach((button, index) => {
    button.addEventListener("click", () => {

        buttonAudio.pause();
        buttonAudio.currentTime = 0;
        buttonAudio.play();

        mainScreen.style.display = 'none';

        gameMapLvl.lvl = `${index + 1}`


        mainAudio.pause()
        mainAudio.currentTime = 0;
        console.log(gameMapLvl)

        initGame(gameMapLvl)
    });
});

let stop = 0

// init game to know what map and level of difficult to be use
function initGame(gameMapLvl) {
    let player;
    let ghosts = []
    if (gameMapLvl.map === map1) {
        player = new Player({
            position: {
                x: Boundary.width * 13 + Boundary.width / 2,
                y: Boundary.height * 14 + Boundary.height / 2,
            },
            velocity: {
                x: stop,
                y: stop,
            },
        });
        switch (gameMapLvl.lvl) {
            case '1':
                ghosts = [
                    new Ghost({
                        position: {
                            x: Boundary.width * 9 + Boundary.width / 2,
                            y: Boundary.height * 7 + Boundary.height / 2,
                        },
                        velocity: {
                            x: stop,
                            y: stop,
                        },
                        color: "red",
                    }),
                ];
                break;
            case '2':
                ghosts = [
                    new Ghost({
                        position: {
                            x: Boundary.width * 9 + Boundary.width / 2,
                            y: Boundary.height * 7 + Boundary.height / 2,
                        },
                        velocity: {
                            x: stop,
                            y: stop,
                        },
                        color: "red",
                    }),

                    new Ghost({
                        position: {
                            x: Boundary.width * 4 + Boundary.width / 2,
                            y: Boundary.height * 1 + Boundary.height / 2,
                        },
                        velocity: {
                            x: stop,
                            y: stop,
                        },

                        color: "green",
                    }),

                ];
                break;
            case '3':
                ghosts = [
                    new Ghost({
                        position: {
                            x: Boundary.width * 9 + Boundary.width / 2,
                            y: Boundary.height * 7 + Boundary.height / 2,
                        },
                        velocity: {
                            x: stop,
                            y: stop,
                        },
                        color: "red",
                    }),

                    new Ghost({
                        position: {
                            x: Boundary.width * 4 + Boundary.width / 2,
                            y: Boundary.height * 1 + Boundary.height / 2,
                        },
                        velocity: {
                            x: stop,
                            y: stop,
                        },

                        color: "green",
                    }),

                    new Ghost({
                        position: {
                            x: Boundary.width * 2 + Boundary.width / 2,
                            y: Boundary.height * 18 + Boundary.height / 2,
                        },
                        velocity: {
                            x: stop,
                            y: stop,
                        },
                        color: "blue",
                    }),
                ];
                break;
            case '4':
                ghosts = [
                    new Ghost({
                        position: {
                            x: Boundary.width * 9 + Boundary.width / 2,
                            y: Boundary.height * 7 + Boundary.height / 2,
                        },
                        velocity: {
                            x: stop,
                            y: stop,
                        },
                        color: "red",
                    }),

                    new Ghost({
                        position: {
                            x: Boundary.width * 4 + Boundary.width / 2,
                            y: Boundary.height * 1 + Boundary.height / 2,
                        },
                        velocity: {
                            x: stop,
                            y: stop,
                        },

                        color: "cyan",
                    }),

                    new Ghost({
                        position: {
                            x: Boundary.width * 2 + Boundary.width / 2,
                            y: Boundary.height * 18 + Boundary.height / 2,
                        },
                        velocity: {
                            x: stop,
                            y: stop,
                        },
                        color: "green",
                    }),

                    new Ghost({
                        position: {
                            x: Boundary.width * 17 + Boundary.width / 2,
                            y: Boundary.height * 1 + Boundary.height / 2,
                        },
                        velocity: {
                            x: stop,
                            y: stop,
                        },
                        color: "blue",
                    }),


                ];
                break
        }
    }

    if (gameMapLvl.map === map2) {
        player = new Player({
            position: {
                x: Boundary.width * 9 + Boundary.width / 2,
                y: Boundary.height * 10 + Boundary.height / 2,
            },
            velocity: {
                x: stop,
                y: stop,
            },
        });

        switch (gameMapLvl.lvl) {
            case '1':
                ghosts = [
                    new Ghost({
                        position: {
                            x: Boundary.width * 9 + Boundary.width / 2,
                            y: Boundary.height * 7 + Boundary.height / 2,
                        },
                        velocity: {
                            x: stop,
                            y: stop,
                        },
                        color: "red",
                    }),
                ];
                break;
            case '2':
                ghosts = [
                    new Ghost({
                        position: {
                            x: Boundary.width * 9 + Boundary.width / 2,
                            y: Boundary.height * 3 + Boundary.height / 2,
                        },
                        velocity: {
                            x: stop,
                            y: stop,
                        },
                        color: "red",
                    }),

                    new Ghost({
                        position: {
                            x: Boundary.width * 1 + Boundary.width / 2,
                            y: Boundary.height * 1 + Boundary.height / 2,
                        },
                        velocity: {
                            x: stop,
                            y: stop,
                        },

                        color: "green",
                    }),

                ];
                break;
            case '3':
                ghosts = [
                    new Ghost({
                        position: {
                            x: Boundary.width * 9 + Boundary.width / 2,
                            y: Boundary.height * 3 + Boundary.height / 2,
                        },
                        velocity: {
                            x: stop,
                            y: stop,
                        },
                        color: "red",
                    }),

                    new Ghost({
                        position: {
                            x: Boundary.width * 1 + Boundary.width / 2,
                            y: Boundary.height * 1 + Boundary.height / 2,
                        },
                        velocity: {
                            x: stop,
                            y: stop,
                        },

                        color: "green",
                    }),

                    new Ghost({
                        position: {
                            x: Boundary.width * 17 + Boundary.width / 2,
                            y: Boundary.height * 20 + Boundary.height / 2,
                        },
                        velocity: {
                            x: stop,
                            y: stop,
                        },
                        color: "blue",
                    }),
                ];
                break;
            case '4':
                ghosts = [
                    new Ghost({
                        position: {
                            x: Boundary.width * 9 + Boundary.width / 2,
                            y: Boundary.height * 3 + Boundary.height / 2,
                        },
                        velocity: {
                            x: stop,
                            y: stop,
                        },
                        color: "red",
                    }),

                    new Ghost({
                        position: {
                            x: Boundary.width * 1 + Boundary.width / 2,
                            y: Boundary.height * 20 + Boundary.height / 2,
                        },
                        velocity: {
                            x: stop,
                            y: stop,
                        },

                        color: "cyan",
                    }),

                    new Ghost({
                        position: {
                            x: Boundary.width * 17 + Boundary.width / 2,
                            y: Boundary.height * 20 + Boundary.height / 2,
                        },
                        velocity: {
                            x: stop,
                            y: stop,
                        },
                        color: "green",
                    }),

                    new Ghost({
                        position: {
                            x: Boundary.width * 1 + Boundary.width / 2,
                            y: Boundary.height * 1 + Boundary.height / 2,
                        },
                        velocity: {
                            x: stop,
                            y: stop,
                        },
                        color: "blue",
                    }),


                ];
                break
        }


    }

    if (gameMapLvl.map === map3) {
        player = new Player({
            position: {
                x: Boundary.width * 8 + Boundary.width / 2,
                y: Boundary.height * 10 + Boundary.height / 2,
            },
            velocity: {
                x: stop,
                y: stop,
            },
        });

        switch (gameMapLvl.lvl) {
            case '1':
                ghosts = [
                    new Ghost({
                        position: {
                            x: Boundary.width * 10 + Boundary.width / 2,
                            y: Boundary.height * 10 + Boundary.height / 2,
                        },
                        velocity: {
                            x: stop,
                            y: stop,
                        },
                        color: "red",
                    }),
                ];
                break;
            case '2':
                ghosts = [
                    new Ghost({
                        position: {
                            x: Boundary.width * 10 + Boundary.width / 2,
                            y: Boundary.height * 10 + Boundary.height / 2,
                        },
                        velocity: {
                            x: stop,
                            y: stop,
                        },
                        color: "red",
                    }),

                    new Ghost({
                        position: {
                            x: Boundary.width * 3 + Boundary.width / 2,
                            y: Boundary.height * 17 + Boundary.height / 2,
                        },
                        velocity: {
                            x: stop,
                            y: stop,
                        },

                        color: "green",
                    }),

                ];
                break;
            case '3':
                ghosts = [
                    new Ghost({
                        position: {
                            x: Boundary.width * 10 + Boundary.width / 2,
                            y: Boundary.height * 10 + Boundary.height / 2,
                        },
                        velocity: {
                            x: stop,
                            y: stop,
                        },
                        color: "red",
                    }),

                    new Ghost({
                        position: {
                            x: Boundary.width * 3 + Boundary.width / 2,
                            y: Boundary.height * 17 + Boundary.height / 2,
                        },
                        velocity: {
                            x: stop,
                            y: stop,
                        },

                        color: "green",
                    }),

                    new Ghost({
                        position: {
                            x: Boundary.width * 17 + Boundary.width / 2,
                            y: Boundary.height * 3 + Boundary.height / 2,
                        },
                        velocity: {
                            x: stop,
                            y: stop,
                        },
                        color: "blue",
                    }),
                ];
                break;
            case '4':
                ghosts = [
                    new Ghost({
                        position: {
                            x: Boundary.width * 10 + Boundary.width / 2,
                            y: Boundary.height * 10 + Boundary.height / 2,
                        },
                        velocity: {
                            x: stop,
                            y: stop,
                        },
                        color: "red",
                    }),

                    new Ghost({
                        position: {
                            x: Boundary.width * 17 + Boundary.width / 2,
                            y: Boundary.height * 20 + Boundary.height / 2,
                        },
                        velocity: {
                            x: stop,
                            y: stop,
                        },

                        color: "cyan",
                    }),

                    new Ghost({
                        position: {
                            x: Boundary.width * 3 + Boundary.width / 2,
                            y: Boundary.height * 17 + Boundary.height / 2,
                        },
                        velocity: {
                            x: stop,
                            y: stop,
                        },
                        color: "green",
                    }),

                    new Ghost({
                        position: {
                            x: Boundary.width * 17 + Boundary.width / 2,
                            y: Boundary.height * 3 + Boundary.height / 2,
                        },
                        velocity: {
                            x: stop,
                            y: stop,
                        },
                        color: "blue",
                    }),


                ];
                break
        }


    }

    gameScreen.style.display = 'flex'
    gameOverScreen.style.display = 'none'
    winnerScreen.style.display = 'none'
    mainScreen.style.display = 'none'
    playGame(gameMapLvl.map, player, ghosts)
}

afterGame.forEach((button) => {
    button.addEventListener("click", () => {

        buttonAudio.pause();
        buttonAudio.currentTime = 0;
        buttonAudio.play();

        gameScreen.style.display = 'none';
        mapSelector.style.display = 'flex';
        lvlSelector.style.display = 'none';
        mainScreen.style.display = 'flex';
    })
})

backButton.addEventListener('click', () => {
    gameScreen.style.display = 'none'
    lvlSelector.style.display = 'none'
    mapSelector.style.display = 'flex'

    buttonAudio.pause()
    buttonAudio.currentTime = 0;
    buttonAudio.play()
})

















