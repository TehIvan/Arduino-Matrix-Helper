const boxes = document.getElementsByClassName("box");

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
