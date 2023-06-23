const gridContainer = document.querySelector(".grid-container");
const clearBtn = document.querySelector(".clear-btn");
var gridCount = 1;
var isMouseDown = false;


//creates a grid:
for (let i = 0; i < 64; i++) {
  const newDiv = document.createElement('div');
  newDiv.className = 'box';
  newDiv.id = `box-${gridCount}`;
  gridContainer.appendChild(newDiv);
  gridCount += 1;
}

const boxes = document.querySelectorAll(".box");
const eraserBtn = document.querySelector(".eraser-btn");
const colorModeBtn = document.querySelector(".color-mode-btn");
const colorPicker = document.querySelector(".color-picker");
var currColor = colorPicker.value;

//everytime color picker is used, it will update the currColor:
colorPicker.addEventListener('change', function(event) {
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

//We are calling the 'colorIt' when the page loads with the default color in 'currColor':
colorIt();

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


//whenever clearBtn is pressed, the entire grid will be set to white:
clearBtn.addEventListener("click", function(){
  boxes.forEach((box) => {
    box.style.backgroundColor = "white";
  });  
})

//whenever eraserBtn is pressed, 'deColorIt()' is called, enabling the de-coloring to white:
eraserBtn.addEventListener("click", function(){
  deColorIt();
})


//whenever again, colorModeBtn is pressed, 'colorIt()' is invoked, enabling the coloring with whatever color is present in 'currColor':
colorModeBtn.addEventListener("click", function(){
  colorIt();
})