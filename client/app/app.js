const handleImage = (e) => {
    e.preventDefault();

    if($("#imageName").val() == '' || $("#imageDesc").val() == '') {
        handleError("All fields are required");
        return false;
    };

    sendAjax('POST', $("#imageForm").attr("action"), $("#imageForm").serialize(), function() {
        loadImagesFromServer();
    });

    return false;
};

const handlePassChange = (e) => {
    e.preventDefault();
    
        if($("#curr").val() == '' || $("#pass").val() == ''|| $("#pass2").val() == '') {
            handleError("All fields are required");
            return false;
        }
    
        if($("#pass").val() !== $("#pass2").val()) {
            handleError("Passwords do not match");
            return false;
        }
    
        sendAjax('POST', $("#passChangeForm").attr("action"), $("#passChangeForm").serialize(), redirect);
    

    return false;
};

const handleDelete = () => {
    sendAjax('GET', "/delete", null, redirect);
    return false;
};

const ImageForm = () => {
    return (
        <form id="imageForm"
              onSubmit={handleImage}
              name="imageForm"
              action="/app"
              method="POST"
              className="imageForm"
        >
            <label htmlFor="name">Name: </label>
            <input id="imageName" type="text" name="name" placeholder="Image Name"/>
            <br/>
            <label htmlFor="desc">Description: </label>
            <br/>
            <textArea id="imageDesc" rows="4" cols="50" name="desc">Enter Description Here</textArea>
            <br/>
            <br/>
            <input className="makeImageSubmit" type="submit" value="Upload" />
        </form>
    );
};

const ImageList = function(props) {
    console.dir(props);
    if(props.images.length === 0) {
        return (
            <div className="imageList">
                <h3 className="emptyImage">No images, why don't you try submitting one?</h3>
            </div>
        );
    }

    const imageNodes = props.images.map(function(image) {
        return(
        <div className="image">
            <img src="assets/img/photograph.png" width='120' height='120' alt='Placeholder Image'/>
            <br/>
            <h3 className="pictureName">{image.name}</h3><br/>
            <p className="pictureDesc">{image.description}</p><br/>
            <p className="pictureOwner">{image.user}</p>
        </div>
        )
    });

    return (
        <div className="imageList">
            {imageNodes}
        </div>
    );
};

const PremiumIcon = function(props) {
    if(props.status == true){
        return(
            <img src="/assets/img/premium-icon.png" width='160' height='80' alt='Premium User'/>
        );
    }
    else{
        return (
            <img src="/assets/img/not-premium-icon.png" width='160' height='80' alt='Regular User'/>
        );
    }
}

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

const RemoveChoice = () => {
    return (
        <div>
            <h1>Are you sure you want to delete your account?</h1>
            <form onSubmit={loadImagesFromServer}>
            <input type="submit" value="No" />
            </form>
            <form onSubmit={handleDelete}>
            <input type="submit" value="Yes" />
            </form>
        </div>
    )
};

const loadImagesFromServer = () => {
    sendAjax('GET', '/getImages', null, (data) => {
        ReactDOM.render(
            <ImageList images={data.images} />, document.querySelector("#images")
        );
    });
};

const loadUserImagesFromServer = () => {
    sendAjax('GET', '/getMyImages', null, (data) => {
        ReactDOM.render(
            <ImageList images={data.images} />, document.querySelector("#images")
        );
    });
};

const getUploadForm = () => {
    ReactDOM.render(
    <ImageForm/>, document.querySelector("#images")
    );
};

const getPassChangeForm = () => {
    ReactDOM.render(
    <PassChangeForm/>, document.querySelector("#images")
    );
};

const getDeleteForm = () => {
    ReactDOM.render(
    <RemoveChoice/>, document.querySelector("#images")
    );
};

const getPremiumStatus = () => {
    sendAjax('GET', '/query', null, (data) => {
        ReactDOM.render(
            <PremiumIcon status={data.premium} />, document.querySelector("#premiumUser")
        );
    });
};

const setup = function() {
    ReactDOM.render(
        <ImageList images={[]} />, document.querySelector("#images")
    );
    const appButton = document.querySelector("#appButton");
    const imageButton = document.querySelector("#imageButton");
    const uploadButton = document.querySelector("#uploadButton");
    const changeButton = document.querySelector("#changeButton");
    const deleteButton = document.querySelector("#deleteButton");

    appButton.addEventListener("click", (e) => {
        e.preventDefault();
        loadImagesFromServer();
        return false;
    });

    imageButton.addEventListener("click", (e) => {
        e.preventDefault();
        loadUserImagesFromServer();
        return false;
    });

    uploadButton.addEventListener("click", (e) => {
        e.preventDefault();
        getUploadForm();
        return false;
    });

    changeButton.addEventListener("click", (e) => {
        e.preventDefault();
        getPassChangeForm();
        return false;
    });

    deleteButton.addEventListener("click", (e) => {
        e.preventDefault();
        getDeleteForm();
        return false;
    });

    getPremiumStatus();
    loadImagesFromServer();
};

$(document).ready(function() {
    setup();
});
