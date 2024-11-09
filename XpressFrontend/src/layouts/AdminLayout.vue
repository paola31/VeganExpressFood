<template>
    <div class="container-fluid p-0 navbar-container">
        <!-- Navbar con ancho completo y fondo personalizado -->
        <nav class="navbar navbar-expand-lg custom-navbar w-100">
            <!-- Imagen o video como logo en el navbar -->
            <video class="logo" autoplay loop muted>
                <source src="@/assets/waves1.mp4" type="video/mp4">
            </video>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
                <!-- Separador de items en la navbar -->
                <ul class="navbar-nav ms-auto me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink class="nav-link active" to="/admin/menustates">Inicio</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link active" to="/admin/menustates">Estados del menú</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/admin/orderstates">Estados de la orden</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/admin/settings">Configuración</RouterLink>
                    </li>
                </ul>
            </div>
        </nav>
        <RouterView/>
    </div>
</template>

<script>
export default {
    name: "AdminLayout"
}
</script>

<style scoped>
/* Ajuste del contenedor principal del navbar */
.navbar-container {
    padding-top: 50px;
}

/* Ajuste del navbar con una altura fija */
.custom-navbar {
    background-color: #212529;
    height: 80px;
    display: flex;
    align-items: stretch;
}

/* Ajuste del logo (video) */
.logo {
    width: 120px;
    height: 150px;
    margin-right: 10px;
    padding-top: 0px;
    margin-top: -8px;
    object-fit: cover;
    box-shadow: 0 5px 8px rgb(45, 56, 53);
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
</style>
