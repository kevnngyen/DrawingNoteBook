const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const prompt = document.getElementById('prompt');
const ctx = canvas.getContext('2d');
const colorChange = document.getElementById('colourSlider')
const sizeInput = document.getElementById('penSlider')
const lineDisplay = document.getElementById('counter')

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let lineWidth = 50;
let startX;
let startY;
let promptVisible = false
let toDraw = false
let toErase = false

sizeInput.oninput = function(){
    lineWidth = this.value
    lineDisplay.innerHTML = this.value + '%'
}


prompt.addEventListener('click', e => {
    
    if (e.target.id === 'yes') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        document.querySelector('#prompt').style.visibility = 'hidden';
        promptVisible = false
    }

    if (e.target.id === 'no') {
        document.querySelector('#prompt').style.visibility = 'hidden';
        promptVisible = false
    }
})

toolbar.addEventListener('click', e => {

    if (e.target.id === 'pen'){

        if(!toDraw){
            toDraw = true
            toErase = false
            document.querySelector('#toolbar .pen').style.backgroundColor = '#1d95ff';
            document.querySelector('#toolbar .erase').style.backgroundColor = 'black';
        }
        else{
            toDraw = false
            document.querySelector('#toolbar .pen').style.backgroundColor = 'black';
            document.querySelector('#toolbar .erase').style.backgroundColor = 'black';
        }

    }

    if (e.target.id === 'erase'){

        if(!toErase){
            toDraw = false
            toErase = true
            document.querySelector('#toolbar .pen').style.backgroundColor = 'black';
            document.querySelector('#toolbar .erase').style.backgroundColor = '#1d95ff';
        }
        else{
            toErase = false
            document.querySelector('#toolbar .pen').style.backgroundColor = 'black';
            document.querySelector('#toolbar .erase').style.backgroundColor = 'black';
        }

    }

    if (e.target.id === 'clear') {
        if (promptVisible == false){
            document.querySelector('#prompt').style.visibility = 'visible';
            promptVisible = true
        }

        else{
            document.querySelector('#prompt').style.visibility = 'hidden';
            promptVisible = false
        }
    }
});

const draw = (e) => {

    ctx.strokeStyle = colorChange.value

    if(!isPainting) {
        return;
    }

    if(toDraw){
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
        ctx.stroke();
        

    }

    if(toErase){
        ctx.clearRect(e.clientX - canvasOffsetX, e.clientY, lineWidth, lineWidth);
 
    }

}

canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
});

canvas.addEventListener('mouseup', e => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);
