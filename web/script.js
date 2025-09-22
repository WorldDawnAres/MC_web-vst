function search() {
    let query = document.getElementById("searchQuery").value;
    let engine = document.getElementById("searchEngine").value;
    
    if (query) {
        window.location.href = engine + encodeURIComponent(query);
    } else {
        alert("请输入搜索内容");
    }
}

function checkEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        search();
    }
}

function updateIcon() {
    let selectedOption = document.getElementById("searchEngine").selectedOptions[0];
    let iconSrc = selectedOption.getAttribute("data-icon");
    document.getElementById("searchIcon").src = iconSrc;
}

function loadComponent(id, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(error => console.error(`加载 ${url} 失败`, error));
}

function typeTextEffectElement(titleElement, paragraphsSelector, titleText, speed = 150, paragraphSpeed = 50, resetDelay = 5000) {
    const paragraphs = titleElement.parentElement.querySelectorAll(paragraphsSelector);
    let index = 0;
    let paragraphIndex = 0;
    let paragraphText = [];

    paragraphs.forEach((p) => {
        paragraphText.push(p.textContent);
        p.textContent = "";
    });

    function typeTitle() {
        if (index < titleText.length) {
            titleElement.textContent += titleText[index];
            index++;
            setTimeout(typeTitle, speed);
        } else {
            setTimeout(() => typeParagraph(paragraphIndex, 0), 500);
        }
    }

    function typeParagraph(pIndex, charIndex) {
        if (pIndex >= paragraphs.length) {
            setTimeout(resetTyping, resetDelay);
            return;
        }

        const currentParagraph = paragraphs[pIndex];
        const currentText = paragraphText[pIndex];

        if (charIndex === 0) {
            currentParagraph.style.visibility = "visible";
        }

        if (charIndex < currentText.length) {
            currentParagraph.textContent += currentText[charIndex];
            setTimeout(() => typeParagraph(pIndex, charIndex + 1), paragraphSpeed);
        } else {
            setTimeout(() => typeParagraph(pIndex + 1, 0), 500);
        }
    }

    function resetTyping() {
        titleElement.textContent = "";
        index = 0;
        paragraphIndex = 0;
        paragraphs.forEach((p) => p.textContent = "");
        setTimeout(typeTitle, 500);
    }

    typeTitle();
}

document.addEventListener("DOMContentLoaded", function() {
    loadComponent("header", "./web/header.html");
    loadComponent("footer", "./web/footer.html");

    const titles = document.querySelectorAll('.title');
    titles.forEach((titleElement) => {
        const titleText = titleElement.getAttribute('data-text');
        if (titleText) {
            typeTextEffectElement(titleElement, '.fade-text', titleText, 150, 50, 5000);
        }
    });

    const overlay = document.getElementById("overlay");
    if (overlay) {
        overlay.addEventListener("click", closeSidebar);
    }
});

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    if (sidebar && overlay) {
        sidebar.classList.toggle("show");
        overlay.classList.toggle("show");
    }
}

function closeSidebar(event) {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    if (sidebar && overlay && event.target === overlay) {
        sidebar.classList.remove("show");
        overlay.classList.remove("show");
    }
}

function toggleSubMenu(event, submenuId) {
    event.preventDefault();
    event.stopPropagation();
    const submenu = document.getElementById(submenuId);
    if (submenu) {
        submenu.classList.toggle("show");
    }
}
