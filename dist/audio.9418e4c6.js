if (localStorage.getItem("color-theme") === "dark" || !("color-theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches) document.documentElement.classList.add("dark");
else document.documentElement.classList.remove("dark");

//# sourceMappingURL=audio.9418e4c6.js.map
