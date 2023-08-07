function appendHighscore(username, game, score) {

    const { writeFile, readFile } = require('fs');
    const path = './static/datafile/highscore.json';
    
    readFile(path, (error, data) => {
        if (error) {
        console.log(error);
        return;
        }

        const parsedData = JSON.parse(data);
        entry = JSON.parse('{"username": "'+username+'","gameType": "'+game+'","score": "'+score+'"}');

        parsedData.game.push(entry);
        
        writeFile(path, JSON.stringify(parsedData, null, 4), (err) => {
            if (err) {
            console.log('Failed to write updated data to file');
            return;
            }
            console.log('Updated file successfully');
        });
    });
}

module.exports = { appendHighscore };