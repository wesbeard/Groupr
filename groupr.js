// get group select element
var groupSelect = document.getElementById('groups');
// create array to hold user's groups
var userGroups = ["Choose a group", "Work", "Class", "Entertainment", "Hello"];

// loop through the users groups and add them to the dropdown menu
for (var i = 0; i < userGroups.length; i++) 
{
    var group = userGroups[i];
    var option = document.createElement("option");
    option.textContent = group;
    option.value = group;
    groupSelect.appendChild(option);
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
    group.setAttribute("name", "groupName");

    // create button to submit group
    var submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.setAttribute("value", "Submit");
    submit.onclick = "addGroup(group)";
    //setAttribute("onClick", "addGroup(group)");

    // append elements to form
    addForm.appendChild(label);
    addForm.appendChild(group);
    addForm.appendChild(submit);
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
    group.setAttribute("name", "groupName");

    // create button to submit group
    var submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.setAttribute("value", "Submit");
    submit.onclick = "removeGroup(group)";
    //setAttribute("onClick", "removeGroup(group)");

    // append elements to form
    removeForm.appendChild(label);
    removeForm.appendChild(group);
    removeForm.appendChild(submit);
}

// add the given group to group array
function addGroup(group) 
{
    //if (userGroups.find(group)) {
    //    alert(group + " already exists.");
    //} else {
        userGroups.push(group);
        alert(group + " added");
    //}
}

// remove the given group from group array
function removeGroup(group) 
{
    //if (!userGroups.find(group))
    //{
    //    alert(group + " does not exist.");
    //} else {
        userGroups.pop(group);
        alert(group + " removed");
    //}
}