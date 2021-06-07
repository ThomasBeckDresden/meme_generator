import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [memes, setMemes] = useState();
  const [captions, setCaptions] = useState({
    upperCaption: "the upper caption goes here",
    lowerCaption: "your lower caption goes here",
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
    // console.log(e.target.name);
    //console.log(e.target.form.upperCaption.value);
    setCaptions({ ...captions, [e.target.name]: e.target.value });
  };

  const handleUploadFile = (e) => {
    console.log("hello");
    URL.revokeObjectURL(activeMeme.url);
    const userURL = URL.createObjectURL(e.target.files[0]);
    console.log(userURL);
    setActiveMeme({ url: userURL });
  };

  const handleUploadClick = (e) => {
    e.preventDefault();
    //console.log(e.target.form.fileElem);
    const fileElem = e.target.form.fileElem;
    fileElem.click();
  };

  return (
    <div className="mainContainer">
      <header>
        <h1>I can has memes!</h1>
      </header>
      <main className="generatorContainer">
        <form>
          <fieldset onChange={handleChange} className="inputs">
            <input
              placeholder="Upper caption"
              name="upperCaption"
              value={captions.upperCaption}
            ></input>
            <input
              placeholder="Lower caption"
              name="lowerCaption"
              value={captions.lowerCaption}
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
            <button name="generateMeme">Generate Meme</button>
          </fieldset>
        </form>
        {activeMeme && (
          <section className="captionSection">
            <img src={activeMeme.url} className="meme"></img>
            <div className="upperCaption">{captions.upperCaption}</div>
            <div className="lowerCaption">{captions.lowerCaption}</div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
