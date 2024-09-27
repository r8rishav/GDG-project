document.addEventListener('DOMContentLoaded', () => {
    const bookmarkedGallery = document.getElementById('bookmarked-gallery');
    const backButton = document.getElementById('back-to-gallery-button');

    // Function to display bookmarked images
    function displayBookmarks() {
        const bookmarkedImages = JSON.parse(localStorage.getItem('bookmarkedImages')) || [];

        if (bookmarkedImages.length === 0) {
            bookmarkedGallery.innerHTML = '<p>No bookmarks found.</p>';
            return;
        }

        bookmarkedGallery.innerHTML = ''; // Clear previous images

        bookmarkedImages.forEach(image => {
            const imageContainer = document.createElement('div');
            imageContainer.classList.add('bookmarked-image');

            const imgElement = document.createElement('img');
            imgElement.src = image.webformatURL;
            imgElement.alt = image.tags;
            imgElement.classList.add('gallery-image');

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove Bookmark';
            removeButton.classList.add('remove-button');
            removeButton.addEventListener('click', () => {
                removeBookmark(image.id);
            });

            // Append image and button to the container
            imageContainer.appendChild(imgElement);
            imageContainer.appendChild(removeButton);
            bookmarkedGallery.appendChild(imageContainer);
        });
    }

    // Function to remove a bookmark
    function removeBookmark(imageId) {
        let bookmarkedImages = JSON.parse(localStorage.getItem('bookmarkedImages')) || [];
        bookmarkedImages = bookmarkedImages.filter(image => image.id !== imageId);
        localStorage.setItem('bookmarkedImages', JSON.stringify(bookmarkedImages));
        displayBookmarks(); // Refresh the display
    }

    // Back to gallery button functionality
    backButton.addEventListener('click', () => {
        window.location.href = 'index.html'; // Ensure this is the correct path to your main gallery page
    });

    // Initial display of bookmarks
    displayBookmarks();
});
