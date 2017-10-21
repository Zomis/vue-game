<template>
  <div class="hello">
    <p>This is the lobby. Your name is {{ name }}</p>
    <div class="running-games">
      <p>There are {{ gamesRunning.games.length }} games running</p>
      <div class="running-game" v-for="game in gamesRunning.games">
        {{ game }}
        <button v-if="!game.started" @click="join(game.id)" class="unstarted-game">Join!</button>
      </div>
    </div>
    <div class="joinable-games">
      <p>All games at the moment show up at running-games</p>
    </div>
    <div class="recently-finished">

    </div>
    <button v-on:click="createGame()">Create new game</button>
  </div>
</template>

<script>
import VueResource from "vue-resource";

export default {
  name: "LobbyScreen",
  props: ["name", "game"],
  methods: {
    join: function(gameId) {
      this.games.join({ gameId: gameId }, { playerName: this.name }).then(
        response => {
          console.log(response.body);
          if (response.body.privateKey) {
            let gameURL = "/" + this.game + "/" + gameId;
            this.$router.push(gameURL + "?token=" + response.body.privateKey);
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    createGame: function() {
      this.games.createGame({ playerName: this.name }).then(
        response => {
          console.log(response.body);
          let gameURL = "/" + this.game + "/" + response.body.gameId;
          this.$router.push(gameURL + "?token=" + response.body.privateKey);
        },
        err => {
          console.log(err);
        }
      );
    }
  },
  created: function() {
    var customActions = {
      list: { method: "GET", url: this.game },
      createGame: { method: "POST", url: this.game },
      join: { method: "POST", url: this.game + "{/gameId}/join" }
    };

    this.games = this.$resource(this.game, {}, customActions);
    this.games.list({}).then(
      response => {
        this.gamesRunning = response.body;
      },
      err => {
        console.log("Error: " + err);
      }
    );
  },
  data() {
    return {
      gamesRunning: { games: [] },
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
