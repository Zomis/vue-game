<template>
  <div class="ai-controller">
    <button @click="aiMove()">Make AI Move (if there is an AI)</button>

  </div>
</template>
<script>
import VueResource from "vue-resource";

export default {
  name: "AIMixin",
  props: ["games", "gameId", "lastMove"],

  data() {
    return {
      aiDelayStarted: false
    };
  },
  watch: {
    lastMove: function() {
      this.aiMoveAfterDelay();
    }
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
            this.$emit("details");
            // this.fetchDetails();
            this.aiMoveAfterDelay();
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  }
};
</script>
<style>
</style>
