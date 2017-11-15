<template>
  <div>
    <div>Current player is {{ currentPlayer }}</div>
    <button @click="aiMove()">Make AI Move (if there is an AI)</button>
    <GridView v-bind:width="3" v-bind:height="3" v-bind:pieces="pieces" v-bind:onClick="onClick"></GridView>
  </div>
</template>

<script>
import GridView from "../views/GridView";

export default {
  name: "TTTView",
  props: ["games", "gameId", "token"],
  data() {
    return {
      details: ""
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
    GridView
  },
  methods: {
    aiMoveAfterDelay: function() {
      var self = this;
      if (this.aiDelayStarted) {
        return;
      }
      this.aiDelayStarted = true;
      setTimeout(function() {
        self.aiDelayStarted = false;
        self.aiMove();
      }, 1000);
    },
    aiMove: function() {
      this.games.aiMove({ gameId: this.gameId }).then(
        response => {
          console.log(response.body);
          if (response.body.ok) {
            this.fetchDetails();
            this.aiMoveAfterDelay();
          }
        },
        err => {
          console.log(err);
        }
      );
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
      console.log("OnClick in TTTView: " + x + ", " + y);
      this.games
        .action(
          { gameId: this.gameId, type: "move", token: this.token },
          { x: x, y: y }
        )
        .then(
          response => {
            console.log("Action performed: " + x + ", " + y);
            console.log(response.body);
            this.fetchDetails();
            if (response.body.ok) {
              this.aiMoveAfterDelay();
            }
          },
          err => {
            console.log(err);
          }
        );
    }
  },
  computed: {
    pieces: function() {
      let result = [];
      for (var yy = 0; yy < 3; yy++) {
        for (var xx = 0; xx < 3; xx++) {
          let row = this.details[yy];
          if (!row) {
            console.log(
              "Missing " + yy + " for details " + JSON.stringify(this.details)
            );
            return result;
          }
          let value = row[xx];
          console.log("value at " + xx + ", " + yy + " is: " + value);
          result.push({
            x: xx,
            y: yy,
            name: value ? value.toLowerCase() : "0"
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
