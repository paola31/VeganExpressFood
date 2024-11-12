<script>

import CrudTable from "@/components/CrudTable.vue";
import EditItem from "@/components/EditItem.vue";
import Notifier from "@/components/Notifier.vue";
import EditMenuItem from "@/components/EditMenuItem.vue";

export default {
    name: "Menu",

    data() {
        return {
            tableProps: {
                columns: ['Id', 'Nombre', 'Descripción', 'Precio', 'Estado', 'Imagen', 'Acciones'],
                data: this.items,
                slogan: "Items del menu"
            },
            notifierProps: {
                errorClasses: "alert alert-danger",
                successClasses: "alert alert-success",
                message: "",
                isError: false
            },
            formProps: {
                title: "",
                item: {},
                states: []
            },
            isEditing: false,
        };
    },

    methods: {
        async getMenuItems() {
            try {
                const response = await this.$apiClient.getMenuItems();

                const stateMap = {};
                this.formProps.states.forEach(state => {
                    stateMap[state.id] = state.name;
                });


                this.tableProps.data = response.data.items.map(item => {
                    return {
                        ...item,
                        state: stateMap[item.state] || item.state
                    };
                });

            } catch (error) {
                let errorMessage = error.response ? error.response.data.message : 'Error al traer items del menu';
                this.showNotification(errorMessage, true);
            }
        },

        async addItem(item) {
            try {
                await this.$apiClient.addMenuItem(item);
                await this.getMenuItems();
                this.showNotification("Item del menu agregado con éxito", false);
            } catch (error) {
                this.showNotification(error.response ? error.response.data.message : 'Error al agregar al item', true);
            }
        },

        async updateItem(item) {
            try {
                await this.$apiClient.updateMenuItem(item);
                this.showNotification("Item del menu agregado con éxito", false);
            } catch (error) {
                this.showNotification(error.response ? error.response.data.message : 'Error al agregar al item', true);
            }
        },

        async deleteItem(itemId) {
            try {
                await this.$apiClient.deleteMenuItem(itemId);
                this.showNotification("Item eliminado con éxito", false);
                await this.getMenuItems();
            } catch (error) {
                this.showNotification(error.response ? error.response.data.message : 'Error al agregar el estado', true);
            }
        },

        async getMenuStates() {
            try {
                const response = await this.$apiClient.getMenuStates();
                this.formProps.states = response.data.states;
            } catch (error) {
                this.showNotification(error.response ? error.response.data.message : 'Error al consultar estados de la orden', true);            }
        },

        showNotification(message, isError) {
            this.notifierProps.message = message;
            this.notifierProps.isError = isError;
            setTimeout(() => {
                this.notifierProps.message = '';
            }, 3000);
        },

        loadAddForm(item) {
            this.isEditing = true;
            this.formProps.item = item;
            this.formProps.title = item !== undefined ? "Editar estado" : "Agregar estado";
        },

        save(formValues)
        {
            if(formValues.id !== null) {
                this.updateItem(formValues);
            } else {
                this.addItem(formValues);
            }
            this.isEditing = false;
        },

        cancel() {
            this.isEditing = false;
        }
    },

    beforeMount() {
        this.getMenuItems();
        this.getMenuStates();
    },

    components: {Notifier, EditItem, CrudTable, EditMenuItem},
}
</script>

<template>
    <div class="container">
        <Notifier :notifyData=this.notifierProps />

        <CrudTable v-if="!this.isEditing" :tableProps=this.tableProps @delete="this.deleteItem" @add="loadAddForm" @edit="loadAddForm"/>

        <EditMenuItem v-if="this.isEditing" :form=this.formProps @save="this.save" @cancel="this.cancel"/>
    </div>
</template>

<style scoped>

</style>