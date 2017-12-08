"use strict";

var ImageList = function ImageList(props) {
    if (props.domos.length === 0) {
        return React.createElement(
            "div",
            { className: "imageList" },
            React.createElement(
                "h3",
                { className: "emptyImage" },
                "No images, be the first to submit one!"
            )
        );
    }

    var imageNodes = props.imagess.map(function (image) {});

    return React.createElement(
        "div",
        { className: "imageList" },
        imageNodes
    );
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

var loadImagesFromServer = function loadImagesFromServer() {
    sendAjax('GET', '/getImages', null, function (data) {
        ReactDOM.render(React.createElement(ImageList, { images: data.images }), document.querySelector("#images"));
    });
};

var getPassChangeForm = function getPassChangeForm() {
    ReactDOM.render(React.createElement(PassChangeForm, null), document.querySelector("#images"));
};

var setup = function setup() {
    ReactDOM.render(React.createElement(ImageList, { domos: [] }), document.querySelector("#images"));
    var appButton = document.querySelector("#appButton");
    var changeButton = document.querySelector("#changeButton");

    appButton.addEventListener("click", function (e) {
        e.preventDefault();
        loadImagesFromServer();
        return false;
    });

    changeButton.addEventListener("click", function (e) {
        e.preventDefault();
        getPassChangeForm();
        return false;
    });

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
