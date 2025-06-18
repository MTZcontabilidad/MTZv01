/* ===================================
   Efectos Visuales y Sistema de Partículas MEJORADOS
   =================================== */

let particleSystem;
let ambientLights = [];
let lightCycles = [];

// Sistema de partículas 3D mejorado
function createParticleSystem() {
    const particleCount = 3000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        // Distribución esférica más amplia
        const radius = 20 + Math.random() * 15;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);

        // Velocidades para movimiento orgánico
        velocities[i * 3] = (Math.random() - 0.5) * 0.002;
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002;

        // Colores más vibrantes
        const colorType = Math.random();
        const color = new THREE.Color();
        
        if (colorType < 0.3) {
            color.setHSL(0.55, 1, 0.7); // Cyan
        } else if (colorType < 0.6) {
            color.setHSL(0.83, 1, 0.6); // Pink
        } else if (colorType < 0.8) {
            color.setHSL(0.75, 1, 0.5); // Purple
        } else {
            color.setHSL(0.33, 1, 0.6); // Green
        }
        
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;

        // Tamaños variados
        sizes[i] = Math.random() * 0.15 + 0.05;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

    const material = new THREE.PointsMaterial({
        size: 0.12,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
        alphaTest: 0.1
    });

    particleSystem = new THREE.Points(geometry, material);
    particleSystem.userData = { originalPositions: positions.slice() };
    scene.add(particleSystem);
}

// Animar partículas con movimiento orgánico
function animateParticles() {
    if (particleSystem) {
        // Rotación suave del sistema completo
        particleSystem.rotation.y += 0.0003;
        particleSystem.rotation.x = Math.sin(time * 0.3) * 0.05;
        
        // Movimiento individual de partículas
        const positions = particleSystem.geometry.attributes.position.array;
        const velocities = particleSystem.geometry.attributes.velocity.array;
        const originalPositions = particleSystem.userData.originalPositions;
        
        for (let i = 0; i < positions.length; i += 3) {
            // Movimiento orbital
            positions[i] += velocities[i];
            positions[i + 1] += velocities[i + 1] + Math.sin(time * 0.001 + i) * 0.001;
            positions[i + 2] += velocities[i + 2];
            
            // Atracción hacia posición original
            const dx = originalPositions[i] - positions[i];
            const dy = originalPositions[i + 1] - positions[i + 1];
            const dz = originalPositions[i + 2] - positions[i + 2];
            
            velocities[i] += dx * 0.0001;
            velocities[i + 1] += dy * 0.0001;
            velocities[i + 2] += dz * 0.0001;
            
            // Damping para estabilidad
            velocities[i] *= 0.999;
            velocities[i + 1] *= 0.999;
            velocities[i + 2] *= 0.999;
        }
        
        particleSystem.geometry.attributes.position.needsUpdate = true;
        particleSystem.geometry.attributes.velocity.needsUpdate = true;
    }
}

// Crear luces ambientales dinámicas
function createDynamicLights() {
    const lightConfigs = [
        { color: 0x00d4ff, intensity: 1.5, radius: 8 },
        { color: 0xff0080, intensity: 1.2, radius: 6 },
        { color: 0x00ff88, intensity: 1.0, radius: 7 },
        { color: 0x8000ff, intensity: 0.8, radius: 5 }
    ];

    lightConfigs.forEach((config, index) => {
        const light = new THREE.PointLight(config.color, config.intensity, 25);
        const angle = (index / lightConfigs.length) * Math.PI * 2;
        light.position.set(
            Math.cos(angle) * config.radius,
            Math.sin(time + index) * 2,
            Math.sin(angle) * config.radius
        );
        
        light.userData = {
            originalIntensity: config.intensity,
            phase: index * Math.PI / 2,
            radius: config.radius,
            angle: angle
        };
        
        ambientLights.push(light);
        scene.add(light);
    });
}

