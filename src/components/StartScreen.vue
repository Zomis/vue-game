<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input v-model="name" placeholder="your name" />
    <ul class="gamelist">
      <li><router-link to="/chess">Chess</router-link></li>
      <li v-for="game in games"><router-link :to="'/' + game + '?name=' + name">{{ game }}</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "StartScreen",
  data() {
    return {
      name: "",
      games: [],
      msg: "Choose your game"
    };
  },
  created: function() {
    this.$http.get(".").then(
      response => {
        console.log(response.body);
        this.games = response.body;
      },
      err => {
        // error callback
        this.games = [];
        console.log("Unable to fetch");
      }
    );
  }
};
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
