import { useState, Suspense } from "react";
import { Canvas } from '@react-three/fiber';
import Scene from './Scene';

export default function SceneComponent() {
    const [count, setCount] = useState(0)

    return (
        <Canvas>
            <ambientLight />
            <Suspense fallback={null}>
                <Scene />
            </Suspense>
        </Canvas>
    );
}