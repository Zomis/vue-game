<template>
  <div>
    <div>Current player is {{ currentPlayer }}</div>
    <div>Scores is {{ details.scores[0] }} - {{ details.scores[1] }}</div>
    <AIMixin @details="fetchDetails()" @aiBrain="v => updateAIBrain(v)" :games="games" :gameId="gameId" :lastMove="lastMove" />
    <GridView v-bind:width="3" v-bind:height="3" v-bind:pieces="pieces" v-bind:onClick="onClick"></GridView>
    <input type="checkbox" v-model="autoplay">autoplay</input>
  </div>
</template>

<script>
import GridView from "../views/GridView";
import AIMixin from "./AIMixin";

export default {
  name: "TTTView",
  props: ["games", "gameId", "token"],
  data() {
    return {
      autoplayDelayed: false,
      autoplay: false,
      aiBrainData: [],
      lastMove: 0,
      details: { board: [[], [], []], scores: [0, 0] }
    };
  },
  created: function() {
    this.games.details({ gameId: this.gameId }).then(
      response => {
        this.details = response.body;
      },
      err => console.log(err)
    );
  },
  components: {
    GridView,
    AIMixin
  },
  methods: {
    updateAIBrain: function(data) {
      this.aiBrainData = data;
      if (this.autoplay && !this.autoplayDelayed) {
        this.autoplayDelayed = true;
        console.log("Setting timeout for AI Brain at " + Date.now());
        setTimeout(() => {
          let max = data.reduce((a, b) => {
            return a.score > b.score ? a : b;
          });
          this.onClick(max.action.actionData.x, max.action.actionData.y);
          this.autoplayDelayed = false;
        }, 3000);
      }
    },
    fetchDetails: function() {
      this.games.details({ gameId: this.gameId }).then(
        response => {
          this.details = response.body;
        },
        err => console.log(err)
      );
    },

    onClick: function(x, y) {
      // console.log("OnClick in TTTView: " + x + ", " + y);
      this.games
        .action(
          { gameId: this.gameId, type: "move", token: this.token },
          { x: x, y: y }
        )
        .then(
          response => {
            console.log("Action performed: " + x + ", " + y);
            // console.log(response.body);
            this.fetchDetails();
            if (response.body.ok) {
              this.lastMove = Date.now(); // aiMoveAfterDelay();
            } else {
              this.lastMove = Date.now();
            }
          },
          err => {
            console.log(err);
          }
        );
    }
  },
  computed: {
    currentPlayer: function() {
      let pieceCount = this.pieces.filter(p => p.name !== "0").length;
      return pieceCount % 2;
    },
    pieces: function() {
      let result = [];
      for (var yy = 0; yy < 3; yy++) {
        for (var xx = 0; xx < 3; xx++) {
          let row = this.details.board[yy];
          if (!row) {
            console.log(
              "Missing " + yy + " for details " + JSON.stringify(this.details)
            );
            return result;
          }
          let value = row[xx];
          // console.log("value at " + xx + ", " + yy + " is: " + value);
          let overlays = this.aiBrainData
            .filter(
              bd => bd.action.actionData.x == xx && bd.action.actionData.y == yy
            )
            .map(bd => bd.score)
            .map(score => +score.toFixed(4));
          result.push({
            x: xx,
            y: yy,
            name: value ? value.toLowerCase() : "0",
            overlays: overlays
          });
        }
      }
      return result;
    }
  }
};
</script>

<style>
</style>
