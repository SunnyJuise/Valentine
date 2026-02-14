document.addEventListener('DOMContentLoaded', () => {
  const scene = document.querySelector('.card-scene');
  const heartClosed = document.getElementById('heartClosed');
  const cardBook = document.getElementById('cardBook');
  const cardLeft = document.getElementById('cardLeft');
  const cardRight = document.getElementById('cardRight');
  let isOpened = false;

  // Scale the scene to fit the viewport
  function fitScene() {
    const scaleX = window.innerWidth / 1200;
    const scaleY = window.innerHeight / 1200;
    const scale = Math.min(scaleX, scaleY, 1); // never upscale beyond 1
    scene.style.transform = 'scale(' + scale + ')';
  }

  fitScene();
  window.addEventListener('resize', fitScene);

  heartClosed.addEventListener('click', () => {
    if (isOpened) return;
    isOpened = true;

    // Fade out the closed heart smoothly (0.4s via CSS transition)
    heartClosed.style.opacity = '0';
    heartClosed.style.pointerEvents = 'none';

    // Simultaneously start the unfold
    cardBook.classList.add('opening');

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        cardLeft.classList.add('opened');
        cardRight.classList.add('opened');
      });
    });

    // Clean up after fade completes
    setTimeout(() => {
      heartClosed.style.display = 'none';
    }, 400);
  });
});
