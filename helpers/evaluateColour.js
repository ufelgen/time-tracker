export function determineLuminance(colourHex) {
  // ref https://css-tricks.com/converting-color-spaces-in-javascript/

  // Convert hex to RGB first
  let r = 0,
    g = 0,
    b = 0;
  if (colourHex.length == 4) {
    r = "0x" + colourHex[1] + colourHex[1];
    g = "0x" + colourHex[2] + colourHex[2];
    b = "0x" + colourHex[3] + colourHex[3];
  } else if (colourHex.length == 7) {
    r = "0x" + colourHex[1] + colourHex[2];
    g = "0x" + colourHex[3] + colourHex[4];
    b = "0x" + colourHex[5] + colourHex[6];
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  //return tooDark if luminance value is below 50%
  return l < 50;
}

export function determineTextColour(tooDark) {
  if (tooDark) {
    const textColour = "white";
    return textColour;
  } else {
    const textColour = "black";
    return textColour;
  }
}
