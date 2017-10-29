<template>
  <div class="ai-invite">
    <input v-model="aiName" placeholder="AI Name" />
    <button @click="inviteAI(aiName)">Invite AI</button>
  </div>
</template>

<script>
export default {
  name: "AIInviteComponent",
  props: ["gameId", "game"],
  data() {
    return {
      aiName: ""
    };
  },
  methods: {
    inviteAI: function(aiName) {
      console.log("game id is " + this.id);
      this.games
        .inviteAI({ gameId: this.gameId }, { aiName: this.aiName })
        .then(
          response => {
            console.log(response.body);
          },
          err => {
            console.log(err);
          }
        );
    }
  },
  created: function() {
    var customActions = {
      inviteAI: { method: "POST", url: this.game + "{/gameId}/ai" }
    };
    this.games = this.$resource(this.game, {}, customActions);
  },
  computed: {}
};
</script>

<style scoped>
</style>
