// get group select element
var groupSelect = document.getElementById('groups');
// create array to hold user's groups
var userGroups = ["Work", "Class", "Entertainment", "Hello"];
updateGroupList();
addEventListeners();

// update group list
function updateGroupList()
{ 
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
        option.value = group;
        groupSelect.appendChild(option);
    }
}

function addEventListeners() {
    addButton = document.getElementById('add-button');
    removeButton = document.getElementById('remove-button');

    addButton.addEventListener('click', event => addGroupForm());
    removeButton.addEventListener('click', event => addGroupForm());
}

// remember to add a check later to see if added group exists or removed group does not
// then complete the add and remove functions
// also think about removing form data after submitted???

// insert form for user to add group
function addGroupForm() 
{
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
    label.innerHTML = "Enter New Group Name: ";
    
    // create input box
    var group = document.createElement('input');
    group.setAttribute("type", "text");
    group.setAttribute("id", "groupValue");
    group.setAttribute("name", "groupName");

    // create button to submit group
    var submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.setAttribute("value", "Submit");
    submit.setAttribute("onclick", "addGroup()");
    //onclick = "addGroup(group)";

    // append elements to form
    addForm.appendChild(label);
    addForm.appendChild(group);
    addForm.appendChild(submit);

    console.log("add form end");
}

// insert form for user to remove group
function removeGroupForm() 
{
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
    label.innerHTML = "Enter Group Name to be Removed: ";

    // create input box
    var group = document.createElement('input');
    group.setAttribute("type", "text");
    group.setAttribute("id", "groupValue");
    group.setAttribute("name", "groupName");

    // create button to submit group
    var submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.setAttribute("value", "Submit");
    submit.setAttribute("onclick", "removeGroup()");
    //onclick = removeGroup(group);

    // append elements to form
    removeForm.appendChild(label);
    removeForm.appendChild(group);
    removeForm.appendChild(submit);

    console.log("remove form end");
}

// add the given group to group array
function addGroup()
{
    value = document.getElementById('groupValue').value;
    console.log(value);
    for (var i = 0; i < userGroups.length; i++)
    {
        if (userGroups[i] === value) {
            alert(value + " already exists.");
            return;
        }
    }
    userGroups.push(group);
    console.log(userGroups);
    alert(value + " added");
    updateGroupList();
}

// remove the given group from group array
function removeGroup()
{
    value = document.getElementById('groupValue').value;
    console.log(value);
    for (var i = 0; i < userGroups.length; i++)
    {
        if (userGroups[i] === value) {
            userGroups.splice(i, 1);
            alert(value + " removed");
            updateGroupList();
            return;
        }
    }
    alert(value + " does not exist.");
}