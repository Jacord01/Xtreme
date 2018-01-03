handleRequest(request) {

    // Fetch your file and populate the array
    var scoresTable = ...

    // On request, decide which type of request it is
    if (request.type === "getHighScoresTable") {

        // If it wants the scores, return the json as a string
        return scoresJson;

    } else if (request.type === "submitScore"
            && request.score > scoresTable[scoresTable.length - 1].score) {

        // Otherwise, check if the submitted score makes it into the table. 
        // If it does, search its position and replace.
        scoresTable.forEach(function(value, index) {
            if (value.score < request.score) {
                scoresTable.splice(index, 0, {"name": request.name, "score": request.score});
            }
        });

        // Trim the last element and return
         scoresTable = scoresTable.slice(0, -1)

        // You probably want to update your file here
    }

}