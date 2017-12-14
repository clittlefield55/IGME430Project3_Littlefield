"use strict";

var handleImage = function handleImage(e) {
    e.preventDefault();

    if ($("#imageName").val() == '' || $("#imageDesc").val() == '') {
        handleError("All fields are required");
        return false;
    };

    sendAjax('POST', $("#imageForm").attr("action"), $("#imageForm").serialize(), function () {
        loadImagesFromServer();
    });

    return false;
};

var handlePassChange = function handlePassChange(e) {
    e.preventDefault();

    if ($("#curr").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
        handleError("All fields are required");
        return false;
    }

    if ($("#pass").val() !== $("#pass2").val()) {
        handleError("Passwords do not match");
        return false;
    }

    sendAjax('POST', $("#passChangeForm").attr("action"), $("#passChangeForm").serialize(), redirect);

    return false;
};

var handleDelete = function handleDelete() {
    sendAjax('GET', "/delete", null, redirect);
    return false;
};

var ImageForm = function ImageForm() {
    return React.createElement(
        "form",
        { id: "imageForm",
            onSubmit: handleImage,
            name: "imageForm",
            action: "/app",
            method: "POST",
            className: "imageForm"
        },
        React.createElement(
            "label",
            { htmlFor: "name" },
            "Name: "
        ),
        React.createElement("input", { id: "imageName", type: "text", name: "name", placeholder: "Image Name" }),
        React.createElement("br", null),
        React.createElement(
            "label",
            { htmlFor: "desc" },
            "Description: "
        ),
        React.createElement("br", null),
        React.createElement(
            "textArea",
            { id: "imageDesc", rows: "4", cols: "50", name: "desc" },
            "Enter Description Here"
        ),
        React.createElement("br", null),
        React.createElement("br", null),
        React.createElement("input", { className: "makeImageSubmit", type: "submit", value: "Upload" })
    );
};

var ImageList = function ImageList(props) {
    console.dir(props);
    if (props.images.length === 0) {
        return React.createElement(
            "div",
            { className: "imageList" },
            React.createElement(
                "h3",
                { className: "emptyImage" },
                "No images, why don't you try submitting one?"
            )
        );
    }

    var imageNodes = props.images.map(function (image) {
        return React.createElement(
            "div",
            { className: "image" },
            React.createElement("img", { src: "assets/img/photograph.png", width: "120", height: "120", alt: "Placeholder Image" }),
            React.createElement("br", null),
            React.createElement(
                "h3",
                { className: "pictureName" },
                image.name
            ),
            React.createElement("br", null),
            React.createElement(
                "p",
                { className: "pictureDesc" },
                image.description
            ),
            React.createElement("br", null),
            React.createElement(
                "p",
                { className: "pictureOwner" },
                image.user
            )
        );
    });

    return React.createElement(
        "div",
        { className: "imageList" },
        imageNodes
    );
};

var PremiumIcon = function PremiumIcon(props) {
    if (props.status == true) {
        return React.createElement("img", { src: "/assets/img/premium-icon.png", width: "160", height: "80", alt: "Premium User" });
    } else {
        return React.createElement("img", { src: "/assets/img/not-premium-icon.png", width: "160", height: "80", alt: "Regular User" });
    }
};

var PassChangeForm = function PassChangeForm() {
    return React.createElement(
        "form",
        { id: "passChangeForm",
            name: "passChangeForm",
            onSubmit: handlePassChange,
            action: "/newPass",
            method: "POST",
            className: "mainForm"
        },
        React.createElement(
            "label",
            { htmlFor: "current" },
            "Current Password: "
        ),
        React.createElement("input", { id: "user", type: "password", name: "current", placeholder: "current" }),
        React.createElement(
            "label",
            { htmlFor: "pass" },
            "New Password: "
        ),
        React.createElement("input", { id: "pass", type: "password", name: "pass", placeholder: "password" }),
        React.createElement(
            "label",
            { htmlFor: "pass2" },
            "New Password: "
        ),
        React.createElement("input", { id: "pass2", type: "password", name: "pass2", placeholder: "retype password" }),
        React.createElement("input", { className: "formSubmit", type: "submit", value: "Submit" })
    );
};

var RemoveChoice = function RemoveChoice() {
    return React.createElement(
        "div",
        null,
        React.createElement(
            "h1",
            null,
            "Are you sure you want to delete your account?"
        ),
        React.createElement(
            "form",
            { onSubmit: loadImagesFromServer },
            React.createElement("input", { type: "submit", value: "No" })
        ),
        React.createElement(
            "form",
            { onSubmit: handleDelete },
            React.createElement("input", { type: "submit", value: "Yes" })
        )
    );
};

var loadImagesFromServer = function loadImagesFromServer() {
    sendAjax('GET', '/getImages', null, function (data) {
        ReactDOM.render(React.createElement(ImageList, { images: data.images }), document.querySelector("#images"));
    });
};

var loadUserImagesFromServer = function loadUserImagesFromServer() {
    sendAjax('GET', '/getMyImages', null, function (data) {
        ReactDOM.render(React.createElement(ImageList, { images: data.images }), document.querySelector("#images"));
    });
};

var getUploadForm = function getUploadForm() {
    ReactDOM.render(React.createElement(ImageForm, null), document.querySelector("#images"));
};

var getPassChangeForm = function getPassChangeForm() {
    ReactDOM.render(React.createElement(PassChangeForm, null), document.querySelector("#images"));
};

var getDeleteForm = function getDeleteForm() {
    ReactDOM.render(React.createElement(RemoveChoice, null), document.querySelector("#images"));
};

var getPremiumStatus = function getPremiumStatus() {
    sendAjax('GET', '/query', null, function (data) {
        ReactDOM.render(React.createElement(PremiumIcon, { status: data.premium }), document.querySelector("#premiumUser"));
    });
};

var setup = function setup() {
    ReactDOM.render(React.createElement(ImageList, { images: [] }), document.querySelector("#images"));
    var appButton = document.querySelector("#appButton");
    var imageButton = document.querySelector("#imageButton");
    var uploadButton = document.querySelector("#uploadButton");
    var changeButton = document.querySelector("#changeButton");
    var deleteButton = document.querySelector("#deleteButton");

    appButton.addEventListener("click", function (e) {
        e.preventDefault();
        loadImagesFromServer();
        return false;
    });

    imageButton.addEventListener("click", function (e) {
        e.preventDefault();
        loadUserImagesFromServer();
        return false;
    });

    uploadButton.addEventListener("click", function (e) {
        e.preventDefault();
        getUploadForm();
        return false;
    });

    changeButton.addEventListener("click", function (e) {
        e.preventDefault();
        getPassChangeForm();
        return false;
    });

    deleteButton.addEventListener("click", function (e) {
        e.preventDefault();
        getDeleteForm();
        return false;
    });

    getPremiumStatus();
    loadImagesFromServer();
};

$(document).ready(function () {
    setup();
});
"use strict";

var handleError = function handleError(message) {
    $("#errorMessage").text(message);
};

var redirect = function redirect(response) {
    window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: function error(xhr, status, _error) {
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    });
};
