<template>
    <div class="overview">
        <Conversations :currUser="this.currUser" class="conversations" />
        <Chat v-if="this.currUser" :currUser="this.currUser" :key="this.currUser" class="chat" />
    </div>
</template>

<style>
    .overview {
        display: grid;
        grid-template-columns: auto;
    }
    .conversations {
        grid-column: auto;
    }
    .conversations ul {
        padding-left: 0;
    }
    .chat {
        grid-column-start: 2;
        grid-column-end: 10;
    }
</style>
<script>
import Conversations from '@/components/Conversations.vue';
import Chat from '@/components/Chat.vue';
export default {
    components: {
        Conversations,
        Chat
    },
    data () {
        return {
            currUser: ''
        }
    },
    created() {
        this.checkUser();
    },
    watch:{
        $route (){
            this.checkUser();
        }
    },
    methods: {
        checkUser() {
            this.currUser = this.$route.params.user ? this.$route.params.user : null;
        }
    }
}
</script>