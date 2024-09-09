//* Form 
const form = document.getElementById('form'); 

//* Clear All Button
const clearAll = document.getElementById('clear-calculator');

//* Input Fields and Terms Containers
const amountContainer = document.querySelector('.amount-in-currency');
const durationContainer = document.querySelector('.duration-value');
const rateContainer = document.querySelector('.rate-value');

//* Input Field Elements
const inputAmount = document.getElementById('input-amount');
const inputDuration = document.getElementById('input-duration');
const inputRate = document.getElementById('input-rate');

//* Input Field Terms/Representations 
const currencySymbol = document.querySelector('.currency-symbol');
const durationTerm = document.getElementById('duration-term');
const rateTerm = document.getElementById('rate-term');

//* Radio Inputs
const radioContainer = document.querySelector('.mortgage-type')
const radioRepayment = document.getElementById('repayment');
const radioInterestOnly = document.getElementById('interest-only');

//* Reset the form
clearAll.addEventListener('click', () => {
    form.reset();
     // Reset radio input styles
    radioInputs.forEach(input => {
        input.parentElement.style.border = '1px solid var(--slate-four)';
        input.parentElement.style.backgroundColor = 'var(--neutral)';
    });
});

//* Active states of the input fields
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
    // Checks if the click is not on any of the form elements
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
form.addEventListener('submit', (event) => {
    event.preventDefault();
    validateInputs();
    calculateMortgage();
});

function calculateMortgage() {
    const principalAmount = parseFloat(inputAmount.value);
    const duration = parseFloat(inputDuration.value);
    const rate = parseFloat(inputRate.value) / 100;
    const mortgageType = document.querySelector('input[name="radio-type"]:checked');

    if(isNaN(principalAmount) || principalAmount <= 0) {
        validateInputs();
    }

    if(isNaN(duration) || duration <= 0) {
        validateInputs();
    }

    if(isNaN(rate) || rate <= 0) {
        validateInputs();
    }

    if(mortgageType === null) { 
        validateInputs();
    }

     //* Check if any input field is empty after initial validation and stop calculations
    if (inputAmount.value.trim() === '' || inputDuration.value.trim() === '' || inputRate.value.trim() === '' || mortgageType === null) {
        return;  // Exit the function to prevent further calculations
    }

    //* Validate inputAmount range
    const amountParent = document.querySelector('.user-amount');
    const amountRangeError = amountParent.querySelector('.error-message');
    if (principalAmount < 10000 || principalAmount > 3000000 ||isNaN(principalAmount) ) {
        // Display an error message or set an error state for inputAmount
        setAmountError();
        amountRangeError.textContent = 'Amount should be between £10,000 and £3,000,000';
    } else {
        removeAmountError();
        amountRangeError.textContent = '';
    }
    
    //* Validate inputDuration range
    const durationParent = document.querySelector('.duration');
    const durationRangeError = durationParent.querySelector('.error-message');
    if (duration < 1 || duration > 40 || isNaN(duration)) {
        // Display an error message or set an error state for inputDuration
        setDurationError();
        durationRangeError.textContent = 'Duration should be between 1 and 40 years';
    } else {
        removeDurationError();
        durationRangeError.textContent = '';
    }

    //* Validate inputRate range
    const rateParent = document.querySelector('.rate');
    const rateRangeError = rateParent.querySelector('.error-message');
    if (rate < 1 || rate > 20 || isNaN(rate)) {
        // Display an error message or set an error state for inputRate
        setRateError();
        rateRangeError.textContent = 'Rate should be between 1% and 20%';
    } else {
        removeRateError();
        rateRangeError.textContent = '';
    }

    // Only proceed with mortgage calculation if all inputs are valid
if (isNaN(principalAmount) || isNaN(duration) || isNaN(rate) || principalAmount < 10000 || principalAmount > 3000000 || duration < 1 || duration > 40 || rate < 1 || rate > 20) {
    // Handle invalid inputs, display error messages, or prevent further calculation
    return;
}

    let monthlyPayment = 0;
    let totalRepayment = 0;

    if (mortgageType.value === 'repayment') {
        const monthlyRate = rate / 12;
        const n = duration * 12;

        // monthlyPayment = (principalAmount * monthlyRate) / (1 - Math.pow((1 + monthlyRate, -n));

        monthlyPayment = principalAmount * ( monthlyRate *((1 + monthlyRate)**n) ) / ( ((1 + monthlyRate)**n) - 1 );

        totalRepayment = monthlyPayment * n;
    }
    else if (mortgageType.value === 'interest-only') {
        monthlyPayment = (principalAmount * rate) / 12;

        totalRepayment = monthlyPayment * duration * 12;
    }

    document.getElementById('monthly-repayment-amount').innerText = `${monthlyPayment.toFixed(2)}`;

    document.getElementById('total-repayment-amount').innerText = `${totalRepayment.toFixed(2)}`;

}

