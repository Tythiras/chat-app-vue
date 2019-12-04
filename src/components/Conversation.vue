<template>
    <router-link :to="{name: 'dashboard', params: {user: conversation.id}}">
        <li v-bind:class="{ active: current }">
            <span>{{conversation.name}}</span>
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
</style>
<script>
export default {
    props: {
        conversation: Object,
        current: Boolean
    }
}
</script>