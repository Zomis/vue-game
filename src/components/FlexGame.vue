<template>
  <div>
    <h3>Game {{ game }}/{{ id }}</h3>
    <div class="general-info">
      <p>{{ summary }}</p>
    </div>
    <div class="awaiting-start" v-if="!summary.started">
      Game is not started yet.
      <AIInviteComponent :playerConfig="null" :game="game" :gameId="id"></AIInviteComponent>
      <button @click="startGame()">Start game</button>
    </div>
    <div class="game flex" v-if="summary.started">
      <button @click="aiMove()">Make AI Move (if there is an AI)</button>
      <component :is="view" :games="games" :gameId="id"
       :token="token" ></component>
    </div>
  </div>
</template>

<script>
import AIInviteComponent from "./AIInviteComponent";

export default {
  name: "FlexGame",
  props: ["id", "token", "game", "view"],
  data() {
    return {
      summary: {},
      details: {}
    };
  },
  methods: {
    aiMove: function() {
      this.games.aiMove({ gameId: this.id }).then(
        response => {
          console.log(response.body);
          this.fetchSummary();
        },
        err => {
          console.log(err);
        }
      );
    },
    startGame: function() {
      console.log("game id is " + this.id);
      this.games.start2({ gameId: this.id }).then(
        response => {
          console.log(response.body);
          this.fetchSummary();
        },
        err => {
          console.log(err);
        }
      );
    },
    fetchSummary: function() {
      this.games.summary({ gameId: this.id }).then(
        response => {
          this.summary = response.body;
        },
        err => {
          console.log(err);
        }
      );
    }
  },
  created: function() {
    var customActions = {
      summary: { method: "GET", url: this.game + "{/gameId}" },
      join: { method: "POST", url: this.game + "{/gameId}/join" },
      aiMove: { method: "GET", url: this.game + "{/gameId}/aiMove" },
      details: { method: "GET", url: this.game + "{/gameId}/details" },
      start2: { method: "POST", url: this.game + "/" + this.id + "/start" },
      action: {
        method: "POST",
        url: this.game + "{/gameId}/actions{/type}?token={token}"
      }
    };
    this.games = this.$resource(this.game, {}, customActions);
    this.fetchSummary();
  },
  components: {
    AIInviteComponent
  }
};
</script>

<style scoped>
</style>
