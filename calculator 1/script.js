
const display = document.getElementById("display");
const historyList = document.getElementById("history-list");
const historyBox = document.getElementById("history");

function appendToDisplay(value) {
  if (value === '+/-') {
    display.value = display.value ? (parseFloat(display.value) * -1).toString() : '';
  } else {
    display.value += value;
  }
}

function clearDisplay() {
  display.value = "";
}

function calculate() {
  try {
    const expression = display.value;
    const result = eval(expression);
    if (expression) {
      addToHistory(expression + " = " + result);
    }
    display.value = result;
  } catch {
    display.value = "Error";
  }
}

function addToHistory(entry) {
  const li = document.createElement("li");
  li.textContent = entry;
  historyList.prepend(li);
}

function toggleHistory() {
  historyBox.style.display = historyBox.style.display === "block" ? "none" : "block";
}

function clearHistory() {
  historyList.innerHTML = "";
}

document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (!isNaN(key) || key === "." || key === "+" || key === "-" || key === "*" || key === "/") {
    appendToDisplay(key);
  } else if (key === "Enter") {
    e.preventDefault();
    calculate();
  } else if (key === "Backspace") {
    display.value = display.value.slice(0, -1);
  } else if (key.toLowerCase() === "c") {
    clearDisplay();
  }
});
