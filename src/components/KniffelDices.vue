<template>
  <div class="dice-container">
    <DiceView
      :count="5"
      :values="['1', '2', '3', '4', '5', '6']"
      :colors="['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff']"
      :useImage="true"
      :hold="true"
      :show-counter="true"
      :max-rolls="3"
    ></DiceView>
  </div>
</template>

<script>
import DiceView from "../views/DiceView";
export default {
  name: "KniffelDices",
  components: { DiceView }
};
</script>

<style lang="less" scoped>
.dice-container {
  display: inline-block;
  margin: 0 auto;
}
</style>
