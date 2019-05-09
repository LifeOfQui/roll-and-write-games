<template>
  <div
    class="dice"
    :style="[
      style,
      {
        backgroundColor: color,
        border: this.hold ? '1px solid red' : '1px solid black'
      }
    ]"
    @click="$emit('holdDice', id)"
  >
    <label>{{ value }}</label>
  </div>
</template>

<script>
import { colourIsLight } from "../utils";

export default {
  name: "Dice",
  props: {
    color: { type: String, default: "white" },
    value: { type: String },
    hold: { type: Boolean },
    id: Number,
    // ausserdem muss dann wenn angeklickt, eine styleklasse gesetzt werden
    xl: { type: Boolean, default: false } // gibt eine grossere style-klasse
  },
  computed: {
    style() {
      let style = {};
      if (colourIsLight(this.color) < 0.5) {
        style["color"] = "black";
      } else {
        style["color"] = "white";
      }
      return style;
    }
  }
};
</script>

<style lang="less" scoped>
.dice {
  height: 60px;
  width: 60px;
  margin-right: 15px;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  label {
    font-size: 32px;
    font-weight: bold;
  }
}
</style>
