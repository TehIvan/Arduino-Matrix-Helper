const boxes = document.getElementsByClassName("box");

const code = document.getElementById("code");

for (const box of boxes) {
  box.onclick = () => {
    if (box.classList.contains("clicked")) {
      box.classList.remove("clicked");
    } else {
      box.classList.add("clicked");
    }
  };
}

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

    if (i % 8 == 0) {
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
