<script>
export default {
    name: "AdminLogin",

    data() {
        return {
            form: {
                email: "",
                password: "",
            },
            errorMessage: "",
        }
    },

    methods: {
        async adminLogin() {
            try {
                const response = await this.$apiClient.adminLogin(this.form)
                console.log(response)
                if(response.status === 200){
                    this.errorMessage = ''
                    this.$router.push('/admin/menus')
                } else {
                    console.log(response)
                }
            } catch (error) {
                console.log(error)
                this.errorMessage = error.response ? error.response.data.message : 'Error al iniciar sesión'
            }
        }
    }
}
</script>

<template>
    <div class="container d-flex flex-column align-items-center justify-content-center vh-100">
        <span class="title slogan">Inicio Administradores</span>
        <form @submit.prevent="adminLogin">
            <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="custom-input" id="email" v-model="form.email" placeholder="Ingresa tu correo electrónico">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Contraseña</label>
                <input type="password" class="custom-input" id="password" v-model="form.password" placeholder="Ingresa tu contraseña">
            </div>

            <button type="submit" class="custom-button">Iniciar sesión</button>
        </form>
    </div>
</template>

<style scoped>

</style>
