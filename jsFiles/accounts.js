let account = {
    id: "",
    emailAddress:"",
    Username: "",
    Password: "",
    role: ""
};

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

    document.getElementById("EmailAddress").value = "";
    document.getElementById("Username").value = "";
    document.getElementById("Password").value = "";

    alert("Account created successfully!");
};

function CheckAccounts(email, pass){
    let findAccount = listOfAccounts.find(placeHolder =>
        placeHolder.emailAddress === email && placeHolder.password === pass
    );

    if(findAccount){
        alert("Successfully logged In!");
    }
    else{
        alert("Failed to logged In!");
    }
};

function LogInClicked(){
    let email = document.getElementById("LogInEmailAddress").value;
    let pass = document.getElementById("LogInPassword").value;

    CheckAccounts(email, pass);
}

function SignUpClicked(){
    let user = document.getElementById("Username").value;
    let email = document.getElementById("EmailAddress").value;
    let pass = document.getElementById("Password").value;

    signUpNewUSer(user, email, pass);
}