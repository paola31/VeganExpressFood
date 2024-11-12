<script>
export default {
    name: "ProductCard",

    props:  {
        productData: {},
        menuStates: []
    },

    methods: {
        stateName(id) {
            const state = this.menuStates.find(state => state.id === id);
            return state ? state.name : "Estado desconocido";
        },
    }
}
</script>

<template>
    <div class="card bg-dark text-light shadow">
        <img :src="`http://localhost:3000/images/${productData.image}`" alt="Imagen actual" class="card-img-top card-img-custom"/>
        <div class="card-body">
            <h5 class="card-title">{{ productData.name }}</h5>
            <p class="card-text">
                {{ productData.description }}
            </p>
            <ul class="list-group list-group-flush">
                <li class="list-group-item bg-dark text-light"> $ {{ productData.price }} </li>
                <li class="list-group-item bg-dark text-light"> {{ stateName(productData.state) }} </li>
            </ul>
            <a href="#" class="btn btn-success" @click="this.$emit('add', productData)">Agregar</a>
        </div>
    </div>
</template>

<style scoped>
.card-img-custom {
    height: 200px;
    object-fit: cover;
    width: 100%;
}
</style>