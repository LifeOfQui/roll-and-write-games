<template>
  <div class="dice-container">
    <DiceView
      :count="6"
      :values="['1', '2', '3', '4', '5', '6']"
      :colors="[
        '#ffffff',
        '#ffffff',
        '#ff0000',
        '#0000ff',
        '#ffff00',
        '#00ff00'
      ]"
    ></DiceView>
  </div>
</template>

<script>
import DiceView from "../../views/DiceView";
export default {
  name: "Index",
  components: { DiceView }
};
</script>

<style lang="less" scoped>
.dice-container {
  display: inline-block;
  margin: 0 auto;
}
</style>
