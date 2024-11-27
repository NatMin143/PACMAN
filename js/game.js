// index.js
import { Boundary } from "./boundary.js";
import { generateMap } from "./generateMap.js";
import { Player } from "./player.js";
import { Ghost } from "./ghost.js";
import { winnerScreen, mainScreen, gameScreen, gameOverScreen } from "./index.js";
let foodsStatus = [];

// it draws the initial frame so that it can play music before the start of the game and for the purpose of the player to be ready
export function drawInitialFrame(map, player, ghosts, foodsStatus) {
    const canvas = document.querySelector("canvas");
    const c = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = innerHeight;

    c.clearRect(0, 0, canvas.width, canvas.height);
    const boundaries = [];
    let foods = [];
    generateMap(map, boundaries, foods);

    // Draw boundaries
    boundaries.forEach(boundary => {
        boundary.draw(c)
    })

    if (foodsStatus.length > 0) {
        foods = [...foodsStatus]
    }

    // Draw foods
    foods.forEach(food => {
        // console.log(food)
        food.draw(c);
    });
    

    // Draw player
    player.draw(c);

    // Draw ghosts
    ghosts.forEach(ghost => {
        ghost.draw(c);
    });

    foodsStatus = []
}

// this happens here the combination of startGame and drawInitialframe (sorry for the naming of variables)
export function playGame(map, player, ghosts) {
    const music = new Audio('./assets/musics/start-pacman.mp3')
    music.play();

     // Draw the initial frame
     drawInitialFrame(map, player, ghosts, foodsStatus);

    // Freeze the game for a certain duration
    setTimeout(() => {
        music.pause();
        music.currentTime = 0;
        startGame(map, player, ghosts); // Start the game animation
    }, 4500);
}

let score = 0;

