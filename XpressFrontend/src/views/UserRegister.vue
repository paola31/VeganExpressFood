<script>

export default {
    name: "UserRegister",

    data() {
        return {
            form: {
                name: '',
                lastname: '',
                phone: '',
                email: '',
                password: ''
            },
            errorMessage: '',
            successMessage: ''
        }
    },

    methods: {
        async registerUser() {
            try {
                const response = await this.$apiClient.register(this.form)
                this.successMessage = 'Usuario registrado exitosamente!'
                this.errorMessage = ''

                if(response.status === 201){
                    this.errorMessage = ''
                    this.$router.push('/user/dashboard')
                } else {
                    console.log(response)
                }
            } catch (error) {
                this.errorMessage = error.response ? error.response.data.message : 'Error al registrar el usuario'
                this.successMessage = ''
            }
        }
    }
}
</script>

<template>
    <div class="container d-flex flex-column align-items-center justify-content-center vh-100">
        <span class="title slogan">Registrate</span>
        <form @submit.prevent="registerUser">
            <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

            <div class="mb-3">
                <label for="name" class="form-label">Nombre</label>
                <input type="text" class="custom-input" id="nombre" v-model="form.name" placeholder="Ingresa tu nombre">
            </div>
            <div class="mb-3">
                <label for="lastname" class="form-label">Apellido</label>
                <input type="text" class="custom-input" id="lastname" v-model="form.lastname" placeholder="Ingresa tu apellido">
            </div>
            <div class="mb-3">
                <label for="phone" class="form-label">Teléfono</label>
                <input type="text" class="custom-input" id="phone" v-model="form.phone" placeholder="Ingresa tu número de teléfono">
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="text" class="custom-input" id="email" v-model="form.email" placeholder="Ingresa tu correo electrónico">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Contraseña</label>
                <input type="password" class="custom-input" id="password" v-model="form.password" placeholder="Ingresa tu contraseña">
            </div>

            <button type="submit" class="custom-button">Registrarme</button>
        </form>
    </div>
</template>


<style scoped>

</style>