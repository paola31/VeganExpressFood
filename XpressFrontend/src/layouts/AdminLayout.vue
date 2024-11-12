<script>

import Navbar from "@/components/Navbar.vue";

export default {
    name: "AdminLayout",

    data() {
        return {
            navLinks: [
                {
                    to: "/admin/menustates",
                    title: "Estados del menú",
                },
                {
                    to: "/admin/orderstates",
                    title: "Estados de la orden",
                },
                {
                    to: "/admin/menus",
                    title: "Gestionar menú",
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
