function UstvariSliko(){
    // Nastavljanje spremenljivk
    var puzzleContainer = document.getElementById("idPuzzleContainer");
    var izbranaTezavnost = document.getElementById("idTezavnost").value;
    
    // Brisanje slik
    puzzleContainer.innerHTML = "";
    
    // Nastavljanje število okenčkov
    document.getElementById("idPuzzleContainer").style.gridTemplateColumns = "repeat("+izbranaTezavnost+", 50px)";
    
    // Zanka, ki izriše koščke slik
    for (var i = 0; i < izbranaTezavnost*izbranaTezavnost; i++){
        var noviDiv = document.createElement("div");
        var slikaDiv = document.createElement("img");

        noviDiv.setAttribute("id", "podDiv"+i);
        noviDiv.setAttribute("class", "koscekSlike");
        
        slikaDiv.setAttribute("src", "slike/slika1/"+izbranaTezavnost+"x"+izbranaTezavnost+"/"+(i+1) + ".jpg");
        slikaDiv.setAttribute("width", "50px");
        slikaDiv.setAttribute("height", "50px");

        noviDiv.appendChild(slikaDiv);
        puzzleContainer.appendChild(noviDiv);
    }
    
}