//* Checks for empty values and sets or removes the error states
// * Parameters -- value reps the Value of the input field, setError reps the Error Functions and removeError reps the Remove Error Functions
function handleInputError (value, setError, removeError) {
    if (value === '') {
        setError();
    }
    else {
        removeError();
    }
}

// * Function to validate the inputs, set and remove error states
function validateInputs () {
    const amountValue = inputAmount.value.trim();
    const durationValue = inputDuration.value.trim();
    const rateValue = inputRate.value.trim();

    handleInputError(amountValue, setAmountError, removeAmountError);
    handleInputError(durationValue, setDurationError, removeDurationError);
    handleInputError(rateValue, setRateError, removeRateError);

    //* Error Messages
    displayErrorMessages();

    // * Alternative Ways For Checking Empty Inputs and Setting Error States 
     // ! Alternative way (1) 
    // const inputFields = [
    //     { value: inputAmount.value.trim(), errorFunc: setAmountError, successFunc: removeAmountError },
    //     { value: inputDuration.value.trim(), errorFunc: setDurationError, successFunc: removeDurationError },
    //     { value: inputRate.value.trim(), errorFunc: setRateError, successFunc: removeRateError }
    // ];

    // inputFields.forEach(field => {
    //     if (field.value === '') {
    //         field.errorFunc();
    //     } else {
    //         field.successFunc();
    //     }
    // });

    // !  Alternative way (2) 
    // if ( amountValue === '' ) {
    //     setAmountError();
    // }
    // else {
    //     removeAmountError();
    // }
    // if ( durationValue === '' ) {
    //     setDurationError();
    // }
    // else {
    //     removeDurationError();
    // }
    // if ( rateValue === '' ) {
    //     setRateError();
    // }
    // else {
    //     removeRateError();
    // }

}

//*  Display Error Messages
function displayErrorMessages () {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(errorMsg => {
        
        // * Select the parent element of the error message
        const parent = errorMsg.parentElement;

        //* Selecting the <input> element
        const inputField = parent.querySelector('input'); 

        // * Storing the error message to be displayed using dataset  attributes
        const errorMessage = inputField.dataset.errorMessage; 

        //* Checks for empty values and display the error message
        if (inputField.value.trim() === '' ) {
            errorMsg.textContent = errorMessage || 'This field is required';
        } 
        else if (inputField.type === 'radio' && !document.querySelector(`input[name=${inputField.name}]:checked`) ) {
            errorMsg.textContent = errorMessage || 'This field is required';
            radioContainer.classList.add('error-vibrate');
        }
        else {
            errorMsg.textContent = '';
            radioContainer.classList.remove('error-vibrate');
        }
    });
}

//* Functions for Error States

//* Amount Error States
function setAmountError(){
    currencySymbol.classList.add('error-terms');
    inputAmount.classList.add('error-input');
    amountContainer.classList.add('error-vibrate');
}

//* Duration Error States
function setDurationError(){
    durationTerm.classList.add('error-terms');
    inputDuration.classList.add('error-input');
    durationContainer.classList.add('error-vibrate');
}

//* Rate Error States
function setRateError(){
    rateTerm.classList.add('error-terms');
    inputRate.classList.add('error-input');
    rateContainer.classList.add('error-vibrate');
}

// * Functions For Removing Error States

// * Remove Amount Error State
function removeAmountError(){
    currencySymbol.classList.remove('error-terms');
    inputAmount.classList.remove('error-input');
    amountContainer.classList.remove('error-vibrate');
}

// * Remove Duration Error State
function removeDurationError(){
    durationTerm.classList.remove('error-terms');
    inputDuration.classList.remove('error-input');
    durationContainer.classList.remove('error-vibrate');
}

// * Remove Rate Error State
function removeRateError(){
    rateTerm.classList.remove('error-terms');
    inputRate.classList.remove('error-input');
    rateContainer.classList.remove('error-vibrate');
}

//* Moving cursor to next input field on hitting enter  
let inputs = document.querySelectorAll("input,select");
for ( let i = 0 ; i < inputs.length; i++ ) {
    inputs[ i ].addEventListener("keypress", function(e){
        if (e.which == 13) {
            e.preventDefault();
            var nextInput = document.querySelectorAll('[tabIndex="' + (this.tabIndex + 1) + '"]');
            if (nextInput.length === 0) {
                nextInput = document.querySelectorAll('[tabIndex="1"]');
            }
            nextInput[0].focus();
        }
    })
}

//* Add a comma to numbers while typing
// inputAmount.addEventListener("keyup", ()=>{
//     let tempNumber = inputAmount.value.replace(/,/gi, "");
//     let commaSeparatedNumber = tempNumber.split(/(?=(?:\d{3})+$)/).join(",");
//     inputAmount.value = commaSeparatedNumber;
// });