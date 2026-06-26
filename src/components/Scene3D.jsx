import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

// 1. Camera Controller to handle scroll-driven cinematic movement & mouse parallax
function CameraRig({ scrollProgress, clickTrigger }) {
  const { camera } = useThree();
  const warpStrength = useRef(0);

  useEffect(() => {
    if (clickTrigger > 0) {
      warpStrength.current = 1.2;
    }
  }, [clickTrigger]);

  useFrame((state) => {
    // Decay warp strength
    warpStrength.current *= 0.92;
    if (warpStrength.current < 0.001) warpStrength.current = 0;

    // Current scroll percentage (0 to 1)
    const p = scrollProgress;

    // Define positions along the cinematic journey
    let targetX = 0;
    let targetY = 0;
    let targetZ = 6;
    let lookAtY = 0;

    if (p < 0.2) {
      const t = p / 0.2;
      targetX = THREE.MathUtils.lerp(0, 2, t);
      targetY = THREE.MathUtils.lerp(0, 1, t);
      targetZ = THREE.MathUtils.lerp(6, 5.5, t);
      lookAtY = THREE.MathUtils.lerp(0, 0.2, t);
    } else if (p < 0.4) {
      const t = (p - 0.2) / 0.2;
      targetX = THREE.MathUtils.lerp(2, -3, t);
      targetY = THREE.MathUtils.lerp(1, -4, t);
      targetZ = THREE.MathUtils.lerp(5.5, 6, t);
      lookAtY = THREE.MathUtils.lerp(0.2, -4, t);
    } else if (p < 0.6) {
      const t = (p - 0.4) / 0.2;
      targetX = THREE.MathUtils.lerp(-3, 3, t);
      targetY = THREE.MathUtils.lerp(-4, -9, t);
      targetZ = THREE.MathUtils.lerp(6, 5.5, t);
      lookAtY = THREE.MathUtils.lerp(-4, -9, t);
    } else if (p < 0.8) {
      const t = (p - 0.6) / 0.2;
      targetX = THREE.MathUtils.lerp(3, -2, t);
      targetY = THREE.MathUtils.lerp(-9, -14, t);
      targetZ = THREE.MathUtils.lerp(5.5, 6.5, t);
      lookAtY = THREE.MathUtils.lerp(-9, -14, t);
    } else {
      const t = (p - 0.8) / 0.2;
      targetX = THREE.MathUtils.lerp(-2, 0, t);
      targetY = THREE.MathUtils.lerp(-14, -20, t);
      targetZ = THREE.MathUtils.lerp(6.5, 5, t);
      lookAtY = THREE.MathUtils.lerp(-14, -20, t);
    }

    // Add mouse parallax (dramatic response)
    const parallaxX = state.mouse.x * 0.85;
    const parallaxY = state.mouse.y * 0.85;

    // Subtle handheld cinematic camera shake / floating movement
    const time = state.clock.getElapsedTime();
    const shakeX = Math.sin(time * 0.8) * 0.05;
    const shakeY = Math.cos(time * 0.6) * 0.05;

    // Impulse click shake / zoom
    const clickShakeX = (Math.random() - 0.5) * warpStrength.current * 0.22;
    const clickShakeY = (Math.random() - 0.5) * warpStrength.current * 0.22;
    const clickZoom = warpStrength.current * 0.6; // camera zooms/recoils on click

    // Smoothly lerp camera position
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX + parallaxX + shakeX + clickShakeX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY + parallaxY + shakeY + clickShakeY, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ + clickZoom, 0.05);

    // Look at a target point that shifts with the camera
    const lookTarget = new THREE.Vector3(0, lookAtY, 0);
    camera.lookAt(lookTarget);
  });

  return null;
}

