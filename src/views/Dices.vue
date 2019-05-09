<template>
  <div>
    <div style="margin: 50px;">
      <div>
        <input
          type="range"
          min="1"
          max="20"
          id="colorsCount"
          v-model="colorsCount"
        />
        <label for="colorsCount">Color count: {{ colorsCount }}</label>
      </div>
      <div v-for="index in parseInt(colorsCount)" :key="index">
        <input v-model="colors[index - 1].count" />
        <input v-model="colors[index - 1].hex" />
      </div>
      <div>
        <input type="checkbox" v-model="hold" id="hold" />
        <label for="hold">Hold: {{ hold }}</label>
      </div>
      <!-- TODO: Values auswählen 1-6 oder Mumie oder Stern etc...-->
      <input v-model="diceValues" />
    </div>
    <DiceView
      :values="diceValues"
      :count="diceCount"
      :colors="diceColors"
    ></DiceView>
  </div>
</template>

<script>
import DiceView from "./DiceView";
import { getRandomHex } from "../utils";

export default {
  name: "Dices",
  components: { DiceView },
  data() {
    return {
      dices: [],
      diceCount: 0,
      colorsCount: 3,
      diceValues: ["1", "2", "3", "4", "5", "6"],
      diceColors: [],
      hold: true,
      colors: []
    };
  },
  created() {
    this.createDices();
  },
  watch: {
    diceValues: function() {
      this.diceValues = this.diceValues.split(",");
    },
    colorsCount: function() {
      this.createDices();
    },
    colors: {
      handler: function() {
        let count = 0;
        let colorArray = [];

        for (let i = 0; i < this.colors.length; i++) {
          count += parseInt(this.colors[i].count);
          for (let j = 0; j < this.colors[i].count; j++) {
            colorArray.push(this.colors[i].hex);
          }
        }

        this.diceCount = count;
        this.diceColors = colorArray;
      },
      deep: true
    }
  },
  methods: {
    createDices() {
      // if (this.dices.length === 0) {
      this.colors = [];
      for (let i = 0; i < parseInt(this.colorsCount); i++) {
        this.colors.push({
          hex: getRandomHex(),
          count: i + 1
        });
        this.diceColors.push(this.colors[i].hex);
      }

      // }
      // if (this.dices.length > this.count) {
      //   for (let i = 0; i < this.count; i++) {
      //     this.dices = this.dices.slice(0, this.count);
      //   }
      // } else {
      //   const numToAdd = this.count - this.dices.length;
      //   for (let i = 0; i < numToAdd; i++) {
      //     this.dices.push({
      //       color: "#ffffff",
      //       value: this.values[getRandomInt(this.values.length)]
      //     });
      //   }
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
