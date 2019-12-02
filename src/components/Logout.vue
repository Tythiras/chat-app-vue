<template>
    <div>
        <button @click="logout">Logud</button>
    </div>
</template>

<script>
export default {
    name: 'logout',
    data () {
      return {}
    },
    methods: {
        logout: function() {
            this.$store.dispatch('AUTH_LOGOUT').then(() => {
                this.$router.push("/login")
            })
        }
    }
}
</script>