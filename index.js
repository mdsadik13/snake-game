let direction = {x:0,y:0};
//Game contants and variable
//Sounds need to be declare
let speed = 5;
let score=0;
let lastPaintTime = 0;
let movSound= new Audio("/music/mov.wav");
let endSound= new Audio("/music/end.wav")
let eatSound=new Audio("/music/eat.wav");
let snakeArr =[
      {x:13,y:15}
]
food={x: 10,y: 10}
inputDir={x:0,y:0}


// Game Function
function main(ctime) {
      window.requestAnimationFrame(main);
      if((ctime-lastPaintTime)/1000<1/speed){
            return ;
      }
      lastPaintTime=ctime;
      gameEngine();
      // console.log(ctime)
}

//function when snake die
function isCollide(snakeArr){
      //if snake eat yourself
      for(let i=1;i<snakeArr.length;i++){
            if(snakeArr[i].x===snakeArr[0].x&&snakeArr[i].y===snakeArr[0].y){
                  return true;
            }
      }
      //if snake collide the wall
            if(snakeArr[0].x>=18||snakeArr[0].x<=0||snakeArr[0].y>=18||snakeArr[0].y<=0){
                  return true;
            }
     return false; 
}

function gameEngine(){
      //updating the snake array and food
      if(isCollide(snakeArr)){

           let x= new Audio("/music/end.wav")
           //if we dont use that function than sound will play later after the alert as sound is stored asynchronously by java script
           x.onplaying = function() { alert("Game Over press any key start the game again"); };
           x.play();
            inputDir={x:0,y:0};
           
            snakeArr=[{x:13,y:15}];
            score=0;
            scoreBox.innerHTML="Score: "+score;
      }
      //If snake have eaten the food increment the score and update the food
      if(snakeArr[0].x==food.x&&snakeArr[0].y==food.y){
            let eatSound=new Audio("/music/eat.wav");
            eatSound.play();
            score+=speed;
            if(score>hiscoreval){
                  hiscoreval = score;
                  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
                  hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
              }
            scoreBox.innerHTML="Score: "+score;
            snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y})
            let a=2;
            let b=16;

            food = {x: Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
      }

      //Moving the snake
      if(inputDir.x!=0||inputDir.y!=0){
      for(let i=snakeArr.length-2;i>=0;i--){
            snakeArr[i+1]={...snakeArr[i]};
      }
}

      snakeArr[0].x+=inputDir.x;
      snakeArr[0].y+=inputDir.y;


      //display the snake and food
      board.innerHTML = "";
       snakeArr.forEach((e,index)=>{
             snakeElement = document.createElement('div');
             snakeElement.style.gridRowStart = e.y;
             snakeElement.style.gridColumnStart = e.x;
             if(index==0){
             snakeElement.classList.add("head");
             }
             else{
                   snakeElement.classList.add("snake");
             }
             board.appendChild(snakeElement);
            
       })
       //Display the food
       foodElement = document.createElement('div');
       foodElement.style.gridRowStart = food.y;
       foodElement.style.gridColumnStart = food.x;
       foodElement.classList.add("food");
       board.appendChild(foodElement);
}












//Main logic starts from here
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
      hiscoreval = 0;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
  }
  else{
      hiscoreval = JSON.parse(hiscore);
      hiscoreBox.innerHTML = "High Score: " + hiscore;
  }

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
      // inputDir={x:0,y:0}//start game
      // inputDir={x:0,y:0}//start game
      let movSound= new Audio("/music/mov.wav");
      movSound.play();
      switch(e.key){
            case "ArrowUp":
                  
                  inputDir.x= 0;
                  inputDir.y= -1;
                  break;
            case "ArrowDown":
            
                  inputDir.x= 0;
                  inputDir.y= 1;
                  break;
            case "ArrowLeft":

                  inputDir.x= -1;
                  inputDir.y= 0;
                  break;
            case "ArrowRight":
                  
                  inputDir.x= 1;
                  inputDir.y= 0;
                  break;
            case " ":
                  
                  inputDir.x=0;
                  inputDir.y=0;
            default:
                  break;
            
      }
      console.log(e.key);
})

