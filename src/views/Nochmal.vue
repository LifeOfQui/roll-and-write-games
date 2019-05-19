<template>
  <div>
    <button @click="dicesOpen = !dicesOpen">Toggle Dices</button>
    <div v-if="dicesOpen">
      <nochmal-dices></nochmal-dices>
    </div>
    <div style="margin: 20px 0;">
      <div style="display: flex; justify-content: center; align-items: center;">
        <div class="btn" @click="calculateScore" style="margin-left: 40px">
          End game
        </div>
      </div>
      <img src="../assets/blocks/nochmal/nochmal.jpg" style="width: 700px;" />
      <hr />
      <div class="board">
        <div class="game">
          <div class="chars" style="display: flex; margin-bottom: 10px;">
            <template v-for="char in chars">
              <div :key="char" class="field white char">
                <div
                  class="field__value"
                  :style="{ color: char === 'H' ? 'red' : 'black' }"
                >
                  {{ char }}
                </div>
              </div>
            </template>
          </div>
          <template v-for="(row, rowIndex) in game">
            <div class="row" :key="rowIndex">
              <template v-for="(field, fieldIndex) in row">
                <div
                  @click="checkField(rowIndex, fieldIndex)"
                  :class="[
                    'field',
                    field.color,
                    { startRow: field.startRow },
                    { star: field.star },
                    { marked: field.marked }
                  ]"
                  :key="`${rowIndex}-${fieldIndex}`"
                >
                  <div class="field__value" :class="[field.color]">
                    {{ field.value }}
                  </div>
                </div>
              </template>
            </div>
          </template>
          <div class="rowPoints" style="margin-top: 10px;">
            <template v-for="(row, rowIndex) in rowPoints">
              <div class="row" style="display: flex;" :key="rowIndex">
                <template v-for="(points, pointsIndex) in row">
                  <div
                    @click="checkRows(rowIndex, pointsIndex)"
                    :class="['field', 'white', { marked: points.marked }]"
                    :key="`${rowIndex}-${pointsIndex}`"
                  >
                    <div
                      class="field__value"
                      :style="{ color: pointsIndex === 7 ? 'red' : 'black' }"
                    >
                      {{ points.value }}
                    </div>
                  </div>
                </template>
              </div>
            </template>
          </div>
        </div>
        <!-- RECHTS -->
        <div class="colorPoints">
          <template v-for="(row, rowIndex) in colorPoints">
            <div class="row" style="display: flex;" :key="rowIndex">
              <template v-for="(color, colorIndex) in row">
                <div
                  @click="checkColorPoints(rowIndex, colorIndex)"
                  :class="['field', color.color, { marked: color.marked }]"
                  :key="`${colorIndex}-${colorIndex}`"
                >
                  <div class="field__value">
                    {{ color.value }}
                  </div>
                </div>
              </template>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NochmalDices from "../components/Nochmal/Dices";

