import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import * as THREE from 'three';

const TechParticles = (props) => {
    const ref = useRef();
    // Generate 6000 particles for denser field
    const sphere = useMemo(() => random.inSphere(new Float32Array(6000 * 3), { radius: 1.8 }), []);

    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 15;
        ref.current.rotation.y -= delta / 20;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#06b6d4"
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.8}
                />
            </Points>
        </group>
    );
};

const CyberGrid = () => {
    const ref = useRef();

    useFrame((state, delta) => {
        ref.current.rotation.x += delta / 30;
        ref.current.rotation.y += delta / 30;
    });

    return (
        <group ref={ref}>
            <lineSegments>
                <edgesGeometry args={[new THREE.IcosahedronGeometry(2, 2)]} />
                <lineBasicMaterial color="#4c1d95" transparent opacity={0.1} />
            </lineSegments>
            <lineSegments rotation={[Math.PI / 2, 0, 0]}>
                <edgesGeometry args={[new THREE.IcosahedronGeometry(2.5, 1)]} />
                <lineBasicMaterial color="#0891b2" transparent opacity={0.05} />
            </lineSegments>
        </group>
    )
}

const FloatingProp = ({ position, color, speed }) => {
    return (
        <Float speed={speed} rotationIntensity={1} floatIntensity={2}>
            <mesh position={position}>
                <icosahedronGeometry args={[0.05, 0]} />
                <meshBasicMaterial color={color} wireframe transparent opacity={0.3} />
            </mesh>
        </Float>
    )
}

const Background3D = () => {
    return (
        <div className="fixed inset-0 z-[-1] bg-black">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <fog attach="fog" args={['black', 1, 3]} />
                <TechParticles />
                <CyberGrid />

                {/* Floating tech debris */}
                <FloatingProp position={[0.5, 0.5, 0]} color="#06b6d4" speed={2} />
                <FloatingProp position={[-0.5, -0.5, 0.1]} color="#a855f7" speed={3} />
                <FloatingProp position={[0.2, -0.3, 0.2]} color="#ffffff" speed={1.5} />
                <FloatingProp position={[-0.3, 0.6, 0.1]} color="#22d3ee" speed={2.5} />
            </Canvas>
        </div>
    );
};

export default Background3D;
