<template>
  <div>
    <div class="btn__row">
      <div style="display: flex;">
        <div class="btn" @click="createGame">New game</div>
        <input
          v-model="gameId"
          style="margin-left: 10px; width: 40px; text-align: center;"
        />
      </div>
      <div class="btn" @click="calculateScore">End game</div>
    </div>
    <div class="game">
      <div v-for="(row, rowIndex) in game" :class="['row']" :key="rowIndex">
        <template v-for="(field, fieldIndex) in row.values">
          <div
            @click="checkField(rowIndex, fieldIndex)"
            :class="[
              'field',
              field.color,
              field.marked ? 'marked' : '',
              field.value === 'lock' ? 'lock' : ''
            ]"
            :key="fieldIndex"
          >
            <div class="field__value" :class="[field.color]">
              {{ field.value }}
            </div>
          </div>
        </template>
      </div>
      <div class="failsRow">
        <div class="fails">
          <div style="font-size: 14px;">Fehlwürfe je -5</div>
          <div class="failRow">
            <template v-for="index in 4">
              <div
                :key="`fail-${index}`"
                :class="[
                  'fail',
                  failAttemps[index - 1] === 'X' ? 'active' : ''
                ]"
                @click="addFail"
              ></div>
            </template>
          </div>
        </div>
      </div>
      <div class="rowsScore">
        <div style="font-size: 14px;">Ergebnis:</div>
        <div style="display: flex; align-items: center;">
          <template v-for="index in game.length + 1">
            <div
              :key="`score-${index}`"
              :class="['rowScore', `score-${index}`]"
            >
              {{ rowScore[index - 1] }}
            </div>
            <div v-if="index < 4" :key="`add-${index}`">+</div>
            <div v-else-if="index === 4" :key="`add-${index}`">-</div>
            <div v-else-if="index === 5" :key="`add-${index}`">=</div>
          </template>
        </div>
        <div class="points">
          <label v-if="points > -100">{{ points }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qwixxGemixxtGames from "./games";
import { calculateRows } from "./utils";

export default {
  name: "Gemixxt",
  data() {
    return {
      gameId: 0,
      game: [],
      failAttemps: [],
      rowScore: [],
      points: -100
    };
  },
  created() {
    this.game = qwixxGemixxtGames[this.gameId];
  },
  methods: {
    createGame() {
      this.game = [];
      this.failAttemps = [];
      this.rowScore = [];
      this.points = -100;
      this.$nextTick(() => {
        this.game = qwixxGemixxtGames[this.gameId];
      });
    },
    addFail() {
      if (this.failAttemps.length < 4) {
        this.failAttemps.push("X");
      }
    },
    calculateScore() {
      this.points = 0;
      this.game.forEach(row => {
        let rowCount = 0;
        row.values.forEach(field => {
          if (field.marked) {
            rowCount += 1;
          }
        });
        let rowPoints = calculateRows(rowCount);
        this.rowScore.push(rowPoints);
        this.points += rowPoints;
      });

      let failPoints = 0;
      this.failAttemps.forEach(() => {
        failPoints += 5;
        this.points -= 5;
      });
      this.rowScore.push(failPoints);
    },
    isAllowed(ri, fi) {
      let isAllowed = true;
      let count = 0;

      if (this.game[ri].values[fi].marked) {
        isAllowed = false;
      }

      // if lock
      if (this.game[ri].values.length - 1 === fi) {
        if (!this.game[ri].values[this.game[ri].values.length - 2].marked) {
          isAllowed = false;
        }
      }
      // if last number in row - count if there a at least 5 marked
      else if (this.game[ri].values.length - 2 === fi) {
        if (this.game[ri].values[fi].marked) {
          isAllowed = false;
        }
        this.game[ri].values.forEach(field => {
          if (field.marked) {
            count++;
          }
        });

        if (count < 5) {
          isAllowed = false;
        }

        // check whether there is one the left side - then do not allow
      } else {
        this.game[ri].values.forEach((field, index) => {
          if (field.marked) {
            if (index >= fi) {
              isAllowed = false;
              return false;
            }
          }
        });
      }
      return isAllowed;
    },
    checkField(ri, fi) {
      if (this.isAllowed(ri, fi)) {
        this.game[ri].values[fi].marked = !this.game[ri].values[fi].marked;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.game {
  margin: 20px auto 0;
  width: 545px;
  background-color: #dcd6e8;
  padding: 5px 0 0;

  .row {
    display: flex;
    /*padding: 10px 0;*/
    margin: 4px 0;
    justify-content: center;
    position: relative;

    &:last-child {
      margin-bottom: 0;
    }

    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: calc(~"50% - 10px");
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-left: 20px solid;
      width: 20px;
    }
  }

  .field {
    width: 40px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:first-child {
      padding-left: 10px;
    }

    .field__value {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid;
      background: white;
      font-weight: bold;
      border-radius: 6px;
      font-size: 24px;
      cursor: pointer;
      user-select: none;

      &.red {
        color: #bc363f;
        background-color: #feefe8;
        border-color: #7d4f54;
      }

      &.yellow {
        color: #c7a32b;
        background-color: #fffcf8;
        border-color: #896122;
      }

      &.green {
        color: #37b169;
        background-color: #f4f9f3;
        border-color: #33813f;
      }

      &.blue {
        color: #405a84;
        background-color: #f5f8f9;
        border-color: #384557;
      }
    }

    &.marked {
      .field__value {
        position: relative;

        &:after {
          position: absolute;
          top: 0;
          left: 0;
          content: "";
          display: block;
          height: 100%;
          width: 100%;
          background-image: url(../../assets/images/multiply.svg);
          background-size: 40px;
          background-position: center;
          background-repeat: no-repeat;
        }
      }
    }

    &.lock {
      width: 60px;
      height: 50px;

      .field__value {
        font-size: 0;
        border-radius: 50%;
        transform: rotate(20deg) scaleX(-1);
        background-image: url(../../assets/images/unlock.svg);
        background-size: 32px;
        background-position: center;
        background-repeat: no-repeat;
        user-select: none;

        &:after {
          display: none;
        }
      }

      &.marked {
        .field__value {
          background-image: url(../../assets/images/lock.svg);
        }
      }
    }

    &.red {
      background-color: #8c202a;
    }

    &.yellow {
      background-color: #e7b92f;
    }

    &.green {
      background-color: #24a45e;
    }

    &.blue {
      background-color: #434466;
    }
  }

  .rowsScore {
    background-color: #c2c5d5;
    display: flex;
    align-items: center;
    padding: 0 20px;
  }

  .rowScore {
    width: 40px;
    height: 30px;
    margin: 10px;
    border: 3px solid #000;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    font-size: 22px;
    background-color: #eef2fe;

    &.score-1 {
      border-color: #8c202a;
    }

    &.score-2 {
      border-color: #e7b92f;
    }

    &.score-3 {
      border-color: #24a45e;
    }

    &.score-4 {
      border-color: #434466;
    }

    &.score-5 {
      border-color: #7d7b89;
    }
  }

  .points {
    width: 75px;
    height: 30px;
    margin: 10px 0 10px 10px;
    border: 3px solid #0b0b12;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    font-size: 24px;
    font-weight: bold;
    color: black;
    background-color: #eef2fe;
  }

  .failsRow {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #dcdeeb;
    padding: 0 20px;
  }

  .fails {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 5px;

    .failRow {
      display: flex;
    }
  }

  .fail {
    width: 20px;
    height: 20px;
    margin: 5px 10px 10px;
    border-radius: 4px;
    border: 2px solid #9a9eaa;
    cursor: pointer;

    &:first-child {
      margin-left: 0;
    }

    &.active {
      position: relative;

      &:after {
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        display: block;
        height: 100%;
        width: 100%;
        background-image: url(../../assets/images/multiply.svg);
        background-size: 80%;
        background-position: center;
        background-repeat: no-repeat;
      }
    }
  }
}

.btn__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 545px;
  margin: 20px auto auto;
}
.btn {
  background-color: #eef2fe;
  padding: 10px;
  border: 1px solid #efe;
  cursor: pointer;
  user-select: none;
}
</style>
