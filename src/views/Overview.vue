<template>
    <div class="overview">
        <Conversations
            :currUser="this.currUser"
            :unread="this.unread"
            class="conversations"
        />
        <Chat
            v-if="this.currUser"
            @unread="newUnread"
            :currUser="this.currUser"
            :key="this.currUser"
            class="chat" 
        />
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
            currUser: '',
            unread: []
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
        newUnread(conversation) {
            this.unread.push(conversation);
        },
        checkUser() {
            this.currUser = this.$route.params.user ? this.$route.params.user : null;
            if(this.currUser) {
                this.unread = this.unread.filter(conv => this.currUser != conv);
            }
        }
    }
}
</script>