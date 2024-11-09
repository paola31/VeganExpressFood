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
                const response = await this.$apiClient.post('/userlogin', this.form)
                if(response.status === 200){
                    this.errorMessage = ''
                    console.log(response)
                } else {
                    console.log(response)
                }
                /*this.form = {
                    email: '',
                    password: '',
                }*/
            } catch (error) {
                this.errorMessage = error.response ? error.response.data.message : 'Error al iniciar sesión'
            }
        }
    }
}
</script>

<template>
    <div class="container">
        <span class="title slogan">Inicio de sesion</span>
        <form @submit.prevent="loginUser">
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

.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    min-height: 100vh;
    color: #a6a6a6;
    text-align: center;
    padding: 20px;
    margin-top: -250px;
}

.title {
    font-size: 1.6rem;
    font-weight: 600;
    margin-bottom: 20px;
    font-family: "Open Sans Light";
    letter-spacing: 2px;
}

.container form {
    background-color: rgba(0, 0, 0, 0.7);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 10px 18px rgb(45, 56, 53);
    width: 150%;
    max-width: 400px;
}

.container form label {
    font-size: 1.1rem;
    color: #e0e0e0;
    text-align: left;
}

.container form .custom-input {
    width: 100%;
    padding: 12px;
    border: 2px solid #00796b;
    border-radius: 8px;
    margin-bottom: 15px;
    font-size: 1rem;
    color: #333;
    transition: border-color 0.3s;
}

.container form .custom-input:focus {
    border-color: #a8afad;
    outline: none;
}

.container form .custom-button {
    padding: 12px 20px;
    width: 100%;
    font-size: 1.1rem;
    color: white;
    background-color: #00796b;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.container form .custom-button:hover {
    background-color: #5b6c69;
}

.alert {
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 5px;
    background-color: rgba(255, 0, 0, 0.1);
    color: red;
    font-size: 1rem;
    font-weight: bold;
}
.slogan {
    font-family: "Open Sans Light";
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
    letter-spacing: 2px;
    color: #c2c9c8;
    text-shadow: 1px 1px 2px rgba(219, 231, 222, 0.6);
    transition: color 0.3s ease;
    padding-top: 50px; /* Separación entre el carrusel y el eslogan */
}

.slogan:hover {
    color: rgba(226, 234, 221, 0.1);
}
</style>