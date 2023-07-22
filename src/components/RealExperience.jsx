import { Canvas } from '@react-three/fiber'
import React from 'react'
import Experience from './Experience'


export default function RealExperience() {
  return (
    <>
          <Canvas shadows camera={{ position: [0, 0, 10], fov: 30 }} >
            <Experience />
          </Canvas>
    </>
  )
}