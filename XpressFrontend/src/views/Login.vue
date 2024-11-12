<script>
export default {
    name: "Login",

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
        async loginUser() {
            try {
                const response = await this.$apiClient.userLogin(this.form)
                console.log(response)
                if(response.status === 200){
                    this.errorMessage = ''
                    this.$router.push('/user/orders')
                } else {
                    console.log(response)
                }
            } catch (error) {
                this.errorMessage = error.response ? error.response.data.message : 'Error al iniciar sesión'
            }
        }
    }
}
</script>

<template>
    <div class="container d-flex flex-column align-items-center justify-content-center vh-100">
        <span class="title slogan">Inicio de sesion</span>
        <form  @submit.prevent="loginUser">
            <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="custom-input" required="required" id="email" v-model="form.email" placeholder="Ingresa tu correo electrónico">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Contraseña</label>
                <input type="password" class="custom-input" id="password" required="required" v-model="form.password" placeholder="Ingresa tu contraseña">
            </div>

            <button type="submit" class="custom-button">Iniciar sesión</button>
        </form>
    </div>
</template>

<style scoped>

</style>