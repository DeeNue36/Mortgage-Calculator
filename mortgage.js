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

//* Calculate Mortgage Button
const calculateMortgageBtn = document.getElementById('calculate-mortgage');

//* Reset the form
clearAll.addEventListener('click', () => {
    form.reset();

    //*  Reset radio input styles
    radioInputs.forEach(input => {
        input.parentElement.style.border = '1px solid var(--slate-four)';
        input.parentElement.style.backgroundColor = 'var(--neutral)';
    });

    //* Reset results - monthly repayment amount and total repayment amount
    document.getElementById('monthly-repayment-amount').innerText = '0';
    document.getElementById('total-repayment-amount').innerText = '0';

    //* Reset to default result state
    document.querySelector('.default-result').classList.remove('hide');
    document.querySelector('.full-results').classList.remove('show');

    //* Remove error states
    removeAmountError();
    removeDurationError();
    removeRateError();

    //* Remove error messages
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(errorMsg => {
        errorMsg.textContent = '';
    });
    
});

//* Active states of the input fields
function activeStates() {
    inputAmount.addEventListener ('focus',  () => {
        removeActiveStates(); //* Remove active class from form before adding an active state
        amountContainer.classList.add('active-state');
        currencySymbol.classList.add('active-state-term');
        removeAmountError();
    });
    
    inputDuration.addEventListener ('focus',  () => {
        removeActiveStates();
        durationContainer.classList.add('active-state');
        durationTerm.classList.add('active-state-term');
        removeDurationError();
    });
    
    inputRate.addEventListener ('focus',  () => {
        removeActiveStates();
        rateContainer.classList.add('active-state');
        rateTerm.classList.add('active-state-term');
        removeRateError();
    });
}

// activeStates();
//* Call the activeStates function after the DOM has loaded
document.addEventListener('DOMContentLoaded', () => {
    activeStates();
});

//* Function to remove active classes
function removeActiveStates() {
    //* Removes the active states from the container of the input fields
    amountContainer.classList.remove('active-state');
    durationContainer.classList.remove('active-state');
    rateContainer.classList.remove('active-state');
    
    //* Removes the active states from the terms of the input fields
    currencySymbol.classList.remove('active-state-term');
    durationTerm.classList.remove('active-state-term');
    rateTerm.classList.remove('active-state-term');
}

