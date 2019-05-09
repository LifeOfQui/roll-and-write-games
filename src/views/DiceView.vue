<template>
  <div
    style="display: flex; justify-content: center; align-items: center;"
    :style="{ flexDirection: layout }"
  >
    <button class="rollDiceBtn" @click="rollDices">Roll dices</button>

    <div class="dice-container">
      <template v-for="(dice, index) in dices">
        <Dice
          :key="index"
          :color="dice.color"
          :value="dice.value"
          :id="dice.id"
          :hold="dice.hold"
          @holdDice="holdDice"
        ></Dice>
      </template>
    </div>
  </div>
</template>

<script>
import Dice from "../components/Dice";
import { getRandomInt } from "../utils";

export default {
  name: "DiceView",
  components: { Dice },
  props: {
    count: {
      type: Number,
      default: 2
    },
    colors: {
      type: Array,
      default: function() {
        return ["#ffffff", "#ffffff"];
      }
    },
    values: {
      type: Array,
      default: function() {
        return ["1", "2", "3", "4", "5", "6"];
      }
    },
    layout: { type: String, default: "column" },
    randomizeOrder: { type: Boolean, default: false }
  },
  data() {
    return {
      dices: []
    };
  },
  created() {
    this.createDices();
    this.rollDices();
  },
  watch: {
    count: function() {
      this.createDices();
    },
    colors: function() {
      this.createDices("new");
    }
  },
  methods: {
    createDices(val) {
      if (this.dices.length === 0 || val === "new") {
        this.dices = [];
        for (let i = 0; i < this.count; i++) {
          this.dices.push({
            color: this.colors[i],
            id: i
          });
          this.rollDices();
        }
      } else if (this.dices.length > this.count) {
        for (let i = 0; i < this.count; i++) {
          this.dices = this.dices.slice(0, this.count);
        }
      } else {
        const numToAdd = this.count - this.dices.length;
        for (let i = 0; i < numToAdd; i++) {
          this.dices.push({
            color: "#ffffff",
            value: this.values[getRandomInt(this.values.length)],
            id: this.dices.length + i
          });
        }
      }
    },
    holdDice(idToHold) {
      const indexToHold = this.dices.findIndex(x => x.id === idToHold);
      this.dices[indexToHold].hold = !this.dices[indexToHold].hold;
    },
    rollDices() {
      this.dices = this.dices.map(dice => {
        return {
          ...dice,
          value: dice.hold
            ? dice.value
            : this.values[getRandomInt(this.values.length)]
        };
      });
    }
  }
};
</script>

<style lang="less" scoped>
.dice-container {
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.rollDiceBtn {
  margin-top: 30px;
  padding: 20px 30px;
}
</style>
