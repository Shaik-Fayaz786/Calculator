const display = document.getElementById("display");
let input = "";

// Handle button clicks
document.querySelectorAll(".btn").forEach(button => {
  button.addEventListener("click", () => handleInput(button.textContent));
});

// Handle keyboard input
document.addEventListener("keydown", e => {
  const validKeys = "0123456789+-*/.%";
  if (validKeys.includes(e.key)) handleInput(e.key);
  if (e.key === "Enter") handleInput("=");
  if (e.key === "Backspace") handleInput("DEL");
  if (e.key === "Escape") handleInput("AC");
});

function handleInput(value) {
  if (value === "AC") {
    input = "";
    display.textContent = "0";
    return;
  }

  if (value === "DEL") {
    input = input.slice(0, -1);
    display.textContent = input || "0";
    return;
  }

  if (value === "=") {
    try {
      let expression = input
        .replace(/√/g, "Math.sqrt")
        .replace(/%/g, "/100");

      const result = eval(expression);
      if (!isFinite(result)) throw "Error";
      display.textContent = result;
      input = result.toString();
    } catch {
      display.textContent = "Error";
      input = "";
    }
    return;
  }

  // Avoid consecutive operators
  if (/[+\-*/.]{2,}$/.test(input + value)) return;

  input += value;
  display.textContent = input;
}
