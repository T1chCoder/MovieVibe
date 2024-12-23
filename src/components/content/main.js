import React, { useState, useEffect } from 'react';

const Desktop = ({ title, poster_url, url, min }) => {
  if (min) {
    return (
      <a href={url} className="cnt ptn-rltv wdth-cvr flx-drt-clmn">
        <div className="pstr wdth-cvr ptn-rltv">
          <span className="cvr ptn-abslt tp-cvr lft-cvr">
            <img src={poster_url} loading="lazy" alt={title} />
          </span>
        </div>
        <div className="dtls wdth-cvr flx-drt-clmn">
          <div className="nm wdth-cvr flx-cntr">
            <h6 className="txt wdth-cvr">{title}</h6>
          </div>
          <div className="dtl wdth-cvr flx-cntr">
            <text className="txt wdth-cvr">Text</text>
          </div>
        </div>
      </a>
    )
  }
  else {
    return (
      <a href={url} className="cnt ptn-rltv wdth-cvr flx-drt-clmn">
        <div className="pstr wdth-cvr ptn-rltv">
          <span className="cvr ptn-abslt tp-cvr lft-cvr">
            <img src={poster_url} loading="lazy" alt={title} />
          </span>
        </div>
        <div className="dtls wdth-cvr flx-drt-clmn">
          <div className="nm wdth-cvr flx-cntr">
            <span className="txt wdth-cvr">{title}</span>
          </div>
          <div className="dtl wdth-cvr flx-cntr">
            <small className="txt wdth-cvr">Text</small>
          </div>
        </div>
      </a>
    )
  }
}

const Tablet = ({ content, min }) => (
  <footer></footer>
)

const Mobile = ({ content, min }) => (
  <footer></footer>
)

const Content = ({ content, min = false }) => {
  const [screenSize, setScreenSize] = useState('mobile');

  const url = `/movie/${content.uuid}`;
  const poster_url = content.poster_url;
  const title = content.title;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setScreenSize('desktop');
      } else if (window.innerWidth >= 768) {
        setScreenSize('tablet');
      } else {
        setScreenSize('mobile');
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (screenSize === 'mobile') {
    return <Mobile title={title} poster_url={poster_url} url={url} min={min} />;
  } else if (screenSize === 'tablet') {
    return <Tablet title={title} poster_url={poster_url} url={url} min={min} />;
  } else {
    return <Desktop title={title} poster_url={poster_url} url={url} min={min} />;
  }
};

export default Content;