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

document.addEventListener("DOMContentLoaded", function() {
    loadComponent("header", "./web/header.html");
    loadComponent("footer", "./web/footer.html");
});

function loadComponent(id, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(error => console.error(`加载 ${url} 失败`, error));
}


function typeTextEffect(titleSelector, paragraphsSelector, titleText, speed = 150, paragraphSpeed = 50, resetDelay = 5000) {
    const titleElement = document.querySelector(titleSelector);
    const paragraphs = document.querySelectorAll(paragraphsSelector);
    let index = 0;
    let paragraphIndex = 0;
    let paragraphText = [];

    paragraphs.forEach((p) => {
        paragraphText.push(p.innerText);
        p.innerText = "";
    });

    function typeTitle() {
        if (index < titleText.length) {
            titleElement.innerHTML += titleText[index];
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

        if (charIndex < currentText.length) {
            currentParagraph.innerHTML += currentText[charIndex];
            setTimeout(() => typeParagraph(pIndex, charIndex + 1), paragraphSpeed);
        } else {
            setTimeout(() => typeParagraph(pIndex + 1, 0), 500);
        }
    }

    function resetTyping() {
        titleElement.innerHTML = "";
        index = 0;
        paragraphIndex = 0;

        paragraphs.forEach((p) => {
            p.innerText = "";
        });

        setTimeout(typeTitle, 500);
    }

    typeTitle();
}

document.addEventListener('DOMContentLoaded', () => {
    const titleText = document.getElementById('title').getAttribute('data-text');
    if (titleText) {
        typeTextEffect('#title', '.fade-text', titleText, 150, 50, 5000);
    }
});
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    sidebar.classList.toggle("show");
    overlay.classList.toggle("show");
}

function closeSidebar(event) {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    if (event.target === overlay) {
        sidebar.classList.remove("show");
        overlay.classList.remove("show");
    }
}

function toggleSubMenu(event, submenuId) {
    event.preventDefault();
    event.stopPropagation();

    const submenu = document.getElementById(submenuId);
    submenu.classList.toggle("show");
}

document.getElementById("overlay").addEventListener("click", closeSidebar);