<template>
  <div style="margin: 20px 0;">
    <div style="display: flex; justify-content: center; align-items: center;">
      <div class="btn" @click="createGame">New game</div>
      <input
        v-model="gameId"
        style="margin-left: 10px; width: 40px; text-align: center;"
      />
    </div>
    <hr />
    <div class="board">
      <div class="game">
        <template v-for="(row, rowIndex) in game">
          <div
            class="row"
            :class="rowIndex % 2 === 0 ? 'even' : 'odd'"
            :key="rowIndex"
          >
            <template v-for="(field, fieldIndex) in row">
              <div
                @click="checkField(rowIndex, fieldIndex)"
                :class="[
                  'field',
                  field.color,
                  field.marked ? 'marked' : '',
                  field.star ? 'star' : ''
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
      </div>

      <div class="info">
        <div class="text">1x</div>
        <div :class="['colorful', oneColorMarked ? 'marked' : '']"></div>
        <div class="separator"></div>
        <div class="text">9x</div>
        <template v-for="(field, fieldIndex) in stars">
          <div
            @click="checkStars(fieldIndex)"
            :class="[
              'field',
              field.color,
              field.marked ? 'marked' : '',
              field.star ? 'star' : ''
            ]"
            :key="`${fieldIndex}}`"
          >
            <div class="field__value" :class="[field.color]">
              {{ field.value }}
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { boards } from "../wuerfelland-boards";

