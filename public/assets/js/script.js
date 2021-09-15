const $animalForm = document.querySelector('#animal-form');

// this function gets called on form submission:
//it gathers all of the form input data and packages it as an object to send to the getAnimals()
//function as the formData argument
const handleAnimalFormSubmit = event => {
    event.preventDefault();

    // get animal data and organize it
    const name = $animalForm.querySelector('[name="animal-name"]').value;
    const species = $animalForm.querySelector('[name="species"]').value;
    const dietRadioHTML = $animalForm.querySelectorAll('[name="diet"]');
    let diet;

    for (let i = 0; i < dietRadioHTML.length; i += 1) {
        if (dietRadioHTML[i].checked) {
            diet = dietRadioHTML[i].value;
        }
    }

    if (diet === undefined) {
        diet = '';
    }

    const selectedTraits = $animalForm.querySelector('[name="personality"').selectedOptions;
    const personalityTraits = [];
    for (let i = 0; i < selectedTraits.length; i += 1) {
        personalityTraits.push(selectedTraits[i].value);
    }
    const animalObject = { name, species, diet, personalityTraits };

    // use the fetch() method to make a get request to the server API:
    fetch('/api/animals', {
        // specify that this is a post request:
        method: 'POST',
        // tell the request what type of data we're looking to send which is json:
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        // now you can add stringified JSON data for the animalObject to the body property of the request:
        // WITHOUT THESE, WE WOULD NEVER RECIEVE REQ.BODY TO THE SERVER!!!!!!!!!!!!!!
        body: JSON.stringify(animalObject)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            alert('Error: ' + response.statusText);
        })
        .then(postResponse => {
            console.log(postResponse);
            alert('Thank you for adding an animal');
        });
};

$animalForm.addEventListener('submit', handleAnimalFormSubmit);