//* Click event listener on body to remove classes
document.body.addEventListener('click', (event) => {
    //* Checks if the click is not on any of the form elements
    if (!event.target.closest('#input-amount') &&
        !event.target.closest('#input-duration') &&
        !event.target.closest('#input-rate')) {
        removeActiveStates();
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
calculateMortgageBtn.addEventListener('click', (event) => {
    event.preventDefault();
    validateInputs();
    if (inputAmount.value.trim() !== '' && inputDuration.value.trim() !== '' && inputRate.value.trim() !== '' && document.querySelector('input[name="radio-type"]:checked')) {

        //* Hide the default result class and display the full result class
        document.querySelector('.default-result').classList.add('hide');
        document.querySelector('.full-results').classList.add('show');

        //* Calculate and display the mortgage details
        calculateMortgage();
    };

});

//* Function to calculate the mortgage 
function calculateMortgage() {
    const principalAmount = parseFloat(inputAmount.value);
    const duration = parseFloat(inputDuration.value);
    const rate = parseFloat(inputRate.value)  /100;
    const mortgageType = document.querySelector('input[name="radio-type"]:checked');

     //* Check if any input field is empty and stop calculations
    if (inputAmount.value.trim() === '' || inputDuration.value.trim() === '' || inputRate.value.trim() === '' || mortgageType === null) {
        return;  //* Exit the function to prevent further calculations
    }

    // * Validate Input Ranges

    //* Validate inputAmount range
    const amountParent = document.querySelector('.user-amount');
    const amountRangeError = amountParent.querySelector('.error-message');
    if (principalAmount < 10000 || principalAmount > 3000000 ||isNaN(principalAmount) ) {
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
        setDurationError();
        durationRangeError.textContent = 'Duration should be between 1 and 40 years';
    } else {
        removeDurationError();
        durationRangeError.textContent = '';
    }

    //* Validate inputRate range
    const rateParent = document.querySelector('.rate');
    const rateRangeError = rateParent.querySelector('.error-message');
    if ( (rate < 1/100) || (rate > 20/100) || isNaN(rate)) {
        setRateError();
        rateRangeError.textContent = 'Rate should be between 1% and 20%';
    } else {
        removeRateError();
        rateRangeError.textContent = '';
    }

    //* Runs checks and only proceeds with mortgage calculation if all inputs are valid
    if (isNaN(principalAmount) || isNaN(duration) || isNaN(rate) || principalAmount < 10000 || principalAmount > 3000000 || duration < 1 || duration > 40 || (rate < 1/100) || (rate > 20/100) ) {
        return;
    }

    // * Calculate Mortgage -- Monthly Payment & Total Repayment
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

    document.getElementById('monthly-repayment-amount').innerText = `${addCommas(monthlyPayment.toFixed(2))}`;

    document.getElementById('total-repayment-amount').innerText = `${addCommas(totalRepayment.toFixed(2))}`;

    //* Announce the results to screen readers
    const resultElements = document.querySelectorAll('.full-results');
    resultElements.forEach((element) => {
        element.setAttribute('role', 'alert');
        element.setAttribute('aria-live', 'polite');
    });

};


//* Utility Function - Adds commas to large numbers
function addCommas(n) {
    //* \B matches a non-word boundary
    //* (?=(\d{3})+(?!\d)) is a positive lookahead that matches if the current position is followed by one or more groups of three digits, and the g flag at the end makes the replacement global.
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/** 
    **Utility Function - Handles Input Errors -- Checks for empty values and sets or removes the error states
    **Parameters -- "value" takes the value of the input field, "setError" represents the error functions and "removeError" represents the remove error functions 
*/
function handleInputError (value, setError, removeError) {
    if (value === '') {
        setError();
    }
    else {
        removeError();
    }
};

//* Utility Function - Function to validate the inputs, set and remove error states
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

};

//* Utility Function - Display Error Messages
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
            setTimeout(function() {
                radioContainer.classList.remove('error-vibrate');
            }, 4000);
        }
        else {
            errorMsg.textContent = '';
            radioContainer.classList.remove('error-vibrate');
        }
    });

};

//* Functions for Setting Error States

//* Amount Error States
function setAmountError(){
    currencySymbol.classList.add('error-currency');
    amountContainer.classList.add('error-input');
    amountContainer.classList.add('error-vibrate');
    setTimeout(function() {
        amountContainer.classList.remove('error-vibrate');
    }, 4000);
};

//* Duration Error States
function setDurationError(){
    durationTerm.classList.add('error-terms');
    durationContainer.classList.add('error-input');
    durationContainer.classList.add('error-vibrate');
    setTimeout(function() {
        durationContainer.classList.remove('error-vibrate');
    }, 4000);
};

//* Rate Error States
function setRateError(){
    rateTerm.classList.add('error-terms');
    rateContainer.classList.add('error-input');
    rateContainer.classList.add('error-vibrate');
    setTimeout(function() {
        rateContainer.classList.remove('error-vibrate');
    }, 4000);
};

// * Functions For Removing Error States

// * Remove Amount Error State
function removeAmountError(){
    currencySymbol.classList.remove('error-currency');
    amountContainer.classList.remove('error-input');
    amountContainer.classList.remove('error-vibrate');
};

// * Remove Duration Error State
function removeDurationError(){
    durationTerm.classList.remove('error-terms');
    durationContainer.classList.remove('error-input');
    durationContainer.classList.remove('error-vibrate');
};

// * Remove Rate Error State
function removeRateError(){
    rateTerm.classList.remove('error-terms');
    rateContainer.classList.remove('error-input');
    rateContainer.classList.remove('error-vibrate');
};

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
    });
};

//* Add a comma to numbers while typing
// inputAmount.addEventListener("keyup", ()=>{
//     let tempNumber = inputAmount.value.replace(/,/gi, "");
//     let commaSeparatedNumber = tempNumber.split(/(?=(?:\d{3})+$)/).join(",");
//     inputAmount.value = commaSeparatedNumber;
// });