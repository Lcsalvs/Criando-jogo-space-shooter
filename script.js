const ship = document.querySelector('.hero');
const playArea = document.querySelector('.main-game');

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

addEventListener('keydown', flyShip);