document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = '46219134-fe51bfa747dbc02a88fcddab6';
    const imageGallery = document.getElementById('image-gallery');
    let currentPage = 1;

    // Fetch and display images
    function fetchImages(page) {
        const URL = `https://pixabay.com/api/?key=${API_KEY}&q=flowers&image_type=photo&per_page=50&page=${page}&pretty=true`;

        fetch(URL)
            .then(response => response.json())
            .then(data => {
                data.hits.forEach(image => {
                    const imgElement = document.createElement('img');
                    imgElement.src = image.webformatURL;
                    imgElement.alt = image.tags;
                    imgElement.classList.add('gallery-image');
                    imageGallery.appendChild(imgElement);

                    imgElement.addEventListener('click', () => showImageInModal(image.largeImageURL));
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Fetch the initial set of images
    fetchImages(currentPage);

    // Pagination button functionality
    const loadMoreButton = document.createElement('button');
    loadMoreButton.textContent = 'Load More';
    loadMoreButton.classList.add('load-more-button');
    document.body.appendChild(loadMoreButton);

    // Load more images on button click
    loadMoreButton.addEventListener('click', () => {
        currentPage++;
        fetchImages(currentPage);
    });

    // Modal functionality
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const closeModal = document.getElementById('close-modal');

    function showImageInModal(imageURL) {
        modal.style.display = 'block';
        modalImage.src = imageURL;
    }

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
