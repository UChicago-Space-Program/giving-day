const cards = document.querySelectorAll('.donate-card');
const chips = document.querySelectorAll('.amount-chip');

cards.forEach(card => {
  card.addEventListener('click', () => {
    cards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
  });
});

chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('selected'));
    chip.classList.add('selected');
  });
});
