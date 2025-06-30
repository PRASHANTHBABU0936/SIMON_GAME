let start=false;
let level=0;
let games=[];
let users=[];
let hell=document.querySelector("h2");
let boxi=["box1","box2","box3","box4"];
 //starting gaMe
document.addEventListener("keypress",function(){
    if(start == false){
        start=true;
         level=0;
 games=[];
 users=[];
 hell.innerHTML = "<b>Level " + level + "</b>";
        nextSequence();
    }
// setTimeout(random,500);
   
});
function nextSequence(){
    users=[];
    level++;
    hell.innerHTML = "<b>Level " + level + "</b>";

let ri=Math.floor(Math.random()*4);
 let selectedBox = boxi[ri];
    games.push(selectedBox);
    flash(selectedBox);

playSound(selectedBox);

}

function flash(boxClass) {
    let box = document.querySelector("." + boxClass);
    box.classList.add("flash");
    setTimeout(() => {
        box.classList.remove("flash");
    }, 300);
}

document.querySelectorAll(".box1, .box2, .box3, .box4").forEach(box => {
    box.addEventListener("click", function () {
        let clickedBox = this.classList[0];
        users.push(clickedBox);
        flash(clickedBox);
        // flash(clickedBox);
playSound(clickedBox); 

        checkAnswer(users.length - 1);
    });
});

function checkAnswer(index) {
    if (users[index] === games[index]) {
        if (users.length === games.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        playSound("wrong");
        hell.innerHTML = "<b>Game Over! Press any key to restart.</b>";
        document.body.classList.add("game-over");
        setTimeout(() => {
            document.body.classList.remove("game-over");
        }, 200);
        resetGame();
    }
}

function resetGame() {
    start = false;
    level = 0;
    games = [];
    users = [];
}
const frequencies = {
    box1: 261.6,
    box2: 329.6,
    box3: 392.0,
    box4: 523.2,
    wrong: 120.0
};

function playSound(box) {
    let context = new (window.AudioContext || window.webkitAudioContext)();
    let oscillator = context.createOscillator();
    let gainNode = context.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = frequencies[box] || 120;
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.3);
    oscillator.stop(context.currentTime + 0.3);
}
