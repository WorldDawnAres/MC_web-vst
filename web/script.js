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

let currentIndex = 0;
const wallpapers = document.querySelectorAll('#wallpaperImages img');
const totalWallpapers = wallpapers.length;

setInterval(() => {
    changeWallpaper(1);
}, 4000); 

function changeWallpaper(direction) {
    currentIndex += direction;

    if (currentIndex >= totalWallpapers) {
        currentIndex = 0;
        document.getElementById('wallpaperImages').style.transition = 'none';
        setTimeout(() => {
            document.getElementById('wallpaperImages').style.transition = 'transform 1s ease';
            changeWallpaper(1); 
        }, 50);
    } else if (currentIndex < 0) {
        currentIndex = totalWallpapers - 1;
    }

    const offset = -currentIndex * 100;
    document.getElementById('wallpaperImages').style.transform = `translateX(${offset}%)`;
}
