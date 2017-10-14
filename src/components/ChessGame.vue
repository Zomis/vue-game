<template>
  <div class="game chess">
    <h1>{{ msg }}</h1>

    <div class="board">
    </div>
  </div>
</template>

<script>
export default {
  name: "ChessGame",
  data() {
    return {
      msg: "This is a chess board"
    };
  }
};
</script>

<style scoped>
</style>
