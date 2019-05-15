// p5js color palette experiments
// Dhruv Karan ~ unography 2019
// V 1.0
///////////////////////////////

// Performance - Disables FES

// p5.disableFriendlyErrors = true;

let img_url = "https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80";
let img;
let colPalettes;
let size;
const alpha = 255;
let totalColors;
let midSpaces;
let topDiff;
let leftDiff;
let canvasWidthOffset;
let canvasHeightOffset;

function preload() {
  img = loadImage(img_url);
  colPalettes = ['#65A0AE', '#D2DCDD', '#ACC3C6', '#98865B', '#4D5A57'];
  totalColors = colPalettes.length;
}

function setup() {
  createCanvas(img.width, img.height);

  let totalSpaces = totalColors + 1 + 1; // 1 for the space between colour boxes
  size = height / totalSpaces;
  midSpaces = size / (totalColors - 1);
  topDiff = (img.height - (size * totalColors + midSpaces * (totalColors - 1))) / 2;
  leftDiff = (img.width - (size * totalColors + midSpaces * (totalColors - 1))) / 2;

  sizeSlider = createSlider(0, img.width/totalColors, size);
  sizeSlider.position(20, 30);

  midSpacesSlider = createSlider(0, img.hieght - 5, midSpaces);
  midSpacesSlider.position(20, 80);

  // xPosSlider = createSlider(0, img.width, img.width/2);
  // xPosSlider.position(20, 130);

  orientationRadio = createRadio();
  orientationRadio.option("horizontal");
  orientationRadio.option("vertical");
  orientationRadio.value("horizontal");
  orientationRadio.position(20, 130);

  let maxSliderWidth = max([sizeSlider.width, midSpacesSlider.width]);
  canvasWidthOffset = maxSliderWidth + 50;
  canvasHeightOffset = canvasWidthOffset / 2;

  resizeCanvas(2*canvasWidthOffset + width, canvasHeightOffset + height);

  button = createButton('SAVE IMAGE');
  button.position(20, height - button.height);
  button.mousePressed(saveImage);

}

function saveImage() {
  to_save = get(canvasWidthOffset, canvasHeightOffset / 2, img.width, img.height);
  to_save.save('palette', 'png');
}

function draw() {
  background(220);
  image(img, canvasWidthOffset, canvasHeightOffset/2);

  push();

  size = sizeSlider.value();
  text("size", sizeSlider.x + 5, sizeSlider.y - 5);
  midSpaces = midSpacesSlider.value();
  text("spaces", midSpacesSlider.x + 5, midSpacesSlider.y - 5);

  topDiff = (img.height - (size * totalColors + midSpaces * (totalColors - 1))) / 2;
  leftDiff = (img.width - (size * totalColors + midSpaces * (totalColors - 1))) / 2;
  pop();

  translate(canvasWidthOffset, canvasHeightOffset/2);

  for (let i = 0; i < colPalettes.length; i++) {
    push();
    let ar = color(colPalettes[i])._array;
    let r = ar[0] * 255;
    let g = ar[1] * 255;
    let b = ar[2] * 255;
    fill(r, g, b, alpha);

    if (orientationRadio.value() == "vertical") {
      startX = img.width / 2 - size / 2;
      startY = topDiff + (i * size) + midSpaces * i;
    } else {
      startX = leftDiff + (i * size) + midSpaces * i;
      startY = img.height / 2 - size / 2;
    }

    noStroke();
    rect(startX, startY, size, size);
    pop();
  }

}