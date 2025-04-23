import { Canvas, useFrame } from '@react-three/fiber';
import { DepthOfField, EffectComposer } from '@react-three/postprocessing';
import { DepthOfFieldEffect } from 'postprocessing';
import React, { ForwardedRef, RefObject, Suspense, useEffect, useRef } from 'react';
import { AdditiveBlending, BufferAttribute, Color, MathUtils, Mesh, Points, Vector3 } from 'three';

function Galaxy({ dof }: { dof: RefObject<DepthOfFieldEffect | null> }) {
    const parameters = {
        count: 2500,
        size: 0.025,
        radius: 5,
        branches: 5,
        spin: 1.25,
        randomness: 0.3,
        randomnessPower: 3,
        insideColor: '#c6fd7c',
        outsideColor: '#c6fd7c',
        animate: true,
        mouse: false,
        opacity: 1,
        focusDistance: 0.05,
        focalLength: 0.05,
        width: 480,
        height: 480,
        focusX: 0,
        focusY: 0,
        focusZ: 0,
    };
    const particles = useRef<Points>(null);

    useEffect(() => {
        generateGalaxy();
    });

    useFrame((state) => {
        if (dof.current) {
            dof.current.cocMaterial.uniforms.focusDistance.value = parameters.focusDistance;
            dof.current.cocMaterial.uniforms.focalLength.value = parameters.focalLength;
            dof.current.resolution.height = parameters.height;
            dof.current.resolution.width = parameters.width;
            dof.current.target = new Vector3(parameters.focusX, parameters.focusY, parameters.focusZ);
            dof.current.blendMode.opacity.value = parameters.opacity;
        }

        if (particles.current === null) {
            return;
        }

        if (parameters.mouse) {
            particles.current.rotation.x = MathUtils.lerp(particles.current.rotation.x, state.pointer.y / 10, 0.2);
            particles.current.rotation.y = MathUtils.lerp(particles.current.rotation.y, -state.pointer.x / 2, 0.2);
        }

        if (parameters.animate) {
            const elapsedTime = state.clock.getElapsedTime();
            particles.current.rotation.y = 0.05 * elapsedTime;
        }
    });

    const generateGalaxy = () => {
        const positions = new Float32Array(parameters.count * 3);
        const colors = new Float32Array(parameters.count * 3);
        const colorInside = new Color(parameters.insideColor);
        const colorOutside = new Color(parameters.outsideColor);

        for (let i = 0; i < parameters.count; i++) {
            const i3 = i * 3;

            const radius = Math.random() * parameters.radius;
            const spinAngle = radius * parameters.spin;
            const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

            const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
            const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
            const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;

            positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
            positions[i3 + 1] = randomY;
            positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

            const mixedColor = colorInside.clone();
            mixedColor.lerp(colorOutside, radius / parameters.radius);

            colors[i3] = mixedColor.r;
            colors[i3 + 1] = mixedColor.g;
            colors[i3 + 2] = mixedColor.b;
        }

        if (particles.current) {
            particles.current.geometry.setAttribute('position', new BufferAttribute(positions, 3));
            particles.current.geometry.setAttribute('color', new BufferAttribute(colors, 3));
        }
    };

    return (
        <points ref={particles}>
            <bufferGeometry />
            <pointsMaterial
                size={parameters.size}
                sizeAttenuation={true}
                depthWrite={true}
                vertexColors={true}
                blending={AdditiveBlending}
            />
        </points>
    );
}

function Nucleus({ size }: { size: number }) {
    const nucleusRef = useRef<Mesh>(null);
    const color = new Color();
    color.setHSL(Math.random(), 0.7, Math.random() * 0.2 + 0.05);

    return (
        <mesh ref={nucleusRef} position={[0, 0, 0]} scale={[size, size, size]}>
            <sphereGeometry attach={'geometry'} args={[0.5, 32, 32, 0, 6.4, 0, 6.3]} />
            <meshBasicMaterial attach={'material'} color={'#fff'} />
        </mesh>
    );
}

const Effects = React.forwardRef((_props, ref: ForwardedRef<DepthOfFieldEffect>) => {
    return (
        <EffectComposer multisampling={0}>
            <DepthOfField ref={ref} bokehScale={1} />
        </EffectComposer>
    );
});

export default function AnimatedGalaxy() {
    const dof = useRef<DepthOfFieldEffect>(null);

    return (
        <Canvas linear flat camera={{ position: [0, 2, 5] }}>
            <Suspense fallback={null}>
                <Galaxy dof={dof} />
                <Nucleus size={0.125} />
            </Suspense>
            <Effects ref={dof} />
        </Canvas>
    );
}
