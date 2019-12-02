<template>
    <div>
        <form class="register" @submit.prevent="register">
            <h1>Opret ny profil</h1>
            <div class="status" v-if="status" v-bind:class="{ error: status.error }">
                <span class="inner">
                    {{status.content}}
                </span>
            </div>
            <label>Brugernavn</label>
            <input required type="text" placeholder="Brugernavn" v-model="username" />
            <label>Password</label>
            <input required v-bind:class="{ error: passwordError }" type="password" placeholder="Password" v-model="password" style="margin-bottom:10px;" v-on:keyup="validate" />
            <input required v-bind:class="{ error: passwordError }" type="password" placeholder="Gentag password" v-model="passwordConfirm" v-on:keyup="validate" />
            <button style="width: 30%;" type="submit" class="submit">Register</button>
            <router-link to="/login">Login istedet for</router-link>
        </form>
    </div>
</template>

<script>
export default {
    name: 'register',
    data () {
        return {
            username: '',
            password: '',
            passwordConfirm: '',
            passwordError: false
        }
    },
    methods: {
        register: function () {
            if(this.password==this.passwordConfirm) {
                const { username, password } = this
                this.$store.dispatch('CREATION_REQUEST', { username, password })
            }
        },
        validate: function () {
            this.passwordError = (this.passwordConfirm && this.password!=this.passwordConfirm);
        }
    },
    sockets: {
        creation: function (data) {
            if(data.success) {
                this.$store.dispatch('CREATION_SUCCESS', data.token)
                let url = this.$route.query.redirect ? this.$route.query.redirect : '/';
                this.$router.push(url);
            } else {
                this.$store.dispatch('CREATION_ERROR')
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
input.error {
    border: red 1px solid;
}
</style>