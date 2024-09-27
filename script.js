document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = '46219134-fe51bfa747dbc02a88fcddab6';
    const imageGallery = document.getElementById('image-gallery');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const loadMoreButton = document.getElementById('load-more-button');
    let currentPage = 1;
    let currentQuery = 'flowers';
    let displayedImages = []; // Store currently displayed images

    // Fetch images based on query and page number
    function fetchImages(query, page) {
        const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&per_page=50&page=${page}&pretty=true`;

        fetch(URL)
            .then(response => response.json())
            .then(data => {
                if (page === 1) {
                    imageGallery.innerHTML = ''; // Clear previous images if it's a new search
                    displayedImages = []; // Reset displayed images
                }
                data.hits.forEach(image => {
                    displayedImages.push(image); // Add images to displayed array
                    const imgElement = document.createElement('img');
                    imgElement.src = image.webformatURL;
                    imgElement.alt = image.tags;
                    imgElement.classList.add('gallery-image');
                    imgElement.addEventListener('click', () => showImageInModal(image));
                    imageGallery.appendChild(imgElement);
                });

                // Show the Load More button only if there are more images to load
                loadMoreButton.style.display = data.hits.length < 50 ? 'none' : 'block';
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Initial image fetch
    fetchImages(currentQuery, currentPage);

    // Search functionality
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            currentQuery = query; // Set the current query to the searched term
            currentPage = 1; // Reset to first page for new search
            fetchImages(currentQuery, currentPage);
        }
    });

    // Load More button functionality
    loadMoreButton.addEventListener('click', () => {
        currentPage++; // Increment the page number
        fetchImages(currentQuery, currentPage); // Fetch the next set of images
    });

    // Modal functionality
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const closeModal = document.getElementById('close-modal');
    const downloadImageBtn = document.getElementById('download-image');
    const bookmarkImageBtn = document.getElementById('bookmark-image');
    const shareImageBtn = document.getElementById('share-image');
    let currentImage = {};

    function showImageInModal(image) {
        currentImage = image;
        modalImage.src = image.largeImageURL;
        downloadImageBtn.href = image.largeImageURL; // Set href to large image URL for download
        modal.style.display = 'block';
    }

    // Bookmark Functionality
    bookmarkImageBtn.addEventListener('click', () => {
        const bookmarked = JSON.parse(localStorage.getItem('bookmarkedImages')) || [];
        if (!bookmarked.some(img => img.id === currentImage.id)) {
            bookmarked.push(currentImage);
            localStorage.setItem('bookmarkedImages', JSON.stringify(bookmarked));
            alert('Image bookmarked!');
        } else {
            alert('Image already bookmarked.');
        }
    });

    // Share Functionality
    shareImageBtn.addEventListener('click', () => {
        const shareData = {
            title: 'Pixabay Image',
            text: 'Check out this image!',
            url: currentImage.largeImageURL
        };
        navigator.share ? navigator.share(shareData) : alert('Sharing not supported.');
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
