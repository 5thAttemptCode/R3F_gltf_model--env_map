import { Canvas } from '@react-three/fiber'
import Experience from './Experience'


export default function RealExperience() {
  return (
    <div className="canvas">
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 30 }} >
        <Experience />
      </Canvas>
    </div>
  )
}