// Animar luces dinámicas
function animateDynamicLights() {
    ambientLights.forEach((light, index) => {
        const userData = light.userData;
        const t = time * 0.001;
        
        // Movimiento orbital
        const newAngle = userData.angle + t * 0.2;
        light.position.x = Math.cos(newAngle) * userData.radius;
        light.position.z = Math.sin(newAngle) * userData.radius;
        light.position.y = Math.sin(t * 0.5 + userData.phase) * 3;
        
        // Pulsación de intensidad
        light.intensity = userData.originalIntensity + 
                         Math.sin(t * 2 + userData.phase) * 0.3;
    });
}

// Efecto de click mejorado y más rápido
function createClickEffect(point) {
    // Crear múltiples ondas concéntricas más rápidas
    for (let i = 0; i < 2; i++) {  // Solo 2 ondas
        setTimeout(() => {
            createShockwave(point, i);
        }, i * 80);  // Más rápido
    }
    
    // Crear explosión de partículas con delay mínimo
    setTimeout(() => {
        createParticleExplosion(point);
    }, 50);
    
    // Crear distorsión temporal inmediata
    createTemporalDistortion(point);
}

// Crear onda de choque más contenida
function createShockwave(point, index) {
    const waveGeometry = new THREE.RingGeometry(0.02 + index * 0.01, 0.08 + index * 0.02, 24);
    const waveMaterial = new THREE.MeshBasicMaterial({
        color: index === 0 ? 0x00d4ff : index === 1 ? 0xff0080 : 0x00ff88,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide,
        depthWrite: false
    });
    
    const wave = new THREE.Mesh(waveGeometry, waveMaterial);
    wave.position.copy(point);
    
    // Posicionar la onda ligeramente adelante de la superficie
    const direction = point.clone().normalize();
    wave.position.add(direction.multiplyScalar(0.02));
    wave.lookAt(camera.position);
    scene.add(wave);

    // Animación de la onda más rápida y contenida
    const animateWave = () => {
        wave.scale.x += 0.05;
        wave.scale.y += 0.05;
        waveMaterial.opacity -= 0.05;
        
        // Rotación más sutil
        wave.rotation.z += 0.005;

        if (waveMaterial.opacity > 0) {
            requestAnimationFrame(animateWave);
        } else {
            scene.remove(wave);
            waveGeometry.dispose();
            waveMaterial.dispose();
        }
    };
    animateWave();
}

// Crear explosión de partículas más contenida
function createParticleExplosion(point) {
    const particleCount = 15;  // Menos partículas
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        const particleGeometry = new THREE.SphereGeometry(0.02, 6, 6);  // Más pequeñas
        const particleMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color().setHSL(Math.random() * 0.3 + 0.5, 1, 0.7),
            transparent: true,
            opacity: 1,
            depthWrite: false
        });
        
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        
        // Posicionar ligeramente adelante de la superficie
        const direction = point.clone().normalize();
        particle.position.copy(point).add(direction.multiplyScalar(0.03));
        
        // Velocidad radial más contenida
        const explosionDirection = new THREE.Vector3(
            (Math.random() - 0.5) * 1.5,
            (Math.random() - 0.5) * 1.5,
            (Math.random() - 0.5) * 0.5  // Menos profundidad
        ).normalize();
        
        particle.velocity = explosionDirection.multiplyScalar(0.05 + Math.random() * 0.03);
        particle.userData = {
            life: 1.0,
            decay: 0.025 + Math.random() * 0.015  // Más rápido
        };
        
        particles.push(particle);
        scene.add(particle);
    }

    // Animar partículas
    const animateParticles = () => {
        let aliveParticles = 0;
        
        particles.forEach(particle => {
            if (particle.userData.life > 0) {
                // Movimiento
                particle.position.add(particle.velocity);
                particle.velocity.multiplyScalar(0.98); // Fricción
                
                // Gravedad sutil
                particle.velocity.y -= 0.002;
                
                // Decay
                particle.userData.life -= particle.userData.decay;
                particle.material.opacity = particle.userData.life;
                particle.scale.setScalar(particle.userData.life);
                
                aliveParticles++;
            }
        });

        if (aliveParticles > 0) {
            requestAnimationFrame(animateParticles);
        } else {
            // Cleanup
            particles.forEach(particle => {
                scene.remove(particle);
                particle.geometry.dispose();
                particle.material.dispose();
            });
        }
    };
    animateParticles();
}

