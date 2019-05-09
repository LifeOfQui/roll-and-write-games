const cutHex = h => (h.charAt(0) === "#" ? h.substring(1, 7) : h);

const hexToR = h => parseInt(cutHex(h).substring(0, 2), 16);
const hexToG = h => parseInt(cutHex(h).substring(2, 4), 16);
const hexToB = h => parseInt(cutHex(h).substring(4, 6), 16);

export const colourIsLight = hex => {
  const r = hexToR(hex);
  const g = hexToG(hex);
  const b = hexToB(hex);

  return 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;
};

export const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));
export const getRandomHex = () =>
  "#" +
  "0123456789abcdef"
    .split("")
    .map(function(v, i, a) {
      return i > 5 ? null : a[Math.floor(Math.random() * 16)];
    })
    .join("");
