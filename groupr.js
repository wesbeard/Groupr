// get group select element
var groupSelect = document.getElementById('groups');
// create array to hold user's groups
var userGroups = ["test"];
updateGroupList();
addEventListeners();
updateContextButtons();


function addEventListeners() {
    addButton = document.getElementById('add-button');
    removeButton = document.getElementById('remove-button');
    selectMenu = document.getElementById('groups');

    addButton.addEventListener('click', event => addGroupForm());
    removeButton.addEventListener('click', event => removeGroupForm());
    selectMenu.addEventListener('change', event => updateContextButtons());
}

function updateContextButtons()
{
    var contextButtons = document.getElementsByClassName('context-button');
    for (var i = 0; i < contextButtons.length; i++) {
        if (groupSelect.selectedIndex == 0) {
            contextButtons[i].style.display = "none";  
            contextButtons[i].style.visibility = "hidden";
        }
        else {
            contextButtons[i].style.display = "block";
            contextButtons[i].style.visibility = "visible";
        }  
   }
}

// update group list
function updateGroupList()
{ 
    // reset group select
    groupSelect.innerHTML = '';

    // start with default option
    var defualt = document.createElement("option");
    defualt.textContent = "Choose a group";
    defualt.value = group;
    groupSelect.appendChild(defualt);
   
    // loop through the users groups and add them to the dropdown menu
    for (var i = 0; i < userGroups.length; i++) {
        var group = userGroups[i];
        var option = document.createElement("option");
        option.textContent = group;
        option.classList.add('option');
        option.value = group;
        groupSelect.appendChild(option);
    }
    updateContextButtons();
}

// remember to add a check later to see if added group exists or removed group does not
// then complete the add and remove functions
// also think about removing form data after submitted???

// insert form for user to add group
function addGroupForm() 
{
    removeFormContents();
    // get the add-remove form
    var addForm = document.getElementById("add-remove-form");
    // set form method to post
    addForm.setAttribute("method", "post");

    // do not add attributes to the form if they are already there
    if (addForm.getElementsByTagName('input').length != 0) {
        return;
    }

    // create label form the input
    var label = document.createElement('label');
    label.innerHTML = "";
    
    // create input box
    var group = document.createElement('input');
    group.setAttribute("type", "text");
    group.setAttribute("id", "groupValue");
    group.setAttribute("name", "groupName");
    group.setAttribute("placeholder", "Group name to add");

    // create button to submit group
    var submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.setAttribute("value", "Submit");
    submit.setAttribute("id", "submitButton");
    submit.setAttribute("onclick", "addGroup()");
    //onclick = "addGroup(group)";

    // create button to close current form
    var close = document.createElement("button");
    close.setAttribute("id", "closeForm");
    close.setAttribute("onclick", "removeFormContents()");
    close.innerHTML = "<i class=\"material-icons\">close</i>";

    // append elements to form
    addForm.appendChild(label);
    addForm.appendChild(group);
    addForm.appendChild(submit);
    addForm.appendChild(close);

    function handleForm(event) { event.preventDefault(); }
    addForm.addEventListener('submit', handleForm);

    submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', event => addGroup());

    closeForm = document.getElementById('closeForm');
    closeForm.addEventListener('click', event => removeFormContents());
}

// insert form for user to remove group
function removeGroupForm() 
{
    removeFormContents();
    // get the add-remove form
    var removeForm = document.getElementById("add-remove-form");
    // set form method to post
    removeForm.setAttribute("method", "post");

    // do not add attributes to the form if they are already there
    if (removeForm.getElementsByTagName('input').length != 0) {
        return;
    }

    // create label form the input
    var label = document.createElement('label');
    label.innerHTML = "";

    // create input box
    var group = document.createElement('input');
    group.setAttribute("type", "text");
    group.setAttribute("id", "groupValue");
    group.setAttribute("name", "groupName");
    group.setAttribute("placeholder", "Group name to remove");

    // create button to submit group
    var submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.setAttribute("value", "Submit");
    submit.setAttribute("id", "submitButton");
    submit.setAttribute("onclick", "removeGroup()");
    //onclick = removeGroup(group);

     // create button to close current form
     var close = document.createElement("button");
     close.setAttribute("id", "closeForm");
     close.setAttribute("onclick", "removeFormContents()");
     close.innerHTML = "<i class=\"material-icons\">close</i>";

    // append elements to form
    removeForm.appendChild(label);
    removeForm.appendChild(group);
    removeForm.appendChild(submit);
    removeForm.appendChild(close);

    function handleForm(event) { event.preventDefault(); }
    removeForm.addEventListener('submit', handleForm);

    submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', event => removeGroup());

    closeForm = document.getElementById('closeForm');
    closeForm.addEventListener('click', event => removeFormContents());
}

// add the given group to group array
function addGroup()
{
    value = document.getElementById('groupValue').value;
    for (var i = 0; i < userGroups.length; i++)
    {
        if (userGroups[i] === value) {
            //alert(value + " already exists.");
            removeFormContents();
            return;
        } 
        else if (value.length <= 0) {
            removeFormContents();
            return;
        }
    }
    userGroups.push(value);
    console.log(value);
    console.log(userGroups);
    //alert(value + " added");
    updateGroupList();
    removeFormContents();
}

// remove the given group from group array
function removeGroup()
{
    value = document.getElementById('groupValue').value;
    for (var i = 0; i < userGroups.length; i++)
    {
        if (userGroups[i] === value) {
            userGroups.splice(i, 1);
            //alert(value + " removed");
            console.log(value);
            console.log(userGroups);
            updateGroupList();
            removeFormContents();
            return;
        }
    }
    //alert(value + " does not exist.");
}

// make function to remove form contents so a new one can be added. Make sure it is called when submit button is pressed.
function removeFormContents() 
{
    addRemoveForm = document.getElementById('add-remove-form');
    addRemoveForm.innerHTML = '';
    console.log("remove contents");
}