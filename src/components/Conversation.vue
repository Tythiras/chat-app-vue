<template>
    <router-link :to="{name: 'dashboard', params: {user: conversation.id.toString()}}">
        <li v-bind:class="{ active: current, unread: unread }">
            <span>{{conversation.username}}</span>
        </li>
    </router-link>
</template>

<style scoped>
    li {
        padding: 20px;
        width: 100%;
        border: solid 1px black;
    }
    li.active {
        color: gray;
    }
    li.unread {
        color: red;
    }
</style>
<script>
export default {
    props: {
        conversation: Object,
        current: Boolean,
        unread: Boolean
    }
}
</script>