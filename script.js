const display = document.getElementById("display");

let currentInput = "";

// Update the display
function updateDisplay() {
    display.value = currentInput === "" ? "0" : currentInput;
}

// Number and operator buttons
document.querySelectorAll("[data-value]").forEach(button => {
    button.addEventListener("click", () => {
        const value = button.dataset.value;

        // Replace initial 0
        if (currentInput === "0" && !isNaN(value)) {
            currentInput = value;
        } else {
            currentInput += value;
        }

        updateDisplay();
    });
});

// Clear button (C)
document.querySelector('[data-action="clear"]').addEventListener("click", () => {
    currentInput = "";
    updateDisplay();
});

// Delete button (⌫)
document.querySelector('[data-action="delete"]').addEventListener("click", () => {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
});

// Equal button (=)
document.querySelector('[data-action="equal"]').addEventListener("click", () => {
    if (currentInput.trim() === "") return;

    try {
       
        const expression = currentInput
            .replace(/×/g, "*")
            .replace(/÷/g, "/");

        let result = eval(expression);

        if (!Number.isInteger(result)) {
            result = parseFloat(result.toFixed(10));
        }

        currentInput = result.toString();
        updateDisplay();
    } catch {
        display.value = "Error";
        currentInput = "";
    }
});

// Keyboard support
document.addEventListener("keydown", (event) => {
    const key = event.key;

    if ("0123456789+-*/.".includes(key)) {
        currentInput += key;
        updateDisplay();
    }

    if (key === "Enter") {
        event.preventDefault();

        try {
            let result = eval(currentInput);

            if (!Number.isInteger(result)) {
                result = parseFloat(result.toFixed(10));
            }

            currentInput = result.toString();
            updateDisplay();
        } catch {
            display.value = "Error";
            currentInput = "";
        }
    }

    if (key === "Backspace") {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }

    if (key === "Escape") {
        currentInput = "";
        updateDisplay();
    }
});