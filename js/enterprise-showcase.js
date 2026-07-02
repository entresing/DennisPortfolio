/* Enterprise UX Co-op — showcase interaction
   - Reveals the hidden showcase section when a 2x2 card is clicked.
   - Provides a sticky mini tab switcher (Enterprise Analytics, Internal Audit,
     AI Assistant, Spatial Computing) inside the showcase.
   - Crossfades content when switching, keeps the active card/tab in sync, and
     scrolls back to the top of the showcase (not the top of the page).
   - Fully keyboard accessible (roving tabindex + arrow keys) and respects
     prefers-reduced-motion.

   All copy is confidentiality-safe: no company names, internal tool names,
   departments, metrics, real data, stakeholders, tickets, or internal URLs. */
(function () {
  "use strict";

  var section = document.getElementById("project-showcase-section");
  if (!section) return;

  var header =
    document.querySelector("header .heading") ||
    document.querySelector("header");
  var tablist = section.querySelector(".showcase-tabs");
  var tabs = Array.prototype.slice.call(
    section.querySelectorAll(".showcase-tab"),
  );
  var body = section.querySelector(".showcase-body");
  var cards = Array.prototype.slice.call(
    document.querySelectorAll(".enterprise-card-link"),
  );
  var items = Array.prototype.slice.call(
    document.querySelectorAll(".enterprise-work-item"),
  );
  var additionalExperience = document.querySelector(".additional-experience");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  var fields = {
    title: body.querySelector('[data-showcase="title"]'),
    category: body.querySelector('[data-showcase="category"]'),
    overview: body.querySelector('[data-showcase="overview"]'),
    media: body.querySelector('[data-showcase="media"]'),
    process: body.querySelector('[data-showcase="process"]'),
  };

  function mediaFrame(icon, note) {
    return (
      '<div class="showcase-media-frame">' +
      '<span class="material-symbols-rounded" aria-hidden="true">' +
      icon +
      "</span>" +
      "<p>" +
      note +
      "</p>" +
      "</div>"
    );
  }

  function processList(heading, steps) {
    var lis = steps
      .map(function (s) {
        return "<li>" + s + "</li>";
      })
      .join("");
    return "<h3>" + heading + "</h3><ul>" + lis + "</ul>";
  }

  // Confidentiality-safe placeholder frame with a descriptive label. Real
  // sanitized storyboards/mockups can later replace these frames.
  function labeledFrame(icon, label, note) {
    return (
      '<figure class="showcase-media-frame">' +
      '<span class="material-symbols-rounded" aria-hidden="true">' +
      icon +
      "</span>" +
      '<figcaption class="showcase-media-label">' +
      label +
      "</figcaption>" +
      "<p>" +
      note +
      "</p>" +
      "</figure>"
    );
  }

  function mediaGrid(frames) {
    return (
      '<div class="showcase-media-grid">' +
      frames
        .map(function (f) {
          return labeledFrame(f[0], f[1], f[2]);
        })
        .join("") +
      "</div>"
    );
  }

  // Builds a titled content block (heading + arbitrary inner HTML).
  function contentBlock(heading, innerHtml) {
    return "<h3>" + heading + "</h3>" + innerHtml;
  }

  function paras(arr) {
    return arr
      .map(function (t) {
        return "<p>" + t + "</p>";
      })
      .join("");
  }

  function list(itemsArr) {
    return (
      "<ul>" +
      itemsArr
        .map(function (i) {
          return "<li>" + i + "</li>";
        })
        .join("") +
      "</ul>"
    );
  }

  var data = {
    analytics: {
      title: "Enterprise Analytics Dashboard",
      category: "Dashboard UX \u00b7 Research \u00b7 Data Trust",
      overview:
        "<p>An internal analytics experience was redesigned to make key information easier to scan, compare, and trust. The work focused on clarifying information hierarchy, simplifying movement between related views, and reducing the effort required to interpret information correctly.</p>",
      media: mediaFrame(
        "monitoring",
        "Generalized concept visual \u2014 specific screens and data are omitted for confidentiality.",
      ),
      process: processList("Process Highlights", [
        "Audited the existing layout to identify sources of confusion and visual noise.",
        "Restructured the hierarchy so primary information leads and supporting detail follows.",
        "Introduced clearer grouping, labeling, and states to build confidence in the content.",
        "Validated directions through iterative wireframes and feedback from cross-functional teams.",
      ]),
    },
    audit: {
      title: "Internal Audit Dashboard",
      category: "Enterprise UX \u00b7 Dashboard Design \u00b7 Workflow Clarity",
      overview:
        "<p>A complex internal dashboard was explored to help users track responsibilities, statuses, and next actions across a structured workflow. The goal was to make a dense, multi-step process feel organized and scannable.</p>",
      media: mediaFrame(
        "fact_check",
        "Generalized concept visual \u2014 workflow specifics and business data are omitted for confidentiality.",
      ),
      process: processList("Process Highlights", [
        "Mapped the workflow stages and the decisions users make at each step.",
        "Prioritized the most time-sensitive information for faster orientation.",
        "Designed clearer status and action patterns to reduce back-and-forth.",
        "Iterated on layout density to balance completeness with readability.",
      ]),
    },
    "ai-assistant": {
      title: "AI Assistant Interaction",
      category: "AI UX \u00b7 Wireframing \u00b7 Motion Feedback",
      overview:
        "<p>Interaction patterns and interface states were explored for an internal AI assistant concept. The focus was on clarity, responsiveness, and building user trust through transparent, well-paced feedback.</p>",
      media: mediaFrame(
        "smart_toy",
        "Generalized concept visual \u2014 illustrative states only, no real content or data.",
      ),
      process: processList("Process Highlights", [
        "Defined the core interaction states, from idle to processing to responding.",
        "Designed animated feedback to communicate activity without distraction.",
        "Explored how to present output clearly and set the right expectations.",
        "Prototyped conversational flows to test responsiveness and readability.",
      ]),
    },
    "spatial-computing": {
      title: "Spatial Computing for Field Workflows",
      category: "AR/XR Research \u00b7 Emerging Tech \u00b7 Workflow Design",
      overview:
        "<p>This project explored how spatial computing and smart glasses could support field-based consultants in an enterprise agriculture context. The research focused on whether XR/AR devices could help consultants access contextual information, document field observations, and communicate recommendations more naturally during on-site visits.</p>" +
        "<p>Because the work was connected to internal business workflows, this case study uses anonymized descriptions and generalized scenarios instead of company-specific tools, data, or product names.</p>",
      media: mediaGrid([
        [
          "devices",
          "Device Research",
          "Hands-on evaluation of XR/AR devices to understand interaction patterns, comfort, mobility, and field-readiness.",
        ],
        [
          "view_in_ar",
          "Field Workflow Storyboard",
          "Storyboarded how field consultants could use smart glasses during on-site visits without interrupting client conversations.",
        ],
        [
          "visibility",
          "Smart Glasses Interaction Flow",
          "Mapped how voice commands, capture, contextual information, and tablet pairing could support field-based workflows.",
        ],
        [
          "mic",
          "Voice + AI Summary Concept",
          "Explored how AI-assisted summaries could turn field observations into clearer recommendations and follow-up actions.",
        ],
      ]),
      process:
        contentBlock(
          "Problem",
          paras([
            "Field consultants often work between digital tools, field observations, and face-to-face conversations with clients. Tablets and phones can support documentation and analysis, but they may also interrupt the natural flow of field visits by requiring users to look down, switch devices, or pause the conversation.",
          ]),
        ) +
        contentBlock(
          "Key Design Question",
          paras([
            "How might spatial computing help field consultants access real-time information and capture observations without disrupting fieldwork or client interaction?",
          ]),
        ) +
        contentBlock(
          "My Role",
          paras([
            "I contributed to the research and concept design phase by evaluating emerging XR/AR devices, identifying practical limitations, comparing interaction models, and creating storyboards that illustrated possible future workflows.",
          ]) +
            list([
              "Hands-on evaluation of immersive headsets and lightweight smart glasses.",
              "Research into AR/XR interaction patterns and device limitations.",
              "Analysis of practical constraints for outdoor field use.",
              "Storyboarding future workflows for field consultants.",
              "Exploring how voice input, visual overlays, and AI-assisted summaries could support decision-making.",
            ]),
        ) +
        contentBlock(
          "Research Direction",
          paras([
            "The exploration compared different device directions, from immersive headsets to lightweight smart glasses. Immersive headsets were useful for understanding spatial UI patterns, gesture input, pass-through quality, and immersive interface design. However, weight, mobility constraints, and field-readiness limitations made them less suitable for outdoor consulting scenarios.",
            "Lightweight smart glasses were explored as a more practical near-term direction because they could support voice commands, photo capture, hands-free documentation, and quick information retrieval without fully removing the consultant from the field environment.",
            "At the time of the exploration, more advanced display-based smart glasses and AR prototypes were not widely available as consumer products, but they helped frame a future-facing design direction for how spatial computing could evolve in fieldwork.",
          ]),
        ) +
        contentBlock(
          "Storyboarding",
          paras([
            "I created storyboard scenarios to communicate how smart glasses could fit into a field consultant\u2019s workflow. The scenarios followed a consultant arriving on site, reviewing contextual field information, capturing observations hands-free, receiving AI-assisted summaries, and sharing a recommendation plan with a client for review.",
            "The storyboards explored two levels of spatial computing:",
          ]) +
            list([
              "<strong>Lightweight smart glasses workflow</strong> \u2014 a more realistic near-term concept using voice commands, photo capture, tablet pairing, and AI-generated summaries to support field documentation and recommendation workflows.",
              "<strong>Advanced AR glasses workflow</strong> \u2014 a future-facing concept where contextual overlays, visual field data, condition indicators, and mid-air interactions could support decision-making directly within the consultant\u2019s field of view.",
            ]),
        ) +
        contentBlock(
          "Key UX Considerations",
          paras([
            "This project helped me think beyond screen-based interfaces and consider how interaction design changes when users are moving through a physical environment.",
          ]) +
            list([
              "Keeping the consultant\u2019s attention on the field and client conversation.",
              "Reducing device-switching between phone, tablet, and desktop tools.",
              "Using voice commands in a way that feels natural and non-disruptive.",
              "Designing for outdoor visibility, mobility, battery life, and comfort.",
              "Making AI-generated information understandable and trustworthy.",
              "Considering accessibility for users who may not be able to rely on gesture-based controls.",
            ]),
        ) +
        contentBlock(
          "Takeaways",
          paras([
            "This project showed me that spatial computing design is not only about adding digital overlays to the real world. It requires understanding physical context, user attention, hardware limitations, environmental constraints, and the social dynamics of in-person work.",
            "Through this exploration, I learned how speculative design, hands-on device testing, and storyboarding can help teams evaluate emerging technology before committing to implementation. It also helped me practice communicating future-facing UX concepts in a practical, workflow-centered way.",
          ]),
        ),
    },
  };

  var current = null;
  var revealed = false;

  function setHeaderVar() {
    var h = header ? header.offsetHeight : 72;
    section.style.setProperty("--header-h", h + "px");
  }
  setHeaderVar();
  window.addEventListener("resize", setHeaderVar);

  function fillContent(id) {
    var p = data[id];
    if (!p) return;
    fields.title.textContent = p.title;
    fields.category.textContent = p.category;
    fields.overview.innerHTML = p.overview;
    fields.media.innerHTML = p.media;
    fields.process.innerHTML = p.process;
  }

  function updateActiveStates(id) {
    tabs.forEach(function (t) {
      var active = t.getAttribute("data-project") === id;
      t.setAttribute("aria-selected", active ? "true" : "false");
      t.tabIndex = active ? 0 : -1;
      t.classList.toggle("is-active", active);
    });
    items.forEach(function (item) {
      var link = item.querySelector(".enterprise-card-link");
      var active = !!link && link.getAttribute("data-project") === id;
      item.classList.toggle("is-active", active);
      if (link) link.setAttribute("aria-current", active ? "true" : "false");
    });
    var activeTab = tabs.filter(function (t) {
      return t.getAttribute("data-project") === id;
    })[0];
    if (activeTab) body.setAttribute("aria-labelledby", activeTab.id);
  }

  function scrollToShowcase() {
    var offset = header ? header.offsetHeight : 0;
    var top =
      section.getBoundingClientRect().top + window.pageYOffset - offset - 8;
    window.scrollTo({
      top: Math.max(top, 0),
      behavior: reduceMotion.matches ? "auto" : "smooth",
    });
  }

  function scrollToAdditionalExperience() {
    if (!additionalExperience) return;
    var offset = header ? header.offsetHeight : 0;
    var top =
      additionalExperience.getBoundingClientRect().top +
      window.pageYOffset -
      offset -
      8;
    window.scrollTo({
      top: Math.max(top, 0),
      behavior: reduceMotion.matches ? "auto" : "smooth",
    });
  }

  function crossfade(id) {
    if (reduceMotion.matches) {
      fillContent(id);
      return;
    }
    body.classList.add("is-fading");
    var called = false;
    var finish = function () {
      if (called) return;
      called = true;
      body.removeEventListener("transitionend", onEnd);
      fillContent(id);
      requestAnimationFrame(function () {
        body.classList.remove("is-fading");
      });
    };
    var onEnd = function (e) {
      if (e.target === body && e.propertyName === "opacity") finish();
    };
    body.addEventListener("transitionend", onEnd);
    window.setTimeout(finish, 260);
  }

  function reveal() {
    if (revealed) return;
    section.hidden = false;
    if (additionalExperience) additionalExperience.hidden = true;
    if (!reduceMotion.matches) {
      section.classList.add("is-revealing");
      section.addEventListener("animationend", function handler(e) {
        if (e.target === section) {
          section.classList.remove("is-revealing");
          section.removeEventListener("animationend", handler);
        }
      });
    }
    revealed = true;
  }

  function resetToDefault(opts) {
    opts = opts || {};
    section.hidden = false;
    section.classList.add("is-additional-mode");
    if (additionalExperience) additionalExperience.hidden = false;
    tabs.forEach(function (t) {
      var isAdditional =
        t.getAttribute("data-project") === "additional-experience";
      t.setAttribute("aria-selected", isAdditional ? "true" : "false");
      t.tabIndex = isAdditional ? 0 : -1;
      t.classList.toggle("is-active", isAdditional);
    });
    items.forEach(function (item) {
      item.classList.remove("is-active");
      var link = item.querySelector(".enterprise-card-link");
      if (link) link.removeAttribute("aria-current");
    });
    current = null;
    revealed = false;

    if (opts.scroll !== false) scrollToAdditionalExperience();
  }

  function activate(id, opts) {
    opts = opts || {};
    if (!data[id]) return;
    var first = !revealed;

    section.classList.remove("is-additional-mode");
    reveal();
    setHeaderVar();
    updateActiveStates(id);

    if (current === id && !first) {
      if (opts.scroll !== false) scrollToShowcase();
      return;
    }

    if (first) {
      fillContent(id);
    } else {
      crossfade(id);
    }
    current = id;

    if (opts.focusTab) {
      var t = tabs.filter(function (x) {
        return x.getAttribute("data-project") === id;
      })[0];
      if (t && t.focus) t.focus({ preventScroll: true });
    }
    if (opts.scroll !== false) scrollToShowcase();
  }

  // 2x2 card clicks -> reveal + activate
  cards.forEach(function (card) {
    card.addEventListener("click", function (e) {
      e.preventDefault();
      activate(card.getAttribute("data-project"), {
        scroll: true,
        focusTab: true,
      });
    });
  });

  // Sticky tab clicks (also fired by Enter/Space on the buttons)
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var project = tab.getAttribute("data-project");
      if (project === "additional-experience") {
        resetToDefault({ scroll: true });
        return;
      }
      activate(project, { scroll: true });
    });
  });

  // Roving tablist keyboard navigation (arrows / Home / End)
  if (tablist) {
    tablist.addEventListener("keydown", function (e) {
      var idx = tabs.indexOf(document.activeElement);
      if (idx === -1) return;
      var next = null;
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          next = (idx + 1) % tabs.length;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          next = (idx - 1 + tabs.length) % tabs.length;
          break;
        case "Home":
          next = 0;
          break;
        case "End":
          next = tabs.length - 1;
          break;
        default:
          return;
      }
      e.preventDefault();
      var t = tabs[next];
      t.focus();
      // Automatic activation without yanking scroll while browsing tabs.
      var project = t.getAttribute("data-project");
      if (project === "additional-experience") {
        resetToDefault({ scroll: false });
        return;
      }
      activate(project, { scroll: false });
    });
  }
})();
