<script>

import CrudTable from "@/components/CrudTable.vue";
import EditItem from "@/components/EditItem.vue";
import Notifier from "@/components/Notifier.vue";

export default {
    name: "MenuStates",

    data() {
        return {
            message: '',
            tableProps: {
                columns: ['Id', 'Nombre', 'Acciones'],
                data: this.states,
                slogan: "Estados del Menú"
            },
            addFormProps: {
                title: "",
                placeholder: "Agregar estado del menu",
                buttonText: "Guardar",
                item: {}
            },
            notifierProps: {
                errorClasses: "alert alert-danger",
                successClasses: "alert alert-success",
                message: "",
                isError: false
            },
            isEditing: false,
        };
    },

    methods: {
        async getMenuStates() {
            try {
                const response = await this.$apiClient.getMenuStates();
                this.tableProps.data = response.data.states;
            } catch (error) {
                this.showNotification(error.response ? error.response.data.message : 'Error al consultar estados de la orden', true);            }
        },

        async addState(name) {
            try {
                await this.$apiClient.addMenuState(name);
                await this.getMenuStates();
                this.showNotification("Estado agregado con éxito", false);
            } catch (error) {
                this.showNotification(error.response ? error.response.data.message : 'Error al agregar el estado', true);
            }
        },

        async deleteState(stateId) {
            try {
                await this.$apiClient.deleteMenuState(stateId);
                this.showNotification("Estado eliminado con éxito", false);
                await this.getMenuStates();
            } catch (error) {
                this.showNotification(error.response ? error.response.data.message : 'Error al agregar el estado', true);
            }
        },

        async updateState(item) {
            try {
                await this.$apiClient.updateMenuState(item);
                await this.getMenuStates();
                this.showNotification("Estado actualizado con éxito", false);
            } catch (error) {
                this.showNotification(error.response ? error.response.data.message : 'Error al agregar el estado', true);
            }
        },

        loadAddForm(item) {
            this.isEditing = true;
            this.addFormProps.item = item;
            this.addFormProps.title = item !== undefined ? "Editar estado" : "Agregar estado";
        },

        save(item) {
            if(item.id !== "") {
                this.updateState(item);
            } else {
                this.addState(item.name);
            }

           this.isEditing = false;
        },

        showNotification(message, isError) {
            this.notifierProps.message = message;
            this.notifierProps.isError = isError;
            setTimeout(() => {
                this.notifierProps.message = '';
            }, 3000);
        },

        cancel() {
            this.isEditing = false;
        }
    },

    beforeMount() {
        this.getMenuStates();
    },

    components: { Notifier, EditItem, CrudTable},
};
</script>

<template>
    <div class="container">
        <Notifier :notifyData=this.notifierProps />

        <CrudTable v-if="!this.isEditing" :tableProps=this.tableProps @delete="this.deleteState" @add="loadAddForm" @edit="loadAddForm"/>

        <EditItem v-if="this.isEditing" :form=this.addFormProps @save="this.save" @cancel="this.cancel"></EditItem>
    </div>
</template>

<style scoped>

</style>
