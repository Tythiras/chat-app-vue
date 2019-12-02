<template>
    <div>
        <form class="login" @submit.prevent="login">
            <p>{{status}}</p>
            <h1>Login</h1>
            <label>User name</label>
            <input required type="text" placeholder="Snoopy" v-model="username" />
            <br>
            <label>Password</label>
            <input required type="password" placeholder="Password" v-model="password" />
            <hr/>
            <button type="submit">Login</button>
        </form>
    </div>
</template>


<script>
export default {
    name: 'login',
    data () {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        login: function () {
            const { username, password } = this
            this.$store.dispatch('AUTH_REQUEST', { username, password })
        }
    },
    sockets: {
        auth: function (data) {
            if(data.success) {
                this.$store.dispatch('AUTH_SUCCESS', data.token)
                let url = this.$route.query.redirect ? this.$route.query.redirect : '/';
                this.$router.push(url);
            } else {
                this.$store.dispatch('AUTH_FAILED')
            }
        }
    },
    computed: {
        status () {
            return this.$store.getters.authStatus
        }
    }
}
</script>