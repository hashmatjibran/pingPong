// check start 
function checkStart()
{
    if(localStorage.getItem('winnerPlayer')==undefined)
    {
        alert("welcome to Ping Pong. "+ "Game Starts For the First Time! "+" press enter to continue!");
    }
    else{
        if(localStorage.getItem("winnerPlayer").localeCompare("player 2")==0)
        {
            alert(localStorage.getItem("winnerPlayer")+
                    " is Leading by "+localStorage.getItem(localStorage.getItem("winnerPlayer")) + ":" 
                    +localStorage.getItem("player 1"));
        }
        else if(localStorage.getItem("winnerPlayer").localeCompare("player 1")==0){
            alert(localStorage.getItem("winnerPlayer")+
                    " is Leading by "+localStorage.getItem(localStorage.getItem("winnerPlayer")) + ":" 
                    +localStorage.getItem("player 2"));
        }
        else{
            alert("Draw Matches and the scores are :-"
            +" player 1:"+localStorage.getItem("player 1")
            +" player 2:"+localStorage.getItem("player 2"));
        }
       

    }
}
checkStart();


// geting the rods/plates with bounding box rect.
let rods=document.getElementsByClassName('rod');
let topRod=rods[0];  /*knowing that there are only two rods that's why hard coding is an easier option here */
let bottomRod=rods[1];


// getting the gameBody div and various properties related to it
let gameBody=document.getElementById('gameBody');
let gameBodyValue=gameBody.getBoundingClientRect();


// Adding Event Listener to window for moving the plates.
window.addEventListener("keypress",function(event){
 let rodValue=topRod.getBoundingClientRect();

//  for moving the plates in the right direction 
// the conjucture is used to make sure the plates don't cross the game body window
if((event.code=="KeyD"||event.code=="keyd") && (rodValue.left+rodValue.width)<gameBodyValue.width)
    {
        topRod.style.left = rodValue.left+20+"px";
        bottomRod.style.left = rodValue.left+20+"px";
    }

// for moving the plates in the left direction
// the conjucture is used to make sure the plates don't cross the game body window
else if((event.code=="KeyA"||event.code=="keya") && (rodValue.left>gameBodyValue.left))
    {
        topRod.style.left=rodValue.left-25+"px";
        bottomRod.style.left=rodValue.left-25+"px";
    }
});


let ball=document.getElementById("ball");

if( (ball.offsetLeft>bottomRod.offsetLeft) && 
    (ball.offsetLeft<(bottomRod.offsetLeft+bottomRod.offsetWidth)) && 
    (ball.offsetTop+ball.offsetHeight)==bottomRod.offsetTop )
        {
            console.log("calling func 1");
        func1();
        }

// function 1 moving the ball upwards (top-right direction) and handling all its cases
function func1()
{
    console.log("inside f1");
    let interval= setInterval(()=>{
        let ballValue=ball.getBoundingClientRect();
       
     
            if((ball.offsetLeft+ball.offsetWidth)>=gameBody.offsetWidth)
            {
                clearInterval(interval);
                func2();
            }

           else if( (ball.offsetLeft > topRod.offsetLeft) && (ball.offsetLeft < (topRod.offsetLeft+topRod.offsetWidth)) && (ball.offsetTop<=(topRod.offsetTop+topRod.offsetHeight)))
            {
                clearInterval(interval);
                func3();
            }
            else if(ball.offsetTop<=gameBody.offsetTop)
                    {
                        clearInterval(interval);
                        displayWinner("player 2");
                    }

                    ball.style.left=ballValue.left+25+'px';
                    ball.style.top=ballValue.top-25+'px';
},100);
}

// function 2 moving the ball upwards (top-left direction) and handling all its cases
function func2()
{
    console.log("inside f2");
    let interval =setInterval(()=>{
        let ballValue=ball.getBoundingClientRect();
        if(ball.offsetTop<=1)
            {
                console.log("inside if condition");
                clearInterval(interval);
                displayWinner("player 2");
               
            }

        else if( (ball.offsetLeft > topRod.offsetLeft) && (ball.offsetLeft < (topRod.offsetLeft+topRod.offsetWidth)) && (ball.offsetTop<=(topRod.offsetTop+topRod.offsetHeight)))
            {
                clearInterval(interval);
                func3();
            }
            ball.style.left=ballValue.left-25+'px';
             ball.style.top=ballValue.top-25+'px';
    },100);
}

// function 3 moving the ball downwards (bottom-left direction) and handling all its cases
function func3()
{

    console.log("inside f3");
    let interval=setInterval(()=>{
        let ballValue=ball.getBoundingClientRect();
       
        if(ball.offsetLeft<=gameBody.offsetLeft)
            {
                clearInterval(interval);
                func4();
            }
        else if( (ball.offsetLeft>bottomRod.offsetLeft) && (ball.offsetLeft<(bottomRod.offsetLeft+bottomRod.offsetWidth)) && (ball.offsetTop+ball.offsetHeight)==bottomRod.offsetTop )
            {
                clearInterval(interval);
                console.log("calling func 1");
                func1();
            }
            else if((ball.offsetTop+ball.offsetHeight)>=gameBody.offsetHeight)
            {
                clearInterval(interval);
                displayWinner("player 1");

            }
           
            ball.style.left=ballValue.left-25+'px';
            ball.style.top=ballValue.top+25+'px';
    },100);
}

// function 4 moving the ball downward (bottom-right direction) and handling all its cases
function func4()
{
    console.log("inside f4");
    let interval=setInterval(() => {
        let ballValue=ball.getBoundingClientRect();


        console.log("ball offset total top"+(ball.offsetTop+ball.offsetHeight));
        console.log("bottom offset left"+(bottomRod.offsetLeft+bottomRod.offsetWidth));
        if((ball.offsetLeft>bottomRod.offsetLeft) && (ball.offsetLeft<(bottomRod.offsetLeft+bottomRod.offsetWidth)) && ((bottomRod.offsetTop+bottomRod.offsetHeight)-(ball.offsetTop+ball.offsetHeight))<10)
            {
                console.log("inside bottom check");
                clearInterval(interval);
                func1();
            }
            
            ball.style.left=ballValue.left+25+'px';
        ball.style.top=ballValue.top+25+'px';

    }, 100);
}


// dispaly winner in alert box 
function displayWinner(winnerName)
{
    let winnerdiv=document.getElementById("winnerDiv");
    winnerdiv.innerHTML=winnerName+" Won! &#128239;<br> <button id='rematch' class='rematch' onclick='rematch()'>Re Match!</button>    <button id='exit' class='exit' onclick='exit()'>Exit</button>";
   
   
    if(localStorage.getItem("winnerPlayer")==undefined)
        {
            localStorage.setItem("player 1",'0');
            localStorage.setItem('player 2','0');
            localStorage.setItem("winnerPlayer",winnerName);
        }
   
        let scoreCount=parseInt(localStorage.getItem(winnerName));
        localStorage.setItem(winnerName,scoreCount+1);

   if(parseInt(localStorage.getItem("player 1"))==parseInt(localStorage.getItem("player 2")))
        {    
            localStorage.setItem("winnerPlayer","");

        }
   else if(parseInt(localStorage.getItem("player 1"))>parseInt(localStorage.getItem("player 2")))
        {    
            localStorage.setItem("winnerPlayer","player 1");

        }
   else
        {
            localStorage.setItem("winnerPlayer","player 2");
        }

    winnerdiv.classList.remove('hidden');
    winnerdiv.classList.add('animate__zoomInDown');
}

// function to rematch
function rematch()
{
    location.reload() ;
}

// function to exit tab
function exit()
{
    window.close() ;
}