<template>
  <div>
    <DiceView
      :count="2"
      :values="['1', '2', '3', '4', '5', '6']"
      :colors="['#ffffff', '#ffffff']"
      layout="row"
    ></DiceView>
    <div class="game">
      <div class="total">{{ total }}</div>

      <div class="game__grid">
        <div class="game__slot slot--01 diagonal">
          <input
            @blur="calc"
            ref="one"
            type="text"
            maxlength="2"
            min="1"
            max="12"
            class="game__input"
          />
        </div>
        <div class="game__slot slot--02">
          <input
            type="text"
            maxlength="2"
            min="1"
            max="12"
            class="game__input"
          />
        </div>
        <div class="game__slot slot--03">
          <input
            type="text"
            maxlength="2"
            min="1"
            max="12"
            class="game__input"
          />
        </div>
        <div class="game__slot slot--04">
          <input
            type="text"
            maxlength="2"
            min="1"
            max="12"
            class="game__input"
          />
        </div>
        <div class="game__slot slot--05 diagonal">
          <input
            ref="five"
            type="text"
            maxlength="2"
            min="1"
            max="12"
            class="game__input"
          />
        </div>
        <div class="game__slot slot--06">
          <input
            type="text"
            maxlength="2"
            min="1"
            max="12"
            class="game__input"
          />
        </div>
        <div class="game__slot slot--07 diagonal">
          <input
            ref="seven"
            type="text"
            maxlength="2"
            min="1"
            max="12"
            class="game__input"
          />
        </div>
        <div class="game__slot slot--08">
          <input
            type="text"
            maxlength="2"
            min="1"
            max="12"
            class="game__input"
          />
        </div>
        <div class="game__slot slot--09 diagonal">
          <input
            ref="nine"
            type="text"
            maxlength="2"
            min="1"
            max="12"
            class="game__input"
          />
        </div>
        <div class="game__slot slot--10">
          <input
            type="text"
            maxlength="2"
            min="1"
            max="12"
            class="game__input"
          />
        </div>
        <div class="game__slot slot--11">
          <input
            type="text"
            maxlength="2"
            min="1"
            max="12"
            class="game__input"
          />
        </div>
        <div class="game__slot slot--12">
          <input
            type="text"
            maxlength="2"
            min="1"
            max="12"
            class="game__input"
          />
        </div>
        <div class="game__slot slot--13 diagonal">
          <input
            type="text"
            maxlength="2"
            min="1"
            max="12"
            class="game__input"
          />
        </div>
        <div class="game__slot slot--14">
          <input
            type="text"
            maxlength="2"
            min="1"
            max="12"
            class="game__input"
          />
        </div>
        <div class="game__slot slot--15">
          <input
            type="text"
            maxlength="2"
            min="1"
            max="12"
            class="game__input"
          />
        </div>
        <div class="game__slot slot--16">
          <input
            type="text"
            maxlength="2"
            min="1"
            max="12"
            class="game__input"
          />
        </div>
        <div class="game__slot slot--17 diagonal">
          <input
            type="text"
            maxlength="2"
            min="1"
            max="12"
            class="game__input"
          />
        </div>
        <div class="game__slot slot--18">
          <input
            type="text"
            maxlength="2"
            min="1"
            max="12"
            class="game__input"
          />
        </div>
        <div class="game__slot slot--19 diagonal">
          <input
            type="text"
            maxlength="2"
            min="1"
            max="12"
            class="game__input"
          />
        </div>
        <div class="game__slot slot--20">
          <input
            type="text"
            maxlength="2"
            min="1"
            max="12"
            class="game__input"
          />
        </div>
        <div class="game__slot slot--21 diagonal">
          <input
            type="text"
            maxlength="2"
            min="1"
            max="12"
            class="game__input"
          />
        </div>
        <div class="game__slot slot--22">
          <input
            type="text"
            maxlength="2"
            min="1"
            max="12"
            class="game__input"
          />
        </div>
        <div class="game__slot slot--23">
          <input
            type="text"
            maxlength="2"
            min="1"
            max="12"
            class="game__input"
          />
        </div>
        <div class="game__slot slot--24">
          <input
            type="text"
            maxlength="2"
            min="1"
            max="12"
            class="game__input"
          />
        </div>
        <div class="game__slot slot--25 diagonal">
          <input
            type="text"
            maxlength="2"
            min="1"
            max="12"
            class="game__input"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DiceView from "./DiceView";
import { checkForPairs } from "../knister-checks";

export default {
  name: "Index",
  components: { DiceView },
  data() {
    return {
      total: 0,
      rowsScore: [0, 0, 2, 0, 0],
      columnsScore: [1, 12, 1, 2, 2],
      diagonaleOne: [],
      diagonalsScore: [0, 16]
    };
  },
  mounted() {
    this.diagonaleOne = [
      this.$refs.one.value,
      this.$refs.seven.value,
      this.$refs.nine.value
    ];
    this.calculateScore();
  },
  methods: {
    calc() {
      this.diagonaleOne = [
        this.$refs.one.value,
        this.$refs.seven.value,
        this.$refs.nine.value
      ];
      console.log(this.diagonaleOne);
      console.log(checkForPairs(this.diagonaleOne));
      this.calculateScore();
    },
    calculateScore() {
      // this.total =
      //   this.total +
      //   this.rowsScore.reduce((acc, currentValue) => {
      //     return acc + currentValue;
      //   }) +
      //   this.columnsScore.reduce((acc, currentValue) => {
      //     return acc + currentValue;
      //   }) +
      //   this.diagonalsScore.reduce((acc, currentValue) => {
      //     return acc + currentValue;
      //   });
    }
  }
};
</script>

<style lang="less" scoped>
.game__grid {
  position: relative;
  max-width: 300px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 60px);
  grid-auto-rows: minmax(11%, 60px);

  .game__slot {
    border: 1px solid #43343d;
    background-color: #d4ecf6;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    &.diagonal {
      &:after {
        content: "";
        position: absolute;
        border-radius: 5px;
        top: 5%;
        left: 5%;
        height: 90%;
        width: 90%;
        background-color: #88cce3;
        transform: skew(-1deg, 0);
      }
    }
    .game__input {
      background-color: transparent;
      /*border: 0;*/
      font-size: 32px;
      width: 100%;
      height: 100%;
      z-index: 1;
      text-align: center;
    }
  }
}

.game {
  margin: 20px auto 0;
  width: 100vw;
  height: calc(100vw * 0.7);
  max-width: 454px;
  max-height: 454px;
  background-image: url("../assets/blocks/knister.jpg");
  background-repeat: no-repeat;
  background-size: contain;
  position: relative;

  .total {
    position: absolute;
    top: 84%;
    left: 2%;
    height: 11%;
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    user-select: none;
  }

  .slot {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    border: 1px solid;
    height: 11%;
    width: 8%;

    &.one {
      top: 5.5%;
      left: 31.5%;
    }
    &.two {
      top: 84%;
      left: 2%;
      height: 11%;
      width: 25%;
    }
  }
}
</style>
