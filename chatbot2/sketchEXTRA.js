let startbutt;
let prompt;
let buttPosX;
let buttPosY;
let frame = 0;
//janus
//

function setup() {
  createCanvas(windowWidth, windowHeight);
  startbutt = createButton("start");
  buttPosX = width/2 + 100;
  buttPosY = height/2;
  startbutt.position(buttPosX, buttPosY);
  startbutt.mousePressed(
    function next(){
      frame+=1;
    }
  )

  prompt = createP("ask me anything");
  prompt.position(100,100);
}



function draw() {
  if (frame == 0) {
    titleScreen();
  }else{
    reg();
    removeElements();
  }
}


function titleScreen(){
  background(200,100,150);
  rect(100,100,100,100);
}

function reg(){
  background(200,215,100);
  //if mouse is between buttPos +- 50
  //controls range
  if ((buttPosX + 50 > mouseX   &&   buttPosX - 50 < mouseX)&&
  (buttPosY +50 > mouseY && buttPosY-50 < mouseY)){
    text('are you sure you want to press that',
      buttPosX, buttPosY+50);
  }
}


//if mouse is between buttPos +- 50
//controls range
if ((buttPosX + 50 > mouseX   &&   buttPosX - 50 < mouseX)&&
(buttPosY +50 > mouseY && buttPosY-50 < mouseY)){
  text('are you sure you want to press that',
    buttPosX, buttPosY+50);
}
