function displayRecipeSubMenu() {
    let subButton = document.getElementById('recipe_sub_buttons');

    if (document.getElementById('recipe_sub_button')) {
        
        while (subButton.firstChild) {
            subButton.removeChild(subButton.firstChild);
        }
    }
    else {        
        for (let x = 1; x < 4; x++ ) {
            let button = document.createElement('input');
            button.setAttribute("class", "recipe_sub_button");
            button.setAttribute("id", "recipe_sub_button");
            button.setAttribute("type", "button");
            button.setAttribute("value", "Pool " + x);
            button.setAttribute("onclick", "moveToGameWindow("+x+", 'recipe')");
            document.getElementById('recipe_sub_buttons').appendChild(button);
        }
    }
}

function displayMovieSubMenu() {
    let subButton = document.getElementById('movie_sub_buttons');

    if (document.getElementById('movie_sub_button')) {
        
        while (subButton.firstChild) {
            subButton.removeChild(subButton.firstChild);
        }
    }
    else {  
        for (let x = 1; x < 4; x++ ) {
            let button = document.createElement('input');
            button.setAttribute("class", "movie_sub_button");
            button.setAttribute("id", "movie_sub_button");
            button.setAttribute("type", "button");
            button.setAttribute("value", "Pool " + x);
            button.setAttribute("onclick", "moveToGameWindow("+x+", 'movie')");
            document.getElementById('movie_sub_buttons').appendChild(button);
        }
    }
}


function moveToGameWindow(pool, gameType) {
    let username = document.getElementById('username').value;
    console.log("too");
    if (username == "") {
        username = "anonymous";
    }
    window.location.href = "./"+gameType+"-game?gametype="+gameType+"&pool="+pool+"&username="+username;
}

function main() {
    console.log("menu");
}


main();