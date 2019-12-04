<template>
  <div id="app">
    <div id="nav" v-if="isAuthenticated">
      <router-link to="/">Chat</router-link> |
      <router-link to="/about">Om</router-link>
      <logout-button></logout-button>
    </div>
    <router-view/>
  </div>
</template>


<script>
import Logout from './components/Logout.vue';
export default {
  components: {
    'logout-button': Logout
  },
  computed: {
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    }
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
a {
  text-decoration: none;
  color:rgb(102, 166, 255);
}
button {
  background-color:rgb(102, 166, 255);
  border: 0;
  margin-bottom: 20px;
  box-sizing:border-box;
  color:rgb(255, 255, 255);
  cursor:pointer;
  display:inline-block;
  font-family:Nunito;
  font-size:16px;
  font-stretch:100%;
  font-style:normal;
  font-variant-caps:normal;
  font-variant-east-asian:normal;
  font-variant-ligatures:normal;
  font-variant-numeric:normal;
  font-weight:600;
  letter-spacing:normal;
  line-height:normal;
  padding-bottom:10px;
  padding-left:10px;
  padding-right:10px;
  padding-top:10px;
  text-align:center;
  text-indent:0px;
  text-rendering:auto;
  text-shadow:none;
  text-transform:none;
  transition-delay:0s;
  transition-duration:0.2s;
  transition-property:all;
  transition-timing-function:ease;
}
.status {
  background: #1D3461;
  width: 35%;
  margin: auto;
  color: white;
  font-size: 1.1em;
  padding: 10px;
  margin-bottom: 20px;

}
.status.error {
  background: #A02C2C;
}
.status .inner {
  padding: 0;
}
label {
  display: block;
  font-weight: bold;
}
input {
  margin: auto;
  margin-top: 10px;
  margin-bottom:10px;
  background-attachment:scroll;
  background-clip:border-box;
  background-color:rgba(0, 0, 0, 0);
  background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGP6zwAAAgcBApocMXEAAAAASUVORK5CYII=);
  background-origin:padding-box;
  background-size:auto;
  border-bottom-color:rgb(237, 241, 246);
  border-bottom-left-radius:4px;
  border-bottom-right-radius:4px;
  border-bottom-style:solid;
  border-bottom-width:1px;
  border-image-outset:0px;
  border-image-repeat:stretch;
  border-image-slice:100%;
  border-image-source:none;
  border-image-width:1;
  border-left-color:rgb(237, 241, 246);
  border-left-style:solid;
  border-left-width:1px;
  border-right-color:rgb(237, 241, 246);
  border-right-style:solid;
  border-right-width:1px;
  border-top-color:rgb(237, 241, 246);
  border-top-left-radius:4px;
  border-top-right-radius:4px;
  border-top-style:solid;
  border-top-width:1px;
  box-shadow:none;
  box-sizing:border-box;
  color:rgb(0, 0, 0);
  cursor:auto;
  display:block;
  font-family:Avenir;
  font-size:16px;
  font-stretch:100%;
  font-style:normal;
  font-variant-caps:normal;
  font-variant-east-asian:normal;
  font-variant-ligatures:normal;
  font-variant-numeric:normal;
  font-weight:500;
  height:48px;
  letter-spacing:normal;
  line-height:48px;
  outline-color:rgb(0, 0, 0);
  outline-style:none;
  outline-width:0px;
  overflow-x:hidden;
  overflow-y:hidden;
  padding-bottom:0px;
  padding-left:18px;
  padding-right:44px;
  padding-top:0px;
  text-align:start;
  text-indent:0px;
  text-overflow:ellipsis;
  text-rendering:auto;
  text-shadow:none;
  text-transform:none;
  white-space:nowrap;
  width:416px;
  word-spacing:0px;
  writing-mode:horizontal-tb;
  -webkit-appearance:none;
  -webkit-font-smoothing:antialiased;
  -webkit-rtl-ordering:logical;
  -webkit-tap-highlight-color:rgba(0, 0, 0, 0);
}
</style>
