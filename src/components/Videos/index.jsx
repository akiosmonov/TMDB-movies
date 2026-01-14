import axios from "axios";
import React, { useEffect, useState } from "react";
import { api_key } from "../../API";

const Videos = ({ videosId }) => {
  const [video, setVideo] = useState([]);
  async function getVideo(key) {
    let res = await axios(
      `https://api.themoviedb.org/3/movie/${videosId}/videos?api_key=${key}&language=ru-RU`
    );
    let { results } = res.data;
    setVideo(results);
  }
  useEffect(() => {
    getVideo(api_key);
  }, [videosId]);

  return (
    <div id="videos">
      <div className="container">
        <div className="videos">
          {video.length > 0 ? (
            video.map((el) => (
              <div key={el.id} className="videos--card">
                <iframe
                  width="400"
                  height="250"
                  src={`https://www.youtube.com/embed/${el.key}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              </div>
            ))
          ) : (
            <p style={{ color: "gray" }}>Видеоматериалы отсутствуют</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Videos;
