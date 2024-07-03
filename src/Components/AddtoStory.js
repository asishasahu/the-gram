import React from "react";

function AddtoStory() {
  return (
    <div>
      <div className="addToStoryDetails">
        <p className="closeAddToStory">X</p>
        <h4 className="addToStory">Add to story</h4>
      </div>
      <div className="cameraPhotoIcons">
        <img src="camera-icon.png" width="8%"></img>
        <img src="photos-icon.png" width="7%"></img>
      </div>
      <div className="cameraPhotoTexts">
        <h5 className="cameraUpload">Camera</h5>
        <h5 className="photosUpload">Photos</h5>
      </div>
      <div className="recentSelectDetails">
        <h4 className="recentsAddToStory">Recents</h4>
        <button className="selectAddToStory">Select</button>
      </div>
      <div>
        <img src="bird.png" width="33%" height="150px"></img>
        <img src="bird.png" width="33%" height="150px"></img>
        <img src="bird.png" width="33%" height="150px"></img>
        <img src="bird.png" width="33%" height="150px"></img>
        <img src="bird.png" width="33%" height="150px"></img>
        <img src="bird.png" width="33%" height="150px"></img>
        <img src="bird.png" width="33%" height="150px"></img>
        <img src="bird.png" width="33%" height="150px"></img>
        <img src="bird.png" width="33%" height="150px"></img>
      </div>
    </div>
  );
}

export default AddtoStory;
