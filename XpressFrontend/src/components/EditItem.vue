<script>
export default {
    name: "EditItem",

    data() {
        return {
            inputValue: "",
            itemData: {
                name: "",
                id: ""
            }
        }
    },

    props: {
        form: {},
    },

    methods: {
        save() {
            this.itemData.name = this.inputValue;
            this.itemData.id = this.form.item !== undefined ? this.form.item.id : "" ;
            this.$emit("save", this.itemData);
        }
    },

    beforeMount() {
        if(this.form.item !== undefined ) {
            this.inputValue = this.form.item.name;
        }
    }
}
</script>

<template>
    <div class="container w-50 mt-5">
        <h3 class="slogan"> {{ form.title }} </h3>
        <form @submit.prevent="save">
            <label for="name" class="form-label">Nombre</label>
            <input :placeholder="form.placeholder" id="name" v-model="inputValue" class="form-control"/>
            <button @click="this.save" class="btn btn-add form-control mt-3">{{ form.buttonText }}</button>
            <button @click="this.$emit('cancel')" class="btn btn-danger form-control mt-3">Cancelar</button>
        </form>

    </div>
</template>

<style scoped>

</style>