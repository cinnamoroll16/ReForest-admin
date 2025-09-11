document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const rateBtn = document.getElementById('rateBtn');
    const ratingModal = document.getElementById('ratingModal');
    const closeModal = document.querySelector('.close-modal');
    const ratingStars = document.querySelectorAll('.rating-stars i');
    const submitRatingBtn = document.querySelector('.submit-rating');
    const editProfileBtn = document.querySelector('.edit-profile-btn');
    const profileForm = document.querySelector('.profile-form');
    const settingsForm = document.querySelector('.settings-form');
    const actionCards = document.querySelectorAll('.action-card');

    // Variables
    let selectedRating = 0;

    // Event Listeners
    if (rateBtn) {
        rateBtn.addEventListener('click', openRatingModal);
    }

    if (closeModal) {
        closeModal.addEventListener('click', closeRatingModal);
    }

    if (submitRatingBtn) {
        submitRatingBtn.addEventListener('click', submitRating);
    }

    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', toggleEditMode);
    }

    if (profileForm) {
        profileForm.addEventListener('submit', handleProfileSubmit);
    }

    if (settingsForm) {
        settingsForm.addEventListener('submit', handleSettingsSubmit);
    }
    // Add this to your existing event listeners
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // Add this function to your existing functions
    function handleLogout(e) {
        e.preventDefault();
        // Here you would typically:
        // 1. Clear session/token
        // 2. Redirect to login page
        console.log('Logging out...');
        alert('You have been logged out successfully!');
        window.location.href = 'signin.html'; // Uncomment to redirect
    }
    // Add click events to all action cards
    actionCards.forEach(card => {
        card.addEventListener('click', handleActionCardClick);
    });

    // Add events to rating stars
    ratingStars.forEach(star => {
        star.addEventListener('click', setRating);
        star.addEventListener('mouseover', hoverRating);
        star.addEventListener('mouseout', resetStars);
    });

    // Functions
    function openRatingModal() {
        ratingModal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }

    function closeRatingModal() {
        ratingModal.classList.remove('show');
        document.body.style.overflow = ''; // Re-enable scrolling
        resetStars();
    }

    function setRating(e) {
        selectedRating = parseInt(e.target.getAttribute('data-value'));
        updateStars(selectedRating);
    }

    function hoverRating(e) {
        const hoverValue = parseInt(e.target.getAttribute('data-value'));
        updateStars(hoverValue);
    }

    function resetStars() {
        updateStars(selectedRating);
    }

    function updateStars(rating) {
        ratingStars.forEach(star => {
            const starValue = parseInt(star.getAttribute('data-value'));
            if (starValue <= rating) {
                star.classList.add('active');
                star.classList.remove('far');
                star.classList.add('fas');
            } else {
                star.classList.remove('active');
                star.classList.remove('fas');
                star.classList.add('far');
            }
        });
    }

    function submitRating() {
        if (selectedRating === 0) {
            alert('Please select a rating before submitting.');
            return;
        }

        // Here you would typically send the rating to a server
        console.log(`User rated: ${selectedRating} stars`);
        alert(`Thank you for your ${selectedRating}-star rating!`);
        closeRatingModal();
        selectedRating = 0; // Reset for next time
    }

    function toggleEditMode() {
        const inputs = document.querySelectorAll('.profile-form .input-field');
        const isEditing = editProfileBtn.textContent.includes('Edit');

        if (isEditing) {
            // Switch to edit mode
            editProfileBtn.innerHTML = '<i class="fas fa-save"></i> Save Profile';
            inputs.forEach(input => {
                input.removeAttribute('readonly');
                input.style.backgroundColor = '#fff';
                input.style.borderColor = '#4a6fa5';
            });
        } else {
            // Switch back to view mode
            editProfileBtn.innerHTML = '<i class="fas fa-pencil-alt"></i> Edit Profile';
            inputs.forEach(input => {
                input.setAttribute('readonly', true);
                input.style.backgroundColor = '#f8f9fa';
                input.style.borderColor = '#e0e0e0';
            });
        }
    }

    function handleProfileSubmit(e) {
        e.preventDefault();
        // Here you would typically send the form data to a server
        const formData = new FormData(profileForm);
        const data = Object.fromEntries(formData);
        console.log('Profile data to save:', data);
        alert('Profile changes saved successfully!');
        toggleEditMode(); // Switch back to view mode
    }

    function handleSettingsSubmit(e) {
        e.preventDefault();
        // Here you would typically send the form data to a server
        const formData = new FormData(settingsForm);
        const data = Object.fromEntries(formData);
        console.log('Settings data to save:', data);
        alert('Account settings updated successfully!');
    }

    function handleActionCardClick(e) {
        const card = e.currentTarget;
        const cardId = card.id;

        switch(cardId) {
            case 'termsBtn':
                alert('Opening Terms & Policies');
                // window.open('terms.html', '_blank');
                break;
            case 'shareBtn':
                shareApp();
                break;
            case 'rateBtn':
                openRatingModal();
                break;
            case 'helpBtn':
                alert('Redirecting to Help Center');
                // window.location.href = 'help.html';
                break;
            default:
                console.log('Unknown action card clicked');
        }
    }

    function shareApp() {
        // Check if the Web Share API is available
        if (navigator.share) {
            navigator.share({
                title: 'ReForest App',
                text: 'Check out this awesome forest monitoring app!',
                url: 'https://example.com/reforest'
            })
            .then(() => console.log('Successful share'))
            .catch(error => console.log('Error sharing:', error));
        } else {
            // Fallback for browsers that don't support Web Share API
            alert('Share functionality is not available in your browser. Copy this link: https://example.com/reforest');
        }
    }

    // Close modal when clicking outside of it
    window.addEventListener('click', function(e) {
        if (e.target === ratingModal) {
            closeRatingModal();
        }
    });

    // Initialize form fields as readonly
    document.querySelectorAll('.profile-form .input-field').forEach(input => {
        input.setAttribute('readonly', true);
        input.style.backgroundColor = '#f8f9fa';
    });
});