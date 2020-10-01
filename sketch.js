var ball, paddle, ballImage, paddleImage;
var score;
var gameState, PLAY, END;
var velocityX, velocityY, directionX, directionY;
var isRandomVelocitySet = false;
var spaceText = '"Space bar"';
var timesBallLostLeft = 5;

function preload() {
    ballImage = loadImage("ball.png");
    paddleImage = loadImage("paddle.png");
}

function setup() {
    score = 0;
    edges = createEdgeSprites();
    createCanvas(400, 400);
    ball = createSprite(200, 200);
    ball.addImage(ballImage);
    paddle = createSprite(340, 200);
    paddle.addImage(paddleImage);
    velocityX = random(4, 8);
    velocityY = random(4, 8);
    directionY = random(-2, 2);
    gameState = "notStarted"
    PLAY = 1;
    END = 0;
    fill("blue");
    textSize(18);
}
function draw() {
    background(205, 153, 0);

    console.log(gameState);

    ballLostPosChecker = ball.y + paddle.width / 2;
    ballLostPosCheckerRequired = paddle.y + paddle.width / 2;

    controlGameWithGameStates();
    createObjectCollisons();

    if (score >= 10) {
        gameState = "won";
    }
    drawSprites();

    fill("blue");
    textSize(18);
    text("Your Score: " + score, 250, 100);

    function controlGameWithGameStates() {
        if (ball.isTouching(edges[1])) {
            timesBallLostLeft -= 1;
            ball.x = 200;
            ball.y = 200;
            paddle.y = 200;
            isRandomVelocitySet = false;
            gameState = "notStarted";
            ball.setVelocity(0, 0);
            score -= 2;
        }

        if (timesBallLostLeft <= 0 || score < 0) {
            gameState = END;
        }
        
        if()        
        {

        }

        if (gameState === END) {
            textSize(35);
            fill("green");
            text("Ooops! Sorry, you lost the Game.... :( Try more", 5, 280, 395, 360);
        }

        if (keyWentDown("space") && gameState === "notStarted") {
            gameState = PLAY;
            ball.setVelocity(9, 0);
        }

        if (gameState === "won") {
            textSize(35);
            fill("green");
            text("You Win!!!", 105, 280, 395, 360);
            fill("blue");
            textSize(18);
            text("Press " + spaceText + " again to restart the game!", 20, 130, 395, 360);
            ball.x = 200;
            ball.y = 200;
            ball.setVelocity(0, 0);
            timesBallLostLeft = 5;

            if (keyWentDown("space")) {
                gameState = PLAY;
                score = 0;
                ball.setVelocity(9, 0);
                paddle.y = 200;
                isRandomVelocitySet = false;
            }

            if (ball.isTouching(paddle)) {
                console.log(score);
                if (score <= 10) {
                    score = score + 1;
                }
                if (!isRandomVelocitySet) {
                    if (directionY < 0) {
                        velocityY *= -1;
                    }

                    ball.setVelocity(velocityX, velocityY);
                    isRandomVelocitySet = true;
                }
            }
        }

        if (gameState === PLAY) {
            if (keyDown("up")) {
                paddle.y -= 20;
            }

            if (keyDown("down")) {
                paddle.y += 20;
            }

            if (ball.isTouching(paddle)) {
                console.log(score);
                if (score <= 10) {
                    score = score + 1;
                }
                if (!isRandomVelocitySet) {
                    if (directionY < 0) {
                        velocityY *= -1;
                    }

                    ball.setVelocity(velocityX, velocityY);
                    isRandomVelocitySet = true;
                }
            }
        }

        if (gameState === PLAY) {
            fill("blue");
            textSize(18);
            text("Times you can loose the ball: " + timesBallLostLeft, 50, 380);
        }
        if (gameState === "notStarted") {
            fill("blue");
            textSize(18);
            text("Press" + spaceText + " to continue with the game", 30, 300);
            text("Move with your arrow keys", 50, 350);
        }
    }
    // text(frameCount, 150, 100);
}

function createObjectCollisons() {
    ball.bounceOff(edges[0]);
    ball.bounceOff(edges[2]);
    ball.bounceOff(edges[3]);
    ball.bounceOff(paddle);
    paddle.bounceOff(edges[2]);
    paddle.bounceOff(edges[3]);
}