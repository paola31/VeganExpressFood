<script>
export default {
    name: "EditMenuItem",

    data() {
        return {
            imageFile: null,
            formValues: {
                id: null,
                name: "",
                description: "",
                price: "",
                state: "",
                image: null
            },
            shouldDisplayImage: false,
        }
    },

    props: {
        form: {},
    },

    methods: {
        handleImageUpload(event) {
            this.formValues.image = event.target.files[0];
            this.shouldDisplayImage = false;
        },

        save() {
            this.$emit("save", this.formValues);
        }
    },

    beforeMount() {
        if(this.form.item !== undefined ) {
            this.formValues.id = this.form.item.id;
            this.formValues.name = this.form.item.name;
            this.formValues.description = this.form.item.description;
            this.formValues.price = this.form.item.price;
            const matchedState = this.form.states.find(state => state.name === this.form.item.state);
            this.formValues.state = matchedState ? matchedState.id : "";
            this.formValues.image = this.form.item.image;
            this.shouldDisplayImage = true;
        }
    }


}
</script>

<template>
    <div class="container w-50 mt-5">
        <h3 class="slogan">{{ form.title }}</h3>
        <form @submit.prevent="save">

            <label for="name" class="form-label">Nombre</label>
            <input placeholder="Nombre" id="name" type="text" v-model="this.formValues.name" class="form-control"/>

            <label for="description" class="form-label">Descripción</label>
            <textarea placeholder="Descripción" id="description" v-model="this.formValues.description" class="form-control"></textarea>

            <label for="price" class="form-label">Precio</label>
            <input placeholder="Price" id="price" type="text" v-model="this.formValues.price" class="form-control"/>

            <label for="state" class="form-label">Estado</label>
            <select id="state" class="form-control" v-model="this.formValues.state">
                <option v-for="state in form.states" :value="state.id">{{ state.name }}</option>
            </select>

            <div v-if="shouldDisplayImage" class="mt-3 w-50">
                <h5>Imagen actual:</h5>
                <img :src="`http://localhost:3000/images/${formValues.image}`" alt="Imagen actual" class="img-fluid rounded" width="80px" height="80px"/>
            </div>

            <label for="image" class="form-label">Imagen</label>
            <input type="file" id="image" @change="handleImageUpload" class="form-control"/>

            <button type="submit" class="btn btn-add form-control mt-3">Guardar</button>
            <button @click="this.$emit('cancel')" class="btn btn-danger form-control mt-3">Cancelar</button>

        </form>

    </div>
</template>

<style scoped>

</style>