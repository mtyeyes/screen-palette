if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
    .then(registration => {
      console.log('Service Worker is registered', registration);
    })
    .catch(err => {
      console.error('Registration failed:', err);
    });
  });
};

var touchStartX;
var touchStartY;
var touchEndX;
var touchEndY;
var btnHold;

function getColor () {
  var hslColor = window.getComputedStyle(document.documentElement).getPropertyValue('--screen-light');
  var hslArr = hslColor.split(',');
  hslArr[0] = hslArr[0].replace('hsl(', '');
  hslArr[1] = hslArr[1].replace('%', '');
  hslArr[2] = hslArr[2].replace('%)', '');
  return hslArr;
}


function setHue (changeHue) {
  hslArr = getColor ();
  if ((+hslArr[0] + +changeHue) > 360) {
    desiredColor = 'hsl(' + (+hslArr[0] + +changeHue - 360) + ',' + hslArr[1] + '%,' + hslArr[2] + '%)';
  } else if ((+hslArr[0] + +changeHue) < 0) {
    desiredColor = 'hsl(' + (+hslArr[0] + +changeHue + 360) + ',' + hslArr[1] + '%,' + hslArr[2] + '%)';
  } else {
  desiredColor = 'hsl(' + (+hslArr[0] + +changeHue) + ',' + hslArr[1] + '%,' + hslArr[2] + '%)';
  }
  document.documentElement.style.setProperty('--screen-light', desiredColor);
}

function setSaturation (changeSaturation) {
  hslArr = getColor ();
  if (((+hslArr[1] + +changeSaturation) > 100) || ((+hslArr[1] + +changeSaturation) < 0)) { return };
  desiredColor = 'hsl(' + hslArr[0] + ',' + (+hslArr[1] + +changeSaturation) + '%,' + hslArr[2] + '%)';
  document.documentElement.style.setProperty('--screen-light', desiredColor);
}

function setLightness (changeLightness) {
  hslArr = getColor ();
  if (((+hslArr[2] + +changeLightness) > 100) || ((+hslArr[2] + +changeLightness) < 0)) { return };
  desiredColor = 'hsl(' + hslArr[0] + ',' + hslArr[1] + '%,' + (+hslArr[2] + +changeLightness) +'%)';
  document.documentElement.style.setProperty('--screen-light', desiredColor);
  if ((+hslArr[2] + +changeLightness) <= 30) {
    document.documentElement.style.setProperty('--secondary-color', 'hsl(0, 0%, 73%)');
  } else {
    document.documentElement.style.setProperty('--secondary-color', 'hsl(44, 10%, 13%)');
  };
}

function swipe () {
  var XOffset = touchEndX - touchStartX;
  var YOffset = touchEndY - touchStartY;
  if ((Math.abs(XOffset) < 100) && (Math.abs(YOffset) < 100)) { return };
  if ((Math.abs(XOffset)) > (Math.abs(YOffset))) {
      if (XOffset > 0) {
          setHue (30);
      } else {
          setHue (-30);
      }
  } else {
      if (YOffset > 0) {
          setLightness (10);
      } else {
          setLightness (-10);
      }
  }
}

function hideBtn () {
  document.querySelector('.help__btn').classList.toggle('help__btn--invisible');
};

document.addEventListener('keydown', function(event) {
  switch (event.code) {
    case 'ArrowRight':
      setHue(30);
      break;
    case 'ArrowLeft':
      setHue (-30);
      break;
    case 'KeyZ':
      setSaturation (10);
      break;
    case 'KeyX':
      setSaturation (-10);
      break;
    case 'ArrowUp':
      setLightness (10);
      break;
    case 'ArrowDown':
      setLightness (-10);
      break;
  }
});

document.addEventListener ('touchstart', function (event) {
  touchStartX = event.changedTouches[0].screenX;
  touchStartY = event.changedTouches[0].screenY;
});

document.addEventListener ('touchend', function (event) {
  touchEndX = event.changedTouches[0].screenX;
  touchEndY = event.changedTouches[0].screenY;
  swipe ();
});

document.querySelector('.help__btn').addEventListener('click', function (event) {
  event.stopPropagation();
  event.preventDefault;
  document.querySelector('.help__container').classList.toggle('help__container--closed');
});

document.querySelector('.help__btn').addEventListener('mousedown', function (event) {
  btnHold = setTimeout (hideBtn, 2000);
});

document.querySelector('.help__btn').addEventListener('mouseup', function (event) {
  clearTimeout(btnHold);
});

document.querySelector('.help__btn').addEventListener('touchstart', function (event) {
  btnHold = setTimeout (hideBtn, 2000);
});

document.querySelector('.help__btn').addEventListener('touchend', function (event) {
  clearTimeout(btnHold);
});