export function startGame(map, player, ghosts) {
    const eatenFoodAudio = new Audio('./assets/musics/pacmanwakawaka.mp3')
    const ghostAudio = new Audio('./assets/musics/ghostAudio.mp3')
    eatenFoodAudio.loop = true;
    eatenFoodAudio.play();
    ghostAudio.currentTime = 0;
    ghostAudio.loop = true;
    ghostAudio.play();


    const canvas = document.querySelector("canvas");
    const c = canvas.getContext("2d");
    const scoreEl = document.querySelector("#scoreEl");

    canvas.style.padding = '0px'
    canvas.width = 800;
    canvas.height = innerHeight;

    const boundaries = [];
    const foods = [];
    generateMap(map, boundaries, foods);


    let stop = 0;
    let lastKey



    let ghostStartingPosition = {
        position: { x: ghosts[0].position.x, y: ghosts[0].position.y },
    };

    // keys if pressed
    const keys = {
        w: { pressed: false },
        a: { pressed: false },
        s: { pressed: false },
        d: { pressed: false },
        ArrowUp: { pressed: false },
        ArrowLeft: { pressed: false },
        ArrowDown: { pressed: false },
        ArrowRight: { pressed: false },
    };

    // ---------------------- EVENTS LISTENERS FOR KEY UP AND DOWN -----------------------
    addEventListener("keydown", ({ key }) => {
        switch (key) {
            case "w":
                keys.w.pressed = true;
                lastKey = "w";
                break;
            case "a":
                keys.a.pressed = true;
                lastKey = "a";
                break;
            case "s":
                keys.s.pressed = true;
                lastKey = "s";
                break;
            case "d":
                keys.d.pressed = true;
                lastKey = "d";
                break;
            case "ArrowUp":
                keys.ArrowUp.pressed = true;
                lastKey = "ArrowUp";
                break;
            case "ArrowLeft":
                keys.ArrowLeft.pressed = true;
                lastKey = "ArrowLeft";
                break;
            case "ArrowDown":
                keys.ArrowDown.pressed = true;
                lastKey = "ArrowDown";
                break;
            case "ArrowRight":
                keys.ArrowRight.pressed = true;
                lastKey = "ArrowRight";
                break;
        }
    });

    addEventListener("keyup", ({ key }) => {
        switch (key) {
            case "w":
                keys.w.pressed = false;
                break;
            case "a":
                keys.a.pressed = false;
                break;
            case "s":
                keys.s.pressed = false;
                break;
            case "d":
                keys.d.pressed = false;
                break;
            case "ArrowUp":
                keys.ArrowUp.pressed = false;
                break;
            case "ArrowLeft":
                keys.ArrowLeft.pressed = false;
                break;
            case "ArrowDown":
                keys.ArrowDown.pressed = false;
                break;
            case "ArrowRight":
                keys.ArrowRight.pressed = false;
                break;
        }
    });


    // ------------------------- FUNCTIONS FOR COLLISSIONS ------------------
    function circleCollideRectangle({ circle, rectangle }) {
        const padding = (Boundary.height / 2) - circle.radius - 0.5
        return (
            circle.position.y - circle.radius + circle.velocity.y <=
            rectangle.position.y + rectangle.height + padding &&
            circle.position.x - circle.radius + circle.velocity.x <=
            rectangle.position.x + rectangle.width + padding &&
            circle.position.y + circle.radius + circle.velocity.y >=
            rectangle.position.y - padding &&
            circle.position.x + circle.radius + circle.velocity.x >=
            rectangle.position.x - padding
        );
    }

    // ---------------------- GRAPHING ALGORITHM A* -----------------------
    function manhattanDist(from, toTarget) {
        return (
            Math.abs(toTarget.position.x - from.position.x) +
            Math.abs(toTarget.position.y - from.position.y)
        );
    }

    function f(g, h) {
        return g + h;
    }

    function astar(player, ghostNextMove) {
        let g = manhattanDist(ghostNextMove, ghostStartingPosition);
        let h = manhattanDist(ghostNextMove, player);

        let result = f(g + 1, h);
        return result;
    }

    // ------------------------- ADDITIONAL MOVEMENT FOR MORE TAILORED OR IMPROVED AI FOR THE GHOST ---------------------------
    function findDistance(firstPoint, secondPoint) {
        return Math.sqrt(
            Math.pow(secondPoint.x - firstPoint.position.x, 2) +
            Math.pow(secondPoint.y - firstPoint.position.y, 2)
        );
    }

    function findDirectionDistance(direction, player, ghost) {
        const modifiedGhostPosition = {
            x: ghost.position.x,
            y: ghost.position.y,
        };

        switch (direction) {
            case "up":
                modifiedGhostPosition.y -= Boundary.height;
                return findDistance(player, modifiedGhostPosition);
            case "right":
                modifiedGhostPosition.x += Boundary.width;
                return findDistance(player, modifiedGhostPosition);
            case "down":
                modifiedGhostPosition.y += Boundary.height;
                return findDistance(player, modifiedGhostPosition);
            case "left":
                modifiedGhostPosition.x -= Boundary.width;
                return findDistance(player, modifiedGhostPosition);
        }
    }

    // ------------------------------- TO MOVE OR GET VELOCITY ----------------------
    function getVelocity(direction, character) {
        switch (direction) {
            case "up":
                return { x: stop, y: -character.speed };
            case "right":
                return { x: character.speed, y: stop };
            case "down":
                return { x: stop, y: character.speed };
            case "left":
                return { x: -character.speed, y: stop };
        }
    }

    let playerState = {
        position: { x: player.position.x, y: player.position.y },
        velocity: { x: 0, y: 0 }
    };

    const ghostsStartingState = ghosts.map(ghost => ({
        position: { x: ghost.position.x, y: ghost.position.y },
        velocity: { x: 0, y: 0 }
    }));

    console.log("GSS", ghostsStartingState)

    let isAnimating = false;

    // ---------------- for stopping the animation-----------------
    function stopAnimation(animationId) {
        eatenFoodAudio.pause()
        ghostAudio.pause()
        cancelAnimationFrame(animationId)
        isAnimating = false;
    }

    // ---------------- for resuming the animation-----------------
    function resumeAnimation() {
        if (!isAnimating) { // Only start the animation if it's not already running
            isAnimating = true; // Set the flag to true
            animate(); // Start the animation
        }
        ghostAudio.currentTime = 0;
        ghostAudio.play()
        eatenFoodAudio.play()
    }

    // ---------------- it handle collisions and only used when there still lives left (>0)-----------------
    function handleCollision() {
        const music = new Audio('./assets/musics/start-pacman.mp3');
        music.play(); // Play the music

        // Freeze the game for a certain duration (e.g., 3 seconds)
        setTimeout(() => {
            music.pause(); // Stop the music
            music.currentTime = 0; // Reset the music to the beginning
            resumeAnimation(animationId); // Resume the game animation
        }, 4600); // Adjust the duration as needed
    }

    // it updates the images og lives left
    function updateLivesImage(lives) {
        const livesLeftImg = document.getElementById("livesLeftImg");
        if (lives === 3) {
            livesLeftImg.src = "./assets/3lives.png";
        } else if (lives === 2) {
            livesLeftImg.src = "./assets/2lives.png";
        } else if (lives === 1) {
            livesLeftImg.src = "./assets/1lives.png";
        } else {
            livesLeftImg.src = "./assets/0lives.png"; // Optional: Handle case for 0 lives
        }
    }

    // ----------------- CHECK COLLISION BETWEEN PLAYER AND THE GHOSTS ----------------------
    function checkCollision(player, animationId) {
        ghosts.forEach((ghost, index) => {
            const distance = Math.hypot(
                ghost.position.x - player.position.x,
                ghost.position.y - player.position.y
            );

            // Check if the distance is less than the sum of the radii
            if (distance < ghost.radius + player.radius + 1) {
                console.log("Collision Detected");
                player.velocity = { x: 0, y: 0 };

                lives -= 1;
                console.log('Lives Left', lives);
                updateLivesImage(lives);

                // Reset all ghosts to their starting positions
                console.log("BEFORE", ghosts)
                ghosts.forEach((g, i) => {
                    g.position = { ...ghostsStartingState[i].position }; // Reset position
                    g.velocity = { ...ghostsStartingState[i].velocity }; // Reset velocity

                })
                
                stopAnimation(animationId)
                drawInitialFrame(map, player, ghosts, foodsStatus)

                if (lives > 0) {
                    // If there are lives left, continue the game
                    handleCollision()
                } else {
                    gameScreen.style.display = 'none'
                    eatenFoodAudio.pause()
                    ghostAudio.pause()
                    gameOverAudio.pause()
                    gameOverAudio.currentTime = 0;
                    gameOverAudio.play()
                    stopAnimation(animationId)

                    score = 0;
                    scoreEl.innerHTML = score;
                    foodsStatus = []
                    livesLeftImg.src = './assets/3lives.png'
                    winnerScreen.style.display = 'none'
                    gameOverScreen.style.display = 'flex'
                }
            }
        });
    }

    let lives = 3
    const livesLeftImg = document.getElementById("livesLeftImg")
    let animationId;
    const gameOverAudio = new Audio('./assets/musics/pacman-death-sfx.mp3')
    const youWinAudio = new Audio('./assets/musics/pacman-win.mp3')

    // ------------------------- MOVEMENTS LOGIC ANIMATIONS AND UPDATES ---------------------------
    function animate() {
        animationId = requestAnimationFrame(animate)
        c.clearRect(0, 0, canvas.width, canvas.height);

        // ----------------- Player movement and checking collisions ----------------------
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (keys.w.pressed || keys.ArrowUp.pressed) {
                if (
                    circleCollideRectangle({
                        circle: { ...player, velocity: { x: stop, y: -Player.speed } },
                        rectangle: boundary,
                    })
                ) {
                    player.velocity.y = stop;
                    break;
                } else {
                    player.velocity.y = -Player.speed;
                }
            } else if (keys.a.pressed || keys.ArrowLeft.pressed) {
                if (
                    circleCollideRectangle({
                        circle: { ...player, velocity: { x: -Player.speed, y: stop } },
                        rectangle: boundary,
                    })
                ) {
                    player.velocity.x = stop;
                    break;
                } else {
                    player.velocity.x = -Player.speed;
                }
            } else if (keys.s.pressed || keys.ArrowDown.pressed) {
                if (
                    circleCollideRectangle({
                        circle: { ...player, velocity: { x: stop, y: Player.speed } },
                        rectangle: boundary,
                    })
                ) {
                    player.velocity.y = stop;
                    break;
                } else {
                    player.velocity.y = Player.speed;
                }
            } else if (keys.d.pressed || keys.ArrowRight.pressed) {
                if (
                    circleCollideRectangle({
                        circle: { ...player, velocity: { x: Player.speed, y: stop } },
                        rectangle: boundary,
                    })
                ) {
                    player.velocity.x = stop;
                    break;
                } else {
                    player.velocity.x = Player.speed;
                }
            }
        }

        // Update player position / rotation
        if (player.velocity.x > 0) player.rotation = 0
        else if (player.velocity.x < 0) player.rotation = Math.PI
        if (player.velocity.y > 0) player.rotation = Math.PI / 2
        else if (player.velocity.y < 0) player.rotation = -Math.PI / 2

        // -------------- For generating the boundaries in the map ----------------------
        boundaries.forEach((boundary) => {
            boundary.draw(c);

            if (circleCollideRectangle({ circle: player, rectangle: boundary })) {
                player.velocity.x = stop;
                player.velocity.y = stop;
            }

        });

        // --------------------- For generating the foods and splicing when eaten --------------------
        for (let i = foods.length - 1; 0 <= i; i--) {
            const food = foods[i];
            food.draw(c);

            if (
                Math.hypot(
                    food.position.x - player.position.x,
                    food.position.y - player.position.y
                ) <
                food.radius + player.radius
            ) {
                foods.splice(i, 1);
                scoreEl.innerHTML = score += 1;
                foodsStatus = [...foods]

            }

        }

        // ------------------- FOR AI MOVEMENT AND COLLISION DETECTION OF GHOSTS---------------------------
        ghosts.forEach((ghost, i) => {

            // ---------------------- FOR OTHERS GHOSTS OTHER THAN THE RED ONE ------------------------------
            if (ghost.color == 'green' || ghost.color == 'blue' || ghost.color == 'cyan') {
                let availablePath = ["up", "right", "down", "left"];
                let visitedPaths = []; // Array to track visited directions in the current frame
                let previousDirection = ghost.previousDirection; // Track previous direction

                // Collision checks for each direction
                boundaries.forEach((boundary) => {
                    if (
                        circleCollideRectangle({
                            circle: { ...ghost, velocity: { x: stop, y: -Ghost.speed } },
                            rectangle: boundary,
                        })
                    ) {
                        availablePath.splice(availablePath.indexOf("up"), 1);
                        // console.log("Up is removed",)
                    }

                    if (
                        circleCollideRectangle({
                            circle: { ...ghost, velocity: { x: Ghost.speed, y: stop } },
                            rectangle: boundary,
                        })
                    ) {
                        availablePath.splice(availablePath.indexOf("right"), 1);
                        // console.log("Right is removed",)
                    }

                    if (
                        circleCollideRectangle({
                            circle: { ...ghost, velocity: { x: stop, y: Ghost.speed } },
                            rectangle: boundary,
                        })
                    ) {
                        availablePath.splice(availablePath.indexOf("down"), 1);
                        // console.log("Down is removed",)
                    }

                    if (
                        circleCollideRectangle({
                            circle: { ...ghost, velocity: { x: -Ghost.speed, y: stop } },
                            rectangle: boundary,
                        })
                    ) {
                        availablePath.splice(availablePath.indexOf("left"), 1);
                        // console.log("Left is removed",)
                    }


                });


                // console.log("INITIAL", availablePath)
                // Remove the opposite of the previous direction
                if (previousDirection) {
                    const opposite = {
                        up: "down",
                        right: "left",
                        down: "up",
                        left: "right",
                    };
                    availablePath = availablePath.filter(
                        (dir) => dir !== opposite[previousDirection]
                    );
                }

                // If there are no available paths, allow the ghost to move in the previous direction
                if (availablePath.length === 0) {
                    if (previousDirection) {
                        availablePath = [previousDirection]; // Only allow the previous direction if trapped
                    } else {
                        ghost.velocity = { x: stop, y: stop };
                    }
                }

                // Choose a random direction from available paths, if any
                if (availablePath.length > 0) {
                    const randomIndex = Math.floor(Math.random() * availablePath.length);
                    const randomDirection = availablePath[randomIndex];

                    // // Mark the random direction as visited
                    // visitedPaths.push(randomDirection);

                    // Update the ghost's velocity
                    ghost.velocity = getVelocity(randomDirection, Ghost)



                    // Save the current direction as the previous direction
                    ghost.previousDirection = randomDirection;

                } else {
                    // No available paths, stop ghost movement
                    ghost.velocity.x = stop;
                    ghost.velocity.y = stop;
                }


                checkCollision(player, animationId)
            }

            // ------------------------------- FOR THE RED GHOST WHO ALWAYS CHASE PACMAN -------------------------
            else {
                let availablePath = ["up", "right", "down", "left"];
                let previousDirection = ghost.previousDirection;


                // Save the ghost's current position as its last position
                let lastPosition = { x: ghost.position.x, y: ghost.position.y };

                // Collision checks for each direction and also removes the direction to the available paths if it's blocked by a wall
                boundaries.forEach((boundary) => {
                    if (
                        circleCollideRectangle({
                            circle: { ...ghost, velocity: { x: stop, y: -Ghost.speed } },
                            rectangle: boundary,
                        })
                    ) {
                        availablePath = availablePath.filter((dir) => dir !== "up");
                    }
                    if (
                        circleCollideRectangle({
                            circle: { ...ghost, velocity: { x: Ghost.speed, y: stop } },
                            rectangle: boundary,
                        })
                    ) {
                        availablePath = availablePath.filter((dir) => dir !== "right");
                    }
                    if (
                        circleCollideRectangle({
                            circle: { ...ghost, velocity: { x: stop, y: Ghost.speed } },
                            rectangle: boundary,
                        })
                    ) {
                        availablePath = availablePath.filter((dir) => dir !== "down");
                    }
                    if (
                        circleCollideRectangle({
                            circle: { ...ghost, velocity: { x: -Ghost.speed, y: stop } },
                            rectangle: boundary,
                        })
                    ) {
                        availablePath = availablePath.filter((dir) => dir !== "left");
                    }
                });

                // Remove the opposite of the previous direction
                if (previousDirection) {
                    const opposite = {
                        up: "down",
                        right: "left",
                        down: "up",
                        left: "right",
                    };
                    availablePath = availablePath.filter(
                        (dir) => dir !== opposite[previousDirection]
                    );
                }

                let costs = [];
                if (availablePath.length === 1) {
                    ghost.velocity = getVelocity(availablePath[0], Ghost);
                    ghost.previousDirection = availablePath[0];
                    checkCollision(player, animationId)
                    ghost.update(c)
                    return;
                } else {
                    availablePath.forEach((direction) => {
                        const nextMove = { x: ghost.position.x, y: ghost.position.y };
                        switch (direction) {
                            case "up":
                                nextMove.y -= Boundary.height;
                                break;
                            case "right":
                                nextMove.x += Boundary.width;
                                break;
                            case "down":
                                nextMove.y += Boundary.height;
                                break;
                            case "left":
                                nextMove.x -= Boundary.width;
                                break;
                        }
                        costs.push({ direction, cost: astar(player, { position: nextMove }) });
                    });
                }

                // FIND THE PATH WITH THE LOWEST COST
                const minCost = Math.min(...costs.map((costObj) => costObj.cost));

                // FIND THE PATH WITH THE LOWEST COST and the direction
                const bestMoves = costs.filter((costObj) => costObj.cost === minCost);

                let currentShortestDistance = Infinity;
                let moveTo = ''

                // FIND THE FINAL VERY BEST MOVE TO GO FROM THE BEST MOVES CHOICES BY CALCULATING THE DISTANCE TO THE PLAYER
                // JUST ANOTHER ADDITION FOR MORE ACCURATE MOVEMENT OF CHASING OF THE GHOST
                bestMoves.forEach((path) => {
                    const currentDistance = findDirectionDistance(path.direction, player, ghost);
                    if (currentDistance < currentShortestDistance) {
                        currentShortestDistance = currentDistance
                        moveTo = path.direction

                    } else {
                        bestMoves.splice(bestMoves.indexOf(path), 1);
                    }
                });


                ghost.velocity = getVelocity(moveTo, Ghost);
                checkCollision(player, animationId)
                ghost.update(c)
                ghostStartingPosition.position = { x: ghost.position.x, y: ghost.position.y };

                ghost.previousDirection = moveTo;
            }


            // Update ghost position
            ghost.update(c);


        });



        // update player's position
        player.update(c);

        // this means that player wins
        if (foods.length === 0) {
            gameScreen.style.display = 'none'

            youWinAudio.pause()
            youWinAudio.currentTime = 0
            youWinAudio.play()
            ghostAudio.pause()
            eatenFoodAudio.pause()
            stopAnimation(animationId);

            score = 0;
            scoreEl.innerHTML = score;
            livesLeftImg.src = '/assets/3lives.png'
            gameOverScreen.style.display = 'none'
            winnerScreen.style.display = 'flex'
        }
    }

    animate()

}