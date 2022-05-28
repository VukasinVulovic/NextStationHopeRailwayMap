const map = document.querySelector('.map');
const pin = document.querySelector('.map .pin');
const infoImage = document.querySelector('.info .image');

const feather = 8;
const places = {
    // 'Belgrade': {
    //     x: 47.8,
    //     y: 50
    // },
    // 'Budapest': {
    //     x: 39.35,
    //     y: 38.4
    // },
    'Bratislava': {
        x: 27.4,
        y: 33.8,
        image: './src/images/places/bratislava.png'
    },
    // 'Warsaw': {
    //     x: 48.48,
    //     y: 13.2
    // },
    'NoviSad': {
        x: 44,
        y: 47.6,
        image: './src/images/places/novi_sad.png'
    },
    'Katowice': {
        x: 38.28,
        y: 24.2,
        image: './src/images/places/katowice.png'
    },
}

let prevPlace = null;

Number.map = (v, x1, y1, x2, y2) => (v - x1) * (y2 - x2) / (y1 - x1) + x2;

window.onload = () => {
    movePin(places.NoviSad);

    for(let p in places) {
        const placePin = document.createElement('img');
        placePin.className = 'station-pin';
        placePin.alt = 'pin';
        placePin.src = pin.src;
        map.appendChild(placePin);

        const mapStyle = getComputedStyle(map);
        const pinStyle = getComputedStyle(placePin);

        const place = places[p];

        placePin.style.left = Math.floor((parseInt(mapStyle.width) * (place.x / 100)) - (parseInt(pinStyle.width) / 2)) + 'px';
        placePin.style.top = Math.floor((parseInt(mapStyle.height) * (place.y / 100)) - (parseInt(pinStyle.height))) + 'px';

        placePin.onclick = () => movePin(place);
    }
}

map.onmousemove = e => {
    const mapStyle = getComputedStyle(map);
    let xp = Number.map(e.layerX, 0, parseInt(mapStyle.width), 0, 100);
    let yp = Number.map(e.layerY, 0, parseInt(mapStyle.height), 0, 100);

    let min = -1;
    let closestPlace = null;

    for(const place in places) {
        const d = Math.abs(xp - places[place].x) + Math.abs(yp - places[place].y);

        if(d <= feather && (min == -1 || min > d)) {
            min = d;
            closestPlace = places[place];
        }
    }

    if(closestPlace)
        movePin(closestPlace);
}

window.onresize = () => prevPlace && movePin(prevPlace);

function movePin(place) {
    const mapStyle = getComputedStyle(map);
    const pinStyle = getComputedStyle(pin);

    pin.style.left = Math.floor((parseInt(mapStyle.width) * (place.x / 100)) - (parseInt(pinStyle.width) / 2)) + 'px';
    pin.style.top = Math.floor((parseInt(mapStyle.height) * (place.y / 100)) - parseInt(pinStyle.height)) + 'px';
    prevPlace = place;

    infoImage.src = place.image;
}