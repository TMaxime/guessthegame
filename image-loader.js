var imageToHide = 3;
var recipeAnswer;
var allowedWrongAnswers = 2;
var x = 0;



function loadImages(x, imageToHide) {
    $.getJSON("datafile/recipes.json", function (data) {
        jsonImages = data.recipes[x].ingredients;
        recipeAnswer = data.recipes[x].name;

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
    console.log("Reveal images");
    removeAllChildNodes(document.getElementById('images'));

    imageToHide--;

    if (imageToHide < 0) {
        imageToHide = 0;
        console.log("No more images to load");
    }
    loadImages(x, imageToHide);
}


function validateAnswer() {
    var input = document.querySelector('input');
    var userAnswer = input.value;

    if (recipeAnswer == userAnswer) {
        console.log("You won!");
        input.style.backgroundColor="#e3fbe3";
        input.style.border="2px solid green";
        nextQuestion();
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
            nextQuestion();
        }
    }
}

function dislayErrors() {
    let img = document.createElement('img');
    img.setAttribute("class", "img");
    img.src = "images/redcross.jpg";
    document.getElementById('red_cross').appendChild(img);
}

function eventLoader() {
    $("#answer").keypress(function(event) {
        if (event.key === "Enter") {
            $("#validateButton").click();
        }
    });
}

async function nextQuestion() {
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

    x++;
    console.log("Load recipe: " + x)
    loadImages(x, imageToHide);
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

function main() {

    window.onload = function() {
        eventLoader();
    };

    loadImages(0, imageToHide);
}


main();