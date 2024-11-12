<script>

import CrudTable from "@/components/CrudTable.vue";
import EditItem from "@/components/EditItem.vue";
import Notifier from "@/components/Notifier.vue";


export default {
    name: "OrderStates",

    data() {
        return {
            tableProps: {
                columns: ['Id', 'Nombre', 'Acciones'],
                data: this.states,
                slogan: "Estados de la orden"
            },
            addFormProps: {
                title: "",
                placeholder: "Agregar estado de la orden",
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
        }
    },
    methods: {
        async getOrderStates() {
            try {
                const response = await this.$apiClient.getOrderStates()
                this.tableProps.data = response.data.states;
            } catch (error) {
                this.showNotification(error.response ? error.response.data.message : 'Error al agregar el estado', true);
            }
        },

        async addState(name) {
            try {
                await this.$apiClient.addOrderState(name);
                await this.getOrderStates();
                this.showNotification("Estado agregado con éxito", false);
            } catch (error) {
                this.showNotification(error.response ? error.response.data.message : 'Error al agregar el estado', true);
            }
        },

        async updateState(item) {
            try {
                await this.$apiClient.updateOrderState(item);
                await this.getOrderStates();
                this.showNotification("Estado actualizado con éxito", false);
            } catch (error) {
                this.showNotification(error.response ? error.response.data.message : 'Error al agregar el estado', true);
            }
        },

        async deleteState(stateId) {
            try {
                await this.$apiClient.deleteOrderState(stateId);
                this.showNotification("Estado eliminado con éxito", false);
                await this.getOrderStates();
            } catch (error) {
                this.showNotification(error.response ? error.response.data.message : 'Error al agregar el estado', true);
            }
        },

        showNotification(message, isError) {
            this.notifierProps.message = message;
            this.notifierProps.isError = isError;
            setTimeout(() => {
                this.notifierProps.message = '';
            }, 3000);
        },

        save(item) {
            if(item.id !== "") {
                this.updateState(item);
            } else {
                this.addState(item.name);
            }

            this.isEditing = false;
        },

        loadAddForm(item) {
            this.isEditing = true;
            this.addFormProps.item = item;
            this.addFormProps.title = item !== undefined ? "Editar estado" : "Agregar estado";
        },

        cancel() {
            this.isEditing = false;
        }
    },

    beforeMount() {
        this.getOrderStates()
    },

    components: { Notifier, EditItem, CrudTable},
}
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