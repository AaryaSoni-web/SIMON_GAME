var btncolor=["red","green","blue","yellow"];
var gamepattern=[];
var userpattern=[];
var started=false;
var level=0;
$(document).keydown(function(){
    if (!started) {
        var gamestart=new Audio("sounds/bg.mp3");
        gamestart.play();
        $("#level-title").text("Level " + level);
        setTimeout(function () {
            nextseq();
        }, 3000);
        started = true;
      }
});
$(".btn").click(function(){
    var usercolor=$(this).attr("id");
    userpattern.push(usercolor);
    playsound(usercolor);
    press(usercolor);
    check(userpattern.length-1);
});
function nextseq(){
    userpattern = [];
    level+=1
    $("h1").text("Level "+level);
    var random=Math.floor(Math.random()*4);
    var color=btncolor[random];
    gamepattern.push(color);
    $("#" + color).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(color);
}
function playsound(sound){
    var audio = new Audio("sounds/" + sound + ".mp3");
    audio.play();
}
function press(currentcolor){
    $("#"+currentcolor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentcolor).removeClass("pressed");
      }, 100);
}
function check(newlevel){
    console.log(newlevel);
    if (userpattern[newlevel]===gamepattern[newlevel]){
        if (newlevel==gamepattern.length-1){
            setTimeout(function (){
                nextseq();
            },1000);
        }
    }
    else{
        var wrong= new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("GAME OVER, Press Any Key to Restart")
        startagain();
    }
}
function startagain(){
    level=0;
    gamepattern=[];
    started=false;
}