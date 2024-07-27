const board = document.querySelector('.board')
console.log(board)
let snake = [{ x: 12, y: 16 }]
let food = {x:8 , y : 9}
let direction = 'right'
let gameInterval
let gamestarted = false
let speed = 400

//Render the snake and food
function renderElements(){
    board.innerHTML = ""
    //snake render
    snake.forEach((cell) => {
        const celldiv = document.createElement('div')
        celldiv.style.gridColumnStart = cell.x
        celldiv.style.gridRowStart = cell.y
        celldiv.classList.add('snake')
        board.appendChild(celldiv)
    })
    const fooddiv = document.createElement('div')
    fooddiv.style.gridColumnStart = food.x
    fooddiv.style.gridRowStart = food.y
    fooddiv.classList.add('food')
    board.appendChild(fooddiv)
}

//move the snake
function move(){
    let head = {...snake[0]}
    switch(direction){
        case 'right':
            head.x++
            break

        case 'left':
            head.x--
            break
        case 'up':
            head.y--
            break
        case 'down':
            head.y++
            break
        default:
            break
    }
    snake.unshift(head)
    // food eating logic
    if(head.x == food.x && head.y == food.y){
        food.x = Math.floor(Math.random() * 20) + 1
        food.y = Math.floor(Math.random() * 20) + 1
        speed = speed - 20
        clearInterval(gameInterval)
        gameInterval = setInterval(() => {
            move()
            checkCollision()
            renderElements()
        } , speed);
    }
    else{
        snake.pop()
    }
}

//start game function
function startGame(){
    gamestarted = true
    clearInterval(gameInterval)
    gameInterval = setInterval(() => {
        move()
        checkCollision()
        renderElements()
    } , speed); 
}

//collision checking
function checkCollision(){
    let head = { ...snake[0] }

    if (head.x < 1 || head.x > 20 || head.y < 1 || head.y > 20) {
        clearInterval(gameInterval);
        gamestarted = false;
        alert('Game Over! Press any key to restart.');
    }
}

//This functon will hear all event listener
function alleventListner(event){

    if(!gamestarted){
        startGame()
    }
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
document.addEventListener('keydown' , alleventListner)