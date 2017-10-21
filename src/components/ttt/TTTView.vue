<template>
  <GridView width="3" height="3" v-bind:pieces="pieces"></GridView>
</template>

<script>
import GridView from "../views/GridView";

export default {
  name: "TTTView",
  props: ["details"],
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  components: {
    GridView
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
