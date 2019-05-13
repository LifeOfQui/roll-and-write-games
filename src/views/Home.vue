<template>
  <div class="nav">
    <router-link to="/kniffel-dices">Kniffel Dices</router-link>
    <router-link to="/dices">Dices</router-link>
    <router-link to="/qwixx">
      <GameBox src="qwixx/qwixx.jpg" alt="Qwixx" />
    </router-link>
    <router-link to="/wuerfelland">
      <GameBox src="wuerfelland.jpg" alt="Würfelland" />
    </router-link>
    <router-link to="/knister">
      <img
        src="../assets/gameboxes/knister.jpg"
        alt="Knister"
        style="width: 200px;"
    /></router-link>
    <router-link to="/wuerfel-bingo">
      <img
        src="../assets/gameboxes/wuerfel-bingo.jpg"
        alt="Würfel-Bingo"
        style="width: 200px;"
      />
    </router-link>
  </div>
</template>

<script>
import GameBox from "../components/GameBox.vue";

export default {
  name: "home",
  components: {
    GameBox
  }
};
</script>

<style lang="less" scoped>
.nav > a {
  margin-right: 20px;
}
</style>
