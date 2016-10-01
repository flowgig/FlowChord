function loadJSON(callback, path) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', path, false);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
    return JSON.parse(xobj.responseText);
}

function getJsonFile(path) {
    var response = loadJSON(function (response) {
        var jsonResponse = JSON.parse(response);
    }, path);
    return response;
}