export default {
  name: "wuerfelland",
  data() {
    return {
      gameId: 0,
      game: [],
      stars: [
        { color: "red", marked: false, star: true },
        { color: "red", marked: false, star: true },
        { color: "yellow", marked: false, star: true },
        { color: "yellow", marked: false, star: true },
        { color: "green", marked: false, star: true },
        { color: "green", marked: false, star: true },
        { color: "blue", marked: false, star: true },
        { color: "blue", marked: false, star: true },
        { color: "orange", marked: false, star: true },
        { color: "orange", marked: false, star: true },
        { color: "grey", marked: false, star: true },
        { color: "grey", marked: false, star: true }
      ],
      nineStars: false,
      colorCount: { red: 0, yellow: 0, green: 0, blue: 0, orange: 0, grey: 0 },
      oneColorMarked: false
    };
  },
  created() {
    this.createGame();
    this.countColors();
  },
  methods: {
    createGame() {
      this.game = [];
      this.game = boards[this.gameId];
    },
    countColors() {
      this.game.forEach(row => {
        row.forEach(field => {
          if (field.color !== "black" && field.color !== "white") {
            this.colorCount[field.color] += 1;
          }
        });
      });
    },
    checkField(ri, fi) {
      if (!this.game[ri][fi].marked && !(this.game[ri][fi].color === "black")) {
        this.game[ri][fi].marked = !this.game[ri][fi].marked;
        this.oneColorMarked = this.checkColors();

        if (this.game[ri][fi].star) {
          this.checkStars(this.game[ri][fi].color);
          this.nineStars = this.checkIfNineStars();
        }
      }
      if (this.oneColorMarked && this.nineStars) {
        alert("Du hast gewonnen");
      }
    },
    checkStars(color) {
      let marked = false;
      this.stars.forEach(star => {
        if (star.color === color && !star.marked && !marked) {
          star.marked = !star.marked;
          marked = true;
        }
      });
    },
    checkIfNineStars() {
      if (!this.nineStars) {
        let stars = 0;
        this.stars.forEach(star => {
          if (star.marked) stars += 1;
        });

        return stars >= 9;
      } else {
        return true;
      }
    },
    checkColors() {
      if (!this.oneColorMarked) {
        let markedColorsCount = {
          red: 0,
          yellow: 0,
          green: 0,
          blue: 0,
          orange: 0,
          grey: 0
        };

        this.game.forEach(row => {
          row.forEach(field => {
            if (field.marked) {
              markedColorsCount[field.color] += 1;
            }
          });
        });

        let oneColorIsMarked = false;

        for (let p in this.colorCount) {
          if (this.colorCount.hasOwnProperty(p)) {
            if (this.colorCount[p] === markedColorsCount[p]) {
              oneColorIsMarked = true;
            }
          }
        }

        return oneColorIsMarked;
      } else {
        return true;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.board {
  margin: 20px auto 0;
  background: #86c8e7;
  background: -webkit-linear-gradient(to top, #bcdff3, #6dd5fa, #86c8e7);
  background: linear-gradient(to top, #bcdff3, #6dd5fa, #86c8e7);
  border-radius: 15px;
  box-shadow: 2px 2px 4px gray;
  width: 460px;
}

.game {
  padding: 20px 30px;
}

.row {
  display: flex;
  margin-top: -4px;

  &.odd {
    margin-left: 16px;
  }
}

.field {
  width: 30px;
  height: 30px;
  display: inline-block;
  margin: 1px;
  position: relative;
  cursor: pointer;
  transform: rotate(30deg);

  &.black {
    cursor: unset;
  }

  .field__value {
    height: 100%;
    width: calc(100% * 0.57735);
    display: inline-block;
    cursor: pointer;
    user-select: none;

    &.black {
      background-color: #000000;
      cursor: unset;
    }

    &.white {
      background-color: #f5f2eb;
    }

    &.orange {
      background-color: #f38d31;
    }

    &.grey {
      background-color: #b0b9be;
    }

    &.red {
      background-color: #e8212e;
    }

    &.yellow {
      background-color: #ffe42e;
    }

    &.green {
      background-color: #88c04a;
    }

    &.blue {
      background-color: #0099d5;
    }

    &:before {
      position: absolute;
      top: 0;
      right: calc((100% / 2) - ((100% * 0.57735) / 2));
      background-color: inherit;
      height: inherit;
      width: inherit;
      content: "";
      transform: rotateZ(60deg);
    }

    &:after {
      position: absolute;
      top: 0;
      right: calc((100% / 2) - ((100% * 0.57735) / 2));
      background-color: inherit;
      height: inherit;
      width: inherit;
      content: "";
      transform: rotateZ(-60deg);
    }
  }

  &.marked {
    .field__value {
      &:after {
        background-image: url(../assets/images/multiply-wuerfelland.svg);
        background-size: 120%;
        background-position: center;
        background-repeat: no-repeat;
      }
    }
  }

  &.star {
    .field__value {
      &:after {
        background-image: url(../assets/images/star-wuerfelland.svg);
        background-size: 120%;
        background-position: center;
        background-repeat: no-repeat;
      }
    }
  }

  &.marked.star {
    .field__value {
      &:after {
        background-image: url(../assets/images/multiply-wuerfelland.svg),
          url(../assets/images/star-wuerfelland.svg);
        background-size: 120%;
        background-position: center;
        background-repeat: no-repeat;
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

.info {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 0 15px 15px;
  padding-top: 10px;
  padding-bottom: 8px;
  background-color: #6c8291;

  .colorful {
    width: 28px;
    height: 28px;
    display: inline-block;
    position: relative;
    cursor: pointer;
    transform: rotate(30deg);
    border-radius: 50%;
    border: 1px solid #555;
    background: #e8212e;
    background: linear-gradient(
      to right,
      #0099d5 0%,
      #f38b31 17%,
      #b0b9be 34%,
      #e8212e 51%,
      #ffe32e 68%,
      #89c04a 84%,
      #0099d5 100%
    );

    &.marked {
      &:after {
        position: absolute;
        top: 0;
        left: 0;
        background-color: inherit;
        height: inherit;
        width: inherit;
        content: "";
        transform: rotateZ(-60deg);
        background-image: url(../assets/images/multiply-wuerfelland.svg);
        background-size: 80%;
        background-position: center;
        background-repeat: no-repeat;
      }
    }
  }

  .field {
    width: 28px;
    height: 28px;
  }

  .separator {
    margin: 0 8px;
    height: 32px;
    width: 1px;
    background-color: #fff;
  }

  .text {
    color: white;
    font-size: 12px;
    margin-right: 3px;
    font-weight: bold;
  }
}
</style>
