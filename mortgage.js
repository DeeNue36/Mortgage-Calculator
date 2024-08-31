const currencySymbol = document.querySelector('.currency-symbol');
const durationTerm = document.getElementById('duration-term');
const rateTerm = document.getElementById('rate-term');

//* Input Elements
const inputAmount = document.getElementById('input-amount');
const inputDuration = document.getElementById('input-duration');
const inputRate = document.getElementById('input-rate');

inputAmount.addEventListener ('click',  () => {
    removeClasses(); // Remove active classes from all forms before adding an active state
    inputAmount.classList.add('active-state-two');
    currencySymbol.classList.add('active-state-one');
});

inputDuration.addEventListener ('click',  () => {
    removeClasses(); // Remove active classes from all forms before adding an active state
    inputDuration.classList.add('active-state-two');
    durationTerm.classList.add('active-state-one');
});

inputRate.addEventListener ('click',  () => {
    removeClasses(); // Remove active classes from all forms before adding an active state
    inputRate.classList.add('active-state-two');
    rateTerm.classList.add('active-state-one');
});

// Function to remove active classes
function removeClasses() {
    if (inputAmount.classList.contains('active-state-two')) {
        inputAmount.classList.remove('active-state-two');
        currencySymbol.classList.remove('active-state-one');
    }

    if (inputDuration.classList.contains('active-state-two')) {
        inputDuration.classList.remove('active-state-two');
        durationTerm.classList.remove('active-state-one');
    }

    if (inputRate.classList.contains('active-state-two')) {
        inputRate.classList.remove('active-state-two');
        rateTerm.classList.remove('active-state-one');
    }
}

// Click event listener on body to remove classes
document.body.addEventListener('click', (event) => {
    // Check if the click is not on any of the form elements
    if (!event.target.closest('#input-amount') &&
        !event.target.closest('#input-duration') &&
        !event.target.closest('#input-rate')) {
        removeClasses();
    }
});