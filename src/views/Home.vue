<template>
  <div class="nav">
    <router-link to="/dices">Dices</router-link>
    <router-link to="/qwixx">
      <img
        src="../assets/gameboxes/qwixx/qwixx.jpg"
        alt="Qwixx"
        style="width: 200px;"
      />
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
    <GameBox />
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
