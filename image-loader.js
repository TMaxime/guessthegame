var imageToHide = 3;
var recipeAnswer;
var allowedWrongAnswers = 2;
var recipeNumber = 1;
var recipeDescription;
var recipeScore;
var score = 1000;
var x = 0;



function loadGame(x, imageToHide) {
    document.getElementById("quizz_name").innerHTML = "#" + recipeNumber + " Recipe quizz";
    $.getJSON("datafile/recipes.json", function (data) {
        jsonImages = data.recipes[x].ingredients;
        recipeAnswer = data.recipes[x].name;
        recipeDescription = data.recipes[x].description;
        recipeScore = data.recipes[x].score;

        imageToLoad = jsonImages.length - imageToHide;
        imageEmpty = jsonImages.length - imageToLoad;

        if (imageToHide < 0) {
            imageToHide = 0;
        }

        for (let y = 0; y < imageToLoad; y++) {
            let img = document.createElement('img');
            img.setAttribute("class", "img");
            img.src = "images/"+ jsonImages[y] + ".jpg";
            document.getElementById('images').appendChild(img);
        }

        for (let y = 0; y < imageEmpty; y++) {
            let img = document.createElement('img');
            img.setAttribute("class", "img");
            img.src = "images/empty.jpg";
            document.getElementById('images').appendChild(img);
        }
    });
}

function revealImages() {
    removeAllChildNodes(document.getElementById('images'));

    imageToHide--;

    if (imageToHide < 0) {
        imageToHide = 0;
        console.log("No more images to load");
    }
    else {
        updateScore(-50);
    }
    loadGame(x, imageToHide);
}


function validateAnswer() {
    var input = document.querySelector('input');
    var userAnswer = input.value;

    if (userAnswer.length == 0) {
        console.log("No anwser")
    }
    else {
        if (recipeAnswer.toLowerCase() == userAnswer.toLowerCase()) {
            console.log("You won!");
            input.style.backgroundColor="#e3fbe3";
            input.style.border="2px solid green";
            updateScore(recipeScore);
            nextQuestion(true);
        }
        else {
            console.log("Wrong answer ...");
            input.style.backgroundColor="#ffcccb";
            input.style.border="2px solid red";
            allowedWrongAnswers--;
            console.log(allowedWrongAnswers + " remaining");
            dislayErrors();

            if (allowedWrongAnswers < 0 ) {
                disableElement('validateButton');
                nextQuestion(false);
            }
        }
    }
}

function dislayErrors() {
    let img = document.createElement('img');
    img.setAttribute("class", "img");
    img.src = "images/redcross.jpg";
    document.getElementById('red_cross').appendChild(img);
}

async function nextQuestion(victory) {
    if (victory == true) {
        document.getElementById('revealed_answer').innerHTML = recipeAnswer + " +" + recipeScore + "Pts !";
    }
    else {
        document.getElementById('revealed_answer').innerHTML = recipeAnswer;
    }
    
    await sleep(2000);

    var input = document.querySelector('input');
    input.style.backgroundColor="#0000";
    input.style.border="2px solid black";
    input.value = "";
    
    removeAllChildNodes(document.getElementById('images'));
    removeAllChildNodes(document.getElementById('red_cross'));
    imageToHide = 3;
    allowedWrongAnswers = 2;
    enableElement('validateButton')
    recipeNumber++;
    document.getElementById('description_text').innerHTML = "";
    document.getElementById('revealed_answer').innerHTML = "";
    x++;

    if (x == 2) {
        console.log("End of the game");
    }
    else {
        loadGame(x, imageToHide);
    }
}

function revealDescription() {
    description = document.getElementById('description_text').innerHTML;

    if (description == "") {
        document.getElementById('description_text').innerHTML = recipeDescription;
        updateScore(-100);
    }    
}

async function updateScore(amount) {
    score = score + amount;
    document.getElementById('score_text').innerHTML = "Score : " + score;

    if (amount > 0) {
        document.getElementById('score_text').style.color = "green";
        await sleep(2000);
    }
    else {
        document.getElementById('score_text').style.color = "red";
        await sleep(2000);
    }
    
    document.getElementById('score_text').style.color = "black";
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function enableElement(id) {
    document.getElementById(id).removeAttribute('disabled');
}

function disableElement(id) {
    document.getElementById(id).disabled = 'disable';
}

function eventLoader() {
    $("#answer").keypress(function(event) {
        if (event.key === "Enter") {
            $("#validateButton").click();
        }
    });
}


function main() {

    window.onload = function() {
        eventLoader();
    };

    loadGame(0, imageToHide);
}


main();