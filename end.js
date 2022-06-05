const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalscore = document.getElementById("finalscore");
const cscore = localStorage.getItem("CurrentScore");

const highSCore = JSON.parse(localStorage.getItem("highScore")) || [];

const maxhighscores = 5;

finalscore.innerText = cscore;

username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
})

saveHighScore = (e) => {
    console.log("saving!!");
    e.preventDefault();

    const score = {
        score: cscore,
        name:username.value
    }
    highSCore.push(score);
    highSCore.sort((a, b) => b.score - a.score);
    highSCore.splice(5);

    localStorage.setItem("highScore", JSON.stringify(highSCore));
    window.location.assign("/");
}