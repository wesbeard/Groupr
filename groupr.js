// get group select element
var groupSelect = document.getElementById('groups');
// create map to hold user group data
// each group is going to be an array of tab objects
// user will create a new group and then click add current tabs to group to add tabs to that group

var testGroup = [];

var testGroup2 = new Object();
testGroup2.name = "test";
testGroup2.tabs = testGroup;

var userGroups = [testGroup2];

updateGroupList();
addEventListeners();
updateContextButtons();


function addEventListeners() 
{
    addButton = document.getElementById('add-button');
    removeButton = document.getElementById('remove-button');
    selectMenu = document.getElementById('groups');
    saveButton = document.getElementById('save-button');

    addButton.addEventListener('click', event => addGroupForm());
    removeButton.addEventListener('click', event => removeGroupForm());
    selectMenu.addEventListener('change', event => updateContextButtons());
    saveButton.addEventListener('click', event => saveCurrentTabs());
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
        var group = userGroups[i].name;
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
        if (userGroups[i].name === value) {
            //alert(value + " already exists.");
            removeFormContents();
            return;
        } 
        else if (value.length <= 0) {
            removeFormContents();
            return;
        }
    }
    var newGroup = new Object();
    newGroup.name = value;
    newGroup.tabs = [];

    userGroups.push(newGroup);
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
        if (userGroups[i].name === value) {
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

// get current tabs and save them in an array of objects
function saveCurrentTabs() // maybe add current group as a paramter here so you can search for it in the array and then add tabs to that group
{
    // get currently selected option from dropdown menu
    groupSelect = document.getElementById('groups');
    selectedGroupName = groupSelect.options[groupSelect.selectedIndex].text;
    console.log(userGroups);
    var selectedGroup;
    for (let group of userGroups)
    {
        console.log(group.name);
        if (group.name === selectedGroupName)
        {
            console.log("success");
            selectedGroup = group;
        }
    }

    console.log(selectedGroup);

    var currentTabs = browser.tabs.query({ currentWindow: true }); // browser keyword is only available in extensions so debugging is hard
    // however, if you hit inspect button on firefox debug page you can navigate to the console
    currentTabs.then((tabs) => {
        console.log(currentTabs);
        for (let tab of tabs) {
            console.log(tab.title);
            console.log(tab.url);
            //console.log();

            // add counter and make new tab object for each tab and add them to an array of tabs
            var userTab = new Object();
            userTab.url = tab.url;
            userTab.title = tab.title;
            userTab.pinned = tab.pinned;
            selectedGroup.tabs.push(userTab);
        }
        console.log(userGroups); // might have to make this an object too so you can store name of group and then the actual array of saved tabs
    })
}