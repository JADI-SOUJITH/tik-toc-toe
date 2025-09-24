let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#Reset");
let newGameBtn = document.querySelector("#new-btn");
let msgCointainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true;

const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

const winnerMessages = [
  "🔥 Big W for",
  "🥶 Ice Cold Win by",
  "💀 Cooked! Winner:",
  "😈 Sigma Energy from",
  "🚬 Heisenberg Mode →",
  "🥵 Too OP →",
  "👑 King/Queen is"
];

const drawMessages = [
  "😅 It’s a tie... skill issue?",
  "🫡 Both mid, no winner.",
  "👀 Nobody cooked this round.",
  "🤝 Stalemate vibes.",
  "🌀 Draw… rematch?"
];

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("box was clicked");
        if(turnO){
            box.innerText="O";
            turnO=false;
        }else {
            box.innerText="X";
            turnO=true;
        }
        box.disabled=true;
        checkWinner();
    });
});

const disabledBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}
const EnableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
        box.style.backgroundColor = "rgb(150, 177, 177)";
    }
}
const showWinner=(winner)=>{
    let randomMsg = winnerMessages[Math.floor(Math.random() * winnerMessages.length)];
    msg.innerText=`${randomMsg} ${winner}`;
    msgCointainer.classList.remove("hide");
}
const checkWinner=()=>{
    for(let pattern of winPatterns){
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;
        if(pos1Val!=""&&pos2Val!=""&&pos3Val!=""){
            if(pos1Val==pos2Val&&pos2Val==pos3Val){
                boxes[pattern[0]].style.backgroundColor = "lightgreen";
                boxes[pattern[1]].style.backgroundColor = "lightgreen";
                boxes[pattern[2]].style.backgroundColor = "lightgreen";
                console.log("winner");
                showWinner(pos1Val);
                disabledBoxes();
                return;
            }
        }
    }
    let isDraw = true;
    boxes.forEach((box) => {
        if (box.innerText === "") isDraw = false;
    });
    if (isDraw) {
        let randomDraw = drawMessages[Math.floor(Math.random() * drawMessages.length)];
        msg.innerText = randomDraw;
        msgCointainer.classList.remove("hide");
    }
};
const resetGame=()=>{
    turnO=true;
    EnableBoxes();
    msgCointainer.classList.add("hide");
}
newGameBtn.addEventListener("click",resetGame);
reset.addEventListener("click",resetGame);
