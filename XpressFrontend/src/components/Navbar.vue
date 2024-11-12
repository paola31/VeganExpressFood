<script>

import flower from '@/assets/flower.png'

export default {
    name: "Navbar",

    data() {
        return {
            flower: flower
        }
    },

    props: {
        navLinks: [],
    }
}
</script>

<template>
    <div class="container-fluid">
        <nav class="navbar navbar-expand-lg custom-navbar w-100 pl-5">

            <span class="navbar-brand fontMuli ms-3">
                <strong><h2 class="greenleaf">Vegan </h2></strong>
                <span class="text-white fs-6"><small>XPRESS FOOD </small></span>
            </span>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
                <!-- Separador de items en la navbar -->
                <ul class="navbar-nav ms-auto me-auto mb-2 mb-lg-0">
                    <li class="nav-item" v-for="navLink in navLinks">
                        <RouterLink class="nav-link active" :to="navLink.to"> {{navLink.title}} </RouterLink>
                    </li>
                    <li class="nav-item">
                        <img :src="this.flower" class="flower-img">
                    </li>
                </ul>
            </div>
        </nav>
    </div>

</template>

<style scoped>

/* Ajuste del navbar con una altura fija */
.custom-navbar {
    background-color: #212529;
    height: 80px;
    display: flex;
    align-items: stretch;
}

.navbar-brand {
    height: 100%; /* Asegura que el video ocupe toda la altura del navbar */
    max-height: 80px; /* Define un máximo para evitar que el video se desborde */
    width: auto; /* Mantiene la relación de aspecto */
    padding: 0; /* Quita cualquier padding */
}

.custom-navbar .navbar-brand {
    display: flex;
    align-items: center;
}

/* Estilo de los elementos del navbar */
.navbar-nav .nav-item {
    margin: 0 20px; /* Ajusta la separación entre los elementos */
}

.navbar-nav .nav-link {
    color: #ffffff;
    font-size: 1.1em;
    position: relative;
    transition: color 0.3s ease, transform 0.3s ease;
}

.navbar-nav .nav-link:hover {
    color: #4caf50;
    transform: scale(1.1);
}

/* Efecto de subrayado en los enlaces */
.navbar-nav .nav-link::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 0;
    height: 2px;
    background-color: #4caf50;
    transition: width 0.3s ease;
}

.navbar-nav .nav-link:hover::after {
    width: 100%;
}

.fontMuli {
    font-family: muli, sans-serif;
}

.flower-img {
    height: 65px; /* Ajusta la altura según tus preferencias */
    width: auto; /* Mantiene la proporción de la imagen */
    object-fit: contain; /* Evita que la imagen se distorsione */
}

.greenleaf {
    color: #20c997
}


</style>