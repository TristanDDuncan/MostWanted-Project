
function app(people) {
    displayWelcome();
    runSearchAndMenu(people);
    return exitOrRestart(people);
}

function displayWelcome() {
    alert('Hello and welcome to the Most Wanted search application!');
}

function runSearchAndMenu(people) {
    const searchResults = searchPeopleDataSet(people);

    if (searchResults.length > 1) {
        displayPeople('Search Results', searchResults);
    }
    else if (searchResults.length === 1) {
        const person = searchResults[0];
        mainMenu(person, people);
    }
    else {
        alert('No one was found in the search.');
    }
}

function searchPeopleDataSet(people) {

    const searchTypeChoice = validatedPrompt(
        'Please enter in what type of search you would like to perform.',
        ['id', 'name', 'traits']
    );

    let results = [];
    switch (searchTypeChoice) {
        case 'id':
            results = searchById(people);
            break;
        case 'name':
            results = searchByName(people);
            break;
        case 'traits':
            results = searchByTraits(people)
            break;
        default:
            return searchPeopleDataSet(people);
    }

    return results;
}
debugger
function searchByTraits(people){
let searchCriteria = [];
let maxCriteria = 5;
let continueSearch = true;
while(searchCriteria.length < maxCriteria && continueSearch){
    const trait = prompt(`Enter trait ${searchCriteria.length + 1}:eyeColor,weight,height,gender,occupation`);
    const validTraits = ["eyeColor","height","gender","occupation","weight"];
    if(!validTraits.includes(trait)){
        alert("Invalid Trait");
        return true;
    }
    const value = prompt(`Enter value for trait ${trait}`);
    searchCriteria.push({trait,value});
    continueSearch = confirm("Do you want to continue searching?");
    let filteredPeople = people;
    for(const criteria of searchCriteria){
        filteredPeople = filteredPeople.filter(person => person[criteria.trait] == criteria.value);
        
    }displayPeople("Search Results", filteredPeople)
}
}

// function searchByTraits(people){
//     const traitsToSearch = prompt('Please enter the eye color of the person you are searching for.')
//     const traitsResults = people.filter(person => person.eyeColor === traitsToSearch)
//     return traitsResults;

// }

function searchById(people) {
    const idToSearchForString = prompt('Please enter the id of the person you are searching for.');
    const idToSearchForInt = parseInt(idToSearchForString);
    const idFilterResults = people.filter(person => person.id === idToSearchForInt);
    return idFilterResults;
}

function searchByName(people) {
    const firstNameToSearchFor = prompt('Please enter the the first name of the person you are searching for.');
    const lastNameToSearchFor = prompt('Please enter the the last name of the person you are searching for.');
    const fullNameSearchResults = people.filter(person => (person.firstName.toLowerCase() === firstNameToSearchFor.toLowerCase() && person.lastName.toLowerCase() === lastNameToSearchFor.toLowerCase()));
    return fullNameSearchResults;
}

function mainMenu(person, people) {

    const mainMenuUserActionChoice = validatedPrompt(
        `Person: ${person.firstName} ${person.lastName}\n\nDo you want to know their full information, family, or descendants?`,
        ['info', 'family', 'descendants', 'quit']
    );

    switch (mainMenuUserActionChoice) {
        case "info":
                alert(`${person.id}`);
                alert(`${person.firstName}`);
                alert(`${person.lastName}`);
                alert(`${person.gender}`);
                alert(`${person.dob}`);
                alert(`${person.height}`);
                alert(`${person.weight}`);
                alert(`${person.eyeColor}`);
                alert(`${person.occupation}`);
                alert(`${person.parents}`);
                alert(`${person.currentSpouse}`)
    
        
            break;
        case "family":
            findFamily(people,person)
            break;
        case "descendants":
            findPersonDescendants(person, people)
            break;
        case "quit":
            return;
        default:
            alert('Invalid input. Please try again.');
    }

    return mainMenu(person, people);
}

function findPersonDescendants(person, people){
    let children = people.filter(p => p.parents.includes(person.id))
    let grandchildren = [];
    for (let i = 0; i < children.length; i++){
        let child = children[i];
        grandchildren.concat(people.filter(p => p.parents.includes(child.id)))
    }
    displayPeople("Children", children);
    for(let i = 0; i < children.length; i++){
        let grandchildren = people.filter(p => p.parents.includes(children[i].id));
        if(grandchildren.length > 0){
            displayPeople("Grandchildren", grandchildren);
            descendants = descendants.concat(grandchildren);
            descendants = descendants.concat(findDescendants(grandchildren, people));
        }
    }
    

    displayPeople("Grandchildren", grandchildren);
}
    
function findFamily(people, person){
    let spouse = people.filter( p => p.id === person.currentSpouse)
    displayPeople("Spouse", spouse)
    let parents = people.filter(p => person.parents.includes(p.id))
    displayPeople("Parents", parents)

    let siblings = people.filter(p =>{
        if(p.id !== person.id){
            for(let i = 0; i < person.parents.length; i++){
                if(p.parents.includes(person.parents[i])){
                return true;
                }
            }
        }
        return false;
    })
    displayPeople("Siblings", siblings)
}

// Helper Function to FindFamily
function findSpouseId(people, person){
    const familyMember = people.filter( p => p.id === person.currentSpouse)
    return familyMember
 
    }

function displayPeople(displayTitle, peopleToDisplay) {
    const formatedPeopleDisplayText = peopleToDisplay.map(person => `${person.firstName} ${person.lastName}`).join('\n');
    alert(`${displayTitle}\n\n${formatedPeopleDisplayText}`);
}

function validatedPrompt(message, acceptableAnswers) {
    acceptableAnswers = acceptableAnswers.map(aa => aa.toLowerCase());

    const builtPromptWithAcceptableAnswers = `${message} \nAcceptable Answers: ${acceptableAnswers.map(aa => `\n-> ${aa}`).join('')}`;

    const userResponse = prompt(builtPromptWithAcceptableAnswers).toLowerCase();

    if (acceptableAnswers.includes(userResponse)) {
        return userResponse;
    }
    else {
        alert(`"${userResponse}" is not an acceptable response. The acceptable responses include:\n${acceptableAnswers.map(aa => `\n-> ${aa}`).join('')} \n\nPlease try again.`);
        return validatedPrompt(message, acceptableAnswers);
    }
}

function exitOrRestart(people) {
    const userExitOrRestartChoice = validatedPrompt(
        'Would you like to exit or restart?',
        ['exit', 'restart']
    );

    switch (userExitOrRestartChoice) {
        case 'exit':
            return;
        case 'restart':
            return app(people);
        default:
            alert('Invalid input. Please try again.');
            return exitOrRestart(people);
    }

}