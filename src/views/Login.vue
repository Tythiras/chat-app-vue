<template>
    <div>
        <form class="login" @submit.prevent="login">
            <h1>Login</h1>
            <div class="status" v-if="status" v-bind:class="{ error: status.error }">
                <span class="inner">
                    {{status.content}}
                </span>
            </div>
            <label>Brugernavn</label>
            <input required type="text" placeholder="Brugernavn" v-model="username" />
            <label>Password</label>
            <input required type="password" placeholder="Password" v-model="password" />
            <button style="width: 30%;" type="submit" class="submit">Login</button>
            <router-link to="/register" class="margin">Opret ny profil nu</router-link>
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

<style>
.submit {
    display: block;
    margin: auto;
    margin-bottom: 20px;
}
</style>