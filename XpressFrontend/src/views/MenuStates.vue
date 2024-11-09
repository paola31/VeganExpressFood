<script>
export default {
    name: "MenuStates",
    data() {
        return {
            States: [], // Usamos esta propiedad para almacenar los estados
            newStateName: '', // Variable para capturar el nuevo estado
            errorMessage: '',
            successMessage: ''
        };
    },
    methods: {
        // Método para cargar los estados
        async getMenuStates() {
            try {
                const response = await this.$apiClient.post('/getMenuStates');
                this.States = response.data.states;
            } catch (error) {
                this.errorMessage = error.response ? error.response.data.message : 'Error al consultar estados de la orden';
            }
        },

        // Método para agregar un nuevo estado
        async addState() {
            if (!this.newStateName) {
                this.errorMessage = 'El nombre del estado no puede estar vacío';
                return;
            }
            try {
                await this.$apiClient.post('/addState', { name: this.newStateName });
                this.successMessage = 'Estado agregado con éxito';
                this.newStateName = '';
                await this.getMenuStates();
            } catch (error) {
                this.errorMessage = error.response ? error.response.data.message : 'Error al agregar el estado';
            }
        },

        // Método para eliminar un estado
        async deleteState(stateId) {
            try {
                await this.$apiClient.post('/deleteState', { id: stateId });
                this.successMessage = 'Estado eliminado con éxito';
                await this.getMenuStates();
            } catch (error) {
                this.errorMessage = error.response ? error.response.data.message : 'Error al eliminar el estado';
            }
        },

        // Método para actualizar el estado
        async updateState(stateId, newName) {
            if (!newName) {
                this.errorMessage = 'El nombre del estado no puede estar vacío';
                return;
            }
            try {
                await this.$apiClient.post('/updateState', { id: stateId, name: newName });
                this.successMessage = 'Estado actualizado con éxito';
                await this.getMenuStates();
            } catch (error) {
                this.errorMessage = error.response ? error.response.data.message : 'Error al actualizar el estado';
            }
        }
    },
    beforeMount() {
        this.getMenuStates();
    }
};
</script>

<template>
    <div class="custom-container">
        <!-- Mensajes de error y éxito -->
        <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
        <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>

        <h2 class="slogan">Estados del Menú</h2>

        <!-- Campo para agregar un nuevo estado -->
        <div class="mb-3">
            <input  v-model="newStateName" placeholder="Nombre del nuevo estado" class="form-control d-inline w-50 mr-2" />
            <button @click="addState" class="btn btn1 btn-add">Agregar Estado</button>
        </div>

        <!-- Tabla de estados -->
        <table class="table table-striped table-dark">
            <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Acciones</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="state in States" :key="state.id">
                <td scope="row">{{ state.id }}</td>
                <td>{{ state.name }}</td>
                <td>
                    <!-- Botón para modificar el estado -->
                    <button
                        @click="$router.push({ name: 'modifyState', params: { id: state.id } })"
                        class="btn btn-warning btn-sm"> Modificar </button>                    <!-- Botón para eliminar el estado -->
                    <button @click="deleteState(state.id)" class="btn btn-danger btn-sm">Eliminar</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.custom-container {
    max-width: 600px;
    margin: 100px auto 0;
}

button.btn {
    margin-right: 5px;
    background: #5b6c69;
    margin-left: 20px;
    border: 3px solid #2d3835; /* Aplica borde completo */
    border-radius: 8px;
}

/* Estilos específicos para el botón "Agregar Estado" */
button.btn-add {
    background-color: #99b291; /* Cambia el fondo a un color verde */
    color: #2d3835;             /* Cambia el color del texto */
    border-color: #2d3835;
    margin-sta: 50px;/* Cambia el borde */
}

.slogan {
    font-family: "Open Sans Light";
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
    letter-spacing: 2px;
    color: #c2c9c8;
    margin-bottom: 50px;
    text-shadow: 1px 1px 2px rgba(219, 231, 222, 0.6);
    transition: color 0.3s ease;
    padding-top: 50px; /* Separación entre el carrusel y el eslogan */
}

.slogan:hover {
    color: rgba(226, 234, 221, 0.1);
}
.alert {
    text-align: center;
}
</style>
