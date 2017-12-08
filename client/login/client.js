const handleLogin = (e) => {
    e.preventDefault();

    if($("#user").val() == '' || $("#pass").val() == '') {
        handleError("Username or password is empty");
        return false;
    }

    sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);

    return false;
};

const handleSignup = (e) => {
    e.preventDefault();

    if($("#user").val() == '' || $("#pass").val() == ''|| $("#pass2").val() == '') {
        handleError("All fields are required");
        return false;
    }

    if($("#pass").val() !== $("#pass2").val()) {
        handleError("Passwords do not match");
        return false;
    }

    sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);

    return false;
};

const LoginWindow = () => {
    return(
        <form id="loginForm" name="loginForm"
              onSubmit={handleLogin}
              action="/login"
              method="POST"
              className="mainForm"
        >
        <label htmlFor="username">Username: </label>
        <input id="user" type="text" name="username" placeholder="username"/>
        <label htmlFor="pass">Password: </label>
        <input id="pass" type="password" name="pass" placeholder="password"/>
        <input className="formSubmit" type="submit" value="Sign in" />

        </form>
    );
};

const SignupWindow = () => {
    return (
        <form id="signupForm"
              name="signupForm"
              onSubmit={handleSignup}
              action="/signup"
              method="POST"
              className="mainForm"
        >
        <label htmlFor="username">Username: </label>
        <input id="user" type="text" name="username" placeholder="username" />
        <label htmlFor="pass">Password: </label>
        <input id="pass" type="password" name="pass" placeholder="password" />
        <label htmlFor="pass2">Password: </label>
        <input id="pass2" type="password" name="pass2" placeholder="retype password" />
        <label htmlFor="standard">Standard Account (Free)</label>
        <input id="standard" name="vipAccount" type="radio" value="false" checked /> 
        <label htmlFor="premium">Premium Account ($19.95 a month)</label>
        <input id="premium" name="vipAccount" type="radio" value="true"/>
        <input className="formSubmit" type="submit" value="Sign Up" />
       </form>
    )
};

const createLoginWindow = (csrf) => {
    ReactDOM.render(
        <LoginWindow/>,
        document.querySelector("#content")
    );
};

const createSignupWindow = (csrf) => {
    ReactDOM.render(
        <SignupWindow/>,
        document.querySelector("#content")
    );
};

const setup = () => {
    const loginButton = document.querySelector("#loginButton");
    const signupButton = document.querySelector("#signupButton");

    signupButton.addEventListener("click", (e) => {
        e.preventDefault();
        createSignupWindow();
        return false;
    });

    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        createLoginWindow();
        return false;
    });

    createLoginWindow(); //default view
};


$(document).ready(function() {
    setup();
});