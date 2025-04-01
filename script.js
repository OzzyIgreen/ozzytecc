// Menu Mobile
const menuMobile = document.querySelector('.menu-mobile');
const navList = document.querySelector('nav ul');

menuMobile.addEventListener('click', () => {
    navList.style.display = navList.style.display === 'flex' ? 'none' : 'flex';
});

// Fecha o menu ao clicar em um link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navList.style.display = 'none';
        }
    });
});

// Animação suave do scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animação de fade-in para elementos quando aparecem na tela
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Navbar transparente no topo e com fundo ao rolar
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.8)';
        nav.style.boxShadow = 'none';
    }
});

// Adiciona classe para animação de fade-in
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.card').forEach(card => {
        card.classList.add('fade-in');
    });
});

// Formulário de contato
const form = document.querySelector('.contato-form form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar o formulário
    alert('Mensagem enviada com sucesso!');
    form.reset();
});

// Inicialização das cenas Three.js
let heroScene, projectScenes, aboutScene, contactScene;
let heroCamera, projectCameras, aboutCamera, contactCamera;
let heroRenderer, projectRenderers, aboutRenderer, contactRenderer;

// Função de inicialização
function init() {
    // Remover tela de carregamento
    const loader = document.querySelector('.loader');
    loader.style.display = 'none';

    // Inicializar cenas
    initHeroScene();
    initProjectScenes();
    initAboutScene();
    initContactScene();

    // Adicionar event listeners
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('scroll', onScroll);
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Iniciar animação
    animate();
}

// Inicialização da cena hero
function initHeroScene() {
    heroScene = new THREE.Scene();
    heroCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    heroRenderer = new THREE.WebGLRenderer({ alpha: true });
    heroRenderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector('.hero-canvas').appendChild(heroRenderer.domElement);

    // Criar partículas
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: '#ffffff'
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    heroScene.add(particlesMesh);
    heroCamera.position.z = 2;
}

// Inicialização das cenas de projetos
function initProjectScenes() {
    projectScenes = [];
    projectCameras = [];
    projectRenderers = [];

    document.querySelectorAll('.project-canvas').forEach((canvas, index) => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        canvas.appendChild(renderer.domElement);

        // Criar cubos 3D
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshPhongMaterial({
            color: 0x3498db,
            shininess: 100
        });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // Adicionar luz
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(1, 1, 1);
        scene.add(light);

        projectScenes.push(scene);
        projectCameras.push(camera);
        projectRenderers.push(renderer);
        camera.position.z = 2;
    });
}

// Inicialização da cena sobre
function initAboutScene() {
    aboutScene = new THREE.Scene();
    aboutCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    aboutRenderer = new THREE.WebGLRenderer({ alpha: true });
    aboutRenderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector('.about-canvas').appendChild(aboutRenderer.domElement);

    // Criar esfera 3D
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshPhongMaterial({
        color: 0x2c3e50,
        shininess: 100
    });
    const sphere = new THREE.Mesh(geometry, material);
    aboutScene.add(sphere);

    // Adicionar luz
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    aboutScene.add(light);

    aboutCamera.position.z = 2;
}

// Inicialização da cena contato
function initContactScene() {
    contactScene = new THREE.Scene();
    contactCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    contactRenderer = new THREE.WebGLRenderer({ alpha: true });
    contactRenderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector('.contact-canvas').appendChild(contactRenderer.domElement);

    // Criar torus 3D
    const geometry = new THREE.TorusGeometry(1, 0.3, 16, 100);
    const material = new THREE.MeshPhongMaterial({
        color: 0x3498db,
        shininess: 100
    });
    const torus = new THREE.Mesh(geometry, material);
    contactScene.add(torus);

    // Adicionar luz
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    contactScene.add(light);

    contactCamera.position.z = 2;
}

// Função de animação
function animate() {
    requestAnimationFrame(animate);

    // Rotação dos objetos 3D
    if (heroScene) {
        heroScene.children[0].rotation.x += 0.001;
        heroScene.children[0].rotation.y += 0.001;
        heroRenderer.render(heroScene, heroCamera);
    }

    projectScenes.forEach((scene, index) => {
        scene.children[0].rotation.x += 0.01;
        scene.children[0].rotation.y += 0.01;
        projectRenderers[index].render(scene, projectCameras[index]);
    });

    if (aboutScene) {
        aboutScene.children[0].rotation.x += 0.01;
        aboutScene.children[0].rotation.y += 0.01;
        aboutRenderer.render(aboutScene, aboutCamera);
    }

    if (contactScene) {
        contactScene.children[0].rotation.x += 0.01;
        contactScene.children[0].rotation.y += 0.01;
        contactRenderer.render(contactScene, contactCamera);
    }
}

// Event listener para redimensionamento da janela
function onWindowResize() {
    // Atualizar câmeras
    heroCamera.aspect = window.innerWidth / window.innerHeight;
    heroCamera.updateProjectionMatrix();
    heroRenderer.setSize(window.innerWidth, window.innerHeight);

    projectCameras.forEach((camera, index) => {
        const canvas = document.querySelectorAll('.project-canvas')[index];
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        projectRenderers[index].setSize(canvas.clientWidth, canvas.clientHeight);
    });

    aboutCamera.aspect = window.innerWidth / window.innerHeight;
    aboutCamera.updateProjectionMatrix();
    aboutRenderer.setSize(window.innerWidth, window.innerHeight);

    contactCamera.aspect = window.innerWidth / window.innerHeight;
    contactCamera.updateProjectionMatrix();
    contactRenderer.setSize(window.innerWidth, window.innerHeight);
}

// Event listener para scroll
function onScroll() {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(44, 62, 80, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.boxShadow = 'none';
    }
}

// Efeitos 3D para botões
document.querySelectorAll('.cta-button, .submit-btn, .social-link').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        button.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Efeito de profundidade para cards
document.querySelectorAll('.project-card, .camera-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', init); 