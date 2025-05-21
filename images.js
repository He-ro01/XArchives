const scrollDiv = document.querySelector('.scroll');
let currentPage = 1;
const imagesPerPage = 30;
let loading = false;
let allLoaded = false;
let totalImagesLoaded = 0;
let adInserted = false;

async function loadImages(page) {
  if (loading || allLoaded) return;
  loading = true;

  try {
    const response = await fetch(`https://xarchivesbackend.onrender.com/images?page=${page}&limit=${imagesPerPage}`);
    if (!response.ok) throw new Error('Failed to fetch images');

    const images = await response.json();

    if (images.length === 0) {
      allLoaded = true;
      console.log('No more images to load.');
      return;
    }

    for (let i = 0; i < images.length; i++) {
      const url = images[i];
      const img = document.createElement('img');
      img.src = url;
      img.loading = 'lazy';
      scrollDiv.appendChild(img);

      totalImagesLoaded++;

      // Show ad after 5 images
      if (totalImagesLoaded === 5 && !adInserted) {
        insertSkyscraperAd();
        adInserted = true;
      }

      await new Promise(resolve => setTimeout(resolve, 100));
    }

  } catch (err) {
    console.error(err);
  } finally {
    loading = false;
  }
}

function insertSkyscraperAd() {
  const adWrapper = document.createElement('div');
  adWrapper.className = 'cbrnwc376579';

  const adScriptInit = document.createElement('script');
  adScriptInit.innerHTML = `
    window.k_init = window.k_init || [];
    k_init.push({
      "id": "cbrnwc376579",
      "type": "cu",
      "domain": "hdbkell.com",
      "next": "1",
      "rerun": true,
      "newtab": "1",
      "exclude": "",
      "include": "",
      "delay": "1",
      "batchSize": "1",
      "batchInterval": "3",
      "filterDevice": "both",
      "blockedReferrers": ""
    });
  `;

  const adScript = document.createElement('script');
  adScript.setAttribute('async', true);
  adScript.setAttribute('charset', 'utf-8');
  adScript.setAttribute('data-cfasync', 'false');
  adScript.src = 'https://hdbkell.com/70xpl.js';

  scrollDiv.appendChild(adWrapper);
  scrollDiv.appendChild(adScriptInit);
  scrollDiv.appendChild(adScript);
}

scrollDiv.addEventListener('scroll', () => {
  if (allLoaded || loading) return;

  const threshold = 100;
  const { scrollLeft, scrollWidth, clientWidth } = scrollDiv;
  if (scrollLeft + clientWidth >= scrollWidth - threshold) {
    currentPage++;
    loadImages(currentPage);
  }
});

loadImages(currentPage);
