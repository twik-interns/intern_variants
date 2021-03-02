// // images having no alt
// let images = document.querySelectorAll("img");
// for (image of images) {
//   try {
//     let imgAlt = window.getComputedStyle(image)["alt"];
//     if (typeof imgAlt === "undefined") {
//       imgAlt.alt = "";
//     }
//   } catch {}
// }

// // forms having no labels
// let forms = document.querySelectorAll("form");
// for (form in forms) {
//   try {
//     if (!form.getElementsByTagName("label")) {
//       let labelElement = document.createChild("label");
//       labelElement.textContent = "";
//       labelElement.style.display = "none";
//       form.appendChild(labelElement);
//     }
//   } catch {}
// }

// // form labels being hidden

// // page having no language specified
// if (
//   typeof document.documentElement.lang === "undefined" ||
//   document.documentElement.lang.length === 0 ||
//   (typeof document.documentElement.lang === "undefined" &&
//     document.documentElement.lang.length === 0)
// ) {
//   document.documentElement.lang = "";
// }

// // dealing with missing title
// if (
//   typeof document.head.title === "undefined" ||
//   document.head.title.length === 0
// ) {
//   document.head.title = "";
// }

// // empty table header
// let tableHeaders = document.querySelectorAll("th");
// for (header of tableHeaders) {
//   if (header.textContent.length === 0) {
//     header.style.fontSize = "0px";
//     header.style.color = "transparent";
//     header.insertAdjacentHTML(
//       "beforeend",
//       `<span style='width:"0px" !important; height:"0px" !important; font-size:"0px" !important; display:none !important;'>empty header</span>`
//     );
//   }
// }

// // empty button (no value)
// let buttons = document.querySelectorAll("button");
// for (button of buttons) {
//   if (button.textContent.length === 0) {
//     button.style.fontSize = "0px";
//     button.style.color = "transparent";
//     button.insertAdjacentHTML(
//       "beforeend",
//       `<span style='width:"0px" !important; height:"0px" !important; font-size:"0px" !important; display:none !important;'>empty button</span>`
//     );
//   }
// }

// // link contains no text (<a></a> - no text between tags)
// let links = document.querySelectorAll("a");
// for (link of links) {
//   if (link.textContent.length === 0) {
//     link.style.fontSize = "0px";
//     link.style.color = "transparent";
//     link.insertAdjacentHTML(
//       "beforeend",
//       `<span style='width:"0px" !important; height:"0px" !important; font-size:"0px" !important; display:none !important;'>empty link</span>`
//     );
//   }
// }

// ############################################################################################################################
// LOW CONTRAST
// ############################################################################################################################

function parseColor(color) {
  var m = color.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
  if (m) {
    return [m[1], m[2], m[3], "1"];
  }
  m = color.match(
    /^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*((0.)?\d+)\s*\)$/i
  );
  if (m) {
    return [m[1], m[2], m[3], m[4]];
  }
}

function formatRGBA(arr, alpha = "") {
  if (alpha.length !== 0) {
    return "rgba(" + arr.slice(0, 3).join(",") + `,${alpha})`;
  } else {
    try {
      return "rgba(" + arr.slice(0, 3).join(",") + `,${arr[3]})`;
    } catch {
      return "rgba(" + arr.slice(0, 3).join(",") + `,1)`;
    }
  }
}

// function LightenDarkenColor(col, amt) {
//   col = parseInt(col, 16);
//   return (
//     ((col & 0x0000ff) + amt) |
//     ((((col >> 8) & 0x00ff) + amt) << 8) |
//     (((col >> 16) + amt) << 16)
//   ).toString(16);
// }

function LightenDarkenColor(col, amt) {
  var usePound = false;

  if (col[0] == "#") {
    col = col.slice(1);
    usePound = true;
  }

  var num = parseInt(col, 16);

  var r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  var b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  var g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}

// uses hex colors (eg "00A000")
function getPerceptualBrightness_hex(color, alpha) {
  if (alpha == 0) {
    return 1530;
  }
  var r = parseInt(color.substring(0, 2), 16);
  var g = parseInt(color.substring(2, 4), 16);
  var b = parseInt(color.substring(4, 6), 16);
  return r * 2 + g * 3 + b;
}

