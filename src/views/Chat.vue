<template>
  <div>    
    <ul ref="messages">
      <Message v-for="(message, index) in messages" :key="index" :message="message"></Message>
    </ul>
    <form class="sendMessage" @submit.prevent="sendMessage">
      <input v-model="newMessage" placeholder="Send besked">
      <button type="submit">Send</button>
    </form>
  </div>
</template>



<style>
</style>
<script>
import Message from '@/components/Message.vue'

export default {
  name: 'chat',
  components: {
    Message
  },
  data () {
    return {
      messages: [],
      newMessage: ''
    }
  },
  created() {
    this.getAllMessages();
  },
  updated() { 
    let el = this.$refs.messages;
    el.scrollTop = el.clientHeight;
  },
  methods: {
    sendMessage() {
      let obj = {
        receiver: "them",
        content: this.newMessage
      }
      this.messages.push(obj);
      this.newMessage = '';
    },
    getAllMessages() {
      this.$socket.emit('getMessages', {token: this.$store.state.token});
    }
  },
  sockets: {
    messages: function (data) {
      this.messages = data;
      
    }
  }
  
}
</script>
