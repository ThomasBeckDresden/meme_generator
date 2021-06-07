import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [memes, setMemes] = useState();
  const [captions, setCaptions] = useState();
  useEffect(() => {
    const fetchPictures = async () => {
      try {
        const {
          data: { data: dataImgflip },
        } = await axios.get("https://api.imgflip.com/get_memes");
        console.log(dataImgflip);
        setMemes(dataImgflip);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchPictures();
  }, []);

  return (
    <div>
      <header>
        <h1>I can has memes!</h1>
      </header>
      <main>
        <form>
          <fieldset>
            <input placeholder="Upper caption" name="upperCaption"></input>
            <input placeholder="Lower caption" name="lowerCaption"></input>
          </fieldset>
          <fieldset>
            <button name="changePicture">Change picture</button>
            <button name="loadPicture">Load picture</button>
            <button name="generateMeme" type="submit">
              Generate Meme
            </button>
          </fieldset>
        </form>
        {memes && (
          <section className="captionSection">
            <img src={memes.memes[1].url}></img>
            <div className="upperCaption">Upper caption</div>
            <div className="lowerCaption">
              Lower caption
              <br />
              kfjdskfjkdsjfksj
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
