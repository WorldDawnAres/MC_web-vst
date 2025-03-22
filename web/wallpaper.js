let currentIndex = 0;
const wallpaperContainer = document.getElementById('wallpaperImages');
const wallpapers = document.querySelectorAll('#wallpaperImages img');
const totalWallpapers = wallpapers.length;

const firstClone = wallpapers[0].cloneNode(true);
wallpaperContainer.appendChild(firstClone);

const totalSlides = totalWallpapers + 1;

let autoScrollInterval = setInterval(() => {
    changeWallpaper(1);
}, 4000);

function changeWallpaper(direction) {
    clearInterval(autoScrollInterval);

    currentIndex += direction;

    if (currentIndex >= totalWallpapers) {
        setTimeout(() => {
            wallpaperContainer.style.transition = 'none';
            currentIndex = 0;
            wallpaperContainer.style.transform = `translateX(0%)`;

            setTimeout(() => {
                wallpaperContainer.style.transition = 'transform 1s ease';
            }, 50);
        }, 1000);
    } else if (currentIndex < 0) {
        currentIndex = totalWallpapers - 1;
    }

    const offset = -currentIndex * 100;
    wallpaperContainer.style.transition = 'transform 1s ease';
    wallpaperContainer.style.transform = `translateX(${offset}%)`;

    autoScrollInterval = setInterval(() => {
        changeWallpaper(1);
    }, 4000);
}

window.onload = function() {
    setInterval(() => changeWallpaper(1), 4000);
};
