<template>
  <div class="dice-container">
    <DiceView
      :count="3"
      :values="['1', '2', '3', '4', '5', '6']"
      :colors="['#e8661b', '#f8df00', '#5f358b']"
      :hold="false"
      :disable="true"
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
