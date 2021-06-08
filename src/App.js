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
  //const [userUpload, setUserUpload] = useState();

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
        setActiveMeme(dataImgflip[1]);
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
    <div className="mainContainer  justify-content-center">
      <div className="row justify-content-center">
        <header className="col-auto">
          <h1 className="pt-3">I can has memes!</h1>
        </header>
      </div>
      <main className="generatorContainer row justify-content-center">
        <form onSubmit={handleSubmit}>
          <div className="row justify-content-center">
            <fieldset className="inputs col-auto">
              <input
                placeholder="Upper caption"
                name="upperCaption"
                value={captions.upperCaption}
                onChange={handleChange}
                onKeyPress={handleChange}
                className="col-auto m-3 p-2 border"
              ></input>
              <input
                placeholder="Lower caption"
                name="lowerCaption"
                value={captions.lowerCaption}
                onChange={handleChange}
                onKeyPress={handleChange}
                className="col-auto m-3 p-2 border"
              ></input>
            </fieldset>
          </div>
          <div className="row justify-content-center">
            <fieldset className="col-auto">
              <button
                className="col-auto btn-primary rounded fs-3 p-2 m-4"
                name="changePicture"
                onClick={onChangePicture}
              >
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
              <button
                className="col-auto btn-primary rounded fs-3 p-2 m-4"
                name="loadPicture"
                onClick={handleUploadClick}
              >
                Load picture
              </button>
              <button
                className="col-auto btn-primary rounded fs-3 p-2 m-4"
                name="generateMeme"
                onClick={handleGenerate}
              >
                Generate Meme
              </button>
            </fieldset>
          </div>
          {activeMeme && (
            <div className="row justify-content-center">
              <fieldset
                name="memePreview"
                className="captionSection justify-content-center col-auto "
              >
                <img
                  src={activeMeme.url}
                  className="meme"
                  alt="meme not here?"
                />
                <div className="row justify-content-center upperCaption memeText ">
                  <p>{captions.upperCaption}</p>
                </div>
                <div className="lowerCaption memeText">
                  <p>{captions.lowerCaption}</p>
                </div>
              </fieldset>
            </div>
          )}
        </form>
      </main>
    </div>
  );
}

export default App;
