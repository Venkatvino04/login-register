document.addEventListener('DOMContentLoaded', function () {
    const countrySelect = document.getElementById('country');
    const stateSelect = document.getElementById('state');
    const phoneInput = document.getElementById('phone');
    const phoneExtension = document.getElementById('phoneExtension');
    const maxDate = new Date().toISOString().split("T")[0];
    const captchaText = document.getElementById('captchaText');
    const captchaInput = document.getElementById('captcha');

    if (document.getElementById('dateOfBirth')) {
        document.getElementById('dateOfBirth').setAttribute('max', maxDate);
    }

    // Populate country dropdown
    const countries = {
        "Select your country": "",
        "Argentina": "+54",
        "Australia": "+61",
        "Brazil": "+55",
        "Canada": "+1",
        "France": "+33",
        "Germany": "+49",
        "India": "+91",
        "Japan": "+81",
        "Mexico": "+52",
        "United Kingdom": "+44",
        "United States": "+1"
    };

    for (let country in countries) {
        const option = document.createElement('option');
        option.value = country;
        option.text = country;
        countrySelect?.appendChild(option);
    }

    // Update phone prefix and state options based on selected country
    countrySelect?.addEventListener('change', function () {
        phoneExtension.textContent = countries[this.value] || '+1';
        phoneInput.value = '';
        stateSelect.innerHTML = '<option value="">Select your state/region</option>';

        if (this.value === 'India') {
            addStateOptions(['Andhra Pradesh', 'Tamil Nadu', 'Maharashtra', 'Karnataka', 'Kerala']);
        } else if (this.value === 'United States') {
            addStateOptions(['California', 'Florida', 'New York', 'Texas', 'Washington']);
        }
    });

    function addStateOptions(states) {
        states.forEach(function (state) {
            const option = document.createElement('option');
            option.value = state;
            option.text = state;
            stateSelect?.appendChild(option);
        });
    }

    // Generate and display captcha
    const captchaCode = Math.random().toString(36).substring(2, 7).toUpperCase();
    captchaText.textContent = captchaCode;

    // Form submission handling
    const form = document.getElementById('registrationForm');
    form?.addEventListener('submit', function (e) {
        e.preventDefault();
        if (captchaInput.value.toUpperCase() === captchaCode) {
            alert('Thank you for registering for the workshop!');
            window.location.href = 'success.html';
        } else {
            alert('Captcha verification failed. Please try again.');
        }
    });
});
