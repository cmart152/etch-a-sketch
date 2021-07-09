const RGB = document.querySelector('#RGB');
const black = document.querySelector('#black');
const reset = document.querySelector('#reset');
const shader = document.querySelector('#shader');
const eraser = document.querySelector('#eraser');
const pickColor = document.querySelector('#pickColor');
const body = document.querySelector('#bodyTag');
const gridSquare = document.querySelector('#gridSquare');
const gridBox = document.querySelector('#gridBox');

const gridContainer = document.createElement('div');
      gridContainer.id='gridContainer';
      gridContainer.classList.add('grid');
      gridBox.appendChild(gridContainer);
      
let gridColor = 'rgb(0,0,0)';
let btn = 'black';
let noPaint = false;


for (let i=0;i<256;i++) {
const gridElements = document.createElement('div');
      gridElements.classList.add('gridElements');
      gridElements.id='gridElements';
      gridElements.style.backgroundColor = 'rgb(255,255,255)';
      gridContainer.appendChild(gridElements);    
}


reset.addEventListener('click', function() {
    reset.classList.add('buttonPress');
    newGrid();
reset.addEventListener('transitionend', function(e) {
reset.classList.remove('buttonPress');
});
});

RGB.addEventListener('click', function () {
    RGB.classList.add('buttonPress');
    btn='rgb'
RGB.addEventListener('transitionend', function(e) {
RGB.classList.remove('buttonPress');
})
})

black.addEventListener('click', function () {
    black.classList.add('buttonPress');
    btn = 'black';
black.addEventListener('transitionend', function(e) {
black.classList.remove('buttonPress');
})
})

shader.addEventListener('click', function () {
    shader.classList.add('buttonPress');
    btn = 'shader';
shader.addEventListener('transitionend', function(e) {
shader.classList.remove('buttonPress');
})
})

eraser.addEventListener('click', function () {
    eraser.classList.add('buttonPress');
    btn = 'eraser';
eraser.addEventListener('transitionend', function(e) {
    eraser.classList.remove('buttonPress');
})
})

pickColor.addEventListener('click', function (e) {
    btn = 'pickColor';
})

body.addEventListener('mousedown', function (e) {
    noPaint = true;
})

body.addEventListener('mouseup', function (e) {
     noPaint = false;
})

gridContainer.addEventListener('mouseover', function (e) {
    gridColor = e.target.style.backgroundColor; 
    if (btn == 'black' && noPaint == false) {
        e.target.style.backgroundColor = 'rgb(0,0,0)';
    }else if (btn == 'shader' && noPaint == false){ 
        shaderF();
        e.target.style.backgroundColor = gridColor;
    }else if (btn == 'rgb' && noPaint == false) {
        randomColor();
    e.target.style.backgroundColor = gridColor;
    }else if (btn == 'eraser' && noPaint == false) {
        e.target.style.backgroundColor = 'rgb(255,255,255)';
    }else if (btn == 'pickColor' && noPaint == false) {
        pickColorF();
        e.target.style.backgroundColor = gridColor;
    }

})

function newGrid(){
    newGridNum = prompt('Enter a number per side for new grid size, MAX 100');
    if (newGridNum <=100 && newGridNum >0){
    newGridNumNew = newGridNum*newGridNum;
    let gridElements;
    gridContainer.replaceChildren();  
    for (let i=0;i<newGridNumNew;i++) {
        gridElements = document.createElement('div');
        gridElements.classList.add('gridElements');
        gridElements.style.backgroundColor= 'rgb(255,255,255)';
        gridContainer.appendChild(gridElements);
    }
    document.documentElement.style.setProperty('--grid-template-columns', 'repeat('+ newGridNum + ', 2fr)')
    }else{alert('Enter a number between 0 and 100')
            newGrid()
    }
}

function randomColor() {
    let var1 = Math.floor(Math.random()*255)
    let var2 = Math.floor(Math.random()*255)
    let var3 = Math.floor(Math.random()*255)
    gridColor = 'rgb(' + var1 + ', ' + var2 + ', ' + var3 + ')'
}


function shaderF(){
    gridColor.toString();
    let rgb = gridColor.substring(4, gridColor.length-1)
         .replace(/ /g, '')
         .split(',');
            
    for (let i=0; i<rgb.length;i++){
        let temp = parseInt(rgb[i], 10);
         temp =temp-25.5;
         rgb[i] = temp;
}
        rgb = rgb.join(', ');
        gridColor = 'rgb(' + rgb + ')';   
}


function pickColorF() {
    let temp = document.querySelector('#pickColor').value;
    gridColor = temp;
}