const highScoreList = document.getElementById("list");
const scoreList = JSON.parse(localStorage.getItem("highScore"));

highScoreList.innerHTML =scoreList.map(score => {
    return '<li class="highSCore">' + score.name +' -  '+ score.score +' </li>'
}).join("");