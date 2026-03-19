let account = {
    id: "",
    emailAddress:"",
    Username: "",
    Password: "",
    role: ""
};

let CurrentAccountLoggedIn = JSON.parse(localStorage.getItem('CurrentAccountLoggedIn')) || null;

let listOfAccounts = JSON.parse(localStorage.getItem('listOfAccounts')) || [];

function signUpNewUSer(user, email, pass){

    if(!user || !email || !pass){
        alert("Please fill in all fields.");
        return;
    } 

    let usernameExist = listOfAccounts.some(placeHolder => placeHolder.username === user);

    let emailAddressExist = listOfAccounts.some(placeHolder => placeHolder.emailAddress === email);

    if(usernameExist){
        alert("Username is already taken. Please use another username. Thank you");
        return;
    }

    if(emailAddressExist){
        alert("The email address that you've putted is already registered! Please try logging in. Thank you");
        return;
    }

    listOfAccounts.push({
        id: Date.now(),
        username: user,
        emailAddress: email,
        password: pass,
        role: "User"
    });

    localStorage.setItem('listOfAccounts', JSON.stringify(listOfAccounts));

    alert("Account created successfully!");

    const modal = document.getElementById("auth_modal");
    if(modal){
        modal.close();
    }
};


function FindAccount(email, pass) {
    let AccountFinding = listOfAccounts.find(placeHolder => 
        placeHolder.emailAddress === email && placeHolder.password === pass
    );
    
    if(AccountFinding){
        CurrentAccountLoggedIn = {
            username: AccountFinding.username,
            email: AccountFinding.emailAddress
        };

        localStorage.setItem('CurrentAccountLoggedIn', JSON.stringify(CurrentAccountLoggedIn));
        alert(`Welcome back, ${CurrentAccountLoggedIn.username}!`);
        return true;
    }
    return false; 
};

function LogInClicked(){
    let email = document.getElementById("LogInEmailAddress").value;
    let pass = document.getElementById("LogInPassword").value;

    let isSuccess = FindAccount(email, pass);

    if (isSuccess) {
        const modal = document.getElementById("auth_modal");
        if(modal){
            modal.close();
        }
    } else {
        alert("Failed to log in! Incorrect email or password.");
    }
    
};

function SignUpClicked(){
    let user = document.getElementById("Username").value;
    let email = document.getElementById("EmailAddress").value;
    let pass = document.getElementById("Password").value;

    signUpNewUSer(user, email, pass);

    document.getElementById("EmailAddress").value = "";
    document.getElementById("Username").value = "";
    document.getElementById("Password").value = "";
}; 


function CheckedCurrentAccount(){
    if(CurrentAccountLoggedIn){
        
    }
};


// Needs to be fixed later especially the Safety Check
function handleAvatarClick(){

    const currentUser = JSON.parse(localStorage.getItem("CurrentAccountLoggedIn"));

    if(currentUser){
        document.getElementById("Profile_modal").showModal();
        document.getElementById('displayUsername').textContent = currentUser.username;
    }
    else{
        document.getElementById("auth_modal").showModal();
    }
}


