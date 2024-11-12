<script>

import Navbar from "@/components/Navbar.vue";
import Particles from "@/components/Particles.vue";
import brocoli from "@/assets/brocoli.png";
import mushrom from "@/assets/mushrom.png";
import mazorca from "@/assets/mazorca.png";

export default {
    name: 'MainLayout',

    data() {
        return {
            navLinks: [
                {
                    to: "/",
                    title: "Inicio",
                },
                {
                    to: "/login",
                    title: "Iniciar Sesión",
                },
                {
                    to: "/register",
                    title: "Registarse",
                },
                {
                    to: "/adminlogin",
                    title: "Administradores",
                }
            ],
            particles: [brocoli, mushrom, mazorca],
        }
    },

    components: {
        Navbar, Particles,
    }
}
</script>

<<template>
    <div class="container-fluid p-0 navbar-container">
        <Particles
            :particleCount="80"
            particleSize="25"
            :imageUrls="this.particles"
            hoverEffectDistance="150"
        />
        <Navbar :navLinks="this.navLinks" />

        <RouterView/>
    </div>
</template>

<style scoped>
header {
    line-height: 1.5;
    max-height: 100vh;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;
}

nav a.router-link-exact-active {
    color: var(--color-text);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 10px;
    border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
    border: 0;
}

@media (min-width: 1500px) {
    header {
        display: flex;
        place-items: center;
        width: 100%; /* Asegura que el header ocupe todo el ancho disponible */
        padding: 1rem 3rem; /* Agrega algo de espacio en los bordes */
    }

    .logo {
        margin: 0 .0rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: nowrap; /* Evita que los elementos se envuelvan */
        justify-content: space-between; /* Espacia los elementos */
        width: 100%; /* Asegura que la wrapper ocupe todo el ancho */
    }

    nav {
        text-align: left;
        margin-left: -1rem;
        font-size: 1.2rem;
        padding: 1rem 0;
        margin-top: 1rem;
        width: 100%; /* Asegura que el nav ocupe todo el espacio disponible */
        display: flex;
        justify-content: flex-start; /* Alinea los elementos del nav al principio */
        gap: 2rem; /* Espacio entre los elementos */
    }

    nav a {
        white-space: nowrap; /* Evita que los textos se desborden y se ajusten a varias líneas */
    }

    body {
        display: flex;
        place-items: center;
    }
}
</style>
