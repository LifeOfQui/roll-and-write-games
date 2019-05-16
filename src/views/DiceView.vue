<template>
  <div
    style="display: flex; justify-content: center; align-items: center; margin-top: 40px;"
    :style="{ flexDirection: layout }"
  >
    <div
      v-if="this.showCounter || this.maxRolls"
      style="display: flex; justify-content: center; align-items: center"
    >
      <div style="display: flex; justify-content: center; align-items: center;">
        <label style="margin-right: 10px;">Counter:</label>
        <div class="counter" style="margin-right: 20px; font-size: 32px;">
          {{ counter }}
        </div>
      </div>
      <button @click="resetCounter">Reset counter</button>
    </div>
    <button class="rollDiceBtn" @click="rollDices">Roll dices</button>

    <div class="dice-container">
      <template v-for="(dice, index) in dices">
        <Dice
          :key="index"
          :color="dice.color"
          :value="dice.value"
          :id="dice.id"
          :hold="dice.hold"
          :disable="dice.disable"
          :use-image="dice.useImage"
          @clickOnDice="clickOnDice"
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
      required: true
    },
    colors: {
      type: Array,
      default: function() {
        return [];
      }
    },
    values: {
      type: Array,
      default: function() {
        return ["1", "2", "3", "4", "5", "6"];
      }
    },
    hold: { type: Boolean, default: false },
    disable: { type: Boolean, default: false },
    showCounter: { type: Boolean, default: false },
    maxRolls: { type: Number },
    useImage: { type: Boolean, default: false },
    layout: { type: String, default: "column" },
    randomizeOrder: { type: Boolean, default: false }
  },
  data() {
    return {
      dices: [],
      counter: 0
    };
  },
  created() {
    this.createDices();
    this.resetCounter();
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
    valuesAreDifferentPerDice() {
      return Array.isArray(this.values[0]);
    },
    createDices(val) {
      if (this.dices.length === 0 || val === "new") {
        this.dices = [];
        for (let i = 0; i < this.count; i++) {
          this.dices.push({
            color: this.colors[i],
            id: i,
            disable: false,
            hold: false,
            useImage: this.useImage
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
          const randomValue = this.valuesAreDifferentPerDice()
            ? this.values[i][getRandomInt(this.values[i].length)]
            : this.values[getRandomInt(this.values.length)];

          this.dices.push({
            color: "#ffffff",
            value: randomValue,
            id: this.dices.length + i,
            disable: false,
            hold: false,
            useImage: this.useImage
          });
        }
      }
    },
    clickOnDice(id) {
      const index = this.dices.findIndex(x => x.id === id);

      if (this.hold) {
        this.dices[index].hold = !this.dices[index].hold;
      } else if (this.disable) {
        this.dices[index].disable = !this.dices[index].disable;
      }
    },
    rollDices() {
      if (!(this.maxRolls !== undefined && this.maxRolls <= this.counter)) {
        this.counter += 1;

        this.dices = this.dices.map((dice, i) => {
          const randomValue = this.valuesAreDifferentPerDice()
            ? this.values[i][getRandomInt(this.values[i].length)]
            : this.values[getRandomInt(this.values.length)];

          return {
            ...dice,
            value: dice.hold ? dice.value : randomValue
          };
        });
      }
    },
    resetCounter() {
      this.freeAllDices();
      this.counter = 0;
    },
    freeAllDices() {
      this.dices = this.dices.map(dice => ({
        ...dice,
        hold: false,
        disable: false
      }));
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
