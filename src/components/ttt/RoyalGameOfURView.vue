<template>
  <div>
    <div>Current player is {{ currentPlayer }} steps to move: {{ stepsToMove }}</div>
    <button @click="aiMove()">Make AI Move (if there is an AI)</button>
    <div>
      <button :enabled="canPlaceNew" @click="action('move', 0)" class="placeNew">Place new</button>
      <button :enabled="stepsToMove <= 0" @click="action('roll', {})" class="roll">Roll</button>
      <div>Score: {{ posAt[0][15] }} vs. {{ posAt[1][15] }}. Remaining to be placed: {{ posAt[0][0] }} and {{ posAt[1][0] }}</div>
      <GridView v-bind:width="8" v-bind:height="3" v-bind:pieces="pieces" v-bind:onClick="onClick"></GridView>
    </div>
  </div>
</template>

<script>
import GridView from "../views/GridView";

export default {
  name: "RoyalGameOfURView",
  props: ["games", "gameId", "token"],
  data() {
    return {
      details: { turn: 0, roll: 0, positions: [[], []] }
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
    aiMove: function() {
      this.games.aiMove({ gameId: this.gameId }).then(
        response => {
          console.log(response.body);
          if (response.body.ok) {
            this.fetchDetails();
            this.aiMove();
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    positionFor: function(x, y) {
      if (y === 1) {
        return 5 + x;
      }
      if (x < 4) {
        return 4 - x;
      }
      return 4 + 8 + 8 - x;
    },
    getPiece: function(player, position) {
      var y = player == 0 ? 0 : 2;
      if (position > 4 && position < 13) {
        y = 1;
      }
      var x =
        y == 1
          ? position - 5
          : position <= 4 ? 4 - position : 4 + 8 + 8 - position;
      return {
        x: x,
        y: y,
        name: player
      };
    },
    fetchDetails: function() {
      this.games.details({ gameId: this.gameId }).then(
        response => {
          this.details = response.body;
        },
        err => console.log(err)
      );
    },
    action: function(name, data) {
      this.games
        .action({ gameId: this.gameId, type: name, token: this.token }, data)
        .then(
          response => {
            console.log(
              "Action performed: " + name + ", " + JSON.stringify(data)
            );
            console.log(response.body);
            this.fetchDetails();
            if (response.body.ok) {
              this.aiMove();
            }
          },
          err => {
            console.log(err);
          }
        );
    },
    onClick: function(x, y) {
      console.log("OnClick in URView: " + x + ", " + y);
      this.action("move", this.positionFor(x, y));
    }
  },
  computed: {
    posAt: function() {
      let result = [];
      let positions = this.details.positions;
      for (var player = 0; player < positions.length; player++) {
        result[player] = [];
        for (var i = 0; i <= 15; i++) {
          result[player].push(0);
        }
        for (var pos = 0; pos < positions[player].length; pos++) {
          let value = positions[player][pos];
          result[player][value] += 1;
        }
      }
      return result;
      // posAt[0][15]
    },
    currentPlayer: function() {
      return this.details.turn;
    },
    stepsToMove: function() {
      return this.details.roll;
    },
    canPlaceNew: function() {
      let places = this.details.positions[this.details.turn];
      for (var i = 0; i < places.length; i++) {
        if (places[i] === 0) {
          return true;
        }
      }
      return false;
    },
    pieces: function() {
      let result = [];
      result.push({ x: 0, y: 0, name: "flower" });
      result.push({ x: 6, y: 0, name: "flower" });
      result.push({ x: 3, y: 1, name: "flower" });
      result.push({ x: 0, y: 2, name: "flower" });
      result.push({ x: 6, y: 2, name: "flower" });

      result.push({ x: 4, y: 0, name: "black" });
      result.push({ x: 5, y: 0, name: "lime" });
      result.push({ x: 4, y: 2, name: "black" });
      result.push({ x: 5, y: 2, name: "lime" });
      let pieces = this.details.positions;
      for (var player = 0; player < pieces.length; player++) {
        for (var piece = 0; piece < pieces[player].length; piece++) {
          let value = pieces[player][piece];
          console.log("value at " + player + ", " + piece + " is: " + value);
          if (value !== 0 && value !== 15) {
            result.push(this.getPiece(player, value));
          }
        }
      }
      return result;
    }
  }
};
</script>

<style>
.piece-0 {
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yMiAxMGMxMC41IDEgMTYuNSA4IDE2IDI5SDE1YzAtOSAxMC02LjUgOC0yMSIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0yNCAxOGMuMzggMi45MS01LjU1IDcuMzctOCA5LTMgMi0yLjgyIDQuMzQtNSA0LTEuMDQyLS45NCAxLjQxLTMuMDQgMC0zLTEgMCAuMTkgMS4yMy0xIDItMSAwLTQuMDAzIDEtNC00IDAtMiA2LTEyIDYtMTJzMS44OS0xLjkgMi0zLjVjLS43My0uOTk0LS41LTItLjUtMyAxLTEgMyAyLjUgMyAyLjVoMnMuNzgtMS45OTIgMi41LTNjMSAwIDEgMyAxIDMiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNOS41IDI1LjVhLjUuNSAwIDEgMS0xIDAgLjUuNSAwIDEgMSAxIDB6bTUuNDMzLTkuNzVhLjUgMS41IDMwIDEgMS0uODY2LS41LjUgMS41IDMwIDEgMSAuODY2LjV6IiBmaWxsPSIjMDAwIi8+PC9nPjwvc3ZnPg==');
}

.piece-1 {
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PHBhdGggZD0iTTIyLjUgOWMtMi4yMSAwLTQgMS43OS00IDQgMCAuODkuMjkgMS43MS43OCAyLjM4QzE3LjMzIDE2LjUgMTYgMTguNTkgMTYgMjFjMCAyLjAzLjk0IDMuODQgMi40MSA1LjAzLTMgMS4wNi03LjQxIDUuNTUtNy40MSAxMy40N2gyM2MwLTcuOTItNC40MS0xMi40MS03LjQxLTEzLjQ3IDEuNDctMS4xOSAyLjQxLTMgMi40MS01LjAzIDAtMi40MS0xLjMzLTQuNS0zLjI4LTUuNjIuNDktLjY3Ljc4LTEuNDkuNzgtMi4zOCAwLTIuMjEtMS43OS00LTQtNHoiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg==');
}

.piece-black {
  background-color: #ffffff;
}

.piece-lime {
  background-color: #00ff00;
}

.piece-flower {
  background-image: url('../../assets/ur/flower.svg');
  z-index: 1;
}
</style>