// Crear distorsión temporal más sutil
function createTemporalDistortion(point) {
    const distortionGeometry = new THREE.SphereGeometry(0.15, 12, 12);  // Más pequeña
    const distortionMaterial = new THREE.MeshBasicMaterial({
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.15,
        wireframe: true,
        depthWrite: false
    });
    
    const distortion = new THREE.Mesh(distortionGeometry, distortionMaterial);
    
    // Posicionar ligeramente adelante de la superficie
    const direction = point.clone().normalize();
    distortion.position.copy(point).add(direction.multiplyScalar(0.05));
    scene.add(distortion);
    
    // Animación de distorsión más rápida
    const animateDistortion = () => {
        distortion.rotation.x += 0.12;
        distortion.rotation.y += 0.06;
        distortion.scale.multiplyScalar(1.02);  // Expansión más lenta
        distortionMaterial.opacity -= 0.025;   // Desvanece más rápido
        
        if (distortionMaterial.opacity > 0) {
            requestAnimationFrame(animateDistortion);
        } else {
            scene.remove(distortion);
            distortionGeometry.dispose();
            distortionMaterial.dispose();
        }
    };
    animateDistortion();
}

// Animar cara del cubo clickeada más sutil
function animateCubeFace(face) {
    const originalOpacity = face.material.opacity;
    const originalEmissive = face.material.emissiveIntensity;
    const originalScale = face.scale.clone();
    
    // Flash más sutil
    face.material.emissiveIntensity = 0.8;
    face.material.opacity = 0.6;
    
    let pulseTime = 0;
    const pulseDuration = 800;  // Más corto
    
    // Efecto de pulso más controlado
    const pulseAnimation = () => {
        pulseTime += 16;
        const progress = pulseTime / pulseDuration;
        
        if (progress < 1) {
            // Pulso suave
            const pulse = Math.sin(progress * Math.PI * 3) * (1 - progress);
            face.scale.setScalar(1 + pulse * 0.05);  // Menos exagerado
            
            // Gradual return to normal
            face.material.emissiveIntensity = THREE.MathUtils.lerp(
                face.material.emissiveIntensity, 
                originalEmissive, 
                0.08
            );
            face.material.opacity = THREE.MathUtils.lerp(
                face.material.opacity, 
                originalOpacity, 
                0.06
            );
            
            requestAnimationFrame(pulseAnimation);
        } else {
            // Restaurar valores originales
            face.material.emissiveIntensity = originalEmissive;
            face.material.opacity = originalOpacity;
            face.scale.copy(originalScale);
        }
    };
    
    setTimeout(pulseAnimation, 50);  // Inicio más rápido
}

// Crear efecto de resplandor dinámico
function createDynamicGlow(object, color, intensity, pulseSpeed = 1) {
    const glowGeometry = object.geometry.clone();
    const glowMaterial = new THREE.ShaderMaterial({
        uniforms: {
            viewVector: { type: "v3", value: camera.position },
            c: { type: "f", value: 0.6 },
            p: { type: "f", value: 6.0 },
            glowColor: { type: "c", value: new THREE.Color(color) },
            intensity: { type: "f", value: intensity },
            time: { type: "f", value: 0 }
        },
        vertexShader: `
            uniform vec3 viewVector;
            uniform float c;
            uniform float p;
            uniform float time;
            varying float vIntensity;
            
            void main() {
                vec3 vNormal = normalize(normalMatrix * normal);
                vec3 vNormel = normalize(normalMatrix * viewVector);
                vIntensity = pow(c - dot(vNormal, vNormel), p);
                
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            uniform vec3 glowColor;
            uniform float intensity;
            uniform float time;
            varying float vIntensity;
            
            void main() {
                float pulse = sin(time * 2.0) * 0.3 + 0.7;
                vec3 glow = glowColor * vIntensity * intensity * pulse;
                gl_FragColor = vec4(glow, vIntensity * intensity * pulse);
            }
        `,
        side: THREE.FrontSide,
        blending: THREE.AdditiveBlending,
        transparent: true
    });
    
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    glowMesh.scale.multiplyScalar(1.1);
    object.add(glowMesh);
    
    // Animación del glow
    const animateGlow = () => {
        glowMaterial.uniforms.time.value = Date.now() * 0.001 * pulseSpeed;
        requestAnimationFrame(animateGlow);
    };
    animateGlow();
    
    return glowMesh;
}