// 2. Animated Starfield/Particle Nebula background
function StarsBackground({ clickTrigger }) {
  const pointsRef = useRef();
  const materialRef = useRef();
  const warpStrength = useRef(0);

  useEffect(() => {
    if (clickTrigger > 0) {
      warpStrength.current = 1.0;
    }
  }, [clickTrigger]);

  const [positions, colors] = useMemo(() => {
    const count = 3500;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorChoices = [
      new THREE.Color('#00d2ff'), // Cyan
      new THREE.Color('#7928ca'), // Purple
      new THREE.Color('#ff007a'), // Pink
    ];

    for (let i = 0; i < count; i++) {
      // Spread stars vertically along the scroll journey
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 35 - 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5;

      const randomColor = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      col[i * 3] = randomColor.r;
      col[i * 3 + 1] = randomColor.g;
      col[i * 3 + 2] = randomColor.b;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    warpStrength.current *= 0.94;
    if (warpStrength.current < 0.001) warpStrength.current = 0;

    if (pointsRef.current) {
      // Accelerate rotation rate on click warp
      pointsRef.current.rotation.y += (0.015 + warpStrength.current * 0.3) * 0.016;
    }
    if (materialRef.current) {
      // Temporarily expand particle size
      materialRef.current.size = 0.08 + warpStrength.current * 0.16;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} colors={colors} stride={3}>
      <PointMaterial
        ref={materialRef}
        transparent
        vertexColors
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
      />
    </Points>
  );
}

// 3. Floating digital net/grid in the background (Morphing landscape)
function DigitalGrid({ clickTrigger }) {
  const meshRef = useRef();
  const geomRef = useRef();
  const warpStrength = useRef(0);

  useEffect(() => {
    if (clickTrigger > 0) {
      warpStrength.current = 1.0;
    }
  }, [clickTrigger]);
  
  const [positions, indices] = useMemo(() => {
    const size = 30;
    // Lower segment details to optimize frame rate (maintaining 120 FPS)
    const segments = 12;
    const pos = [];
    const ind = [];
    
    for (let i = 0; i <= segments; i++) {
      const z = (i / segments) * size - size / 2;
      for (let j = 0; j <= segments; j++) {
        const x = (j / segments) * size - size / 2;
        pos.push(x, 0, z);
      }
    }
    
    // Indices for grid lines
    for (let i = 0; i < segments; i++) {
      for (let j = 0; j < segments; j++) {
        const row1 = i * (segments + 1);
        const row2 = (i + 1) * (segments + 1);
        
        ind.push(row1 + j, row1 + j + 1);
        ind.push(row1 + j, row2 + j);
      }
    }
    
    return [new Float32Array(pos), new Uint16Array(ind)];
  }, []);

  useFrame((state) => {
    warpStrength.current *= 0.94;
    if (warpStrength.current < 0.001) warpStrength.current = 0;

    if (geomRef.current) {
      const elapsed = state.clock.getElapsedTime();
      const posAttr = geomRef.current.attributes.position;
      
      for (let i = 0; i < posAttr.count; i++) {
        const x = posAttr.getX(i);
        const z = posAttr.getZ(i);
        // Waves speed up and grow taller on click
        const boost = warpStrength.current * 2.8;
        const y = Math.sin(x * 0.25 + elapsed * (0.8 + warpStrength.current * 2)) * Math.cos(z * 0.25 + elapsed * (0.8 + warpStrength.current * 2)) * (0.55 + boost);
        posAttr.setY(i, y);
      }
      posAttr.needsUpdate = true;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += (0.012 + warpStrength.current * 0.12) * 0.016;
    }
  });

  return (
    <lineSegments ref={meshRef} position={[0, -11, -6]}>
      <bufferGeometry ref={geomRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="index"
          args={[indices, 1]}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#7928ca" transparent opacity={0.25} />
    </lineSegments>
  );
}

// Satellites orbiting the main planet
function Satellites() {
  const sat1Ref = useRef();
  const sat2Ref = useRef();
  
  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (sat1Ref.current) {
      sat1Ref.current.position.x = Math.cos(elapsed * 1.6) * 2.0;
      sat1Ref.current.position.z = Math.sin(elapsed * 1.6) * 2.0;
      sat1Ref.current.position.y = Math.sin(elapsed * 0.8) * 0.6;
    }
    if (sat2Ref.current) {
      sat2Ref.current.position.x = Math.sin(-elapsed * 1.1) * 2.5;
      sat2Ref.current.position.z = Math.cos(-elapsed * 1.1) * 2.5;
      sat2Ref.current.position.y = Math.cos(elapsed * 0.9) * 0.8;
    }
  });
  
  return (
    <group>
      <mesh ref={sat1Ref}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color="#ff007a" />
      </mesh>
      <mesh ref={sat2Ref}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#00f5ff" />
      </mesh>
    </group>
  );
}

// 4. Hero Visual: Glass Planet & Chrome Rings (Y = 0)
function GlassPlanetScene({ clickTrigger }) {
  const sphereRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const materialRef = useRef();
  const warpStrength = useRef(0);

  useEffect(() => {
    if (clickTrigger > 0) {
      warpStrength.current = 1.0;
    }
  }, [clickTrigger]);

  useFrame((state) => {
    warpStrength.current *= 0.93;
    if (warpStrength.current < 0.001) warpStrength.current = 0;

    const elapsed = state.clock.getElapsedTime();
    if (sphereRef.current) {
      sphereRef.current.rotation.y += (0.12 + warpStrength.current * 1.5) * 0.016;
      sphereRef.current.rotation.x += (0.05 + warpStrength.current * 0.5) * 0.016;
    }
    if (materialRef.current) {
      // Warp distortion factor & speed on click
      materialRef.current.distort = 0.35 + warpStrength.current * 0.55;
      materialRef.current.speed = 2.2 + warpStrength.current * 4.5;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += (0.2 + warpStrength.current * 1.4) * 0.016;
      ring1Ref.current.rotation.y += (0.1 + warpStrength.current * 0.6) * 0.016;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= (0.15 + warpStrength.current * 1.1) * 0.016;
      ring2Ref.current.rotation.x += (0.1 + warpStrength.current * 0.6) * 0.016;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Matte Black Outer Halo */}
      <mesh position={[0, 0, -1]}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial color="#0b0b0f" transparent opacity={0.3} wireframe />
      </mesh>

      {/* Floating Glass Planet */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
        <mesh ref={sphereRef}>
          <sphereGeometry args={[1.1, 64, 64]} />
          <MeshDistortMaterial
            ref={materialRef}
            color="#00d2ff"
            roughness={0.1}
            metalness={0.1}
            distort={0.35}
            speed={2.2}
            transparent
            opacity={0.4}
            transmission={0.8}
            thickness={1.5}
            ior={1.4}
          />
        </mesh>
      </Float>

      {/* Orbiting Satellites */}
      <Satellites />

      {/* Chrome Ring 1 */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[2.0, 0.03, 16, 100]} />
        <meshStandardMaterial color="#ffffff" metalness={1.0} roughness={0.05} />
      </mesh>

      {/* Chrome Ring 2 */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 4, -Math.PI / 4, 0]}>
        <torusGeometry args={[2.4, 0.02, 16, 100]} />
        <meshStandardMaterial color="#7928ca" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Mini crystal particles floating around */}
      <group>
        {[-2.2, 2.2].map((x, i) => (
          <Float key={i} speed={3} floatIntensity={2} position={[x, i === 0 ? 0.8 : -0.8, 0.5]}>
            <mesh rotation={[Math.random(), Math.random(), 0]}>
              <octahedronGeometry args={[0.15, 0]} />
              <meshPhysicalMaterial
                color={i === 0 ? '#ff007a' : '#00f5ff'}
                roughness={0.1}
                transmission={0.9}
                thickness={0.5}
              />
            </mesh>
          </Float>
        ))}
      </group>
    </group>
  );
}

// 5. Services Visual: Floating Holographic Glass Pillars (Y = -4)
function ServicesPillars({ clickTrigger }) {
  const pillarsRef = useRef();
  const knotRef = useRef();
  const warpStrength = useRef(0);

  useEffect(() => {
    if (clickTrigger > 0) {
      warpStrength.current = 1.0;
    }
  }, [clickTrigger]);

  useFrame((state) => {
    warpStrength.current *= 0.94;
    if (warpStrength.current < 0.001) warpStrength.current = 0;

    if (pillarsRef.current) {
      pillarsRef.current.rotation.y += (0.08 + warpStrength.current * 0.4) * 0.016;
    }
    if (knotRef.current) {
      knotRef.current.rotation.x += (0.2 + warpStrength.current * 1.2) * 0.016;
      knotRef.current.rotation.y += (0.25 + warpStrength.current * 1.5) * 0.016;
    }
  });

  const pillarData = [
    { pos: [-2, 0, 0], color: '#00d2ff' },
    { pos: [0, 0.5, -1], color: '#7928ca' },
    { pos: [2, 0, 0], color: '#ff007a' },
  ];

  return (
    <group ref={pillarsRef} position={[0, -4, 0]}>
      {pillarData.map((data, idx) => (
        <Float key={idx} speed={1.5} floatIntensity={1} rotationIntensity={0.5}>
          <group position={data.pos}>
            <mesh>
              <boxGeometry args={[0.4, 2.2, 0.4]} />
              <meshPhysicalMaterial
                color={data.color}
                transmission={0.9}
                thickness={1.0}
                roughness={0.1}
                transparent
                opacity={0.5}
              />
              <lineSegments>
                <edgesGeometry args={[new THREE.BoxGeometry(0.405, 2.205, 0.405)]} />
                <lineBasicMaterial color={data.color} linewidth={2} />
              </lineSegments>
            </mesh>
          </group>
        </Float>
      ))}

      {/* Weaving Quantum Torus Knot */}
      <Float speed={2.5} floatIntensity={1.5} rotationIntensity={2}>
        <mesh ref={knotRef} rotation={[Math.PI / 4, 0, 0]}>
          <torusKnotGeometry args={[1.3, 0.15, 120, 16, 3, 4]} />
          <meshPhysicalMaterial
            color="#00f5ff"
            transmission={0.8}
            thickness={1.0}
            roughness={0.1}
            transparent
            opacity={0.3}
          />
          <lineSegments>
            <edgesGeometry args={[new THREE.TorusKnotGeometry(1.3, 0.15, 120, 16, 3, 4)]} />
            <lineBasicMaterial color="#00f5ff" linewidth={1} />
          </lineSegments>
        </mesh>
      </Float>
    </group>
  );
}

// 6. Portfolio Visual: Floating Glass Project Panels (Y = -9)
function PortfolioPanels({ clickTrigger }) {
  const panelsRef = useRef();
  const coreRef = useRef();
  const warpStrength = useRef(0);

  useEffect(() => {
    if (clickTrigger > 0) {
      warpStrength.current = 1.0;
    }
  }, [clickTrigger]);

  useFrame((state) => {
    warpStrength.current *= 0.94;
    if (warpStrength.current < 0.001) warpStrength.current = 0;

    const elapsed = state.clock.getElapsedTime();
    if (panelsRef.current) {
      panelsRef.current.rotation.y += (0.15 + warpStrength.current * 0.65) * 0.016;
      panelsRef.current.position.y = -9 + Math.sin(elapsed * 0.4) * 0.1;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y += (0.3 + warpStrength.current * 2.0) * 0.016;
      const pulseScale = 1.0 + warpStrength.current * 0.65;
      coreRef.current.scale.set(pulseScale, pulseScale, pulseScale);
    }
  });

  return (
    <group ref={panelsRef} position={[0, -9, 0]}>
      {/* Central Cyber Core */}
      <mesh ref={coreRef}>
        <dodecahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color="#00f5ff" emissive="#00d2ff" emissiveIntensity={0.5} roughness={0.1} />
      </mesh>
      
      {/* Floating panels in a circle */}
      {Array.from({ length: 4 }).map((_, idx) => {
        const angle = (idx / 4) * Math.PI * 2;
        const radius = 2.2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <mesh key={idx} position={[x, 0, z]} rotation={[0, -angle + Math.PI/2, 0.1]}>
            <boxGeometry args={[1.2, 0.8, 0.02]} />
            <meshPhysicalMaterial
              color="#15151e"
              transmission={0.8}
              thickness={0.5}
              roughness={0.2}
              clearcoat={1}
            />
            <lineSegments>
              <edgesGeometry args={[new THREE.BoxGeometry(1.21, 0.81, 0.022)]} />
              <lineBasicMaterial color={idx % 2 === 0 ? '#ff007a' : '#00d2ff'} />
            </lineSegments>
          </mesh>
        );
      })}
    </group>
  );
}

