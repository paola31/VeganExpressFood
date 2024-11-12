<template>
    <div ref="particleContainer" class="particle-container">
        <canvas ref="canvas"></canvas>
    </div>
</template>

<script>
export default {
    name: "Particles",
    props: {
        particleCount: {
            type: Number,
            default: 100,
        },
        particleSize: {
            type: Number,
            default: 20,
        },
        imageUrls: {
            type: Array,
            required: true,
        },
        hoverEffectDistance: {
            type: Number,
            default: 100,
        },
    },
    data() {
        return {
            particles: [],
            ctx: null,
            loadedImages: [],
            mouse: {
                x: null,
                y: null,
            },
        };
    },
    mounted() {
        this.setupCanvas();
        this.loadImages()
            .then(() => {
                this.initParticles();
                this.animate();
            });
        window.addEventListener("resize", this.onResize);
        window.addEventListener("mousemove", this.onMouseMove);
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.onResize);
        window.removeEventListener("mousemove", this.onMouseMove);
    },
    methods: {
        async loadImages() {
            const promises = this.imageUrls.map((url) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.src = url;
                    img.onload = () => resolve(img);
                    img.onerror = () => resolve(null); // Manejo de errores en caso de fallo
                });
            });

            this.loadedImages = (await Promise.all(promises)).filter(img => img !== null);
        },
        setupCanvas() {
            const canvas = this.$refs.canvas;
            this.ctx = canvas.getContext("2d");
            this.resizeCanvas();
        },
        resizeCanvas() {
            const canvas = this.$refs.canvas;
            canvas.width = this.$refs.particleContainer.clientWidth;
            canvas.height = this.$refs.particleContainer.clientHeight;
        },
        initParticles() {
            for (let i = 0; i < this.particleCount; i++) {
                // Seleccionar una imagen aleatoria para cada partícula
                const randomImage = this.loadedImages[Math.floor(Math.random() * this.loadedImages.length)];

                this.particles.push({
                    x: Math.random() * this.$refs.canvas.width,
                    y: Math.random() * this.$refs.canvas.height,
                    size: this.particleSize,
                    vx: (Math.random() - 0.5) * 2,
                    vy: (Math.random() - 0.5) * 2,
                    image: randomImage,
                });
            }
        },
        drawParticles() {
            this.ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
            this.particles.forEach((particle) => {
                if (particle.image) { // Verificación adicional
                    this.ctx.drawImage(particle.image, particle.x, particle.y, particle.size, particle.size);
                }
            });
        },
        updateParticles() {
            this.particles.forEach((particle) => {
                const dx = particle.x - this.mouse.x;
                const dy = particle.y - this.mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.hoverEffectDistance) {
                    particle.vx += dx / distance;
                    particle.vy += dy / distance;
                }

                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0 || particle.x > this.$refs.canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > this.$refs.canvas.height) particle.vy *= -1;

                particle.vx *= 0.98;
                particle.vy *= 0.98;
            });
        },
        animate() {
            this.updateParticles();
            this.drawParticles();
            requestAnimationFrame(this.animate);
        },
        onResize() {
            this.resizeCanvas();
            this.particles.forEach((particle) => {
                particle.x = Math.random() * this.$refs.canvas.width;
                particle.y = Math.random() * this.$refs.canvas.height;
            });
        },
        onMouseMove(event) {
            const rect = this.$refs.canvas.getBoundingClientRect();
            this.mouse.x = event.clientX - rect.left;
            this.mouse.y = event.clientY - rect.top;
        },
    },
};
</script>

<style>
.particle-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
}

canvas {
    display: block;
}
</style>
