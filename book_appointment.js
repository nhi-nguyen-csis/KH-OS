// Initialize EmailJS
emailjs.init(CONFIG.EMAILJS_PUBLIC_KEY);

const form = document.getElementById('appointmentForm');
const successMessage = document.getElementById('successMessage');
const confirmEmail = document.getElementById('confirmEmail');
const errorAlert = document.getElementById('errorAlert');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const dateInput = document.getElementById('date');

// Set minimum date to today
const today = new Date();
const minDate = today.toISOString().split("T")[0];
// Calculate 3 months from today
const maxDateObj = new Date(today);
maxDateObj.setMonth(maxDateObj.getMonth() + 3);

const maxDate = new Date(
  maxDateObj.getFullYear(),
  maxDateObj.getMonth() + 1,
  0 // Last day of the target month
).toISOString().split("T")[0];

// Apply limits to the input
dateInput.setAttribute("min", minDate);
dateInput.setAttribute("max", maxDate);

form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const formattedName = name.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()); // Title case
    const email = document.getElementById('email').value.trim();
    const formattedEmail = email.toLowerCase();
    const phone = document.getElementById('phone').value.trim();
    const date = dateInput.value;
    const time = document.getElementById('time').value;
    const reason = document.getElementById('reason').value.trim();

    // Show loading state
    submitBtn.disabled = true;
    btnText.innerHTML = '<span class="loading"></span>Sending...';

    // Format date for display
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Prepare template parameters - matches EmailJS template
    const templateParams = {
        from_name: formattedName,
        from_email: formattedEmail,
        phone: phone || 'Not provided',
        appointment_date: formattedDate,
        appointment_time: time,
        service: 'Eye Exam',
        message: reason || 'No additional notes'
    };

    // Send email using EmailJS
    emailjs.send(
        CONFIG.EMAILJS_SERVICE_ID,
        CONFIG.EMAILJS_TEMPLATE_ID,
        templateParams
    )
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        
        // Show success message
        confirmEmail.textContent = `We've sent a confirmation to ${formattedEmail}`;
        form.style.display = 'none';
        successMessage.style.display = 'block';

        // Reset form after 5 seconds
        setTimeout(() => {
            // form.reset();
            // form.style.display = 'block';
            // successMessage.style.display = 'none';
            // submitBtn.disabled = false;
            // btnText.textContent = 'Schedule Appointment';
        }, 5000);

    }, function(error) {
        console.error('FAILED...', error);
        
        // Show error message
        errorAlert.textContent = 'Failed to send appointment request. Please try again or call us at (+84)948-340-357';
        errorAlert.style.display = 'block';
        
        // Hide error after 5 seconds
        setTimeout(() => {
            errorAlert.style.display = 'none';
        }, 5000);
        
        // Reset button
        submitBtn.disabled = false;
        btnText.textContent = 'Schedule Appointment';
    });
});
