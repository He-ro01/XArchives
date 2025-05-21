const header = document.getElementById('header');
const title = document.getElementById('title');
const back = document.getElementById('back');
const animated_bgs = document.querySelectorAll('.animated-bg');
const animated_bg_texts = document.querySelectorAll('.animated-bg-text');

setTimeout(getData, 2500);

function getData() {
  header.innerHTML = `
    <img src="https://cdni.pornpics.com/460/1/308/33174103/33174103_002_36c2.jpg" />
  `;
  title.innerHTML = `
    <button id="confirmBtn">I'm 18 or older</button>
  `;
  back.innerHTML = 'Back';

  animated_bgs.forEach(bg => bg.classList.remove('animated-bg'));
  animated_bg_texts.forEach(bg => bg.classList.remove('animated-bg-text'));

  const confirmBtn = document.getElementById('confirmBtn');
  confirmBtn.addEventListener('click', () => {
    const cardContainer = document.querySelector('.card-container');
    cardContainer.style.display = 'none';
  });
}
