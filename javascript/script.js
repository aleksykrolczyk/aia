function saveAlbum() {
    let li = this.parentNode.parentNode;
    author_input= li.childNodes[0].querySelector("input");
    author_span = li.childNodes[0].querySelector("span");
    author_span.textContent = author_input.value;
    
    author_input.style.display = "none";
    author_span.style.display = "inline";

    name_input= li.childNodes[1].querySelector("input");
    name_span = li.childNodes[1].querySelector("span");
    name_span.textContent = name_input.value;
    
    name_input.style.display = "none";
    name_span.style.display = "inline";
    
    this.style.display = "none";
    this.parentNode.querySelector(".editButton").style.display = "inline";
    
}

function editAlbum() {
    let li = this.parentNode.parentNode;
    author_input= li.childNodes[0].querySelector("input");
    author_span = li.childNodes[0].querySelector("span");
    
    author_input.style.display = "inline";
    author_span.style.display = "none";

    name_input= li.childNodes[1].querySelector("input");
    name_span = li.childNodes[1].querySelector("span");
    
    name_input.style.display = "inline";
    name_span.style.display = "none";
    
    this.style.display = "none";
    this.parentNode.querySelector(".saveButton").style.display = "inline";
}

function removeAlbum() {
    this.parentNode.parentNode.remove();
}

function addAlbum() {
    let list = document.getElementById("albums");
    let li = document.createElement("li");

    let div_author = document.createElement("div");
    let div_name = document.createElement("div");
    let div_buttons = document.createElement("div")

    let in_author = document.createElement("input");
    let text_author = document.createElement("span");
    text_author.display= "none";

    let in_name = document.createElement("input");
    let text_name = document.createElement("span");
    text_name.display = "none";

    let save = document.createElement("button");
    let edit = document.createElement("button");
    let remove = document.createElement("button");

    save.textContent = "Save";
    save.className = "saveButton";

    edit.textContent = "Edit";
    edit.style.display = "none";
    edit.className = "editButton";

    remove.textContent = "Remove";

    div_author.appendChild(in_author);
    div_author.appendChild(text_author)

    div_name.append(in_name);
    div_name.append(text_name);

    div_buttons.appendChild(save);
    div_buttons.appendChild(edit);
    div_buttons.appendChild(remove);

    save.onclick = saveAlbum;
    edit.onclick = editAlbum;
    remove.onclick = removeAlbum;

    li.appendChild(div_author);
    li.appendChild(div_name);
    li.appendChild(div_buttons);

    list.appendChild(li);
}