export default {
  name: "Nochmal",
  components: { NochmalDices },
  data() {
    return {
      dicesOpen: true,
      chars: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O"
      ],
      rowPoints: [
        [
          { value: 5, marked: false },
          { value: 3, marked: false },
          { value: 3, marked: false },
          { value: 3, marked: false },
          { value: 2, marked: false },
          { value: 2, marked: false },
          { value: 2, marked: false },
          { value: 1, marked: false },
          { value: 2, marked: false },
          { value: 2, marked: false },
          { value: 2, marked: false },
          { value: 3, marked: false },
          { value: 3, marked: false },
          { value: 3, marked: false },
          { value: 5, marked: false }
        ],
        [
          { value: 3, marked: false },
          { value: 2, marked: false },
          { value: 2, marked: false },
          { value: 2, marked: false },
          { value: 1, marked: false },
          { value: 1, marked: false },
          { value: 1, marked: false },
          { value: 0, marked: false },
          { value: 1, marked: false },
          { value: 1, marked: false },
          { value: 1, marked: false },
          { value: 2, marked: false },
          { value: 2, marked: false },
          { value: 2, marked: false },
          { value: 3, marked: false }
        ]
      ],
      colorPoints: [
        [
          { value: 5, marked: false, color: "green" },
          { value: 3, marked: false, color: "green" }
        ],
        [
          { value: 5, marked: false, color: "yellow" },
          { value: 3, marked: false, color: "yellow" }
        ],
        [
          { value: 5, marked: false, color: "blue" },
          { value: 3, marked: false, color: "blue" }
        ],
        [
          { value: 5, marked: false, color: "pink" },
          { value: 3, marked: false, color: "pink" }
        ],
        [
          { value: 5, marked: false, color: "orange" },
          { value: 3, marked: false, color: "orange" }
        ]
      ],
      game: [
        [
          { color: "green", marked: false },
          { color: "green", marked: false },
          { color: "green", marked: false },
          { color: "yellow", marked: false },
          { color: "yellow", marked: false },
          { color: "yellow", marked: false },
          { color: "yellow", marked: false },
          { color: "green", marked: false, star: true, startRow: true },
          { color: "blue", marked: false },
          { color: "blue", marked: false },
          { color: "blue", marked: false },
          { color: "orange", marked: false, star: true },
          { color: "yellow", marked: false },
          { color: "yellow", marked: false },
          { color: "yellow", marked: false }
        ],
        [
          { color: "orange", marked: false },
          { color: "green", marked: false },
          { color: "yellow", marked: false, star: true },
          { color: "green", marked: false },
          { color: "yellow", marked: false, star: true },
          { color: "yellow", marked: false },
          { color: "orange", marked: false },
          { color: "orange", marked: false, startRow: true },
          { color: "pink", marked: false },
          { color: "blue", marked: false, star: true },
          { color: "blue", marked: false },
          { color: "orange", marked: false },
          { color: "orange", marked: false },
          { color: "green", marked: false },
          { color: "green", marked: false }
        ],
        [
          { color: "blue", marked: false, star: true },
          { color: "green", marked: false },
          { color: "pink", marked: false },
          { color: "green", marked: false },
          { color: "green", marked: false },
          { color: "green", marked: false },
          { color: "green", marked: false, star: true },
          { color: "pink", marked: false, startRow: true },
          { color: "pink", marked: false },
          { color: "pink", marked: false },
          { color: "yellow", marked: false },
          { color: "yellow", marked: false },
          { color: "orange", marked: false },
          { color: "green", marked: false },
          { color: "green", marked: false }
        ],
        [
          { color: "blue", marked: false },
          { color: "pink", marked: false },
          { color: "pink", marked: false },
          { color: "green", marked: false },
          { color: "orange", marked: false },
          { color: "orange", marked: false, star: true },
          { color: "blue", marked: false },
          { color: "blue", marked: false, startRow: true },
          { color: "green", marked: false },
          { color: "green", marked: false },
          { color: "yellow", marked: false },
          { color: "yellow", marked: false },
          { color: "orange", marked: false },
          { color: "pink", marked: false, star: true },
          { color: "blue", marked: false }
        ],
        [
          { color: "pink", marked: false },
          { color: "orange", marked: false },
          { color: "orange", marked: false },
          { color: "orange", marked: false },
          { color: "orange", marked: false },
          { color: "pink", marked: false },
          { color: "blue", marked: false },
          { color: "blue", marked: false, startRow: true },
          { color: "orange", marked: false },
          { color: "orange", marked: false },
          { color: "orange", marked: false },
          { color: "pink", marked: false },
          { color: "pink", marked: false },
          { color: "pink", marked: false },
          { color: "pink", marked: false }
        ],
        [
          { color: "pink", marked: false },
          { color: "blue", marked: false, star: true },
          { color: "blue", marked: false },
          { color: "pink", marked: false, star: true },
          { color: "pink", marked: false },
          { color: "pink", marked: false },
          { color: "pink", marked: false },
          { color: "yellow", marked: false, startRow: true },
          { color: "yellow", marked: false, star: true },
          { color: "orange", marked: false },
          { color: "pink", marked: false, star: true },
          { color: "blue", marked: false },
          { color: "blue", marked: false },
          { color: "blue", marked: false },
          { color: "orange", marked: false, star: true }
        ],
        [
          { color: "yellow", marked: false },
          { color: "yellow", marked: false },
          { color: "blue", marked: false },
          { color: "blue", marked: false },
          { color: "blue", marked: false },
          { color: "blue", marked: false },
          { color: "pink", marked: false },
          { color: "yellow", marked: false, startRow: true },
          { color: "yellow", marked: false },
          { color: "yellow", marked: false },
          { color: "green", marked: false },
          { color: "green", marked: false },
          { color: "green", marked: false, star: true },
          { color: "orange", marked: false },
          { color: "orange", marked: false }
        ]
      ],
      specialScore: [],
      failAttemps: [],
      failScore: -100,
      rowScore: [],
      points: -100
    };
  },
  methods: {
    addFail() {
      if (this.failAttemps.length < 3) {
        this.failAttemps.push("X");
      } else if (this.failAttemps.length < 4) {
        this.failAttemps.push("X");
        alert("Spiel ist hiermit aus");
      }
    },
    checkColorPoints(ri, fi) {
      this.colorPoints[ri][fi].marked = !this.colorPoints[ri][fi].marked;
    },
    checkRows(ri, fi) {
      this.rowPoints[ri][fi].marked = !this.rowPoints[ri][fi].marked;
    },
    checkField(ri, fi) {
      this.game[ri][fi].marked = !this.game[ri][fi].marked;
    },
    calculateScore() {
      this.points = 0;
      this.specialScore = [];
      this.rowScore = [];
      this.failScore = 0;

      this.game.forEach(row => {
        let rowCount = 0;
        row.forEach(field => {
          if (field.value !== null) {
            rowCount += 1;
          }
          if (field.special) {
            this.specialScore.push(field.value === null ? 0 : field.value);
          }
        });
        let rowPoints = rowCount;
        this.rowScore.push(rowPoints);
        this.points += rowPoints;
      });

      this.specialScore.forEach(score => {
        this.points += parseInt(score);
      });

      this.failAttemps.forEach(() => {
        this.failScore += 5;
        this.points -= 5;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.nav {
  display: flex;
}

.board {
  margin: 20px auto;
  border: 1px solid #d5d5d5;
  border-radius: 0;
  box-shadow: 2px 2px 4px gray;
  width: 650px;
  display: flex;
}

.game {
  margin: 0 auto;
  background-color: black;
  padding: 10px;

  .row {
    display: flex;
    margin: 0;
    position: relative;
  }

  .field {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 9px;
    padding: 2px;
    border: 1px solid black;

    .field__value {
      width: 30px;
      height: 30px;
      font-size: 24px;
      cursor: pointer;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      user-select: none;
    }

    &.startRow {
      border: 2px solid white;
    }

    &.star {
      .field__value {
        background-image: url(../assets/images/star.svg);
        background-size: 80%;
        background-position: center;
        background-repeat: no-repeat;
      }
    }

    &.marked {
      .field__value {
        background-image: url(../assets/images/multiply.svg);
        background-size: 80%;
        background-position: center;
        background-repeat: no-repeat;
      }
    }

    &.star.marked {
      .field__value {
        background-image: url(../assets/images/multiply.svg),
          url(../assets/images/star.svg);
        background-size: 80%;
        background-position: center;
        background-repeat: no-repeat;
      }
    }

    &.green {
      background-color: #97bf1e;

      .field__value {
        background-color: #b5d663;
      }
    }

    &.blue {
      background-color: #56c6ec;

      .field__value {
        background-color: #8dd6f7;
      }
    }

    &.orange {
      background-color: #f18000;

      .field__value {
        background-color: #f6a54a;
      }
    }

    &.yellow {
      background-color: #ffc700;

      .field__value {
        background-color: #ffde49;
      }
    }

    &.pink {
      background-color: #e00142;

      .field__value {
        background-color: #f04a7c;
      }
    }

    &.white {
      background-color: #ffffff;

      &.char {
        cursor: unset;

        .field__value {
          cursor: unset;
        }
      }

      .field__value {
        background-color: transparent;
        font-weight: bold;
      }
    }
  }
}

.colorPoints {
  background-color: #000;
  padding: 10px;

  .field {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 9px;
    padding: 2px;
    border: 1px solid black;

    .field__value {
      width: 30px;
      height: 30px;
      font-size: 24px;
      font-weight: bold;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      user-select: none;
      text-shadow: 1px 1px rgba(0, 0, 0, 0.7);
    }

    &.marked {
      .field__value {
        background-image: url(../assets/images/multiply.svg);
        background-size: 80%;
        background-position: center;
        background-repeat: no-repeat;
      }
    }

    &.green {
      background-color: #97bf1e;

      .field__value {
        color: #b5d663;
      }
    }

    &.blue {
      background-color: #56c6ec;

      .field__value {
        color: #8dd6f7;
      }
    }

    &.orange {
      background-color: #f18000;

      .field__value {
        color: #f6a54a;
      }
    }

    &.yellow {
      background-color: #ffc700;

      .field__value {
        color: #ffde49;
      }
    }

    &.pink {
      background-color: #e00142;

      .field__value {
        color: #f04a7c;
      }
    }
  }
}

.btn {
  background-color: #eef2fe;
  padding: 10px;
  border: 1px solid #efe;
  cursor: pointer;
  user-select: none;
}
</style>
