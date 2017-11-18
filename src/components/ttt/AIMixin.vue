<template>
  <div class="ai-controller">
    <input type="checkbox" v-model="aiAutoMove">AI Moves automatically</input>
    <br />
    <label v-if="aiAutoMove" for="aiDelay">AI Delay</label>
    <input v-if="aiAutoMove" name="aiDelay" v-model="aiDelay" />
    <button v-if="!aiAutoMove" @click="aiMove()">Make AI Move (if there is an AI)</button>
    <br />
    <input v-model="aiName" placeholder="AI name to query" />
    <button @click="aiBrain(aiName)">Check AI Scores</button>
    <input type="checkbox" v-model="aiAutoQuery">Query AI automatically</input>
  </div>
</template>
<script>
import VueResource from "vue-resource";

export default {
  name: "AIMixin",
  props: ["games", "gameId", "lastMove"],

  data() {
    return {
      aiAutoQuery: false,
      aiAutoMove: true,
      aiDelay: "1000",
      aiName: "",
      aiDelayStarted: false
    };
  },
  watch: {
    lastMove: function() {
      this.aiMoveAfterDelay();
    },
    aiAutoQuery: function() {
      if (this.aiAutoQuery) {
        this.aiBrain(this.aiName);
      }
    }
  },
  methods: {
    aiBrain: function(aiName) {
      this.games.aiBrain({ gameId: this.gameId, aiName: aiName }).then(
        response => {
          console.log(response.data);
          this.$emit("aiBrain", response.data);
        },
        err => console.log(err)
      );
    },
    aiMoveAfterDelay: function() {
      var self = this;
      if (this.aiAutoQuery) {
        this.aiBrain(this.aiName);
      }
      if (this.aiDelayStarted || !this.aiAutoMove) {
        return;
      }
      let delay = parseInt(this.aiDelay) || 1000;
      this.aiDelayStarted = true;
      setTimeout(function() {
        self.aiDelayStarted = false;
        self.aiMove();
      }, delay);
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
