// Se proži, kadar košček zagrabimo
function Vleci(ev){
    ev.dataTransfer.setData("src", ev.target.id);
    console.log(ev.target);
}

// Se proži, kadar košček spustimo
function Odvrzi(ev){
    ev.preventDefault();
    ev.preventDefault();
    var src = document.getElementById(ev.dataTransfer.getData("src"));
    var srcParent = src.parentNode;
    var tgt = ev.currentTarget.firstElementChild;

    ev.currentTarget.replaceChild(src, tgt);
    srcParent.appendChild(tgt);
}

function DovoliOdvrzi(ev){
    ev.preventDefault();
}

function UstvariSliko(){
    // Nastavljanje spremenljivk
    var puzzleContainer = document.getElementById("idPuzzleContainer");
    var izbranaTezavnost = document.getElementById("idTezavnost").value;
    var randSlika = Math.floor(Math.random() * 5 + 1);
    var temp = null;
    // Brisanje slik
    puzzleContainer.innerHTML = "";
    
    // Nastavljanje število okenčkov
    document.getElementById("idPuzzleContainer").style.gridTemplateColumns = "repeat("+izbranaTezavnost+", 100px)";
    
    // Zanka, ki izriše koščke slik
    for (var i = 0; i < izbranaTezavnost*izbranaTezavnost; i++){
        var noviDiv = document.createElement("div");
        var slikaDiv = document.createElement("img");

        // Nastavljanje atributov div
        noviDiv.setAttribute("id", "podDiv"+i);
        noviDiv.setAttribute("class", "koscekSlike");
        noviDiv.setAttribute("ondrop", "Odvrzi(event)");
        noviDiv.setAttribute("ondragover", "DovoliOdvrzi(event)");
        
        if (randSlika == 1) { temp = 1;} else {temp=0;}

        // Nastavljanje atribute koščkov
        slikaDiv.setAttribute("id", "img"+i);
        slikaDiv.setAttribute("src", "slike/slika"+randSlika+"/"+izbranaTezavnost+"x"+izbranaTezavnost+"/"+(i+temp) + ".jpg");
        slikaDiv.setAttribute("width", "100px");
        slikaDiv.setAttribute("height", "100px");
        slikaDiv.setAttribute("draggable", "true");
        slikaDiv.setAttribute("ondragstart", "Vleci(event)");

        noviDiv.appendChild(slikaDiv);
        puzzleContainer.appendChild(noviDiv);
    }
    
}
