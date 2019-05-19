<template>
  <div class="dice-container">
    <DiceView
      :count="6"
      :values="['red', 'green', 'blue', 'orange', 'grey', 'blue']"
      :colors="[
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff'
      ]"
      :hold="true"
    ></DiceView>
  </div>
</template>

<script>
import DiceView from "../views/DiceView";
export default {
  name: "WLDices",
  components: { DiceView }
};
</script>

<style lang="less" scoped>
.dice-container {
  display: inline-block;
  margin: 0 auto;
}
</style>
