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
    currUser: Number
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
        this.$socket.emit('message', {target: this.currUser})
        this.newMessage = '';
      }
    },
    getAllMessages() {
      this.$socket.emit('getMessages', {target: this.currUser});
    }
  },
  sockets: {
    getMessages: function (data) {
      this.messages = data;
    },
    newMessage: function (data) {
      this.messages.push(data);
    }
  }
  
}
</script>
