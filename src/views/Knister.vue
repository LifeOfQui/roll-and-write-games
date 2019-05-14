<template>
  <div>
    <DiceView
      :count="2"
      :values="['1', '2', '3', '4', '5', '6']"
      :use-image="true"
      layout="row"
    ></DiceView>
    <div class="game">
      <div class="total">{{ total }}</div>

      <div class="game__grid">
        <template v-for="(row, rowIndex) in game">
          <template v-for="(field, fieldIndex) in row">
            <div
              :class="['game__slot', { diagonal: field.diagonal }]"
              :key="`${rowIndex}-${fieldIndex}`"
            >
              <input
                v-model="field.value"
                @blur="calc(rowIndex, fieldIndex)"
                type="text"
                maxlength="2"
                min="1"
                max="12"
                class="game__input"
              />
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import DiceView from "./DiceView";

export default {
  name: "Knister",
  components: { DiceView },
  data() {
    return {
      total: 0,
      rowsScore: [0, 0, 2, 0, 0],
      columnsScore: [1, 12, 1, 2, 2],
      diagonaleOne: [],
      diagonalsScore: [0, 16],
      game: [
        [
          { value: null, diagonal: true },
          { value: null },
          { value: null },
          { value: null },
          { value: null, diagonal: true }
        ],
        [
          { value: null },
          { value: null, diagonal: true },
          { value: null },
          { value: null, diagonal: true },
          { value: null }
        ],
        [
          { value: null },
          { value: null },
          { value: null, diagonal: true },
          { value: null },
          { value: null }
        ],
        [
          { value: null },
          { value: null, diagonal: true },
          { value: null },
          { value: null, diagonal: true },
          { value: null }
        ],
        [
          { value: null, diagonal: true },
          { value: null },
          { value: null },
          { value: null },
          { value: null, diagonal: true }
        ]
      ]
    };
  },
  methods: {
    calc(ri, fi) {
      if (this.validateField(ri, fi)) {
        this.diagonaleOne = [
          this.game[0][0].value,
          this.game[1][1].value,
          this.game[2][2].value,
          this.game[3][3].value,
          this.game[4][4].value
        ];
        console.log(this.diagonaleOne);
        this.calculateScore();
      }
    },
    validateField(ri, fi) {
      if (this.game[ri][fi].value >= 2 && this.game[ri][fi].value <= 12) {
        return true;
      } else {
        this.game[ri][fi].value = null;
        return false;
      }
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
