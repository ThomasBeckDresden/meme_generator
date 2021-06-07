import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import domtoimage from "dom-to-image";

function App() {
  const [memes, setMemes] = useState();
  const [captions, setCaptions] = useState({
    upperCaption: "",
    lowerCaption: "",
  });
  const [activeMeme, setActiveMeme] = useState();
  const [userUpload, setUserUpload] = useState();

  useEffect(() => {
    const fetchPictures = async () => {
      try {
        const {
          data: {
            data: { memes: dataImgflip },
          },
        } = await axios.get("https://api.imgflip.com/get_memes");

        // do sth with dataImgflip
        setMemes(dataImgflip);
        setActiveMeme(dataImgflip[0]);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchPictures();
  }, []);

  // 1st option => map over each meme and add a isActive property ==> complicated
  // 2nd option => have an activeMeme state and put a random meme inside ==> simple

  const onChangePicture = (e) => {
    e.preventDefault();
    console.log(memes[3]);
    setActiveMeme(memes[Math.floor(Math.random() * 100)]);
  };
  const handleChange = (e) => {
    console.log(e.key);
    if (e.key === "Enter") {
      e.preventDefault();
      return false;
    }
    //console.log(e.target.form.upperCaption.value);
    setCaptions({ ...captions, [e.target.name]: e.target.value });
  };

  const handleUploadFile = (e) => {
    //console.log("hello");

    const userURL = URL.createObjectURL(e.target.files[0]);
    //console.log(userURL);
    setActiveMeme({ url: userURL });
  };

  const handleUploadClick = (e) => {
    e.preventDefault();
    //console.log(e.target.form.fileElem);
    const fileElem = e.target.form.fileElem;
    fileElem.click();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleGenerate = (e) => {
    console.log(e.target.form.memePreview);
    domtoimage
      .toJpeg(e.target.form.memePreview, { quality: 0.95 })
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = "my-image-name.jpeg";
        link.href = dataUrl;
        link.click();
      });
  };

  return (
    <div className="mainContainer">
      <header>
        <h1>I can has memes!</h1>
      </header>
      <main className="generatorContainer">
        <form onSubmit={handleSubmit}>
          <fieldset className="inputs">
            <input
              placeholder="Upper caption"
              name="upperCaption"
              value={captions.upperCaption}
              onChange={handleChange}
              onKeyPress={handleChange}
            ></input>
            <input
              placeholder="Lower caption"
              name="lowerCaption"
              value={captions.lowerCaption}
              onChange={handleChange}
              onKeyPress={handleChange}
            ></input>
          </fieldset>
          <fieldset>
            <button name="changePicture" onClick={onChangePicture}>
              Change picture
            </button>
            <input
              onChange={handleUploadFile}
              type="file"
              name="fileElem"
              multiple
              accept="image/*"
              style={{ display: "none" }}
            />
            <button name="loadPicture" onClick={handleUploadClick}>
              Load picture
            </button>
            <button name="generateMeme" onClick={handleGenerate}>
              Generate Meme
            </button>
          </fieldset>
          {activeMeme && (
            <fieldset name="memePreview" className="captionSection">
              <img src={activeMeme.url} className="meme"></img>
              <div className="upperCaption">{captions.upperCaption}</div>
              <div className="lowerCaption">{captions.lowerCaption}</div>
            </fieldset>
          )}
        </form>
      </main>
    </div>
  );
}

export default App;
