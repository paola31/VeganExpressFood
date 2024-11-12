<script>

import Navbar from "@/components/Navbar.vue";

export default {
    name: "UserLayout",

    data() {
        return {
            navLinks: [
                {
                    to: "/user/orders",
                    title: "Pide aquí",
                },
                {
                    to: "/user/reservations",
                    title: "Haz tu reserva",
                },
                {
                    to: "/",
                    title: "Salir",
                }
            ]
        }
    },

    components: {
        Navbar,
    }

}
</script>

<template>
    <div class="container-fluid p-0 navbar-container">
        <Navbar :navLinks="this.navLinks" />

        <RouterView/>
    </div>
</template>

<style scoped>

</style>
