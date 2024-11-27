import { Boundary } from "./boundary.js";
import { Food } from "./food.js";

function createImage(src) {
    const image = new Image();
    image.src = src;

    return image;
}

// ------------------------------------ GENERATING MAP ------------------------------------------
export function generateMap(map, boundaries, foods) {
    map.forEach((row, i) => {
        row.forEach((symbol, j) => {
            const position = {
                x: Boundary.width * j,
                y: Boundary.height * i
            };

            switch (symbol) {
                case '11':
                    boundaries.push(new Boundary({
                        position,
                        image: createImage('./assets/img/img35/pipeCorner1.png'),
                    }));
                    break;

                case '22':
                    boundaries.push(new Boundary({
                        position,
                        image: createImage('./assets/img/img35/pipeCorner2.png'),
                    }));
                    break;

                case '33':
                    boundaries.push(new Boundary({
                        position,
                        image: createImage('./assets/img/img35/pipeCorner3.png'),
                    }));
                    break;

                case '44':
                    boundaries.push(new Boundary({
                        position,
                        image: createImage('./assets/img/img35/pipeCorner4.png'),
                    }));
                    break;

                case '--':
                    boundaries.push(new Boundary({
                        position,
                        image: createImage('./assets/img/img35/pipeHorizontal.png'),
                    }));
                    break;

                case '||':
                    boundaries.push(new Boundary({
                        position,
                        image: createImage('./assets/img/img35/pipeVertical.png'),
                    }));
                    break;

                case 'bb':
                    boundaries.push(new Boundary({
                        position,
                        image: createImage('./assets/img/img35/block.png'),
                    }));
                    break;

                case 'cb':
                    boundaries.push(new Boundary({
                        position,
                        image: createImage('./assets/img/img35/capBottom.png'),
                    }));
                    break;

                case 'cl':
                    boundaries.push(new Boundary({
                        position,
                        image: createImage('./assets/img/img35/capLeft.png'),
                    }));
                    break;

                case 'cr':
                    boundaries.push(new Boundary({
                        position,
                        image: createImage('./assets/img/img35/capRight.png'),
                    }));
                    break;

                case 'ct':
                    boundaries.push(new Boundary({
                        position,
                        image: createImage('./assets/img/img35/capTop.png'),
                    }));
                    break;

                case 'pd':
                    boundaries.push(new Boundary({
                        position,
                        image: createImage('./assets/img/img35/pipeConnectorBottom.png'),
                    }));
                    break;

                case 'pl':
                    boundaries.push(new Boundary({
                        position,
                        image: createImage('./assets/img/img35/pipeConnectorLeft.png'),
                    }));
                    break;

                case 'pr':
                    boundaries.push(new Boundary({
                        position,
                        image: createImage('./assets/img/img35/pipeConnectorRight.png'),
                    }));
                    break;

                case 'pt':
                    boundaries.push(new Boundary({
                        position,
                        image: createImage('./assets/img/img35/pipeConnectorTop.png'),
                    }));
                    break;
                case 'pc':
                    boundaries.push(new Boundary({
                        position,
                        image: createImage('./assets/img/img35/pipeCross.png'),
                    }));
                    break;

                case '  ':
                    foods.push(new Food({
                        position: {
                            x: (35 * j) + 35 / 2,
                            y: (35 * i) + 35 / 2,
                        },
                    }));
                    break;

                default:
                    // Handle any unexpected symbols, if necessary
                    break;
            }
        });
    });
}
    