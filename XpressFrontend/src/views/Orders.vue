<script>

import ProductCard from "@/components/ProductCard.vue";
import Notifier from "@/components/Notifier.vue";
import Confirmation from "@/components/Confirmation.vue";

export default {
    name: "Orders",

    data() {
        return {
            menuStates: [],
            menuItems: [],
            notifierProps: {
                errorClasses: "alert alert-danger",
                successClasses: "alert alert-success",
                message: "",
                isError: false
            },
            addedProducts: [],
            isOrderConfirmed: false,
        }
    },

    computed: {
        total() {
            let total = 0;

            for(let i=0; i<this.addedProducts.length; i++) {
                let subTotal = this.addedProducts[i].qty * this.addedProducts[i].price;
                total += subTotal;
            }

            return total;
        }
    },

    methods: {
        async getMenuItems() {
            try {
                const response = await this.$apiClient.getMenuItems();
                this.menuItems = response.data.items;
            } catch (error) {
                let errorMessage = error.response ? error.response.data.message : 'Error al traer items del menu';
                this.showNotification(errorMessage, true);
            }
        },

        async getMenuStates() {
            try {
                const response = await this.$apiClient.getMenuStates();
                this.menuStates = response.data.states;
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

        addToCart(product) {
            const existingProduct = this.addedProducts.find(p => p.id === product.id);
            if (existingProduct) {
                existingProduct.qty += 1;
            } else {
                product.qty = 1;
                this.addedProducts.push(product);
            }
        },

        decreaseQuantity(product) {
            for(let i=0; i<this.addedProducts.length; i++) {
                if(this.addedProducts[i].id == product.id) {
                    if(this.addedProducts[i].qty <= 1) {
                        this.addedProducts.splice(i, 1);
                    }
                    this.addedProducts[i].qty -= 1;
                }
            }
        },

        increaseQuantity(product) {
            for(let i = 0; i < this.addedProducts.length; i++) {
                if(this.addedProducts[i].id == product.id) {
                    this.addedProducts[i].qty += 1;
                }
            }
        },

        confirmOrder() {
            if(this.addedProducts.length > 0 && this.total > 0) {
                this.isOrderConfirmed = true;
            } else {
                this.showNotification('Por favor agrega productos primero', true);
            }
        },

        restart() {
            this.addedProducts = [];
            this.isOrderConfirmed = false;
        }
    },

    beforeMount() {
        this.getMenuStates();
        this.getMenuItems();
    },

    components: {ProductCard, Notifier, Confirmation}
}
</script>

<template>
<div class="container-fuid mt-5 p-8 ">
    <div class="row" v-if="!this.isOrderConfirmed">

        <div class="col-8 text-center">
            <h3 class="slogan">Nuestro menú</h3>
            <div class="row">
                <div class="col-4 mt-5" v-for="item in this.menuItems">
                    <ProductCard :productData="item" :menuStates="this.menuStates" @add="this.addToCart" />
                </div>
            </div>
        </div>

        <div class="col-4 text-center border-start border-dark border-1">
            <h3 class="slogan">Carrito</h3>
            <Notifier :notifyData="this.notifierProps" />
            <div class="row mt-3" v-for="product in this.addedProducts">
                <div class="col-2">
                    <img :src="`http://localhost:3000/images/${product.image}`" alt="Imagen actual" class="img rounded" width="60px" height="60px" />
                </div>

                <div class="col-6 d-flex flex-column align-items-start">
                    <div class="container-fluid d-flex align-items-center justify-content-left mt-2">
                        <strong class="text-uppercase">{{ product.name }}</strong>
                    </div>

                    <div class="container-fluid d-flex align-items-center justify-content-center mt-2">
                        <button class="btn btn-light btn-sm rounded-circle d-flex align-items-center justify-content-center me-2 qtyButton" @click="decreaseQuantity(product)">
                            -
                        </button>
                        <span class="mx-2"> {{ product.qty }} {{ product.qty <= 1 ? "Unidad" : "Unidades" }}</span>
                        <button class="btn btn-light btn-sm rounded-circle d-flex align-items-center justify-content-center ms-2 qtyButton" @click="increaseQuantity(product)">
                            +
                        </button>
                    </div>
                </div>

                <div class="col-4 text-success">
                    $ {{ product.price * product.qty }}
                </div>
            </div>

            <div class="row mt-5 border-top border-dark border-1">
                <div class="col-6 mt-4">
                    <span >TOTAL: </span >
                </div>
                <div class="col-6 mt-4">
                    <span class="text-success"> $ {{ total }} </span>
                </div>
            </div>

            <div class="row mt-4">
                <div class="col-12">
                    <button class="btn btn-success" @click="this.confirmOrder">Completar pedido</button>
                </div>
            </div>
        </div>
    </div>
    <div class="row" v-if="this.isOrderConfirmed">
        <Confirmation @restart="this.restart" title="Pedido completado con exito!!!"></Confirmation>
    </div>
</div>

</template>

<style scoped>
.qtyButton {
    width: 25px;
    height: 25px;
}
</style>