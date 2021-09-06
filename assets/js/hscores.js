var scoresBtn = document.querySelector("#view-high-scores");

// Show High Scores Page
function printHighscores() {
    // Get Scores from localStorage or Clear Highscores
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  
    // Sort Scores to Get Ranks
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });
  
    highscores.forEach(function(score) {
      // Creat an <li> for Each Score
      var liTag = document.createElement("li");
      liTag.textContent = score.initials + " - " + score.score;
  
      // display on page
      var olEl = document.getElementById("highscores");
      olEl.appendChild(liTag);
    });
}
  
  function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
  }
  
  document.getElementById("clear").onclick = clearHighscores;
  
  // run function when page loads
printHighscores();