document.addEventListener('DOMContentLoaded', () => {
  const scene = document.querySelector('.card-scene');
  const heartClosed = document.getElementById('heartClosed');
  const cardBook = document.getElementById('cardBook');
  const cardLeft = document.getElementById('cardLeft');
  const cardRight = document.getElementById('cardRight');
  let isOpened = false;
  let animating = false;

  // Scale the scene to fit the viewport
  function fitScene() {
    const scaleX = window.innerWidth / 1200;
    const scaleY = window.innerHeight / 1200;
    const scale = Math.min(scaleX, scaleY, 1);
    scene.style.transform = 'scale(' + scale + ')';
  }

  fitScene();
  window.addEventListener('resize', fitScene);

  // Open the card
  heartClosed.addEventListener('click', () => {
    if (isOpened || animating) return;
    animating = true;
    isOpened = true;

    heartClosed.style.opacity = '0';
    heartClosed.style.pointerEvents = 'none';

    cardBook.classList.add('opening');

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        cardLeft.classList.add('opened');
        cardRight.classList.add('opened');
      });
    });

    setTimeout(() => {
      heartClosed.style.display = 'none';
      animating = false;
    }, 1200);
  });

  // Close the card
  cardBook.addEventListener('click', () => {
    if (!isOpened || animating) return;
    animating = true;
    isOpened = false;

    // Fold the halves back
    cardLeft.classList.remove('opened');
    cardRight.classList.remove('opened');

    // After halves fold, rotate back and show closed heart
    setTimeout(() => {
      cardBook.classList.remove('opening');

      heartClosed.style.display = '';
      // Force reflow so display:'' takes effect before opacity transition
      heartClosed.offsetHeight;
      heartClosed.style.opacity = '1';
      heartClosed.style.pointerEvents = '';

      animating = false;
    }, 1200);
  });
});
