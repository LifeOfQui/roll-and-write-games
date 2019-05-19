<template>
  <div class="dice-container">
    <DiceView
      :count="6"
      :values="[
        ['1', '2', '3', '4', '5', '?'],
        ['1', '2', '3', '4', '5', '?'],
        ['1', '2', '3', '4', '5', '?'],
        [
          'multiply green',
          'multiply pink',
          'multiply yellow',
          'multiply blue',
          'multiply orange',
          'multiply'
        ],
        [
          'multiply green',
          'multiply pink',
          'multiply yellow',
          'multiply blue',
          'multiply orange',
          'multiply'
        ],
        [
          'multiply green',
          'multiply pink',
          'multiply yellow',
          'multiply blue',
          'multiply orange',
          'multiply'
        ]
      ]"
      :hold="true"
    ></DiceView>
  </div>
</template>

<script>
import DiceView from "../../views/DiceView";

export default {
  name: "NochmalDices",
  components: { DiceView }
};
</script>

<style lang="less" scoped>
.dice-container {
  display: inline-block;
  margin: 0 auto;
}
</style>
