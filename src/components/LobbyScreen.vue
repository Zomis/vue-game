<template>
  <div class="hello">
    <p>This is the lobby. Your name is {{ name }}</p>
    <div class="running-games">

    </div>
  </div>
</template>

<script>
import VueResource from "vue-resource";

export default {
  name: "LobbyScreen",
  props: ["name"],
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
