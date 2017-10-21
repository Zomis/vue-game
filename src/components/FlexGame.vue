<template>
  <div>
    <h3>Game {{ game }}/{{ id }}</h3>
    <div class="general-info">
      <p>token is {{ token }}</p>
      <p>{{ summary }}</p>
      <p>{{ details }}</p>
    </div>
    <div class="awaiting-start" v-if="!summary.started">
      Game is not started yet.
    </div>
    <div class="game flex" v-if="summary.started">
      <component v-bind:is="view" v-bind:details="details" ></component>
    </div>
  </div>
</template>

<script>
export default {
  name: "FlexGame",
  props: ["id", "token", "game", "view"],
  data() {
    return {
      summary: {},
      details: {}
    };
  },
  created: function() {
    var customActions = {
      summary: { method: "GET", url: this.game + "{/gameId}" },
      join: { method: "POST", url: this.game + "{/gameId}/join" },
      details: { method: "GET", url: this.game + "{/gameId}/details" },
      start: { method: "POST", url: this.game + "{/gameId}/start" },
      action: {
        method: "POST",
        url: this.game + "{/gameId}/actions{/type}?token={token}"
      }
    };
    this.games = this.$resource(this.game, {}, customActions);
    this.games.summary({ gameId: this.id }).then(
      response => {
        this.summary = response.body;
      },
      err => {
        console.log(err);
      }
    );
    this.games.details({ gameId: this.id }).then(
      response => {
        this.details = response.body;
      },
      err => console.log(err)
    );
  },
  computed: {}
};
</script>

<style scoped>
</style>
