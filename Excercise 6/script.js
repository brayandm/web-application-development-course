function updateQuote() {
    const button = document.getElementById("new-quote");

    button.disabled = true;

    fetch("https://api.quotable.io/quotes/random?tags=technology")
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            const quote = document.getElementById("quote");
            const author = document.getElementById("author");
            quote.innerHTML = '"' + response[0].content + '"';
            author.innerHTML = "- " + response[0].author;

            button.disabled = false;
        });
}

updateQuote();

const button = document.getElementById("new-quote");

button.addEventListener("click", updateQuote);
