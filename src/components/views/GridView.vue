<template>
  <div class="gridview" v-bind:style="{ width: (64*this.width) + 'px', height: (64*this.height) + 'px' }" >
    <div class="gridview-inside" v-bind:style="{ width: (64*this.width) + 'px', height: (64*this.height) + 'px' }" >
      <div v-for="piece in pieces" class="piece" v-bind:class="['piece-' + piece.name]"
        v-bind:style="{ transform: 'translate(' + piece.x * 64 + 'px, ' + piece.y * 64 + 'px)' }"
         v-on:click="click(piece.x, piece.y)"></div>
<!--      <div v-for="yy in this.height">
        <div v-for="xx in this.width" class="piece cellview"></div>
        <div v-bind:class="[piece.name]"
          v-bind:style="{ transform: 'translate(' + piece.x * 64 + 'px, ' + piece.y * 64 + 'px)' }"></div>
      </div>-->
    </div>
  </div>
</template>
<script>
import VueResource from "vue-resource";

export default {
  name: "GridView",
  props: ["width", "height", "pieces", "onClick"],
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
    click: function(x, y) {
      console.log("click at " + x + ", " + y);
      this.onClick(x, y);
    }
  }
};
</script>

<style scoped>
.gridview {
  background-color: cyan;
  width: 512px;
  height: 512px;
  margin-left: auto;
  margin-right: auto;
}

.gridview-inside {
  width: 512px;
  height: 512px;
  position: relative;
}

.piece {
  position: absolute;
  background-size: cover;
  top: 0;
  left: 0;
  width: 64px;
  height: 64px;
  z-index: 2;
}

.piece-x {
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0yMiAxMGMxMC41IDEgMTYuNSA4IDE2IDI5SDE1YzAtOSAxMC02LjUgOC0yMSIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0yNCAxOGMuMzggMi45MS01LjU1IDcuMzctOCA5LTMgMi0yLjgyIDQuMzQtNSA0LTEuMDQyLS45NCAxLjQxLTMuMDQgMC0zLTEgMCAuMTkgMS4yMy0xIDItMSAwLTQuMDAzIDEtNC00IDAtMiA2LTEyIDYtMTJzMS44OS0xLjkgMi0zLjVjLS43My0uOTk0LS41LTItLjUtMyAxLTEgMyAyLjUgMyAyLjVoMnMuNzgtMS45OTIgMi41LTNjMSAwIDEgMyAxIDMiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNOS41IDI1LjVhLjUuNSAwIDEgMS0xIDAgLjUuNSAwIDEgMSAxIDB6bTUuNDMzLTkuNzVhLjUgMS41IDMwIDEgMS0uODY2LS41LjUgMS41IDMwIDEgMSAuODY2LjV6IiBmaWxsPSIjMDAwIi8+PC9nPjwvc3ZnPg==');
}

.piece-o {
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PHBhdGggZD0iTTIyLjUgOWMtMi4yMSAwLTQgMS43OS00IDQgMCAuODkuMjkgMS43MS43OCAyLjM4QzE3LjMzIDE2LjUgMTYgMTguNTkgMTYgMjFjMCAyLjAzLjk0IDMuODQgMi40MSA1LjAzLTMgMS4wNi03LjQxIDUuNTUtNy40MSAxMy40N2gyM2MwLTcuOTItNC40MS0xMi40MS03LjQxLTEzLjQ3IDEuNDctMS4xOSAyLjQxLTMgMi40MS01LjAzIDAtMi40MS0xLjMzLTQuNS0zLjI4LTUuNjIuNDktLjY3Ljc4LTEuNDkuNzgtMi4zOCAwLTIuMjEtMS43OS00LTQtNHoiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg==');
}

.piece-0 {
  background-color: black
}
</style>
