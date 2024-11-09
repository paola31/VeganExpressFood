
<script>
export default {
    name: "UserLayout"
}
</script>
<template>
    <div>
        <header>
            <nav>
                <RouterLink to="/user/dashboard">Dashboard de Usuario</RouterLink>
                <RouterLink to="/user/profile">Perfil</RouterLink>
            </nav>
        </header>
        <RouterView />
    </div>
</template>


<style scoped>
/* Estilos específicos para el layout de usuario */
</style>
