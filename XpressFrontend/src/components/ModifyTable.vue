<template>
    <div>
        <h2 class="slogan">Modificar Estado</h2>
        <div class="mb-3 d-flex justify-content-center">
            <input
                v-model="newStateName"
                placeholder="Nombre del estado"
                class="form-control d-inline w-50 mr-2"
            />
            <button @click="updateState" class="btn btn1 btn-add">Editar Estado</button>
        </div>
        <p class="text-center">ID del estado: {{ stateId }}</p>
    </div>
</template>

<script>
import axios from "axios"; // Asegúrate de tener axios importado

export default {
    name: "ModifyTable",
    data() {
        return {
            stateId: null,
            newStateName: "", // Para almacenar el nombre del estado
        };
    },
    mounted() {
        this.stateId = this.$route.params.id; // Asigna el ID desde los parámetros de la URL
        this.loadStateDetails();
    },
    methods: {
        async loadStateDetails() {
            try {
                // Supón que el endpoint para obtener los detalles del estado es `/api/states/{id}`
                const response = await axios.get(`/api/states/${this.stateId}`);

                // Asigna los datos obtenidos de la respuesta
                this.newStateName = response.data.name; // Ajusta según la estructura de datos de tu API

                console.log("Detalles del estado cargados:", response.data);
            } catch (error) {
                console.error("Error al cargar los detalles del estado:", error);
            }
        },
        async updateState() {
            try {
                // Envía la solicitud para actualizar el estado
                const response = await axios.put(`/api/states/${this.stateId}`, {
                    name: this.newStateName, // Envía el nombre actualizado
                });

                console.log("Estado actualizado:", response.data);
                // Aquí puedes agregar un mensaje de éxito o redirigir al usuario
            } catch (error) {
                console.error("Error al actualizar el estado:", error);
            }
        },
    },
};
</script>


<style scoped>
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
    padding-top: 100px;
}
.btn-add {
    background-color: #99b291;
    color: #2d3835;
    border-color: #2d3835;
}
</style>
