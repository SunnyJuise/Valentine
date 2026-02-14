document.addEventListener('DOMContentLoaded', () => {
  const heartClosed = document.getElementById('heartClosed');
  const cardBook = document.getElementById('cardBook');
  const cardLeft = document.getElementById('cardLeft');
  const cardRight = document.getElementById('cardRight');
  let isOpened = false;

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