// uses rgb colors
function getPerceptualBrightness_rgbString(color, alpha) {
  if (alpha == 0) {
    return 1530;
  }
  var [r, g, b] = parseColor(color).slice(0, 3);
  return (
    parseInt(componentToHex(r)) * 2 +
    parseInt(componentToHex(g)) * 3 +
    parseInt(componentToHex(b))
  );
}
function getPerceptualBrightness_rgbArray(color) {
  if (alpha == 0) {
    return 1530;
  }
  return parseInt(color[0]) * 2 + parseInt(color[1]) * 3 + parseInt(color[2]);
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return `${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

// const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
//     const hex = x.toString(16)
//     return hex.length === 1 ? '0' + hex : hex
//   }).join('')

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
}

function increaseDifference(brighterHex, darkerHex, desiredDifference) {
  let new_brighterHex = brighterHex;
  let new_darkerHex = darkerHex;

  // making sure the hex is always of length 6
  while (new_brighterHex.length < 6) {
    new_brighterHex = "0" + new_brighterHex;
  }
  while (new_darkerHex.length < 6) {
    new_darkerHex = "0" + new_darkerHex;
  }

  //calculating difference

  let difference =
    parseInt(getPerceptualBrightness_hex(new_brighterHex)) -
    parseInt(getPerceptualBrightness_hex(new_darkerHex));

  // increasing the difference if needed
  while (difference < desiredDifference) {
    if (desiredDifference >= 1530) {
      desiredDifference = 1530;
    }

    if (desiredDifference < 0) {
      desiredDifference = 0;
    }

    if (new_brighterHex.toLowerCase() !== "ffffff") {
      new_brighterHex = LightenDarkenColor(new_brighterHex, 1);
    }
    if (new_darkerHex !== "000000") {
      new_darkerHex = LightenDarkenColor(new_darkerHex, -1);
    }

    // making sure the hex is always of length 6
    while (new_brighterHex.length < 6) {
      new_brighterHex = "0" + new_brighterHex;
    }
    while (new_darkerHex.length < 6) {
      new_darkerHex = "0" + new_darkerHex;
    }
    if (new_darkerHex === "0") {
      new_darkerHex = "000000";
    }

    // recalculating difference

    difference =
      parseInt(getPerceptualBrightness_hex(new_brighterHex.toString())) -
      parseInt(getPerceptualBrightness_hex(new_darkerHex.toString()));
  }
  return [new_brighterHex, new_darkerHex];
}

// First target the text, trying to make it

function adjustContrast(desiredDifference) {
  let elements = document.body.querySelectorAll("*");
  let ignoreList = [
    "script",
    "style",
    // "a",
    // "p",
    // "h1",
    // "h2",
    // "h3",
    // "h4",
    // "h5",
    // "h6",
    // "span",
  ];
  for (elem of elements) {
    if (ignoreList.includes(elem.tagName.toLowerCase())) {
      continue;
    }
    if (elem.textContent.length === 0) {
      continue;
    }

    try {
      var backgroundElem = elem;
      var elemStyle = window.getComputedStyle(elem);
      var backgroundElemStyle = window.getComputedStyle(backgroundElem);

      // store rgba values into variables
      var [r_text, g_text, b_text, alpha_text] = parseColor(elemStyle["color"]);
      var [
        r_background,
        g_background,
        b_background,
        alpha_background,
      ] = parseColor(backgroundElemStyle["backgroundColor"]);

      // if the element's background is transparent - search for nearest non-zero alpha element
      try {
        while (alpha_background == "0") {
          backgroundElem = backgroundElem.parentElement;
          backgroundElemStyle = window.getComputedStyle(backgroundElem);
          [
            r_background,
            g_background,
            b_background,
            alpha_background,
          ] = parseColor(backgroundElemStyle["backgroundColor"]);
        }
      } catch {}

      // continue if the text and background color have 0 alpha
      if (parseInt(alpha_background) + parseInt(alpha_text) === 0) {
        continue;
      }

      // convert rgb colors to hex
      let backgroundHex = rgbToHex(
        parseInt(r_background),
        parseInt(g_background),
        parseInt(b_background)
      );
      let textHex = rgbToHex(
        parseInt(r_text),
        parseInt(g_text),
        parseInt(b_text)
      );

      // measure brightness of colors
      var background_brightness = getPerceptualBrightness_hex(
        backgroundHex,
        alpha_background
      );
      var text_brightness = getPerceptualBrightness_hex(textHex, alpha_text);

      // deciding which color was brigher and which darker and brightening the brighter color and darkening the darker color
      if (text_brightness > background_brightness) {
        var [new_text_hex, new_background_hex] = increaseDifference(
          textHex,
          backgroundHex,
          desiredDifference
        );
      } else {
        var [new_background_hex, new_text_hex] = increaseDifference(
          backgroundHex,
          textHex,
          desiredDifference
        );
      }

      // making sure hex colors like 10101 are always represented as 010101
      while (new_text_hex.length < 6) {
        var new_text_hex = "0" + new_text_hex;
      }

      while (new_background_hex.length < 6) {
        var new_background_hex = "0" + new_background_hex;
      }

      // converting new colors from hex to rgb array
      let new_text_rgb_array = hexToRgb(new_text_hex);
      let new_background_rgb_array = hexToRgb(new_background_hex);

      // formatting an rgba string to use as style
      // if text had alpha, use it
      if (alpha_text) {
        var new_text_rgba = formatRGBA(new_text_rgb_array, alpha_text);
      } else {
        var new_text_rgba = formatRGBA(new_text_rgb_array, "1");
      }
      // if background had alpha, use it
      if (alpha_background) {
        var new_background_rgba = formatRGBA(
          new_background_rgb_array,
          alpha_background
        );
      } else {
        var new_background_rgba = formatRGBA(new_background_rgb_array, "1");
      }

      // if the new color is the same, do not touch the styling
      if (textHex !== new_text_hex) {
        elem.style.setProperty("color", new_text_rgba, "important");
        // elem.style.color = new_text_rgba;
      }
      if (backgroundHex !== new_background_hex) {
        backgroundElem.style.setProperty(
          "background-color",
          new_background_rgba,
          "important"
        );
        // backgroundElem.style.backgroundColor = new_background_rgba;
      }

      // done
    } catch {}
  }
  console.log("DONE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
}

adjustContrast(1300);

// broken ARIA menu (An ARIA menu does not contain required menu items.)
// An element with role="menu" does not contain at least one element with role="menuitem", role="menuitemcheckbox", or role="menuitemradio".
