<template>
  <div class="dice-container">
    <DiceView
      :count="2"
      :values="['circle', 'dot', 'multiply', 'square', 'star', 'triangle']"
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
