var boxElement = document.getElementById("firstCalcBox");
var conditionCElement = document.getElementById("conditionC");
var conditionCButton = document.getElementById("conditionCount"); 
var zX1Coefficent1 = document.getElementById("zX1Coefficent"); //x1's coefficent text area in Z
var zX2Coefficent2 = document.getElementById("zX2Coefficent"); //x2's coefficent text area in Z
var board = document.getElementById("board");
var minMax = document.getElementById("minMax");
var result = document.getElementById("result");
var condition1; //the submit button that takes input from conditions;
var conditionCoefficents;
var conditionCount, zX1, zX2;

//1 : = , 2 : <= , 3 : => | These are sign codes.

conditionCButton.addEventListener('click', (event) => {
    if(conditionCElement.value == "" || zX1Coefficent1.value == "" || zX2Coefficent2.value == ""){
        alert("Some Fields Are Empty!!");
    }
    if(conditionCElement.value != "" && zX1Coefficent1.value != "" && zX2Coefficent2.value != ""){
        conditionCElement.disabled = true;
        conditionCount = conditionCElement.value;
        zX1 = zX1Coefficent1.value;
        zX2 = zX2Coefficent2.value;
        zX1Coefficent1.disabled = true;
        zX2Coefficent2.disabled = true;
        zX1Coefficent1.defaultValue = zX1;
        zX2Coefficent2.defaultValue = zX2;
        conditionCElement.defaultValue = conditionCount;
        for(var i = 1; i <= conditionCount; i++){
            boxElement.innerHTML += "<div class=\"Equations\"id=\"equation"+ i +"\"><textarea class=\"ConditionCoefficent\"id=\"X1Coefficent" + i + "\" maxlength=\"3\"><\/textarea><div class=\"Text\">x1+<\/div><textarea class=\"ConditionCoefficent\"id=\"X2Coefficent" + i + "\" maxlength=\"3\"><\/textarea><div class=\"Text\">x2<\/div><select class=\"ConditionCoefficent\" id=\"signs" + i + "\"><option value=\"1\">=<\/option><option value=\"2\"><=<\/option><option value=\"3\">=><\/option><\/select>&nbsp&nbsp&nbsp<textarea class=\"ConditionCoefficent\"id=\"constant1\" maxlength=\"3\"><\/textarea><\/div>";
        }
        boxElement.innerHTML += "<div class=\"HowManyConditions\"><button class=\"ConditionCount\" type=\"button\" onclick=\"submitConditions()\" id=\"condition1\">Submit</button><\/div>";
    }
})

conditionCoefficents = document.getElementsByClassName("ConditionCoefficent");
condition1 = document.getElementById("condition1");
var conditionsArr = [];
var points = [];

function findPoint(condition11, condition22){
    var a,b,c,d,e,f;
    a = condition11[0];
    b = condition11[1];
    c = condition11[3];
    d = condition22[0];
    e = condition22[1];
    f = condition22[3];
    console.log(a + " " + b + " " + c + " " + d + " " + e + " " + f);
    var x1 = ((c * e) - (b * f)) / ((a * e) - (b * d));
    var x2 = ((c * d) - (a * f)) / ((b * d) - (a * e));
    var arr = [];
    arr.push(x1);
    arr.push(x2);
    points.push(arr);
}

function isItInCondition(point, conditionArg){
    var a, b, c, x1, x2, resultOf, dummy, dummy2, dummy3;
    a = conditionArg[0];
    b = conditionArg[1];
    c = conditionArg[3];
    x1 = point[0];
    x2 = point[1];
    resultOf = (a * x1) + (b * x2);
    dummy = c + ".0000000";
    if(x1 < 0 || x2 < 0){
        return false;
    }
    if(conditionArg[2] == 1){
        if(resultOf.toFixed(7) == dummy){
            return true;
        }else{
            return false;
        }
    }else if(conditionArg[2] == 2){
        if(resultOf.toFixed(7) <= dummy){
            return true;
        }else{
            return false;
        }
    }else{
        if(resultOf.toFixed(7) >= dummy){
            return true;
        }else{
            return false;
        }
    }
}

