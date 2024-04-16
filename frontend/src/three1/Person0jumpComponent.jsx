import { useState, Suspense } from "react";
import { Canvas } from '@react-three/fiber';
import Person0jump from "./Person0jump";

export default function Person0jumpComponent() {
    // const [count, setCount] = useState(0)
    // useEffect(()=>{
    //     actions[""]
    // },[])
    // console.log(actions);
    return (
        <Canvas>
            <ambientLight />
            <Suspense fallback={null}>
                <Person0jump />
            </Suspense>
        </Canvas>
    );
}