// Crear efecto de trail para elementos en movimiento
function createTrailEffect(object, color = 0x00d4ff, length = 20) {
    const trail = {
        positions: [],
        maxLength: length,
        geometry: new THREE.BufferGeometry(),
        material: new THREE.LineBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.8,
            linewidth: 2
        }),
        line: null
    };
    
    // Crear la línea del trail
    const positions = new Float32Array(length * 3);
    trail.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    trail.line = new THREE.Line(trail.geometry, trail.material);
    scene.add(trail.line);
    
    object.userData.trail = trail;
    return trail;
}

// Actualizar trail
function updateTrail(object) {
    if (!object.userData.trail) return;
    
    const trail = object.userData.trail;
    const currentPos = object.position.clone();
    
    // Añadir posición actual
    trail.positions.unshift(currentPos);
    
    // Mantener longitud máxima
    if (trail.positions.length > trail.maxLength) {
        trail.positions.pop();
    }
    
    // Actualizar geometría
    const positions = trail.geometry.attributes.position.array;
    for (let i = 0; i < trail.positions.length; i++) {
        const pos = trail.positions[i];
        positions[i * 3] = pos.x;
        positions[i * 3 + 1] = pos.y;
        positions[i * 3 + 2] = pos.z;
    }
    
    trail.geometry.attributes.position.needsUpdate = true;
    trail.geometry.setDrawRange(0, trail.positions.length);
}

// Crear efecto de distorsión espacial
function createSpaceDistortion() {
    const distortionGeometry = new THREE.SphereGeometry(50, 32, 32);
    const distortionMaterial = new THREE.ShaderMaterial({
        uniforms: {
            time: { type: "f", value: 0 },
            intensity: { type: "f", value: 0.1 }
        },
        vertexShader: `
            uniform float time;
            uniform float intensity;
            
            void main() {
                vec3 newPosition = position;
                float noise = sin(position.x * 0.1 + time) * 
                             cos(position.y * 0.1 + time) * 
                             sin(position.z * 0.1 + time);
                newPosition += normal * noise * intensity;
                
                gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
            }
        `,
        fragmentShader: `
            void main() {
                gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
            }
        `,
        transparent: true,
        wireframe: true
    });
    
    const distortion = new THREE.Mesh(distortionGeometry, distortionMaterial);
    scene.add(distortion);
    
    // Animar distorsión
    const animateDistortion = () => {
        distortionMaterial.uniforms.time.value = Date.now() * 0.001;
        requestAnimationFrame(animateDistortion);
    };
    animateDistortion();
    
    return distortion;
}

// Función principal para inicializar todos los efectos
function initializeAllEffects() {
    createParticleSystem();
    createDynamicLights();
    createSpaceDistortion();
}

// Función principal para animar todos los efectos
function animateAllEffects() {
    animateParticles();
    animateDynamicLights();
}

// Exportar funciones para uso en main.js
window.EffectsManager = {
    initialize: initializeAllEffects,
    animate: animateAllEffects,
    createClickEffect: createClickEffect,
    animateCubeFace: animateCubeFace,
    createDynamicGlow: createDynamicGlow,
    createTrailEffect: createTrailEffect,
    updateTrail: updateTrail
};
