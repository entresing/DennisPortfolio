// Vanilla-JS port of React Bits "VariableProximity".
// Splits a label into per-letter spans and animates each letter's
// `font-variation-settings` based on how close the cursor is.
//
// Declarative usage on any element with a variable font:
//   <span
//     class="variable-proximity"
//     data-vp
//     data-from="'wght' 400, 'opsz' 9"
//     data-to="'wght' 1000, 'opsz' 40"
//     data-radius="120"
//     data-falloff="linear"
//     data-container=".hero-heading-lines"
//   >Your text</span>
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  function parseSettings(settingsStr) {
    return settingsStr
      .split(",")
      .map(function (s) {
        return s.trim();
      })
      .map(function (s) {
        var parts = s.split(" ");
        return [parts[0].replace(/['"]/g, ""), parseFloat(parts[1])];
      });
  }

  function buildParsedSettings(fromStr, toStr) {
    var fromSettings = new Map(parseSettings(fromStr));
    var toSettings = new Map(parseSettings(toStr));
    return Array.from(fromSettings.entries()).map(function (entry) {
      var axis = entry[0];
      var fromValue = entry[1];
      return {
        axis: axis,
        fromValue: fromValue,
        toValue: toSettings.has(axis) ? toSettings.get(axis) : fromValue,
      };
    });
  }

  function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  function calculateFalloff(dist, radius, falloff) {
    var norm = Math.min(Math.max(1 - dist / radius, 0), 1);
    switch (falloff) {
      case "exponential":
        return Math.pow(norm, 2);
      case "gaussian":
        return Math.exp(-(Math.pow(dist / (radius / 2), 2) / 2));
      case "linear":
      default:
        return norm;
    }
  }

  function initElement(el) {
    var label = el.textContent.trim().replace(/\s+/g, " ");
    var fromSettings = el.dataset.from || "'wght' 900";
    var toSettings = el.dataset.to || "'wght' 300";
    var radius = parseFloat(el.dataset.radius) || 100;
    var falloff = el.dataset.falloff || "linear";
    var container = el.dataset.container
      ? el.closest(el.dataset.container)
      : el.parentElement;

    var parsedSettings = buildParsedSettings(fromSettings, toSettings);

    // Rebuild the element as per-letter spans.
    el.textContent = "";
    var letterRefs = [];
    var words = label.split(" ");

    words.forEach(function (word, wordIndex) {
      var wordSpan = document.createElement("span");
      wordSpan.style.display = "inline-block";
      wordSpan.style.whiteSpace = "nowrap";
      wordSpan.setAttribute("aria-hidden", "true");

      word.split("").forEach(function (letter) {
        var letterSpan = document.createElement("span");
        letterSpan.textContent = letter;
        letterSpan.style.display = "inline-block";
        letterSpan.style.fontVariationSettings = fromSettings;
        wordSpan.appendChild(letterSpan);
        letterRefs.push(letterSpan);
      });

      el.appendChild(wordSpan);

      if (wordIndex < words.length - 1) {
        var space = document.createElement("span");
        space.style.display = "inline-block";
        space.setAttribute("aria-hidden", "true");
        space.innerHTML = "&nbsp;";
        el.appendChild(space);
      }
    });

    // Accessible, screen-reader-only copy of the full label.
    var srLabel = document.createElement("span");
    srLabel.className = "sr-only";
    srLabel.textContent = label;
    el.appendChild(srLabel);

    // No animation when reduced motion is requested or no container exists:
    // settle the letters at the "to" (bold) end so the text stays legible.
    if (prefersReducedMotion || !container) {
      letterRefs.forEach(function (letterRef) {
        letterRef.style.fontVariationSettings = toSettings;
      });
      return;
    }

    var mouse = { x: 0, y: 0 };
    var last = { x: null, y: null };

    function updatePosition(x, y) {
      var rect = container.getBoundingClientRect();
      mouse.x = x - rect.left;
      mouse.y = y - rect.top;
    }

    window.addEventListener("mousemove", function (ev) {
      updatePosition(ev.clientX, ev.clientY);
    });
    window.addEventListener(
      "touchmove",
      function (ev) {
        var touch = ev.touches[0];
        if (touch) updatePosition(touch.clientX, touch.clientY);
      },
      { passive: true },
    );

    function loop() {
      var containerRect = container.getBoundingClientRect();

      if (last.x !== mouse.x || last.y !== mouse.y) {
        last.x = mouse.x;
        last.y = mouse.y;

        letterRefs.forEach(function (letterRef) {
          var rect = letterRef.getBoundingClientRect();
          var centerX = rect.left + rect.width / 2 - containerRect.left;
          var centerY = rect.top + rect.height / 2 - containerRect.top;
          var dist = distance(mouse.x, mouse.y, centerX, centerY);

          if (dist >= radius) {
            letterRef.style.fontVariationSettings = fromSettings;
            return;
          }

          var fv = calculateFalloff(dist, radius, falloff);
          var newSettings = parsedSettings
            .map(function (setting) {
              var value =
                setting.fromValue + (setting.toValue - setting.fromValue) * fv;
              return "'" + setting.axis + "' " + value;
            })
            .join(", ");

          letterRef.style.fontVariationSettings = newSettings;
        });
      }

      requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-vp]").forEach(initElement);
  });
})();
