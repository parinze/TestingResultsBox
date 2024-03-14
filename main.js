var data = [
    {
        "Id": "170736",
        "Guid": "adf92440-d8f2-4cf6-afce-f40420a3eb6c",
        "Patient": "Langhorn, Bettina",
        "Address": "",
        "Birthday": "",
        "Email": null,
        "Gender": null,
        "Phone": null,
        "SSN": null,
        "Orthodontist": null,
        "BillingParty": ", ",
        "BillingPartyTaxId": null,
        "locID": "81617cc4-fafe-44b5-ad4d-d3214b13f145"
    },
    {
        "Id": "1911194",
        "Guid": "2c5e4d15-7a16-425a-9c36-f2e4d44dab51",
        "Patient": "Workman, Lani",
        "Address": "1205 Workman, Chatsworth, CA 91311",
        "Birthday": "12/05/1980",
        "Email": null,
        "Gender": "F",
        "Phone": null,
        "SSN": null,
        "Orthodontist": null,
        "BillingParty": ", ",
        "BillingPartyTaxId": null,
        "locID": "81617cc4-fafe-44b5-ad4d-d3214b13f145"
    }
];

var availablePatients = [];

data.forEach(patient => {
    availablePatients.push({
        patientName: patient.Patient,
        patientValues: {
            Birthday: patient.Birthday,
            Id: patient.Id,
            Phone: patient.Phone
        }
    });
});

console.log(availablePatients);

const resultsContainer = document.querySelector(".results-container");
const inputBox = document.getElementById("input-box");
const searchIcon = document.getElementById("searchIcon");

let timeoutId;

inputBox.onkeyup = function() {
    var inputText = inputBox.value.trim();

    if (!inputText) {
        searchIcon.src = "SearchIcon.svg";
        resultsContainer.innerHTML = "";
        return;
    }

    // change the search icon to a clear icon
    searchIcon.src = "SearchClearIcon.svg";
    searchIcon.addEventListener("click", clearResults);

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
        var results = availablePatients.filter(patient => {
        
            // Null checks and various types of search matches
            const labelMatch = patient.patientName && patient.patientName.toLowerCase().includes(inputText.toLowerCase());
            const idMatch = patient.patientValues.Id && patient.patientValues.Id.toLowerCase().includes(inputText.toLowerCase());
            const birthdayMatch = patient.patientValues.Birthday && patient.patientValues.Birthday.toLowerCase().includes(inputText.toLowerCase());
            const phoneMatch = patient.patientValues.Phone && patient.patientValues.Phone.includes(inputText);
            
            return labelMatch || idMatch || birthdayMatch || phoneMatch;
        });

        displayResults(results);

        if(inputText && !results.length) {
            resultsContainer.innerHTML = "<div id='noResults'>No results.</div>";
        }

    }, 500); // half-second delay between keystrokes
};


function displayResults(results) {
    var resultHtml = results.map(patient => {
        if (!patient.patientValues.Birthday) {
            return `<li onclick=selectInput(this)>${patient.patientName} | ID #${patient.patientValues.Id}</li>`;
        }
        return `<li onclick=selectInput(this)>${patient.patientName} | ${patient.patientValues.Birthday} | ID #${patient.patientValues.Id}</li>`;
    }).join("");

    resultsContainer.innerHTML = `<div id='addAPatientContainer'>
        <button id='addAPatientButton'>Add A Patient</button></div> 
        <ul>${resultHtml}</ul>`;
}

function selectInput(inputResult) {
    inputBox.value = inputResult.innerHTML;
    resultsContainer.innerHTML = "";
}

function clearResults() {
    inputBox.value = "";
    resultsContainer.innerHTML = "";
    searchIcon.src = "SearchIcon.svg";
}