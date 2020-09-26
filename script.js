const ship = document.querySelector('.hero');
const playArea = document.querySelector('#main-game');
const monsterImg = ['octo1.png','octo2.png','octo3.png'];
const instructionsText = document.querySelector('.game-instructions');
const startButton = document.querySelector('.start-button')

//Função para movimentação e o disparo da nave
function flyShip(event){
    if(event.key === 'ArrowUp'){
        event.preventDefault();
        moveUp();
    }else if(event.key === 'ArrowDown'){
        event.preventDefault();
        moveDown();
    }else if(event.key === " "){
        event.preventDefault();
        fireShoot();
    }
}

//Função para subir

function moveUp(){
    let topPosition = getComputedStyle(ship).getPropertyValue('top');
    if(topPosition === "0px"){
        return;
    }else{
        let position = parseInt(topPosition);
        position -= 50;
        ship.style.top = `${position}px`;
    }
}

//Função para descer
function moveDown(){
    let topPosition = getComputedStyle(ship).getPropertyValue('top');
    if(topPosition === "500px"){
        return;
    }else{
        let position = parseInt(topPosition);
        position += 50;
        ship.style.top = `${position}px`;
    }
}

//Função do disparo
function fireShoot(){
    let laser = createLaserElement();
    playArea.appendChild(laser);
    moveLaser(laser);
}

function createLaserElement(){
    let xPosition = parseInt(window.getComputedStyle(ship).getPropertyValue('left'));
    let yPosition = parseInt(window.getComputedStyle(ship).getPropertyValue('top'));
    let newLaser = document.createElement('img');
    newLaser.src = 'shoot.png';
    newLaser.classList.add('laser');
    newLaser.style.left = `${xPosition}px`;
    newLaser.style.top = `${yPosition - 10}px`;
    return newLaser;
}

function moveLaser(laser){
    let laserInterval = setInterval(() =>{
        let xPosition = parseInt(laser.style.left);
        let monsters = document.querySelectorAll('.monster');

        monsters.forEach((monster) => {
            if(checkLaserColision(laser,monster)){
                monster.src = 'explosion.png';
                monster.classList.remove('monster');
                monster.classList.add('dead-monster');
            }
        })

        if(xPosition === 340){
            laser.remove();
        }else{
            laser.style.left = `${xPosition + 8}px`
        }
    },10);
}

//Função para criar os monstros aleatórios
function createMonsters(){
    let newMonster = document.createElement('img');
    let monsterSprite = monsterImg[Math.floor(Math.random() * monsterImg.length)]; //Sorteio dos monstros
    newMonster.src = monsterSprite;
    newMonster.classList.add('monster');
    newMonster.classList.add('monster-transition');
    newMonster.style.left = '370px';
    newMonster.style.top = `${Math.floor(Math.random() * 330) + 30}px`
    playArea.appendChild(newMonster);
    moveMonster(newMonster);
}

//Função para movimentar os monstros
function moveMonster(monster){
    let moveMonsterInterval = setInterval (() =>{
        let xPosition = parseInt(window.getComputedStyle(monster).getPropertyValue('left'));
        if(xPosition <= 15){
            if(Array.from(monster.classList).includes('dead-monster')){
                monster.remove();
            }else{
                gameOver();
            }
        }else{
            monster.style.left = `${xPosition -4}px`
        }
    }, 30);
}

//Função para a colisão com os monstros
function checkLaserColision(laser,monster){
    let laserTop = parseInt(laser.style.top);
    let laserLeft = parseInt(laser.style.left);
    let laserBottom = laserTop - 20;
    let monsterTop = parseInt(monster.style.top);
    let monsterLeft = parseInt(monster.style.left);
    let monsterBottom = monsterTop - 40;

    if(laserLeft != 340 && laserLeft + 40 >= monsterLeft){
        if(laserTop <= monsterTop && laserTop >= monsterBottom){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}

//Função para iniciar o jogo

startButton.addEventListener('click',(event) =>{
    playGame();
})

function playGame(){
    startButton.style.display = 'none';
    instructionsText.style.display = 'none';
    window.addEventListener('keydown',flyShip);
    monsterInterval = setInterval(() =>{
        createMonsters();
    },2000);
}

//Função de Game Over

function gameOver(){
    window.removeEventListener('keydown' ,flyShip);
    clearInterval(monsterInterval);
    let monsters = document.querySelectorAll('.monster');
    monsters.forEach((monster) => monster.remove());
    let lasers = document.querySelectorAll('.laser');
    lasers.forEach((laser) => laser.remove());
    setTimeout(() => {
        alert("GAME OVER!");
        ship.style.top = '250px';
        startButton.style.display = 'block';
        instructionsText.style.display = 'block';
    })
}


