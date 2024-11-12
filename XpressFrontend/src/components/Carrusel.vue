<template>
    <div id="carouselExampleInterval" class="carousel slide small-carousel" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item" data-bs-interval="4000">
                <img src="@/assets/corn.jpg" class="d-block w-100" alt="corn">
            </div>

            <div class="carousel-item active" data-bs-interval="4000">
                <img src="@/assets/mush.jpg" class="d-block w-100" alt="corn">
            </div>

            <div class="carousel-item" data-bs-interval="4000">
                <img src="@/assets/poppy.jpg" class="d-block w-100" alt="corn">
            </div>

        </div>
    </div>

    <div class="slogan">
        <h5>Comida vegana rápida, deliciosa y consciente!</h5>
    </div>
</template>

<script>
export default {
    name: "Carrusel"
}
</script>

<style scoped>
/* Ajuste de tamaño del carrusel para que las imágenes sean más pequeñas */
.small-carousel {
    padding-top: -120px;
    max-width: 400px; /* Reducimos el ancho máximo del carrusel */
    max-height: 120px; /* Reducimos la altura máxima del carrusel */
    margin: auto; /* Centra el carrusel horizontalmente */
}

/* Configuración de transición de desvanecimiento */
.carousel-item {
    opacity: 0;  /* Comienza opaca */
    transition: opacity 0.5s ease-in-out;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%; /* Asegura que la imagen ocupe todo el ancho */
    height: 100%; /* Asegura que la imagen ocupe toda la altura */
}

/* Configuración para la imagen activa */
.carousel-item.active {
    opacity: 1;
    position: relative;
}

.small-carousel .carousel-inner img {
    width: 100%;
    height: auto; /* Mantiene la proporción de la imagen */
    object-fit: cover;
}

/* Estilo para la sección de slogan */
.slogan {
    font-family: "multi";
    font-size: 1.2rem;
    font-weight: 600;
    text-align: center;
    letter-spacing: 2px;
    color: #bdbdbd;
    text-shadow: 1px 1px 2px rgb(117, 136, 128);
    transition: color 0.3s ease;
    padding-top: 500px; /* Separación entre el carrusel y el eslogan */
}

.slogan:hover {
    color: #198754FF;
}
</style>
