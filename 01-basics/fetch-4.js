let image = document.querySelector('img');


fetch('angular.png').then((response) => response.blob()).then( img => {
    let imgPath = URL.createObjectURL(img);
    image.src = imgPath;
});
