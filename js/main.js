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
    console.log("preverjam");
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
        console.log("ZMAGA ZMAGA ZMAGA ZMGA");
        for (var k = 0; k < potIzbranaTez; k++){
            document.getElementById("img"+k).setAttribute("draggable", "false");
        }
    }
}

function UstvariSliko(){
    // Nastavljanje spremenljivk
    var puzzleContainer = document.getElementById("idPuzzleContainer");
    var izbranaTezavnost = document.getElementById("idTezavnost").value;
    var randSlika = Math.floor(Math.random() * 5 + 1);
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
        
        if (randSlika == 1) { temp = 1;} else {temp=0;}

        rand_num = Math.floor(Math.random() * potIzbranaTez);
        while (izbraneStevilke.includes(rand_num)){
            rand_num = Math.floor(Math.random() * potIzbranaTez);
        }
        izbraneStevilke.push(rand_num);
        // Nastavljanje atribute koščkov
        slikaDiv.setAttribute("id", "img"+rand_num);
        slikaDiv.setAttribute("src", "slike/slika"+randSlika+"/"+izbranaTezavnost+"x"+izbranaTezavnost+"/"+(rand_num+temp) + ".jpg");
        
        slikaDiv.setAttribute("width", "100px");
        slikaDiv.setAttribute("height", "100px");
        slikaDiv.setAttribute("draggable", "true");
        slikaDiv.setAttribute("ondragstart", "Vleci(event)");

        noviDiv.appendChild(slikaDiv);
        puzzleContainer.appendChild(noviDiv);
    }
}
