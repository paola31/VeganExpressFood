<script>

import Confirmation from "@/components/Confirmation.vue";
import Particles from "@/components/Particles.vue";
import brocoli from "@/assets/brocoli.png";
import mushrom from "@/assets/mushrom.png";
import mazorca from "@/assets/mazorca.png";
import carrot from "@/assets/carrot.png";
import tomate from "@/assets/tomate.png";

export default {
    name: "Reservations",
    data() {
        return {
            reservationDate: "",
            confirmationMessage: "",
            isConfirmed: false,
            particles: [brocoli, mushrom, mazorca, carrot, tomate],
        };
    },
    methods: {
        makeReservation() {
            if (this.reservationDate) {
                this.isConfirmed = true;
            }
        },

        restart() {
            this.isConfirmed = false;
        }
    },
    components: {Confirmation, Particles}
};
</script>

<template>
    <div class="container d-flex flex-column align-items-center justify-content-center vh-100">
        <Particles
            :particleCount="80"
            particleSize="25"
            :imageUrls="this.particles"
            hoverEffectDistance="150"
        />
        <h2 class="text-center mb-4 slogan" v-if="!isConfirmed">Reservación</h2>
            <form @submit.prevent="makeReservation" class="w-50" v-if="!isConfirmed">
                <div class="mb-3">
                    <label for="reservationDate" class="form-label">Selecciona una fecha</label>
                    <input
                        type="date"
                        id="reservationDate"
                        v-model="reservationDate"
                        class="form-control"
                        required
                    />
                </div>
                <button type="submit" class="btn btn-success w-100" v-if="!isConfirmed">Reservar</button>
            </form>
        <div v-if="isConfirmed">
            <Confirmation @restart="this.restart" title="Fecha reservada exitosamente" />
        </div>
    </div>

</template>

<style scoped>

</style>