window.onload = function () {
    const addButton = document.getElementById("add");
    const subButton = document.getElementById("subtract");

    addButton.addEventListener("click", function () {
        console.log("Hello World2");
        const input1 = document.getElementById("num1");
        const input2 = document.getElementById("num2");

        const result = document.getElementById("result");
        result.value = parseInt(input1.value) + parseInt(input2.value);
    });

    subButton.addEventListener("click", function () {
        const input1 = document.getElementById("num1");
        const input2 = document.getElementById("num2");

        const result = document.getElementById("result");
        result.value = parseInt(input1.value) - parseInt(input2.value);
    });
};
