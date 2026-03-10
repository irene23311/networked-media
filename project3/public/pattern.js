const svg = document.getElementById("patternSvg");

const pattern = ["ch", "ch", "dc", "sl", "dc", "ch"];

const NS = "http://www.w3.org/2000/svg";

let symbols = []; // we store all circles here

pattern.forEach((type, i) => {

  const circle = document.createElementNS(NS, "circle");

  circle.setAttribute("cx", 60 + i * 60);
  circle.setAttribute("cy", 100);
  circle.setAttribute("r", 18);
  circle.setAttribute("fill", "purple");

  circle.style.cursor = "pointer";

  // store this circle in array
  symbols.push(circle);

  circle.addEventListener("click", () => {

    // reset all colors first
    symbols.forEach(s => {
      s.setAttribute("fill", "purple");
    });

    // color from 0 to clicked index
    for (let j = 0; j <= i; j++) {
      symbols[j].setAttribute("fill", "hotpink");
    }

  });

  svg.appendChild(circle);
});