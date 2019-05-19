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
    <router-link to="/qwinto">
      <GameBox src="qwinto.jpg" alt="Qwinto" />
    </router-link>
    <router-link to="/knister">
      <GameBox src="knister.jpg" alt="Knister" />
    </router-link>
    <router-link to="/wuerfel-bingo">
      <GameBox src="wuerfel-bingo.jpg" alt="Würfel-Bingo" />
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
.nav {
  display: flex;
  padding-top: 50px;
  flex-wrap: wrap;

  & > a {
    margin-right: 20px;
  }
}
</style>
