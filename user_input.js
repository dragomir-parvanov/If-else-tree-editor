//mouse cords
document.addEventListener('mousemove', onMouseUpdate, false);
document.addEventListener('mouseenter', onMouseUpdate, false);

function onMouseUpdate(e) {
    mousePosX = e.pageX;
    mousePosY = e.pageY - NavbarHeight;
}
//control functions
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

function keyDownHandler(event) {
    if (event.keyCode == 39) {
        rightPressed = true;
    } else if (event.keyCode == 37) {
        leftPressed = true;
    }
    if (event.keyCode == 40) {
        downPressed = true;
    } else if (event.keyCode == 38) {
        upPressed = true;
    }
}

function keyUpHandler(event) {
    if (event.keyCode == 39) {
        rightPressed = false;
    } else if (event.keyCode == 37) {
        leftPressed = false;
    }
    if (event.keyCode == 40) {
        downPressed = false;
    } else if (event.keyCode == 38) {
        upPressed = false;
    }
}

function keyUpdate() {
    //Control update
    if (rightPressed) {
        Client.X += Client.Speed;
    } else if (leftPressed) {
        Client.X -= Client.Speed;
    }
    if (downPressed) {
        Client.Y += Client.Speed;
    } else if (upPressed) {
        Client.Y -= Client.Speed;
    }
}
