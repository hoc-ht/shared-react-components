import React, { useCallback, useState } from 'react';

function App() {
  const [filmStripHeight, setFilmStripHeight] = useState(200); // initial film strip height
  const totalHeight = 800; // total height (film-strip + preview-area)

  const handleMouseMove = useCallback((e) => {
    const container = document.querySelector('.resize-container');
    const containerRect = container.getBoundingClientRect();
    const newFilmStripHeight = Math.min(
      Math.max(totalHeight - (e.clientY - containerRect.top), 50),
      totalHeight - 50
    ); // limit height between 50px and totalHeight - 50px
    setFilmStripHeight(newFilmStripHeight);
  }, [totalHeight]);

  const handleMouseUp = useCallback(() => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.body.classList.remove('disable-selection'); // Remove the class when drag ends
  }, [handleMouseMove]);

  const handleMouseDown = useCallback(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.classList.add('disable-selection'); // Add the class to disable text selection
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div className="App resize-container" style={{ height: totalHeight }}>
      <div
        className="preview-area"
        style={{ height: totalHeight - filmStripHeight + 'px' }}
      ></div>
      <div className="resizable-element">
        <div
          className="resize-handler"
          onMouseDown={handleMouseDown}
        ></div>
        <div
          className="film-strip"
          style={{ height: filmStripHeight + 'px' }}
        >
          <div className="film-strip-item">
            <img src="https://placehold.co/600x1400" alt="img1" />
            <div className="file-name">abc_23423_324234_234234234.jpg</div>
          </div>
          <div className="film-strip-item">
            <img src="https://placehold.co/1600x400" alt="img2" />
            <div className="file-name">abc_23423_324234_234234234.jpg</div>
          </div>
          <div className="film-strip-item">
            <img src="https://placehold.co/600x2400" alt="img3" />
            <div className="file-name">abc_23423_324234_234234234.jpg</div>
          </div>
          <div className="film-strip-item">
            <img src="https://placehold.co/1600x400" alt="img4" />
            <div className="file-name">abc_23423_324234_234234234.jpg</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
