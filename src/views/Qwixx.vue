<template>
  <div class="nav">
    <router-link to="/qwixx/dices">
      QWIXX DICES
    </router-link>
    <router-link to="/qwixx/basic">
      <GameBox src="qwixx/qwixx.jpg" alt="Qwixx"></GameBox>
    </router-link>
    <router-link to="/qwixx/gemixxt">
      <GameBox src="qwixx/qwixx-gemixxt.jpg" alt="Qwixx gemixxt"></GameBox>
    </router-link>
    <router-link to="/qwixx/big-points">
      <GameBox src="qwixx/qwixx-big-points.jpg" alt="Qwixx Big Points"></GameBox
    ></router-link>
  </div>
</template>

<script>
import GameBox from "../components/GameBox";
export default {
  name: "Qwixx",
  components: { GameBox }
};
</script>

<style lang="less" scoped>
  .nav {
    display: flex;
  }
</style>
