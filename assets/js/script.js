(function () {
    const body = document.body;
    const openMenuBtn = document.querySelector(".open-menu");
    const closeMenuBtn = document.querySelector(".close-menu");
    const overlay = document.querySelector(".overlay");
    const dropdowns = document.querySelectorAll(".nav-link.dropdown");
  
    /* ---------- Dropdowns (click-only, never hover) ---------- */
    function closeDropdown(dropdown) {
      dropdown.classList.remove("link-open");
      const btn = dropdown.querySelector(".dropdown-btn");
      if (btn) btn.setAttribute("aria-expanded", "false");
    }
  
    function openDropdown(dropdown) {
      dropdown.classList.add("link-open");
      const btn = dropdown.querySelector(".dropdown-btn");
      if (btn) btn.setAttribute("aria-expanded", "true");
    }
  
    function closeAllDropdowns(except) {
      dropdowns.forEach((d) => {
        if (d !== except) closeDropdown(d);
      });
    }
  
    dropdowns.forEach((dropdown) => {
      const btn = dropdown.querySelector(".dropdown-btn");
      if (!btn) return;
  
      // Listen on the whole .nav-link so a click on the li or its button toggles it
      dropdown.addEventListener("click", (e) => {
        // Clicks inside the open list (on links) shouldn't toggle the dropdown
        if (e.target.closest(".dropdown-list")) return;
        e.stopPropagation();
        const isOpen = dropdown.classList.contains("link-open");
        closeAllDropdowns(dropdown);
        isOpen ? closeDropdown(dropdown) : openDropdown(dropdown);
      });
  
      // Keyboard: Escape closes and returns focus to the trigger
      dropdown.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && dropdown.classList.contains("link-open")) {
          closeDropdown(dropdown);
          btn.focus();
        }
      });
  
      // Close when focus leaves the dropdown entirely (tabbing away)
      dropdown.addEventListener("focusout", (e) => {
        if (!dropdown.contains(e.relatedTarget)) closeDropdown(dropdown);
      });
    });
  
    // Click outside closes any open dropdown
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".nav-link.dropdown")) closeAllDropdowns();
    });
  
    /* ---------- Mobile menu ---------- */
    function openMenu() {
      body.classList.add("menu-open");
      openMenuBtn.setAttribute("aria-expanded", "true");
      closeMenuBtn.focus();
    }
  
    function closeMenu() {
      body.classList.remove("menu-open");
      openMenuBtn.setAttribute("aria-expanded", "false");
      closeAllDropdowns();
      openMenuBtn.focus();
    }
  
    if (openMenuBtn) openMenuBtn.addEventListener("click", openMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener("click", closeMenu);
    if (overlay) overlay.addEventListener("click", closeMenu);
  
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && body.classList.contains("menu-open")) closeMenu();
    });
  
    // Reset state if the viewport grows past the mobile breakpoint
    const mq = window.matchMedia("(min-width: 768px)");
    mq.addEventListener("change", (e) => {
      if (e.matches && body.classList.contains("menu-open")) {
        body.classList.remove("menu-open");
        openMenuBtn.setAttribute("aria-expanded", "false");
      }
    });
  })();