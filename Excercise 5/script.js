const addButton = document.getElementById("add");
const subButton = document.getElementById("subtract");
const input1 = document.getElementById("num1");
const input2 = document.getElementById("num2");
const result = document.getElementById("result");

addButton.addEventListener("click", function () {
    result.value = parseInt(input1.value) + parseInt(input2.value);
});

subButton.addEventListener("click", function () {
    result.value = parseInt(input1.value) - parseInt(input2.value);
});
