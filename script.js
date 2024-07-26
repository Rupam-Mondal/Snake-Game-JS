const board = document.getElementById('game-board');

let snake = [{ x: 4, y: 17 }];
let food = { x: 15, y: 17 };

let direction = 'right';
let speed = 500
let gameInterval;
let gamestarted = false

// Render snake and food
function renderElements() {
    board.innerHTML = "";
    // Snake render
    snake.forEach((cell) => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridColumnStart = cell.x;
        snakeElement.style.gridRowStart = cell.y;
        snakeElement.classList.add('snake');
        board.appendChild(snakeElement);
    });

    // Food render
    const foodElement = document.createElement('div');
    foodElement.style.gridColumnStart = food.x;
    foodElement.style.gridRowStart = food.y;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// Move the snake
function move() {
    // Create a shallow copy of the object
    const head = { ...snake[0] };
    switch (direction) {
        case 'right':
            head.x++;
            break;
        case 'left':
            head.x--;
            break;
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
    }
    // Add new head to the front of the snake
    snake.unshift(head);
    
    if(head.x == food.x && head.y == food.y){
        food.x = Math.floor(Math.random() * 20)
        food.y = Math.floor(Math.random() * 20)
        clearInterval()
        gameInterval = setInterval(() => {
            move()
            renderElements()
        } , speed);
    }
    else{
        snake.pop()
    }
}

function startGame(){
    gamestarted = true
    gameInterval = setInterval(() => {
        move()
        renderElements()
    }, speed);
}

function alleventlistner(event){
    if(!gamestarted){
        startGame()
    }
    else{
        switch (event.key) {
            case 'ArrowUp':
                direction = 'up';
                break;
            case 'ArrowDown':
                direction = 'down';
                break;
            case 'ArrowLeft':
                direction = 'left';
                break;
            case 'ArrowRight':
                direction = 'right';
                break;
        }
    }
}

document.addEventListener('keydown' , alleventlistner);

