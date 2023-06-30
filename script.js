const boxes = document.getElementsByClassName("box");

const code = document.getElementById("code");

let size = 8;

loadBoxes(8, 8)

function onChange(sel) {
    document.getElementById("grid").innerHTML = "";

    const selected = sel.options[sel.selectedIndex].text;

    size = parseInt(selected.split("x").pop())
    
    loadBoxes(8, parseInt(selected.split("x").pop()));
}

function loadBoxes(y, x) {
    const container = document.getElementById("grid");
    const text = document.getElementById("text");

    if (x == 8) {
        container.style.width = "380px";
        text.style.minWidth = "360px";
        text.style.maxWidth = "360px";
    }
    if (x == 16) {
        container.style.width = "720px";
        text.style.minWidth = "700px";
        text.style.maxWidth = "700px";

    }
    
    const numOfBoxes = x * y;

    for (let i = 0; i < numOfBoxes; i++) {
        const box = document.createElement('div');

        box.classList.add("box");

        box.onclick = () => onClick(box);

        container.appendChild(box);
    }
}

function onClick(box) {
    if (box.classList.contains("clicked")) {
      box.classList.remove("clicked");
    } else {
      box.classList.add("clicked");
    }
  };

function resetGrid() {
  for (const box of boxes) {
    if (box.classList.contains("clicked")) {
      box.classList.remove("clicked");
    }
  }
}

function genCode() {
  let LEDS = [];

  let current = 0;

  for (let i = 0; i < boxes.length; i++) {
    const box = boxes[i];

    if (i %  size == 0) {
      current = current + 1;
    }

    if (LEDS[current] == undefined || LEDS[current] == null) {
      LEDS[current] = [box.classList.contains("clicked")];
    } else {
      LEDS[current].push(box.classList.contains("clicked"));
    }
  }

  const bytes = [];

  for (let i = 1; i < LEDS.length; i++) {
    const arr = LEDS[i];

    bytes[i - 1] = "0b" + arr.map((r) => (r ? "1" : "0")).join("");
  }

  code.textContent = `const uint8_t IMAGE = {
    ${bytes.map((r) => r).join(", ")}
  }`;
}

function copyCode() {
  var r = document.createRange();
  r.selectNode(document.getElementById("code"));
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(r);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
  alert("Copied to clipboard!");
}
