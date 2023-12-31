const gridContainer = document.querySelector(".grid-container");
const clearBtn = document.querySelector(".clear-btn");
const eraserBtn = document.querySelector(".eraser-btn");
const colorModeBtn = document.querySelector(".color-mode-btn");
const colorPicker = document.querySelector(".color-picker");
const magicModeBtn = document.querySelector(".magic-mode-btn");

var currColor = colorPicker.value;
var gridCount = 1;
var isMouseDown = false;
var flag = 1;

let colorInterval;


//creates a grid:
for (let i = 0; i < 3600; i++) {
  const newDiv = document.createElement('div');
  newDiv.className = 'box';
  newDiv.id = `box-${gridCount}`;
  gridContainer.appendChild(newDiv);
  gridCount += 1;
}

const boxes = document.querySelectorAll(".box");


//everytime color picker is used, it will update the currColor:
colorPicker.addEventListener('change', function(event) {
  //stop magic mode and then update the new color
  stopMagicColor();
  const selectedColor = event.target.value;
  currColor = selectedColor;
});

//This function will take whatever color is in 'currColor' and whenever someone presses or/and holds it paints the grid with that color:
function colorIt(){
  document.addEventListener('mousedown', function(event) {
    const target = event.target;
  
    if (target.classList.contains('box')) {
      event.preventDefault();
      isMouseDown = true;
      target.style.backgroundColor = `${currColor}`;
    }
  });
  
  document.addEventListener('mouseup', function() {
    isMouseDown = false;
  });
  
  document.addEventListener('mousemove', function(event) {
    const target = event.target;
  
    if (isMouseDown && target.classList.contains('box')) {
      target.style.backgroundColor = `${currColor}`;
    }
  });
}

//Wehen ever this is invoked, and then as we press / and hold the grid will be colored with white (erased)
function deColorIt(){
  document.addEventListener('mousedown', function(event) {
    const target = event.target;
  
    if (target.classList.contains('box')) {
      event.preventDefault();
      isMouseDown = true;
      target.style.backgroundColor = 'white';
    }
  });
  
  document.addEventListener('mouseup', function() {
    isMouseDown = false;
  });
  
  document.addEventListener('mousemove', function(event) {
    const target = event.target;
  
    if (isMouseDown && target.classList.contains('box')) {
      target.style.backgroundColor = 'white';
    }
  });
  
}

//We are calling the 'colorIt' when the page loads with the default color in 'currColor':
colorIt();
//lit up/highlight the colorModeBtn of reload as default:
colorModeBtn.style.border = `2px solid red`;

//whenever again, colorModeBtn is pressed, 'colorIt()' is invoked, enabling the coloring with whatever color is present in 'currColor':
colorModeBtn.addEventListener("click", function(){
  //stop magic mode and then update currColor to whatever color the picker has:
  stopMagicColor();
  //highlight the button that is clicked and remvove highlight from the other buttons:
  magicModeBtn.style.border = ``;
  eraserBtn.style.border = ``;
  colorModeBtn.style.border = `2px solid red`;

  currColor = colorPicker.value;

  colorIt();
})

//whenever eraserBtn is pressed, 'deColorIt()' is called, enabling the de-coloring to white:
eraserBtn.addEventListener("click", function(){
  //stop magic mode and then update currColor to whatever color the picker has:
  stopMagicColor();
  //highlight the button that is clicked and remvove highlight from the other buttons:
  colorModeBtn.style.border = ``;
  magicModeBtn.style.border = ``;
  eraserBtn.style.border = `2px solid red`;

  currColor = colorPicker.value;

  deColorIt();
})

//whenever clearBtn is pressed, the entire grid will be set to white:
clearBtn.addEventListener("click", function(){
  //stop magic mode and then update currColor to whatever color the picker has:
  stopMagicColor();

  //highlight the button that is clicked and remvove highlight from the other buttons:
  magicModeBtn.style.border = ``;
  eraserBtn.style.border = ``;
  colorModeBtn.style.border = ``;

  currColor = colorPicker.value;

  //set the button highlight:
  clearBtn.style.border = `5px solid blue`;
  //wait for 200ms and then clear the button's highlight up and then, go back to the colorModeBtn and highlight it:
  setTimeout(() => {
    clearBtn.style.border = ``;
    colorModeBtn.style.border = `2px solid red`;
  }, 200);

  //set the entire grid to white:
  boxes.forEach((box) => {
    box.style.backgroundColor = "white";
  });

  colorIt();
})

//generates a random color:
function randColor(){
  const red = Math.floor(Math.random()*256)
  const green = Math.floor(Math.random()*256)
  const blue = Math.floor(Math.random()*256)

  const color = `rgb(${red},${green},${blue})`;
  return color;
}

//when invoked, stops magic color:
function stopMagicColor(){
  clearInterval(colorInterval);
}

//upon clicking 'magicModeBtn', starts calling 'randColor' every 50ms:
magicModeBtn.addEventListener("click", function(){
    colorIt();
    colorModeBtn.style.border = ``;
    eraserBtn.style.border = ``;
    magicModeBtn.style.border = `2px solid red`;
    colorInterval = setInterval(() => {
    currColor = randColor();
    }, 10);
})
