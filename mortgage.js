const currencySymbol = document.querySelector('.currency-symbol');
const durationTerm = document.getElementById('duration-term');
const rateTerm = document.getElementById('rate-term');

//* Input Elements
const inputAmount = document.getElementById('input-amount');
const inputDuration = document.getElementById('input-duration');
const inputRate = document.getElementById('input-rate');

function activeStates() {
    inputAmount.addEventListener ('click',  () => {
        removeClasses(); // Remove active classes from all forms before adding an active state
        // inputAmount.classList.add('active-state-two');
        currencySymbol.classList.add('active-state-one');
    });
    
    inputDuration.addEventListener ('click',  () => {
        removeClasses(); // Remove active classes from all forms before adding an active state
        // inputDuration.classList.add('active-state-two');
        durationTerm.classList.add('active-state-one');
    });
    
    inputRate.addEventListener ('click',  () => {
        removeClasses(); // Remove active classes from all forms before adding an active state
        // inputRate.classList.add('active-state-two');
        rateTerm.classList.add('active-state-one');
    });
}

// activeStates();
//* Call the activeStates function after the DOM has loaded
document.addEventListener('DOMContentLoaded', () => {
    activeStates();
});

//* Function to remove active classes
function removeClasses() {
    if (inputAmount.classList.contains('input-amount')) {
        currencySymbol.classList.remove('active-state-one');
    }
    if (inputDuration.classList.contains('input-duration')) {
        durationTerm.classList.remove('active-state-one');
    }
    if (inputRate.classList.contains('input-rate')) {
        rateTerm.classList.remove('active-state-one');
    }
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

const radioRepayment = document.getElementById('repayment');
const radioInterestOnly = document.getElementById('interest-only');

// Common class for both radio inputs
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