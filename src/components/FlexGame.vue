<template>
  <div>
    <h3>{{ msg }} {{ q }} value {{ id }} {{ $attrs }}</h3>
    <div class="game flex">
      <div class="board">
        <div v-for="piece in pieces" class="piece" v-bind:class="[piece.name]"
          v-bind:style="{ transform: 'translate(' + piece.x * 64 + 'px, ' + piece.y * 64 + 'px)' }"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FlexGame",
  props: ["id", "q"],
  data() {
    return {
      msg: "This is a flexible game board with id",
      pieces: [
        {
          x: 2,
          y: 0,
          name: "testPiece"
        }
      ]
    };
  },
  created: function() {},
  computed: {}
};
</script>

<style scoped>
.game {
  width: 512px;
  height: 512px;
  margin-left: auto;
  margin-right: auto;
}

.board {
  background-image: url('../assets/chess/board.svg');
  width: 512px;
  height: 512px;
  position: relative;
}

.piece {
  position: absolute;
  background-size: cover;
  top: 0;
  left: 0;
  width: 12.5%;
  height: 12.5%;
  z-index: 2;
}

.testPiece {
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yMiAxMGMxMC41IDEgMTYuNSA4IDE2IDI5SDE1YzAtOSAxMC02LjUgOC0yMSIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0yNCAxOGMuMzggMi45MS01LjU1IDcuMzctOCA5LTMgMi0yLjgyIDQuMzQtNSA0LTEuMDQyLS45NCAxLjQxLTMuMDQgMC0zLTEgMCAuMTkgMS4yMy0xIDItMSAwLTQuMDAzIDEtNC00IDAtMiA2LTEyIDYtMTJzMS44OS0xLjkgMi0zLjVjLS43My0uOTk0LS41LTItLjUtMyAxLTEgMyAyLjUgMyAyLjVoMnMuNzgtMS45OTIgMi41LTNjMSAwIDEgMyAxIDMiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNOS41IDI1LjVhLjUuNSAwIDEgMS0xIDAgLjUuNSAwIDEgMSAxIDB6bTUuNDMzLTkuNzVhLjUgMS41IDMwIDEgMS0uODY2LS41LjUgMS41IDMwIDEgMSAuODY2LjV6IiBmaWxsPSIjMDAwIi8+PC9nPjwvc3ZnPg==');
}
</style>
