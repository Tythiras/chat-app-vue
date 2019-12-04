<template>
  <div>
    <div class="test">
      <input type="text" placeholder="Søg" v-model="searchString" v-on:keyup="this.filter">
    </div>
    <ul>
      <Conversation v-for="(conversation, index) in filteredConversations" :key="index" :current="conversation.id==currUser" :conversation="conversation"></Conversation>
    </ul>
  </div>
</template>
<script>
import Conversation from '@/components/Conversation.vue'
export default {
  components: {
    Conversation
  },
  props: {
    currUser: Number
  },
  data () {
    return {
      conversations: [],
      filteredConversations: [],
      searchString: ''
    }
  },
  created() {
    this.getConversations();
  },
  methods: {
    filter() {
      this.filteredConversations = this.searchString ? this.conversations.filter((conv) => conv.name.toLowerCase().includes(this.searchString.toLowerCase())) : this.conversations;
    },
    getConversations() {
      this.conversations = [];
      this.$socket.emit('getConversations');
    }
  },
  sockets: {
    getConversations: function (data) {
      this.conversations = data;
      this.filter();
    },
  } 
}
</script>