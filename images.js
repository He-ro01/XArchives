const scrollDiv = document.querySelector('.scroll');

let currentPage = 1;
const imagesPerPage = 30;
let loading = false;
let allLoaded = false; // flag to stop when no more images

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

    // Load images one by one with a delay
    for (let i = 0; i < images.length; i++) {
      const url = images[i];
      const img = document.createElement('img');
      img.src = url;
      img.loading = 'lazy';
      scrollDiv.appendChild(img);

      // Delay (e.g., 100ms between each image)
      await new Promise(resolve => setTimeout(resolve, 100));
    }

  } catch (err) {
    console.error(err);
  } finally {
    loading = false;
  }
}


// Detect when near right end of horizontal scroll
scrollDiv.addEventListener('scroll', () => {
  if (allLoaded || loading) return;

  // How close to the right edge to trigger loading more images (pixels)
  const threshold = 100;

  const { scrollLeft, scrollWidth, clientWidth } = scrollDiv;
  if (scrollLeft + clientWidth >= scrollWidth - threshold) {
    currentPage++;
    loadImages(currentPage);
  }
});

// Initial load
loadImages(currentPage);