function deletePoints(pointArg, conditionsArg){
    var Arr = [];
    var count = 0;
    for(var i = 0; i < pointArg.length; i++){
        for(var j = 0; j < conditionsArg.length; j++){
            if(!isItInCondition(pointArg[i], conditionsArg[j])){
                count++;
                break;
            }
        }
        if(count > 0){
            count = 0;
            continue;
        }
        Arr.push(pointArg[i]);
        count = 0;
    }
    return Arr;
}

function multiDimensionalUnique(arr) {
    var uniques = [];
    var itemsFound = {};
    for(var i = 0, l = arr.length; i < l; i++) {
        var stringified = JSON.stringify(arr[i]);
        if(itemsFound[stringified]) { continue; }
        uniques.push(arr[i]);
        itemsFound[stringified] = true;
    }
    return uniques;
}

function trimPoints(pointArg, conditionsArg){
    pointArg = multiDimensionalUnique(pointArg);
    pointArg = deletePoints(pointArg, conditionsArg);
    return pointArg;
}

function submitConditions(){
    var countEmpty = 0;
    var size = conditionCount * 4;
    for(var i = 0; i < size; i++){
        if(conditionCoefficents[i].value == ""){
            countEmpty++;
            break;
        }
    }
    if(countEmpty > 0){
        alert("Some Condition Fields Are Empty!!!")
    }else{
        for(var i = 0; i < conditionCount; i++){
            conditionsArr[i] = [];
        }
        var k = 0;
        for(var i = 0; i < size; i++){
            conditionsArr[k][(i % 4)] = conditionCoefficents[i].value;
            conditionCoefficents[i].disabled = true;
            conditionCoefficents[i].defaultValue = conditionsArr[k][(i % 4)];
            if((i + 1) % 4 == 0){
                k++;
            }
        }
        var a, b, c;
        var arr = [];
        for(var i = 0; i < conditionCount; i++){
            a = conditionsArr[i][0];
            b = conditionsArr[i][1];
            c = conditionsArr[i][3];
            if(a > 0){
                var d = c / a;
                arr = new Array(d , 0);
                points.push(arr);
            }
            if(b > 0){
                d = c / b;
                arr = new Array(0, d);
                points.push(arr);
            }
        }
        for(var i = 0; i < conditionCount; i++){
            for(var j = (i + 1); j < conditionCount; j++){
                findPoint(conditionsArr[i], conditionsArr[j]);
            }
        }
        var arr2 = new Array(0, 0);
        points.push(arr2);
        points = trimPoints(points, conditionsArr);
        if(points.length != 0 || points != null){
            var maxX = 0, maxY = 0;
            for(var i = 0; i < points.length; i++){
                if(points[i][0] >= maxX){
                    maxX = points[i][0];
                }
                if(points[i][1] >= maxY){
                    maxY = points[i][1];
                }
            }
            maxX = maxX < 0 ? -maxX : maxX;
            maxY = maxY < 0 ? -maxY : maxY;
            maxX = maxX == 0 ? 5 : maxX;
            maxY = maxY == 0 ? 5 : maxY;
            var parameters = {
                title: 'Z\'s Solution Zone',
                target: '#board',
                data: [{
                    points: [],
                    fnType: 'points',
                    graphType: 'polyline'
                }],
            grid: true,
            disableZoom: true,
            yAxis: {domain: [-maxY, maxY]},
            xAxis: {domain: [-maxX, maxX]}
            };
            points.sort(function(a,b){
                if(a[0] == b[0]){
                    return a[1] - b[1];
                }
                return a[0] - b[0];
            });
            parameters.data[0].points = points;
            var results = [], result1;
            for(var i = 0; i < points.length; i++){
                result1 = (zX1 * points[i][0]) + (zX2 * points[i][1])
                results.push(new Array(result1, points[i]));
            }
            results.sort(function(a,b) {
                return a[0] - b[0];
            });
            functionPlot(parameters);
            board.style.display = "block";
            var resultLast = results.length - 1;
            result.innerHTML = "Minimum Point: (" + results[0][1] + ") " + "Z Min : "  + results[0][0] + " Maximum Point: (" + results[resultLast][1] + ") "  + "Z Max : "  + results[resultLast][0];
        }
        if(points.length == 0){
            result.innerHTML = "There is no solution!";
        }
        minMax.style.display = "block";
    }
}




