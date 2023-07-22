import React, { useEffect, useRef, useState } from 'react'
import { Ear } from './Ear'
import * as THREE from "three"
import { CameraControls, Environment, MeshPortalMaterial, RoundedBox, Text, useCursor, useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { easing } from "maath";




export default function Experience() {

  const [ openScene, setOpenScene ] = useState(null)
  const [ hovered, setHovered ] = useState(null)
  useCursor(hovered)
  const controlsRef = useRef()
  const scene = useThree((state) => state.scene)

  useEffect(() => {
    if(openScene) {
      const targetPosition = new THREE.Vector3()
      scene.getObjectByName(openScene).getWorldPosition(targetPosition)
      controlsRef.current.setLookAt(0, 0, 5, targetPosition.x, targetPosition.y, targetPosition.z, true)
    } else{
      controlsRef.current.setLookAt(0, 0, 10, 0, 0, 0, true)

    }
  }, [openScene])

  return (
    <>
         <ambientLight intensity={0.5} />
          <Environment preset="sunset" />
          <CameraControls ref={controlsRef} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
          <EarPhoneScene 
            texture={"./public/Map.jpg"} 
            rotation-y={-0.3}
            name="UrbanBeatz"
            color= "blue"
            openScene={openScene}
            setOpenScene={setOpenScene}
            hovered={hovered}
            setHovered={setHovered}
            onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}
          >
            <Ear scale={0.9} position-y={-1.2}/>
          </EarPhoneScene>
    </>
  )
}

const EarPhoneScene = ({ children, texture, openScene, setOpenScene, name, color, ...props }) => {

  const map = useTexture(texture)
  const portalMaterial = useRef()

  useFrame((_state, delta) => {
    const sceneOpen = openScene === name
    easing.damp(portalMaterial.current, "blend", sceneOpen ? 1 : 0, 0.3, delta)
  })

  const earRef = useRef()
  useFrame(() => {
    earRef.current.rotation.y += 0.005;
  });

  return(
    <group {...props} ref={earRef} >
      <Text font="Font2.otf" fontSize={0.4} position={[ 0, -1.8, .2]} anchorY={"bottom"} >
        {name}
        <meshBasicMaterial color={color} toneMapped={false} />
      </Text>
      <RoundedBox name={name} args={[3, 4, 0.3]} onDoubleClick={() => setOpenScene(openScene === name ? null : name)}>
        <MeshPortalMaterial side={THREE.DoubleSide} ref={portalMaterial}>
          <ambientLight intensity={1} />
          <Environment preset="sunset" />
          {children}
          <mesh>
            <sphereGeometry args={[6, 64, 64]} />
            <meshStandardMaterial  map={map} side={THREE.BackSide}/>
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
    </group>
  )
}