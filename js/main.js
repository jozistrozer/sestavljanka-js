// globalne spremenljivke
var izbranaSlika = 1;
var totalSekunde = 0;
var majsko_cvetje = new Audio("glasba/majsko_cvetje.mp3");

// Se proži, kadar košček zagrabimo
function Vleci(ev){
    ev.dataTransfer.setData("src", ev.target.id);
}

// Se proži, kadar košček spustimo
function Odvrzi(ev){
    ev.preventDefault();
    var src = document.getElementById(ev.dataTransfer.getData("src"));
    var srcParent = src.parentNode;
    var tgt = ev.currentTarget.firstElementChild;

    ev.currentTarget.replaceChild(src, tgt);
    srcParent.appendChild(tgt);

    preveriKoscke();
}

function DovoliOdvrzi(ev){
    ev.preventDefault();
}

function preveriKoscke(){
    var izbranaTezavnost = document.getElementById("idTezavnost").value;
    var potIzbranaTez = izbranaTezavnost*izbranaTezavnost;
    var koscki = [];
    var urejen = [];
    // zmešan
    for (var i = 0; i < potIzbranaTez; i++){
        koscki.push(document.getElementById("podDiv"+i).firstChild.id);
        urejen.push("img"+i);
    }

    if (koscki.toString() == urejen.toString()){
        for (var k = 0; k < potIzbranaTez; k++){
            document.getElementById("img"+k).setAttribute("draggable", "false");
        }

        setTimeout(function(){
            alert("Zmagal si igro, čestitam porabil si: " + totalSekunde + " sekund");
            location.reload();
        }, 1000);
    }
}

function UstvariSliko(){
    // Skrivanje slik
    document.getElementById("containerSlike").style.display = "none";
    document.getElementById("titleSlika").style.display = "none";
    document.getElementById("titleTezavnost").innerHTML = "<b>Trenutno izbrana težavnost:</b>";
    document.getElementById("idTezavnost").disabled = true;
    document.getElementById("buttZacniIgro").disabled = true;

    // Začetek glasbe
    majsko_cvetje.play();

    // Nastavljanje spremenljivk
    var puzzleContainer = document.getElementById("idPuzzleContainer");
    var izbranaTezavnost = document.getElementById("idTezavnost").value;
    var temp = null;
    var potIzbranaTez = izbranaTezavnost*izbranaTezavnost;
    var izbraneStevilke = [];
    var rand_num;

    // Brisanje slik
    puzzleContainer.innerHTML = "";
    
    // Nastavljanje število okenčkov
    document.getElementById("idPuzzleContainer").style.gridTemplateColumns = "repeat("+izbranaTezavnost+", 100px)";
    
    // Zanka, ki izriše koščke slik
    for (var i = 0; i < potIzbranaTez; i++){
        var noviDiv = document.createElement("div");
        var slikaDiv = document.createElement("img");

        // Nastavljanje atributov div
        noviDiv.setAttribute("id", "podDiv"+i);
        noviDiv.setAttribute("class", "koscekSlike");
        noviDiv.setAttribute("ondrop", "Odvrzi(event)");
        noviDiv.setAttribute("ondragover", "DovoliOdvrzi(event)");
        
        if (izbranaSlika == "1") { temp = 1;} else {temp=0;}

        rand_num = Math.floor(Math.random() * potIzbranaTez);
        while (izbraneStevilke.includes(rand_num)){
            rand_num = Math.floor(Math.random() * potIzbranaTez);
        }
        izbraneStevilke.push(rand_num);
        // Nastavljanje atribute koščkov
        slikaDiv.setAttribute("id", "img"+rand_num);
        slikaDiv.setAttribute("src", "slike/slika"+izbranaSlika+"/"+izbranaTezavnost+"x"+izbranaTezavnost+"/"+(rand_num+temp) + ".jpg");
        
        slikaDiv.setAttribute("width", "100px");
        slikaDiv.setAttribute("height", "100px");
        slikaDiv.setAttribute("draggable", "true");
        slikaDiv.setAttribute("ondragstart", "Vleci(event)");

        noviDiv.appendChild(slikaDiv);
        puzzleContainer.appendChild(noviDiv);
    }

    // Merjenje časa
    setInterval(function(){
        ++totalSekunde;
        document.getElementById("Cas").innerHTML = totalSekunde;
    }, 1000);
}


function pretvoriSekMin(){
    var valString = val + "";
    if (valString.length < 2){
        return "0" + valString;
    } else { return valString; }
}

// Izbere sliko
function IzberiSliko(ev){
    for (var i = 1; i < 6; i++){
        document.getElementById("fullImg"+i).style.border = "none";
    }
    document.getElementById(ev.id).style.border = "2px solid red";

    izbranaSlika = (ev.id).slice(-1);
}