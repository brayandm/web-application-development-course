if (localStorage.getItem("name") === null) {
    const name = prompt("Enter your name: ");
    localStorage.setItem("name", name);
    document.getElementById("name").innerHTML = "Hello " + name;
} else {
    document.getElementById("name").innerHTML =
        "Hello " + localStorage.getItem("name");
}
