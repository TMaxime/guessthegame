function displayRecipeSubMenu() {
    for (let x = 1; x < 4; x++ ) {
        let button = document.createElement('input');
        button.setAttribute("class", "recipe_sub_button");
        button.setAttribute("id", "recipe_sub_button");
        button.setAttribute("type", "button");
        button.setAttribute("value", "Pool " + x);
        button.setAttribute("onclick", "moveToGameWindow("+x+")");
        document.getElementById('recipe_sub_buttons').appendChild(button);
    }
}

function moveToGameWindow(pool) {
    window.location.href = "./recipe-game.html?pool="+pool;
}

function main() {
    console.log("menu");
}


main();