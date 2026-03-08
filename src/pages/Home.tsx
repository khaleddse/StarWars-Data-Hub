import React from 'react';
import startWarsImage from '../assets/start_wars.jpeg';

function Home() {
  return (
    <div>
      <img
        src={startWarsImage}
        style={{
          width: "100%",
          height: "100vh",
          objectFit: "cover"
        }}
      />
    </div>
  );
}

export default Home;