// 7. Contact Visual: Massive Glowing Aurora Sphere (Y = -20)
function ContactSphere({ clickTrigger }) {
  const sphereRef = useRef();
  const outerSphereRef = useRef();
  const warpStrength = useRef(0);

  useEffect(() => {
    if (clickTrigger > 0) {
      warpStrength.current = 1.0;
    }
  }, [clickTrigger]);

  useFrame((state) => {
    warpStrength.current *= 0.94;
    if (warpStrength.current < 0.001) warpStrength.current = 0;

    const elapsed = state.clock.getElapsedTime();
    if (sphereRef.current) {
      sphereRef.current.rotation.y += (0.2 + warpStrength.current * 1.5) * 0.016;
      // Pulse scale
      const scale = 1.3 + Math.sin(elapsed * 0.8) * 0.05 + warpStrength.current * 0.8;
      sphereRef.current.scale.set(scale, scale, scale);
    }
    if (outerSphereRef.current) {
      const outerScale = 1.0 + warpStrength.current * 0.4;
      outerSphereRef.current.scale.set(outerScale, outerScale, outerScale);
    }
  });

  return (
    <group position={[0, -20, 0]}>
      {/* Inner core */}
      <mesh ref={sphereRef}>
        <icosahedronGeometry args={[1.0, 2]} />
        <meshBasicMaterial color="#7928ca" wireframe opacity={0.6} transparent />
      </mesh>
      
      {/* Outer Glow Shield */}
      <mesh ref={outerSphereRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshPhysicalMaterial
          color="#00f5ff"
          transmission={0.9}
          thickness={2.0}
          roughness={0.05}
          transparent
          opacity={0.35}
          ior={1.6}
        />
      </mesh>
    </group>
  );
}

// 3D wireframe floating structures scattered along the scroll path to add visual complexity
function FloatingDebris({ clickTrigger }) {
  const groupRef = useRef();
  const warpStrength = useRef(0);

  useEffect(() => {
    if (clickTrigger > 0) {
      warpStrength.current = 1.0;
    }
  }, [clickTrigger]);

  const debrisItems = useMemo(() => {
    const items = [];
    const geometries = [
      new THREE.IcosahedronGeometry(0.2, 0),
      new THREE.OctahedronGeometry(0.15, 1),
      new THREE.TorusGeometry(0.2, 0.02, 8, 24),
      new THREE.DodecahedronGeometry(0.18, 0)
    ];
    const colors = ['#00d2ff', '#7928ca', '#ff007a', '#00f5ff'];

    // Optimize debris count (from 28 to 18) to maintain 120 FPS
    for (let i = 0; i < 18; i++) {
      items.push({
        position: [
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 35 - 10,
          (Math.random() - 0.5) * 12 - 2
        ],
        geometry: geometries[Math.floor(Math.random() * geometries.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        speedZ: (Math.random() - 0.5) * 0.4,
      });
    }
    return items;
  }, []);

  useFrame((state) => {
    warpStrength.current *= 0.94;
    if (warpStrength.current < 0.001) warpStrength.current = 0;

    if (groupRef.current) {
      groupRef.current.children.forEach((mesh, index) => {
        const item = debrisItems[index];
        if (!item) return;
        const elapsed = state.clock.getElapsedTime();
        mesh.rotation.x += item.speedX * 0.02 + warpStrength.current * 0.08;
        mesh.rotation.y += item.speedY * 0.02 + warpStrength.current * 0.08;
        mesh.rotation.z += item.speedZ * 0.02 + warpStrength.current * 0.08;
        mesh.position.y += Math.sin(elapsed + index) * 0.001;
        
        // Expand debris scale on click
        const scale = 1.0 + warpStrength.current * 0.60;
        mesh.scale.set(scale, scale, scale);
      });
    }
  });

  return (
    <group ref={groupRef}>
      {debrisItems.map((item, idx) => (
        <mesh key={idx} position={item.position} geometry={item.geometry}>
          <meshBasicMaterial color={item.color} wireframe transparent opacity={0.25} />
        </mesh>
      ))}
    </group>
  );
}

// Cinematic out-of-focus background bokeh particles that float close to the camera
function BokehParticles({ clickTrigger }) {
  const count = 45;
  const warpStrength = useRef(0);
  const materialRef = useRef();

  useEffect(() => {
    if (clickTrigger > 0) {
      warpStrength.current = 1.0;
    }
  }, [clickTrigger]);

  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 35 - 10;
      pos[i * 3 + 2] = Math.random() * 4 + 2; // close to camera
    }
    return [pos];
  }, []);

  const pointsRef = useRef();

  useFrame((state) => {
    warpStrength.current *= 0.94;
    if (warpStrength.current < 0.001) warpStrength.current = 0;

    if (pointsRef.current) {
      pointsRef.current.rotation.y += (0.015 + warpStrength.current * 0.15) * 0.016;
      pointsRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.15;
    }
    if (materialRef.current) {
      // Double bokeh size on click warp
      materialRef.current.size = 0.32 + warpStrength.current * 0.48;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        ref={materialRef}
        color="#00f5ff"
        size={0.32} // Large bokeh size
        transparent
        opacity={0.16}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Color cycling dynamic ambient lighting to represent moving cosmic auroras
function DynamicLights({ clickTrigger }) {
  const light1Ref = useRef();
  const light2Ref = useRef();
  const warpStrength = useRef(0);

  useEffect(() => {
    if (clickTrigger > 0) {
      warpStrength.current = 1.0;
    }
  }, [clickTrigger]);

  useFrame((state) => {
    warpStrength.current *= 0.93;
    if (warpStrength.current < 0.001) warpStrength.current = 0;

    const elapsed = state.clock.getElapsedTime();
    if (light1Ref.current) {
      light1Ref.current.color.setHSL((elapsed * 0.01) % 1.0, 0.85, 0.55);
      light1Ref.current.intensity = 2.0 + warpStrength.current * 6.5;
    }
    if (light2Ref.current) {
      light2Ref.current.color.setHSL(((elapsed * 0.01) + 0.5) % 1.0, 0.85, 0.55);
      light2Ref.current.intensity = 1.5 + warpStrength.current * 5.0;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.45} />
      <pointLight ref={light1Ref} position={[5, 5, 5]} intensity={2.0} color="#00d2ff" />
      <pointLight ref={light2Ref} position={[-5, -5, -5]} intensity={1.5} color="#7928ca" />
      <directionalLight position={[0, 10, 0]} intensity={0.8} />
    </group>
  );
}

export default function Scene3D({ scrollProgress, clickTrigger }) {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={['#030305']} />
        
        {/* Dynamic Color-Cycling Lights */}
        <DynamicLights clickTrigger={clickTrigger} />

        {/* Scene Objects */}
        <StarsBackground clickTrigger={clickTrigger} />
        <DigitalGrid clickTrigger={clickTrigger} />
        <FloatingDebris clickTrigger={clickTrigger} />
        <BokehParticles clickTrigger={clickTrigger} />
        
        {/* Scroll Sections Geometries */}
        <GlassPlanetScene clickTrigger={clickTrigger} />
        <ServicesPillars clickTrigger={clickTrigger} />
        <PortfolioPanels clickTrigger={clickTrigger} />
        <ContactSphere clickTrigger={clickTrigger} />

        {/* Camera Scroll Rig */}
        <CameraRig scrollProgress={scrollProgress} clickTrigger={clickTrigger} />
      </Canvas>
    </div>
  );
}
