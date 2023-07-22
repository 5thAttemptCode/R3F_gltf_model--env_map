import React from 'react'

export default function Overlay() {
  return (
    <section>
      <div className="header">
         <h1>UrbanBeatz 2.0</h1>
      </div>
      <div className="text">
        <h2>The brand new UrbanBeatz <span>2.0</span></h2>
        <h2 className='price'>$349</h2>
        <p>Featuring a fully custom acoustic platform. Personalized spatial audio 
          with dynamic head tracking. Fully adaptive Active Noise Cancelling. 
          Transparency mode. Lossless audio.2 Up to 40 hours of battery life1 
          and enhanced Apple and Android compatibility.
        </p>
      </div>
      <div className="click">
        <h3>↖ Double Click</h3>
      </div>
    </section>
  )
}