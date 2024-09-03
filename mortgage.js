//* Form 
const form = document.getElementById('form'); 

//* Input Field Elements
const inputAmount = document.getElementById('input-amount');
const inputDuration = document.getElementById('input-duration');
const inputRate = document.getElementById('input-rate');

//* Input Field Terms/Representations 
const currencySymbol = document.querySelector('.currency-symbol');
const term = document.getElementsByClassName('.term');
const durationTerm = document.getElementById('duration-term');
const rateTerm = document.getElementById('rate-term');

//* Radio Inputs
const radioContainer = document.querySelector('.mortgage-type')
const radioRepayment = document.getElementById('repayment');
const radioInterestOnly = document.getElementById('interest-only');

function activeStates() {
    inputAmount.addEventListener ('focus',  () => {
        removeClasses(); // Remove active class from form before adding an active state
        currencySymbol.classList.add('active-state');
        removeAmountError();
    });
    
    inputDuration.addEventListener ('focus',  () => {
        removeClasses(); // Remove active class from form before adding an active state
        durationTerm.classList.add('active-state');
        removeDurationError();
    });
    
    inputRate.addEventListener ('focus',  () => {
        removeClasses(); // Remove active class from form before adding an active state
        rateTerm.classList.add('active-state');
        removeRateError();
    });
}

// activeStates();
//* Call the activeStates function after the DOM has loaded
document.addEventListener('DOMContentLoaded', () => {
    activeStates();
});

//* Function to remove active classes
function removeClasses() {
    currencySymbol.classList.remove('active-state');
    durationTerm.classList.remove('active-state');
    rateTerm.classList.remove('active-state');
    // if (inputAmount.classList.contains('input-amount')) {
    //     currencySymbol.classList.remove('active-state');
    // }
    // if (inputDuration.classList.contains('input-duration')) {
    //     durationTerm.classList.remove('active-state');
    // }
    // if (inputRate.classList.contains('input-rate')) {
    //     rateTerm.classList.remove('active-state');
    // }
}

//* Click event listener on body to remove classes
document.body.addEventListener('click', (event) => {
    // Check if the click is not on any of the form elements
    if (!event.target.closest('#input-amount') &&
        !event.target.closest('#input-duration') &&
        !event.target.closest('#input-rate')) {
        removeClasses();
    }
});

//* Radio inputs functionality 

//* Common class for both radio inputs
const radioInputs = document.querySelectorAll('.radio-input');

radioInputs.forEach(radioInput => {
    radioInput.addEventListener('change', (event) => {
        radioInputs.forEach(input => {
            if (input !== event.target) {
                input.parentElement.style.border = '1px solid var(--slate-four)';
                input.parentElement.style.backgroundColor = 'var(--neutral)';
            }
        });

        if (event.target.checked) {
            event.target.parentElement.style.border = '1px solid var(--primary-color-one)';
            event.target.parentElement.style.backgroundColor = 'hsl(61deg 70% 52% / 30%)';
        }
    });
});

//* Form Validation
// Assuming you have the following classes in your CSS: error-term, error-input, error-message
form.addEventListener('submit', (event) => {
    event.preventDefault();

    validateInputs();
});

const validateInputs = () => {
    const amountValue = inputAmount.value.trim();
    const durationValue = inputDuration.value.trim();
    const rateValue = inputRate.value.trim();
    
    function setErrorMessage() {
        const errorMessages = document.getElementsByClassName('error-message');
        errorMessages.textContent = 'This field is required';
    }
    
    //* Remove Error Messages
    function removeErrorMessage(errorMsg) {
        errorMsg.textContent = ' ';
    }

    if ( amountValue === ' ' ) {
        setAmountError();
        setErrorMessage();
    }
    else {
        removeAmountError();
    }

    if ( durationValue === ' ' ) {
        setDurationError();
    }
    else {
        removeDurationError();
    }

    if ( rateValue === ' ' ) {
        setRateError();
    }
    else {
        removeRateError();
    }
}

// const errorMessages = document.querySelectorAll('.error-message').forEach(errorMsg =>{
//     setErrorMessage(errorMsg);
// });

// function setErrorMessage(errorMsg) {
//     errorMsg.textContent = 'This field is required';
// }

// //* Remove Error Messages
// function removeErrorMessage(errorMsg) {
//     errorMsg.textContent = ' ';
// }

//* Amount Error States
function setAmountError(){
    currencySymbol.classList.add('error-terms');
    inputAmount.classList.add('error-input');
}

function removeAmountError(){
    currencySymbol.classList.remove('error-terms');
    inputAmount.classList.remove('error-input');
}

//* Duration Error States
function setDurationError(){
    durationTerm.classList.add('error-terms');
    inputDuration.classList.add('error-input');
}

function removeDurationError(){
    durationTerm.classList.remove('error-terms');
    inputDuration.classList.remove('error-input');
}

//* Rate Error States
function setRateError(){
    rateTerm.classList.add('error-terms');
    inputRate.classList.add('error-input');
}

function removeRateError(){
    rateTerm.classList.remove('error-terms');
    inputRate.classList.remove('error-input');
}
