import { useState, Suspense } from "react";
import { Canvas } from '@react-three/fiber';
import Person0Idle from "./Person0Idle";

export default function Person0jumpComponent() {

    return (
        <Canvas>
            <ambientLight />
            <Suspense fallback={null}>
                <Person0Idle />
            </Suspense>
        </Canvas>
    );
}