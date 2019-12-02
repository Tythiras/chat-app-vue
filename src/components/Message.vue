<template>
    <li>
       <div v-bind:class="{ mSender: message.receiver=='you', mReceiver: message.receiver!='you' }">
           <span>{{message.content}}</span>
        </div> 
    </li>
</template>

<style>
    li {
        position: relative;
        margin: 15px 0;
    }
    .mSender {
        padding-right: 32px;
    }
    .mSender span {
        background: lightgray;
        z-index: 2;
    }
    .mReceiver {
        display: flex;
        justify-content: flex-end;
        padding-left: 32px;
    }
    .mReceiver span {
        background: rgb(5, 161, 212);
        color: #fff;
        z-index: 2;
    }
    span {
        display: inline-block;
        word-break: break-all;
        line-height: 1.5;
        padding: 12px 16px;
        border-radius: 16px;
        font-weight: 500;
        position: relative;
    }
    ul {
        text-align: initial;
        list-style: none;
        margin: 0;
        padding: 0;
        padding: 32px 64px 96px 64px;
        position: relative;
        max-height: 400px;
        overflow-y: scroll;
        max-width: 100%;
    }
</style>
<script>
export default {
    name: 'logout',
    props: {
        message: Object
    }
}
</script>