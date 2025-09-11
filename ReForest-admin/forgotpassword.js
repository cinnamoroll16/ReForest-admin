document.addEventListener('DOMContentLoaded', function() {
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const successMessage = document.getElementById('successMessage');
    const userEmailSpan = document.getElementById('userEmail');
    const resendLinkBtn = document.getElementById('resendLink');
    
    // Handle form submission
    forgotPasswordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get the email value
        const email = document.getElementById('email').value;
        
        // Validate email (simple validation)
        if (!validateEmail(email)) {
            showError("Please enter a valid email address");
            return;
        }
        
        // Simulate sending reset link (in a real app, this would be an API call)
        simulateSendResetLink(email);
    });
    
    // Handle resend link
    resendLinkBtn.addEventListener('click', function() {
        const email = document.getElementById('email').value;
        simulateSendResetLink(email);
        
        // Show feedback that link was resent
        showFeedback("Reset link resent successfully!");
    });
    
    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Simulate sending reset link
    function simulateSendResetLink(email) {
        // Show loading state
        const submitBtn = forgotPasswordForm.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const originalText = btnText.textContent;
        btnText.textContent = "Sending...";
        submitBtn.disabled = true;
        
        // Simulate network delay
        setTimeout(function() {
            // Hide form and show success message
            forgotPasswordForm.style.display = 'none';
            userEmailSpan.textContent = email;
            successMessage.style.display = 'flex';
            
            // Reset button state (in case user goes back)
            btnText.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }
    
    // Show error message
    function showError(message) {
        // Remove any existing error messages
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Create error element
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = 'var(--error)';
        errorElement.style.marginBottom = '15px';
        errorElement.style.fontSize = '14px';
        errorElement.textContent = message;
        
        // Insert error message above the form
        forgotPasswordForm.insertBefore(errorElement, forgotPasswordForm.firstChild);
    }
    
    // Show feedback message
    function showFeedback(message) {
        // Create feedback element
        const feedbackElement = document.createElement('div');
        feedbackElement.className = 'feedback-message';
        feedbackElement.style.color = 'var(--success)';
        feedbackElement.style.marginBottom = '15px';
        feedbackElement.style.fontSize = '14px';
        feedbackElement.textContent = message;
        
        // Insert feedback message above the success content
        const successContent = document.querySelector('.success-content');
        successContent.insertBefore(feedbackElement, successContent.firstChild);
        
        // Remove after 3 seconds
        setTimeout(function() {
            feedbackElement.remove();
        }, 3000);
    }
});