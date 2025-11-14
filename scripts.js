// Load page into #content
async function loadPage(page) {
    const content = document.getElementById("content");

    try {
        const response = await fetch(`pages/${page}.html`);
        if (!response.ok) throw new Error("Page not found");
        const html = await response.text();
        content.innerHTML = html;

    } catch (error) {
        content.innerHTML = "<h2>Page not found.</h2>";
        console.error(error);
    }
}

// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {

    // Load home page by default
    loadPage("home");

    // Handle navbar page loading
    document.querySelectorAll("a[data-page]").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const page = link.getAttribute("data-page");
            loadPage(page);
        });
    });

    // Handle dropdown submenu toggle
    document.querySelectorAll(".has-submenu > a").forEach(menu => {
        menu.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation(); // prevent click from bubbling
            const submenu = menu.nextElementSibling;

            // Close other submenus
            document.querySelectorAll(".submenu").forEach(sub => {
                if (sub !== submenu) sub.classList.remove("open");
            });

            submenu.classList.toggle("open");
        });
    });

    // Close submenu if clicking outside
    document.addEventListener("click", () => {
        document.querySelectorAll(".submenu").forEach(sub => sub.classList.remove("open"));
    });
});
