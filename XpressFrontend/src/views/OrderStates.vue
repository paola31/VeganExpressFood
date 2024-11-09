<script>
export default {
    name: "OrderStates",
    data() {
        return {
            localStates: [],
            errorMessage: ''
            }
        },
    methods: {
        async getOrderStates() {
            try {
                const response = await this.$apiClient.post('/orderStates', {})
                this.localStates = response.data.states
            } catch (error) {
                this.errorMessage = error.response ? error.response.data.message : 'Error al consultar estador de la order'
            }
        }
    },
    beforeMount() {
        this.getOrderStates()
    }
}
</script>

<template>
    <div class="container mt-5">
        <table class="table table-striped table-dark">
            <thead>
            <tr>
                <th scope="col">id</th>
                <th scope="col">Name</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="state in this.localStates">
                <td scope="row">{{ state.id }}</td>
                <td>{{ state.name }}</td>
            </tr>
            </tbody>
        </table>
    </div>

</template>

<style scoped>

</style>