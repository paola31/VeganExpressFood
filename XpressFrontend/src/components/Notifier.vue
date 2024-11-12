<script>
export default {
    name: "Notifier",

    props: {
        notifyData: {}
    },

    data() {
        return {
            message: ''
        };
    },

    mounted() {
        this.updateMessage();
    },

    watch: {
        'notifyData.message': function() {
            this.updateMessage();
        }
    },

    methods: {
        updateMessage() {
            this.message = this.notifyData.message;
            if (this.message) {
                setTimeout(() => {
                    this.message = '';
                }, 3000);
            }
        }
    }
}
</script>

<template>
    <div v-if="message" :class="notifyData.isError ? notifyData.errorClasses : notifyData.successClasses">
        {{ message }}
    </div>
</template>

<style scoped>
.alert {
    text-align: center;
}
</style>
