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
  components: {
    Message
  },

  props: {
    currUser: String
  },
  data () {
    return {
      messages: [{isReceiver: 1, content: 'Loading..'}],
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
      if(this.newMessage) {
        let obj = {
          isReceiver: 0,
          content: this.newMessage
        }
        this.messages.push(obj);
        this.$socket.emit('message', {userId: this.currUser})
        this.newMessage = '';
      }
    },
    getAllMessages() {
      this.$socket.emit('getConversation', {userId: this.currUser});
    }
  },
  sockets: {
    getConversation: function (data) {
      this.messages = data.rows;
    },
    newMessage: function (data) {
      this.messages.push(data);
    }
  }
  
}
</script>
