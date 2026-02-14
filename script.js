document.addEventListener('DOMContentLoaded', () => {
  const scene = document.querySelector('.card-scene');
  const heartClosed = document.getElementById('heartClosed');
  const cardBook = document.getElementById('cardBook');
  const cardLeft = document.getElementById('cardLeft');
  const cardRight = document.getElementById('cardRight');
  let isOpened = false;
  let animating = false;

  // Scale the scene to fit the viewport while keeping it centered
  function fitScene() {
    const scaleX = window.innerWidth / 1200;
    const scaleY = window.innerHeight / 1200;
    const scale = Math.min(scaleX, scaleY, 1);
    scene.style.transform = 'translate(-50%, -50%) scale(' + scale + ')';
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

    // Fold the halves back and rotate card-book simultaneously
    cardLeft.classList.remove('opened');
    cardRight.classList.remove('opened');
    cardBook.classList.remove('opening');

    // Fade in the closed heart partway through the fold
    setTimeout(() => {
      heartClosed.style.display = '';
      heartClosed.offsetHeight;
      heartClosed.style.opacity = '1';
      heartClosed.style.pointerEvents = '';
    }, 800);

    setTimeout(() => {
      animating = false;
    }, 1200);
  });
});
