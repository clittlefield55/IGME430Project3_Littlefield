const ImageList = function(props) {
    if(props.domos.length === 0) {
        return (
            <div className="imageList">
                <h3 className="emptyImage">No images, be the first to submit one!</h3>
            </div>
        );
    }

    const imageNodes = props.imagess.map(function(image) {
        
    });

    return (
        <div className="imageList">
            {imageNodes}
        </div>
    );
};

const PassChangeForm = () => {
    return (
        <form id="passChangeForm"
              name="passChangeForm"
              onSubmit={handlePassChange}
              action="/newPass"
              method="POST"
              className="mainForm"
        >
        <label htmlFor="current">Current Password: </label>
        <input id="user" type="password" name="current" placeholder="current" />
        <label htmlFor="pass">New Password: </label>
        <input id="pass" type="password" name="pass" placeholder="password" />
        <label htmlFor="pass2">New Password: </label>
        <input id="pass2" type="password" name="pass2" placeholder="retype password" />
        <input className="formSubmit" type="submit" value="Submit" />
       </form>
    )
};

const loadImagesFromServer = () => {
    sendAjax('GET', '/getImages', null, (data) => {
        ReactDOM.render(
            <ImageList images={data.images} />, document.querySelector("#images")
        );
    });
};

const getPassChangeForm = () => {
    ReactDOM.render(
    <PassChangeForm/>, document.querySelector("#images")
    );
};

const setup = function() {
    ReactDOM.render(
        <ImageList domos={[]} />, document.querySelector("#images")
    );
    const appButton = document.querySelector("#appButton");
    const changeButton = document.querySelector("#changeButton");

    appButton.addEventListener("click", (e) => {
        e.preventDefault();
        loadImagesFromServer();
        return false;
    });

    changeButton.addEventListener("click", (e) => {
        e.preventDefault();
        getPassChangeForm();
        return false;
    });

    loadImagesFromServer();
};

$(document).ready(function() {
    setup();
});
