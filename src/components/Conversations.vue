<template>
  <div>
    <div class="test">
      <input
        type="text"
        placeholder="Søg"
        v-model="searchString"
        v-on:keyup="this.filter"
      />
    </div>
    <ul>
      <Conversation
        v-for="(conv, index) in filteredConversations"
        :key="index"
        :current="conv.id==currUser"
        :unread="unread.includes(conv.id)"
        :conversation="conv"
      />
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
    currUser: String,
    unread: Array
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
      //search with searchstring
      this.filteredConversations = this.searchString ? this.conversations.filter((conv) => conv.username.toLowerCase().includes(this.searchString.toLowerCase())) : this.conversations;
    },
    getConversations() {
      //clear list and ask for the list
      this.conversations = [];
      this.$socket.emit('getConversations');
    }
  },
  sockets: {
    //server response with conversations
    getConversations: function (data) {
      if(data.success) {
        this.conversations = data.conversations;
        this.filter();

      }
    },
  } 
}
</script>