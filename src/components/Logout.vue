<template>
    <div>
        <button id="logout" @click="logout">Log ud</button>
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
<style>
#logout {
    position: absolute;
    right: 10px;
    top: 10px;
}
</style>