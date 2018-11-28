window.onload = spill; 
var distanse = 0;
var perKlikk = 10;
var ytelse = 100;
var penge = 0;
var pengeSek = 0.1;
var distanseSek = 0;
var spillPå = true;
var distanseMal = 1000;
var distanseMalGevinst = 200;
var besokteByer = []
var posisjon = [473890.072, 7464877.535]
var posisjonByer = [[517267.885, 7461238.273], [568584.259, 7035355.146], [596419.708, 6642958.298]]

function spill(){
    if(!spillPå){

    }
    else{
        setTimeout(spill, 100);
    }
    if(distanse >= distanseMal){
        spillPå = false;
        document.getElementById("progBar").style.width = '100%';
        alert("Du klarte det! Du får "+distanseMalGevinst+" kr")
        penge += distanseMalGevinst;
        document.getElementById("velgBodo").innerHTML = "Bodø (" + finnDistanse(posisjon, posisjonByer[0]) + "m)";
        document.getElementById("velgTrondheim").innerHTML = "Trondheim (" + finnDistanse(posisjon, posisjonByer[1]) + "m)";
        document.getElementById("velgOslo").innerHTML = "Bodø (" + finnDistanse(posisjon, posisjonByer[2]) + "m)";
        document.getElementById("velgNyDiv").style.display = "inline";
        distanse = 0;
        if(besokteByer.length == posisjonByer.length){
            alert("Du vant!")
            spillPå = false;
        }
    }
    penge += pengeSek;
    document.getElementById("penger").innerHTML = parseInt(penge);
    distanse += distanseSek;
    document.getElementById("count").innerHTML = parseFloat(distanse).toFixed(1) + " m";
    progress(distanse, distanseMal);
    progressY(ytelse);
}
function pause(){
    if(spillPå === true){
        spillPå = false;
    }
    else{
        spillPå = true;
        spill();
    }
}

function klikk(d, y){
    if(y <= 0){
        alert("Du har ikke nok energi! Kjøp mat for å øke ytelse");
    }
    else{
    var tempD = d;
    tempD += (perKlikk*((ytelse)/100));
    distanse = tempD;
    document.getElementById("count").innerHTML = parseFloat(tempD).toFixed(1) + " m";
    var tempY = y;
    tempY -= 0.2;
    ytelse = parseFloat(tempY).toFixed(1);
    document.getElementById("ytelse").innerHTML = ytelse + "%";
    }
    
}

function progress(dis, mal){
    var elem = document.getElementById("progBar");
    var percent = (dis/mal)*100;
    elem.style.width = percent + '%'; 
}
function progressY(ytelse){
    var elem = document.getElementById("progBarY");
    elem.style.width = ytelse + '%'; 
}


function okInntekt(i, pris){
    if(penge>=pris){
        pengeSek += i;
        penge -= pris; 
    }else{
        alert("Du har ikke nok penger")
    }
}

function okDistansePerKlikk(i, pris){
    if(penge>=pris){
        perKlikk += i;
        penge -= pris; 
    }else{
        alert("Du har ikke nok penger")
    }
}

function okDistansePerSek(i, pris){
    if(penge>=pris){
        distanseSek += i;
        penge -= pris; 
    }else{
        alert("Du har ikke nok penger")
    }
}

function kjopMat(y, pris){
    if(penge>=pris){
        if((parseFloat(ytelse)+parseFloat(y)) >= 100){
            ytelse = 100;   
        }
        else{
            var tempY = parseFloat(ytelse);
            ytelse = tempY + parseFloat(y);
        }
        penge -= pris; 
        document.getElementById("ytelse").innerHTML = ytelse;
    }else{
        alert("Du har ikke nok penger")
    }

}

function velgNyttMal(besokteByer, nyBy){
    
    switch(nyBy) {
        case 1:
            distanseMal = finnDistanse(posisjon, [517267.885, 7461238.273]);
            distanseMalGevinst = 1000;
            document.getElementById("velgBodo").style.display = "none";
            document.getElementById("currentBy").innerHTML = " Bodø";
            posisjon = posisjonByer[0];
            break;
        case 2:
            distanseMal = finnDistanse(posisjon, [568584.259, 7035355.146]);
            distanseMalGevinst = 4000;
            document.getElementById("velgTrondheim").style.display = "none";
            document.getElementById("currentBy").innerHTML = " Trondheim";
            posisjon = posisjonByer[1];
            break;
        case 3: 
            distanseMal = finnDistanse(posisjon, [596419.708, 6642958.298]);
            distanseMalGevinst = 10000;
            document.getElementById("velgOslo").style.display = "none";
            document.getElementById("currentBy").innerHTML = " Oslo";
            posisjon = posisjonByer[2];
            break;
    }
    document.getElementById("mal").innerHTML = distanseMal+ " m";
    besokteByer.push(nyBy);
    document.getElementById("velgNyDiv").style.display = "none";
    distanse = 0;
    document.getElementById("count").innerHTML = distanse;
    spillPå = true;
    spill();
}

function finnDistanse(currentBy, nyBy){
    var x1 = currentBy[0];
    var y1 = currentBy[1];
    var x2 = nyBy[0];
    var y2 = nyBy[1];
    var distanse = Math.sqrt(Math.pow(x2-x1, 2)+Math.pow(y2-y1, 2));
    distanse = distanse.toFixed(0)
    console.log(distanse);
    return(distanse);
}

function harBesokt(besokteByer, nyBy){
    var n = nyBy;
    var b = besokteByer;
    for(let i = 0; i < b.length; i++){
        if(b[i]===n){
            console.log(true);
            return true;
        }
    }
    console.log(false);
    return false;
}