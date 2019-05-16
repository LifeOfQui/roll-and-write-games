<template>
  <div
    class="dice"
    :class="[
      getImageOrColorForValue(value),
      this.disable ? 'disable' : '',
      this.hold ? 'hold' : ''
    ]"
    :style="[style, { backgroundColor: color }]"
    @click="$emit('clickOnDice', id)"
  >
    <label>{{ value }}</label>
  </div>
</template>

<script>
import { colourIsLight } from "../utils";

export default {
  name: "Dice",
  props: {
    id: Number,
    color: { type: String, default: "#ffffff" },
    value: { type: String },
    hold: { type: Boolean },
    disable: { type: Boolean, default: false },
    useImage: { type: Boolean, default: false },
    xl: { type: Boolean, default: false } // gibt eine grossere style-klasse
  },
  data() {
    return {
      availableColors: ["red", "blue", "yellow", "green", "grey", "orange"],
      availableShapes: [
        "circle",
        "dot",
        "key",
        "multiply",
        "mumie",
        "square",
        "star",
        "triangle"
      ]
    };
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
  },
  methods: {
    getImageOrColorForValue(value) {
      if (this.availableColors.indexOf(value) > -1) {
        return `color ${value}`;
      }

      if (this.availableShapes.indexOf(value) > -1) {
        return `shape ${value}`;
      }

      if (this.useImage && this.color === "#ffffff") {
        if (value === "1") {
          return "image one";
        }
        if (value === "2") {
          return "image two";
        }
        if (value === "3") {
          return "image three";
        }
        if (value === "4") {
          return "image four";
        }
        if (value === "5") {
          return "image five";
        }
        if (value === "6") {
          return "image six";
        }
      }
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
  border-radius: 6px;
  position: relative;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.72);
  user-select: none;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;

  label {
    font-size: 32px;
    font-weight: bold;
  }

  &.hold {
    opacity: 0.7;
    transform: scale(0.9);
  }

  &.disable {
    opacity: 0.4;
    background-image: none !important;

    label {
      display: none;
    }
  }

  &.image {
    background-size: 100%;

    label {
      display: none;
    }

    &.one {
      background-image: url(../assets/dice/dice-1.svg);
    }

    &.two {
      background-image: url(../assets/dice/dice-2.svg);
      background-size: 100%;
    }

    &.three {
      background-image: url(../assets/dice/dice-3.svg);
      background-size: 100%;
    }

    &.four {
      background-image: url(../assets/dice/dice-4.svg);
      background-size: 100%;
    }

    &.five {
      background-image: url(../assets/dice/dice-5.svg);
      background-size: 100%;
    }

    &.six {
      background-image: url(../assets/dice/dice-6.svg);
      background-size: 100%;
    }
  }

  &.color {
    label {
      display: none;
    }

    &:after {
      position: absolute;
      content: "";
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    &.red {
      &:after {
        background-color: red;
      }
    }

    &.blue {
      &:after {
        background-color: blue;
      }
    }

    &.yellow {
      &:after {
        background-color: yellow;
      }
    }

    &.green {
      &:after {
        background-color: green;
      }
    }

    &.grey {
      &:after {
        background-color: grey;
      }
    }

    &.orange {
      &:after {
        background-color: orange;
      }
    }
  }

  &.shape {
    background-size: 70%;
    background-repeat: no-repeat;
    background-position: center;

    label {
      display: none;
    }

    &.circle {
      background-image: url(../assets/dice/circle.svg);
    }

    &.dot {
      background-image: url(../assets/dice/dot.svg);
    }

    &.key {
      background-image: url(../assets/dice/key.svg);
    }

    &.multiply {
      background-image: url(../assets/dice/multiply.svg);
    }

    &.mumie {
      background-image: url(../assets/dice/mumie.svg);
    }

    &.square {
      background-image: url(../assets/dice/square.svg);
    }

    &.star {
      background-image: url(../assets/dice/star.svg);
    }

    &.triangle {
      background-image: url(../assets/dice/triangle.svg);
    }
  }
}
</style>
