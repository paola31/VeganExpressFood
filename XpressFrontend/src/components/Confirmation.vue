<script>

import carrot from '@/assets/carrot.png';
import brocoli from '@/assets/brocoli.png';
import tomate from '@/assets/tomate.png';
import letucce from '@/assets/letucce.png';
import onion1 from '@/assets/onion1.png';
import onion2 from '@/assets/onion2.png';
import mushrom from '@/assets/mushrom.png';
import mazorca from '@/assets/mazorca.png';

export default {
    name: "Confirmation",

    data() {
        return {
            vegetables: [
                { src: carrot, style: {} },
                { src: brocoli, style: {} },
                { src: tomate, style: {} },
                { src: letucce, style: {} },
                { src: onion1, style: {} },
                { src: onion2, style: {} },
                { src: mushrom, style: {} },
                { src: mazorca, style: {} },
            ],
        };
    },

    props: {
        title: ""
    },

    mounted() {
        this.startAnimation();
    },

    methods: {
        startAnimation() {
            this.vegetables.forEach((vegetable) => {
                this.setRandomPosition(vegetable);
                this.animateVegetable(vegetable);
            });
        },
        setRandomPosition(vegetable) {
            vegetable.style.left = `${Math.random() * 100}vw`;
            vegetable.style.top = `${Math.random() * 100}vh`;
        },
        animateVegetable(vegetable) {
            setInterval(() => {
                vegetable.style.animation = `bounce 1s ease infinite`;
                this.setRandomPosition(vegetable);
            }, Math.random() * 2000 + 1000);
        }
    },
}
</script>

<template>
    <div class="container-fluid text-center" @click="this.$emit('restart')">
            <h1 class="text-success centered-text">
                {{ title }}
                <br />
                Has click en la pantalla para seguir pidiendo :)
            </h1>
        <div class="background">
            <img
                v-for="(vegetable, index) in vegetables"
                :key="index"
                :src="vegetable.src"
                :style="vegetable.style"
                class="vegetable"
            />
        </div>
    </div>

</template>

<style scoped>
.background {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

.vegetable {
    position: absolute;
    width: 50px;
    height: auto;
    animation: bounce 1s ease infinite;
}

.centered-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: green;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    font-size: 2rem;
    z-index: 10;
}

@keyframes bounce {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-20px);
    }
}
</style>