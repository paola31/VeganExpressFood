<script>
export default {
    name: "MenuStates",
    data() {
        return {
            menus: [],
            newMenuName: '',
            errorMessage: '',
            successMessage: ''
        };
    },
    methods: {
        async getMenus() {
            try {
                const response = await this.$apiClient.post('/getMenu');
                console.log(response)
                this.menus = response.data.menus;
            } catch (error) {
                this.errorMessage = error.response ? error.response.data.message : 'Error al consultar menús';
            }
        },
        async deleteMenu(menuId) {
            try {
                await this.$apiClient.post('/deletemenu', { id: menuId });
                this.successMessage = 'Menú eliminado con éxito';
                await this.getMenus();
            } catch (error) {
                this.errorMessage = error.response ? error.response.data.message : 'Error al eliminar el menú';
            }
        },
        async addStateToMenu(menuId, stateName) {
            try {
                await this.$apiClient.post('/addstate', { menuId, name: stateName });
                this.successMessage = 'Estado agregado con éxito';
                await this.getMenus();
            } catch (error) {
                this.errorMessage = error.response ? error.response.data.message : 'Error al agregar estado';
            }
        },
        async deleteState(menuId, stateId) {
            try {
                await this.$apiClient.post('/deletestate', { id: stateId });
                this.successMessage = 'Estado eliminado con éxito';
                await this.getMenus();
            } catch (error) {
                this.errorMessage = error.response ? error.response.data.message : 'Error al eliminar el estado';
            }
        },
        async updateState(menuId, stateId, newName) {
            try {
                await this.$apiClient.post('/updatestate', { id: stateId, name: newName });
                this.successMessage = 'Estado actualizado con éxito';
                await this.getMenus();
            } catch (error) {
                this.errorMessage = error.response ? error.response.data.message : 'Error al actualizar el estado';
            }
        },
        async addMenu() {
            try {
                await this.$apiClient.post('/addmenu', { name: this.newMenuName });
                this.successMessage = 'Menú agregado con éxito';
                this.newMenuName = '';
                await this.getMenus();
            } catch (error) {
                this.errorMessage = error.response ? error.response.data.message : 'Error al agregar menú';
            }
        }
    },
    beforeMount() {
        this.getMenus();
    }
};
</script>

<template>
    <div class="container mt-5">
        <!-- Mensajes de error y éxito -->
        <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
        <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>

        <h2>Administración de Menús</h2>

        <!-- Formulario para agregar un nuevo menú -->
        <div class="mb-4">
            <input v-model="newMenuName" placeholder="Nombre del nuevo menú" class="form-control d-inline w-auto mr-2" />
            <button @click="addMenu" class="btn btn-primary btn-sm">Agregar Menú</button>
        </div>

        <!-- Tabla de Menús -->
        <table class="table table-bordered table-striped">
            <thead>
            <tr>
                <th>Id</th>
                <th>Nombre del Menú</th>
                <th>Estados</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="menu in this.menus" :key="menu.id">
                <td>{{ menu.id }}</td>
                <td>{{ menu.name }}</td>

                <!-- Subtabla de Estados -->
                <td>
                    <table class="table table-sm mb-0">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre del Estado</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="state in menu.states" :key="state.id">
                            <td>{{ state.id }}</td>
                            <td>{{ state.name }}</td>
                            <td>
                                <!-- Botón para editar un estado -->
                                <button @click="updateState(menu.id, state.id, prompt('Nuevo nombre del estado:', state.name))" class="btn btn-warning btn-sm">Editar</button>
                                <!-- Botón para eliminar un estado -->
                                <button @click="deleteState(menu.id, state.id)" class="btn btn-danger btn-sm">Eliminar</button>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                <!-- Campo para agregar un nuevo estado -->
                                <input v-model="menu.newStateName" placeholder="Nuevo estado" class="form-control form-control-sm d-inline w-50" />
                                <button @click="addStateToMenu(menu.id, menu.newStateName)" class="btn btn-success btn-sm">Agregar Estado</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </td>

                <!-- Acciones para el Menú -->
                <td>
                    <!-- Botón para eliminar un menú -->
                    <button @click="deleteMenu(menu.id)" class="btn btn-danger btn-sm">Eliminar Menú</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
<style scoped>
.container {
    max-width: 1000px;
    margin-top: 30px;
}

.alert {
    text-align: center;
}

.table {
    margin-top: 20px;
}

.table th,
.table td {
    text-align: center;
}

.table th {
    background-color: #f8f9fa;
}

.table td {
    vertical-align: middle;
}

.table-sm td,
.table-sm th {
    padding: 0.3rem;
}

.table thead th {
    background-color: #e9ecef;
}

input.form-control-sm {
    display: inline-block;
    width: auto;
}

button.btn {
    margin-right: 5px;
}
</style>
