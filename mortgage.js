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

    validateInputs();

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

function validateInputs () {
    const amountValue = inputAmount.value.trim();
    const durationValue = inputDuration.value.trim();
    const rateValue = inputRate.value.trim();

    if ( amountValue === '' ) {
        setAmountError();
    }
    else {
        removeAmountError();
    }

    if ( durationValue === '' ) {
        setDurationError();
    }
    else {
        removeDurationError();
    }

    if ( rateValue === '' ) {
        setRateError();
    }
    else {
        removeRateError();
    }

    //* Error Messages
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(errorMsg => {
        const parent = errorMsg.parentElement;
        console.log(parent);
        const inputField = parent.querySelector('input'); // Selecting the <input> element
        // console.log(inputField);
        if (inputField.value.trim() === '' ) {
            console.log(inputField.value);
            errorMsg.textContent = 'This field is required';
        } 
        else if (inputField.type === 'radio' && !document.querySelector(`input[name=${inputField.name}]:checked`) ) {
            errorMsg.textContent = 'This field is required';
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

function removeAmountError(){
    currencySymbol.classList.remove('error-terms');
    inputAmount.classList.remove('error-input');
    amountContainer.classList.remove('error-vibrate');
}

//* Duration Error States
function setDurationError(){
    durationTerm.classList.add('error-terms');
    inputDuration.classList.add('error-input');
    durationContainer.classList.add('error-vibrate');
}

function removeDurationError(){
    durationTerm.classList.remove('error-terms');
    inputDuration.classList.remove('error-input');
    durationContainer.classList.remove('error-vibrate');
}

//* Rate Error States
function setRateError(){
    rateTerm.classList.add('error-terms');
    inputRate.classList.add('error-input');
    rateContainer.classList.add('error-vibrate');
}

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