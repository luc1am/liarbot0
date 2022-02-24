let startbutt;
let prompt;
let buttPosX;
let buttPosY;

let discl;
let frame = 0;
let displayT = 'recorning';

let butt1;
let butt2;

let data;

let announced;


let pre = 'Disclaimer: Please allow access to the microphone to interact with this project. <br/><br/> Your objective is to determine which button to press. You can ask only three questions. Announce your question by beginning with, "My question is..."'

//janus
let isQ3 = false;
let capture;
let qCount = 0;


let myRec = new p5.SpeechRec();
//speech recognition object

let pics = [
  "media/bear.gif",
  "media/bearFace.png",
  "media/bison.gif",
  "media/bisonFace.png",
  "media/spin.gif",
  "media/stillDefault.png"
];
let mood = [
  'bearSpin',
  'bearFace',
  'bisonSpin',
  'bisonFace',
    'spin',
  'default']

 let janussy = [];
 let janInd = 5; //still default

let audioFiles = [
  "media/audio/mouse1.mp3",
  "media/audio/question1.mp3",
  "media/audio/question2.mp3",
  "media/audio/question3.mp3",
  "media/audio/question4.mp3",
  "media/audio/question5.mp3",
  "media/audio/question6.mp3",
  "media/audio/question7.mp3"
]

class Janus {
  constructor(x,y, emotion, filename){
    this.x = x;
    this.y = y;
    this.emotion = emotion; //string?
    this.filename = filename;
    this.img = loadImage(filename);
  }
  // pre(){    img = loadImage(this.filename);  }
  display(){
    image(this.img, this.x, this.y)
  }
}



function preload(){
  data = loadJSON("data.json");
  for (let i = 0; i<pics.length; i++){
    janussy.push(new Janus(windowWidth/2 - 25,
       windowHeight/2 - 100,
      mood[i],pics[i]));
  }
  for (let i = 0; i< audioFiles.length; i++){
    loadSound(audioFiles[i]);
  }
  capture = createCapture(VIDEO);
  capture.hide();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  startbutt = createButton("start");
  buttPosX = width/2 + 100;
  buttPosY = height/2;
  startbutt.position(buttPosX + 25, buttPosY);
  startbutt.mousePressed(
    function next(){
      frame+=1;
      startRec();
      loop();
    }
  )

  prompt = createP("liarbot");
  prompt.position(50,30);
  prompt.style('font-size', '25px')

  butt1 = createButton('butt1');
  butt1.position(width/8 - 25,height/3);
  butt1.mousePressed(butt1Call);
  //butt1.center();
  butt2 = createButton('butt2');
  butt2.position(width - width/8 - 25,height/3);
  butt2.mousePressed(butt2Call);
  //butt2.center();
}

function startRec(){
  let continuous=true;
  let interimResults = false;
  myRec.start(continuous, interimResults);
  myRec.onResult = showResult;
  displayT = 'recording';
}

function showResult(){
  console.log(myRec.resultString);
  createP(myRec.resultString);
  displayT = 'not recording';
  let talk = myRec.resultString.toLowerCase();
  if (talk.includes('my question is') && qCount<3){
    qCount +=1;
    loop1: for(let i = 0; i < data.brain.length; i++ ){
      loop2: for (let j = 0; j < data.brain[i].triggers.length; j++){
        if(talk.indexOf(data.brain[i].triggers[j])!== -1){
          if(i == 2 ){ isQ3 = true } else {isQ3 =false}
          answer = random(data.brain[i].responses);
          //if (talk.indexOf(data.brain[i]))
          break loop1;
        }else  {
          answer = random(data.catchall);
        }
      }
    }
      console.log(qCount);
      if (qCount==3){
        let limitT = 'You have reached the question limit. Please choose a button.'
        announced = createP(limitT);
        announced.position(100,100);

      }
      var audio = new Audio(answer);
      //noLoop(); //no need to no loop, yes!
      audio.loop = false;
      audio.play();
      bearHeadTurn();
      ms = frameCount;
      console.log(answer);
  }

}

function draw() {
  if (frame == 0) {
    titleScreen();
    butt1.hide();
    butt2.hide();
  }else if (frame ==1){
    reg();
    startbutt.hide();
    prompt.hide();
    discl.hide();
    butt1.show();
    butt2.show();
  } else if (frame ==2){
    background(255);
    imageMode(CENTER)
    image(capture, width/2,height/2);
    butt1.hide();
    butt2.hide();
    //discl.hide();
    announced.hide()
    //cap.center();
  } else{
    background(255);
    let a = createA('https://www.reddit.com/', 'go somewhere...?');
    noLoop();
    a.position(50,50);
    butt1.hide();
    butt2.hide();
    //discl.hide();
    announced.hide();
  }
}

function titleScreen(){
  background(230,130,180);
  noStroke();
  fill(200,220,10);
  rect(0,0,width, height/8)
  //rect(100,100,100,100);
  rectMode(CENTER);
  fill(210,100,150);
  rect(buttPosX +45, buttPosY +10, 100,50 , 10);
  discl = createP(pre);
  discl.position(100,200);
  discl.size(300,200);
  discl.style('font-size', '18px');
  discl.style('font-family', 'helvetica');
  //text(pre, 100,200,200,200);
  noLoop();
}

function reg(){
  background(200,215,100);
  ellipseMode(CENTER);
  rectMode(CENTER);
  noStroke();
  fill(180,200,80);
  ellipse(width/2- 15, height/2 - 80, 300,300);
  rect(width/8,height/3 +15, 100,50, 10);
  rect( width - width/8,height/3 +15, 100,50,10);
  imageMode(CENTER);
  //text(displayT, 100,100);
  janussy[janInd].display();
}

function bearHeadTurn(){

  janInd = 0;
  //console.log(millis()- ms);

  setTimeout(bisonHeadTurn,3000);
}


function butt1Call(){
  frame +=1;
}

function butt2Call(){
  frame+=2;

}

function bisonHeadTurn(){
  janInd = 2;

  if( isQ3 ){
    setTimeout(bearHeadTurn2, 4000);
  } else{
    setTimeout(backDef, 4000);
  }
}
function bearHeadTurn2(){

  janInd = 0;
  //console.log(millis()- ms);

  setTimeout(backDef,3000);
}
function backDef(){
  janInd = 5;
}
