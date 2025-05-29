// Aplikasi Pembelajaran Kerangka Manusia AR - JavaScript

class SkeletonARApp {
    constructor() {
        this.currentRotation = 0;
        this.currentScale = 0.2;
        this.isInfoVisible = false;
        this.skeletonModel = null;
        this.marker = null;
        this.isARActive = false;
        this.currentPosition = 'standing';
        this.isFlipped = false;
        this.cameraStream = null;
        
        // Touch gesture variables
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.lastTouchDistance = 0;
        this.isRotating = false;
        this.isScaling = false;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.preloadAssets();
    }
    
    setupEventListeners() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Touch controls
        document.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        document.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        document.addEventListener('touchend', (e) => this.handleTouchEnd(e));
        
        // Prevent context menu
        document.addEventListener('contextmenu', (e) => e.preventDefault());
        
        // Window resize
        window.addEventListener('resize', () => this.handleResize());
    }
    
    preloadAssets() {
        // Preload marker image
        const markerImg = new Image();
        markerImg.src = 'https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png';
    }
    
    startAR() {
        this.showLoading();
        
        setTimeout(() => {
            document.getElementById('welcomeScreen').style.display = 'none';
            document.getElementById('arScene').style.display = 'block';
            document.getElementById('controls').style.display = 'flex';
            document.getElementById('positionControls').style.display = 'flex';
            document.getElementById('markerInfo').style.display = 'block';
            
            this.isARActive = true;
            this.hideLoading();
            
            // Initialize AR components
            setTimeout(() => {
                this.initializeARComponents();
            }, 1000);
        }, 1500);
    }
    
    initializeARComponents() {
        this.skeletonModel = document.getElementById('skeletonModel');
        this.marker = document.getElementById('markerHiro');
        
        if (this.marker) {
            // Add marker event listeners
            this.marker.addEventListener('markerFound', () => {
                console.log('Marker ditemukan!');
                this.onMarkerFound();
            });
            
            this.marker.addEventListener('markerLost', () => {
                console.log('Marker hilang!');
                this.onMarkerLost();
            });
        }
        
        // Enhance model materials when loaded
        if (this.skeletonModel) {
            this.skeletonModel.addEventListener('model-loaded', () => {
                this.enhanceModelMaterials();
            });
        }
    }
    
    onMarkerFound() {
        const markerInfo = document.getElementById('markerInfo');
        markerInfo.innerHTML = `
            <p>✅ Marker terdeteksi!</p>
            <p>🎮 Gunakan kontrol di bawah untuk berinteraksi</p>
            <p>📱 Atau gunakan gesture sentuh</p>
        `;
        markerInfo.style.background = 'rgba(0, 150, 0, 0.85)';
    }
    
    onMarkerLost() {
        const markerInfo = document.getElementById('markerInfo');
        markerInfo.innerHTML = `
            <p>📷 Arahkan kamera ke marker HIRO</p>
            <p>🎯 Pastikan marker terlihat jelas dan tidak terpotong</p>
            <p>💡 Coba ubah pencahayaan atau jarak kamera</p>
        `;
        markerInfo.style.background = 'rgba(0, 0, 0, 0.85)';
    }
    
    rotateModel(angle) {
        if (this.skeletonModel && this.isARActive) {
            this.currentRotation += angle;
            this.skeletonModel.setAttribute('rotation', `-90 ${this.currentRotation} 0`);
            this.showFeedback(`Rotasi: ${this.currentRotation}°`);
        }
    }
    
    scaleModel(delta) {
        if (this.skeletonModel && this.isARActive) {
            this.currentScale = Math.max(0.1, Math.min(3.0, this.currentScale + delta));
            this.skeletonModel.setAttribute('scale', `${this.currentScale} ${this.currentScale} ${this.currentScale}`);
            this.showFeedback(`Skala: ${(this.currentScale * 100).toFixed(0)}%`);
        }
    }
    
    toggleInfo() {
        const infoPanel = document.getElementById('infoPanel');
        this.isInfoVisible = !this.isInfoVisible;
        
        if (this.isInfoVisible) {
            infoPanel.style.display = 'block';
            infoPanel.classList.add('fade-in');
        } else {
            infoPanel.classList.add('fade-out');
            setTimeout(() => {
                infoPanel.style.display = 'none';
                infoPanel.classList.remove('fade-out');
            }, 500);
        }
    }
    
    resetModel() {
        if (this.skeletonModel) {
            this.currentRotation = 0;
            this.currentScale = 0.2;
            this.currentPosition = 'standing';
            this.isFlipped = false;
            this.skeletonModel.setAttribute('rotation', '-90 0 0');
            this.skeletonModel.setAttribute('scale', '0.2 0.2 0.2');
            this.skeletonModel.setAttribute('position', '0 0 0');
            this.showFeedback('Model direset');
        }
    }

    setModelPosition(position) {
        if (!this.skeletonModel || !this.isARActive) return;
        
        this.currentPosition = position;
        let rotation, positionOffset;
        
        switch(position) {
            case 'standing':
                rotation = '-90 0 0';
                positionOffset = '0 0 0';
                this.showFeedback('Posisi: Berdiri');
                break;
            case 'lying':
                rotation = '0 0 0';
                positionOffset = '0 -0.5 0';
                this.showFeedback('Posisi: Terlentang');
                break;
            case 'side':
                rotation = '0 0 -90';
                positionOffset = '0 -0.3 0';
                this.showFeedback('Posisi: Miring');
                break;
            case 'sitting':
                rotation = '-45 0 0';
                positionOffset = '0 -0.2 0';
                this.showFeedback('Posisi: Duduk');
                break;
            default:
                rotation = '-90 0 0';
                positionOffset = '0 0 0';
        }
        
        // Apply flip if needed
        if (this.isFlipped) {
            const rotationParts = rotation.split(' ');
            rotationParts[1] = (parseFloat(rotationParts[1]) + 180).toString();
            rotation = rotationParts.join(' ');
        }
        
        this.skeletonModel.setAttribute('rotation', rotation);
        this.skeletonModel.setAttribute('position', positionOffset);
    }

    flipModel() {
        if (!this.skeletonModel || !this.isARActive) return;
        
        this.isFlipped = !this.isFlipped;
        
        // Get current rotation
        const currentRotation = this.skeletonModel.getAttribute('rotation');
        const rotationParts = currentRotation.x + ' ' + currentRotation.y + ' ' + currentRotation.z;
        const parts = rotationParts.split(' ');
        
        // Flip Y rotation by 180 degrees
        parts[1] = (parseFloat(parts[1]) + 180).toString();
        
        this.skeletonModel.setAttribute('rotation', parts.join(' '));
        this.showFeedback(this.isFlipped ? 'Model dibalik' : 'Model normal');
    }
    
    goHome() {
        // Stop camera stream
        this.stopCamera();
        
        document.getElementById('welcomeScreen').style.display = 'flex';
        document.getElementById('arScene').style.display = 'none';
        document.getElementById('controls').style.display = 'none';
        document.getElementById('positionControls').style.display = 'none';
        document.getElementById('infoPanel').style.display = 'none';
        document.getElementById('markerInfo').style.display = 'none';
        
        this.isARActive = false;
        this.resetModel();
        this.isInfoVisible = false;
    }

    stopCamera() {
        try {
            // Stop stored camera stream
            if (this.cameraStream) {
                const tracks = this.cameraStream.getTracks();
                tracks.forEach(track => {
                    track.stop();
                });
                this.cameraStream = null;
            }
            
            // Stop all video elements
            const videoElements = document.querySelectorAll('video');
            videoElements.forEach(video => {
                if (video.srcObject) {
                    const stream = video.srcObject;
                    const tracks = stream.getTracks();
                    tracks.forEach(track => {
                        track.stop();
                    });
                    video.srcObject = null;
                }
                // Pause and reset video
                video.pause();
                video.currentTime = 0;
            });
            
            // Stop AR.js camera system
            const arScene = document.getElementById('arScene');
            if (arScene) {
                // Try multiple methods to stop AR camera
                if (arScene.systems && arScene.systems.arjs) {
                    try {
                        if (arScene.systems.arjs.stop) {
                            arScene.systems.arjs.stop();
                        }
                    } catch (e) {
                        console.log('AR.js stop method error:', e);
                    }
                }
                
                // Force reload AR scene to ensure camera stops
                setTimeout(() => {
                    if (arScene.parentNode) {
                        const newScene = arScene.cloneNode(true);
                        arScene.parentNode.replaceChild(newScene, arScene);
                    }
                }, 100);
            }
            
            this.showFeedback('Kamera dimatikan');
            
        } catch (error) {
            console.log('Error stopping camera:', error);
            this.showFeedback('Kamera dihentikan');
        }
    }
    
    showFeedback(message) {
        // Create or update feedback element
        let feedback = document.getElementById('feedback');
        if (!feedback) {
            feedback = document.createElement('div');
            feedback.id = 'feedback';
            feedback.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 10px 20px;
                border-radius: 25px;
                z-index: 1000;
                font-size: 14px;
                pointer-events: none;
                transition: opacity 0.3s ease;
            `;
            document.body.appendChild(feedback);
        }
        
        feedback.textContent = message;
        feedback.style.opacity = '1';
        
        clearTimeout(this.feedbackTimeout);
        this.feedbackTimeout = setTimeout(() => {
            feedback.style.opacity = '0';
        }, 2000);
    }
    
    showLoading() {
        const loading = document.createElement('div');
        loading.id = 'loading';
        loading.className = 'loading';
        loading.innerHTML = `
            <div class="spinner"></div>
            <p>Memuat AR...</p>
        `;
        document.body.appendChild(loading);
    }
    
    hideLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.remove();
        }
    }
    
    handleKeyboard(e) {
        if (!this.isARActive) return;
        
        switch(e.key) {
            case 'ArrowLeft':
                this.rotateModel(-15);
                break;
            case 'ArrowRight':
                this.rotateModel(15);
                break;
            case 'ArrowUp':
            case '+':
            case '=':
                this.scaleModel(0.1);
                break;
            case 'ArrowDown':
            case '-':
                this.scaleModel(-0.1);
                break;
            case 'i':
            case 'I':
                this.toggleInfo();
                break;
            case 'r':
            case 'R':
                this.resetModel();
                break;
            case 'Escape':
                this.goHome();
                break;
        }
    }
    
    handleTouchStart(e) {
        if (!this.isARActive) return;
        
        if (e.touches.length === 1) {
            this.touchStartX = e.touches[0].clientX;
            this.touchStartY = e.touches[0].clientY;
            this.isRotating = true;
        } else if (e.touches.length === 2) {
            this.lastTouchDistance = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            this.isScaling = true;
            this.isRotating = false;
        }
    }
    
    handleTouchMove(e) {
        if (!this.isARActive) return;
        
        e.preventDefault();
        
        if (e.touches.length === 1 && this.isRotating) {
            const deltaX = e.touches[0].clientX - this.touchStartX;
            const deltaY = e.touches[0].clientY - this.touchStartY;
            
            // Horizontal swipe for rotation
            if (Math.abs(deltaX) > 30) {
                this.rotateModel(deltaX > 0 ? 10 : -10);
                this.touchStartX = e.touches[0].clientX;
            }
            
            // Vertical swipe for scaling
            if (Math.abs(deltaY) > 30) {
                this.scaleModel(deltaY < 0 ? 0.05 : -0.05);
                this.touchStartY = e.touches[0].clientY;
            }
        } else if (e.touches.length === 2 && this.isScaling) {
            const currentDistance = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            
            if (this.lastTouchDistance > 0) {
                const delta = (currentDistance - this.lastTouchDistance) / 200;
                this.scaleModel(delta);
            }
            
            this.lastTouchDistance = currentDistance;
        }
    }
    
    handleTouchEnd(e) {
        if (e.touches.length === 0) {
            this.isRotating = false;
            this.isScaling = false;
        } else if (e.touches.length === 1) {
            this.isScaling = false;
            this.lastTouchDistance = 0;
        }
    }
    
    handleResize() {
        // Handle responsive adjustments if needed
        if (window.innerWidth < 768) {
            // Mobile adjustments
            const controls = document.getElementById('controls');
            if (controls) {
                controls.style.bottom = '10px';
            }
        }
    }
    
    enhanceModelMaterials() {
        if (!this.skeletonModel) return;
        
        const model = this.skeletonModel.getObject3D('mesh');
        if (model) {
            model.traverse((child) => {
                if (child.isMesh && child.material) {
                    // Enhance existing materials
                    if (Array.isArray(child.material)) {
                        child.material.forEach(mat => {
                            this.enhanceMaterial(mat);
                        });
                    } else {
                        this.enhanceMaterial(child.material);
                    }
                }
            });
            console.log('Model materials enhanced');
        }
    }
    
    enhanceMaterial(material) {
        // Preserve original colors and textures while improving lighting response
        material.needsUpdate = true;
        
        // Improve material properties for better lighting
        if (material.color) {
            // Brighten the material if it's too dark
            const hsl = {};
            material.color.getHSL(hsl);
            if (hsl.l < 0.3) {
                material.color.setHSL(hsl.h, hsl.s, Math.max(0.4, hsl.l * 1.5));
            }
        }
        
        // Set appropriate material properties
        if (material.metalness !== undefined) {
            material.metalness = Math.min(0.2, material.metalness);
        }
        if (material.roughness !== undefined) {
            material.roughness = Math.max(0.6, material.roughness);
        }
        
        // Enable proper lighting calculations
        material.flatShading = false;
        
        // Ensure emissive properties for better visibility
        if (material.emissive && material.color) {
            material.emissive.copy(material.color).multiplyScalar(0.1);
        }
    }
}

// Educational content data
const educationalContent = {
    facts: [
        "Tubuh manusia dewasa memiliki 206 tulang",
        "Tulang terkuat adalah tulang paha (femur)",
        "Tulang terkecil ada di telinga tengah (stapes)",
        "Kerangka menyusun sekitar 15% berat tubuh",
        "Tulang terus berkembang hingga usia 30 tahun",
        "Sumsum tulang memproduksi 2,6 juta sel darah merah per detik",
        "Tulang rusuk melindungi organ vital seperti jantung dan paru-paru",
        "Tengkorak terdiri dari 22 tulang yang saling menyatu"
    ],
    functions: [
        "Memberikan struktur dan bentuk tubuh",
        "Melindungi organ vital",
        "Memungkinkan gerakan melalui persendian",
        "Memproduksi sel darah di sumsum tulang",
        "Menyimpan mineral seperti kalsium dan fosfor",
        "Menyimpan lemak di sumsum tulang kuning"
    ]
};

// Global functions for HTML onclick events
function startAR() {
    window.skeletonApp.startAR();
}

function rotateModel(angle) {
    window.skeletonApp.rotateModel(angle);
}

function scaleModel(delta) {
    window.skeletonApp.scaleModel(delta);
}

function toggleInfo() {
    window.skeletonApp.toggleInfo();
}

function resetModel() {
    window.skeletonApp.resetModel();
}

function goHome() {
    window.skeletonApp.goHome();
}

function setModelPosition(position) {
    window.skeletonApp.setModelPosition(position);
}

function flipModel() {
    window.skeletonApp.flipModel();
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.skeletonApp = new SkeletonARApp();
    
    // Add some educational content rotation
    setInterval(() => {
        const factElements = document.querySelectorAll('.rotating-fact');
        factElements.forEach(element => {
            const facts = educationalContent.facts;
            const randomFact = facts[Math.floor(Math.random() * facts.length)];
            element.textContent = randomFact;
        });
    }, 10000); // Change fact every 10 seconds
});

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}