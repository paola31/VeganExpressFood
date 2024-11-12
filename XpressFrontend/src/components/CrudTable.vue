<script>
export default {
    name: 'CrudTable',
    props: {
        tableProps: {}
    },
    data() {
        return {

        };
    }
}
</script>

<template>
    <div class="container mt-5">

        <h2 class="slogan">{{ tableProps.slogan }}</h2>

        <div class="container mt-2 mb-2 d-flex flex-row-reverse">
            <button class="btn btn-success btn-add" @click="$emit('add')">Agregar</button>
        </div>

        <table class="table table-striped table-dark justify-center text-center">
            <thead>
                <tr class="text-center">
                    <th scope="col" v-for="column in tableProps.columns">{{ column }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in tableProps.data" :key="item.id">
                    <td scope="row" v-for="(value, key) in item">
                        <img v-if="key === 'image' " :src="`http://localhost:3000/images/${value}`" :alt="value" class="img-fluid rounded" width="35px" height="35px" />
                        <span v-if="key !== 'image'"> {{ value }} </span>
                    </td>
                    <td scope="row" class="d-flex justify-content-center">
                        <button @click="$emit('edit', item)" class="btn btn-success me-2"> Modificar </button>
                        <button @click="$emit('delete', item.id)" class="btn btn-danger btn-sm">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>

</style>