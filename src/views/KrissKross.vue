<template>
  <div>
    <div style="margin: 20px 0;">
      <div style="display: flex; justify-content: center; align-items: center;">
        <router-link to="/krisskross/dices">
          <div class="btn" @click="calculateScore">krisskross DICES</div>
        </router-link>
        <div class="btn" @click="calculateScore" style="margin-left: 40px">
          End game
        </div>
      </div>
      <hr />
      <div class="board">
        <div class="game">
          <template v-for="(row, rowIndex) in game">
            <div
              :key="rowIndex"
              :class="[
                'row',
                { orange: rowIndex === 0 },
                { yellow: rowIndex === 1 },
                { purple: rowIndex === 2 }
              ]"
            >
              <template v-for="(field, fieldIndex) in row">
                <div
                  :class="[
                    'field',
                    field.color,
                    { special: field.special },
                    { empty: field.empty },
                    { orange: rowIndex === 0 },
                    { yellow: rowIndex === 1 },
                    { purple: rowIndex === 2 }
                  ]"
                  :key="`${rowIndex}-${fieldIndex}`"
                >
                  <input
                    class="field__value"
                    style="text-align: center;"
                    :class="[field.color]"
                    v-model="field.value"
                    :disabled="field.empty"
                  />
                </div>
              </template>
            </div>
          </template>
        </div>
        <div class="failsRow">
          <div class="fails">
            <div style="font-size: 14px;">Fehlwürfe -5</div>
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
          <div style="display: flex; align-items: center;">
            <template v-for="index in game.length">
              <div
                :key="`rowScore-${index}`"
                :class="['rowScore', `score-${index}`]"
              >
                {{ rowScore[index - 1] }}
              </div>
              <div
                v-if="index === 3"
                :key="`add-${index}`"
                style="color: white; font-weight: bold;"
              >
                +
              </div>
            </template>
            <template v-for="index in 5">
              <div
                :key="`specialScore-${index}`"
                :class="['specialScore', `specialScore-${index}`]"
              >
                <label>{{ specialScore[index - 1] }}</label>
              </div>
            </template>
          </div>
          <div style="color: white; font-weight: bold">-</div>
          <div class="rowScore">
            <label v-if="failScore > -100">{{ failScore }}</label>
          </div>
          <div style="color: white; font-weight: bold">=</div>
          <div class="points">
            <label v-if="points > -100">{{ points }}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { qwintoCalculateRows } from "../utils";

export default {
  name: "KrissKross",
  data() {
    return {
      game: [
        [
          { value: null },
          { value: null, special: true },
          { value: null },
          { value: null, empty: true },
          { value: null },
          { value: null, special: true },
          { value: null },
          { value: null },
          { value: null },
          { value: null }
        ],
        [
          { value: null },
          { value: null },
          { value: null },
          { value: null },
          { value: null },
          { value: null, empty: true },
          { value: null },
          { value: null, special: true },
          { value: null },
          { value: null }
        ],
        [
          { value: null },
          { value: null },
          { value: null, special: true },
          { value: null },
          { value: null, empty: true },
          { value: null },
          { value: null },
          { value: null },
          { value: null },
          { value: null, special: true }
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
      if (this.failAttemps.length < 4) {
        this.failAttemps.push("X");
      }
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
        let rowPoints = qwintoCalculateRows(rowCount);
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
  width: 562px;
}

.game {
  margin: 0 auto;
  background-color: #e2e2e2;
  padding: 10px;

  .row {
    display: flex;
    margin: 0 0 7px;
    position: relative;

    &.orange {
      margin-left: 90px;
    }

    &.yellow {
      margin-left: 45px;
    }

    &.purple {
      margin-left: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  .field {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid;
    border-left: 0;
    padding: 2px;

    &:first-child {
      border-left: 1px solid;
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }

    .field__value {
      width: 34px;
      height: 34px;
      flex-shrink: 0;
      font-size: 24px;
      cursor: pointer;
      border-radius: 50%;
      border: 2px solid;
    }

    &.special {
      .field__value {
        border-radius: 0;
      }
    }

    &.empty {
      cursor: unset;
      border-right: 1px solid #000000;
      flex-shrink: 0;

      .field__value {
        flex-shrink: 0;
        visibility: hidden;
      }
    }

    &.orange {
      background-color: #e8661b;
      border-color: #b5734f;

      .field__value {
        background-color: #fdf0e7;
        border-color: #af501e;
      }
    }

    &.yellow {
      background-color: #f8df00;
      border-color: #c7b664;

      .field__value {
        background-color: #fcfeeb;
        border-color: #cab41f;
      }
    }

    &.purple {
      background-color: #5f358b;
      border-color: #4c2c6a;

      .field__value {
        background-color: #ede7ed;
        border-color: #371859;
      }
    }
  }
}

.failsRow {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eaeaea;
  padding: 0;

  .fails {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 5px;

    .failRow {
      margin-left: 20px;
      display: flex;
    }
  }

  .fail {
    width: 20px;
    height: 20px;
    margin: 5px 10px 10px;
    border-radius: 4px;
    border: 2px solid #9a9eaa;
    background-color: #fff;
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
        background-image: url(../assets/images/multiply.svg);
        background-size: 80%;
        background-position: center;
        background-repeat: no-repeat;
      }
    }
  }
}

.rowsScore {
  background-color: #a09fa4;
  display: flex;
  align-items: center;
  justify-content: center;

  .rowScore {
    width: 32px;
    height: 32px;
    margin: 10px 5px;
    border-radius: 50%;
    font-size: 22px;
    line-height: 33px;
    border: 2px solid #777;
    background-color: #fdfdfd;

    &.score-1 {
      border-color: #e8661b;
      background-color: #ffeee7;
    }

    &.score-2 {
      border-color: #f8df00;
      background-color: #f6faee;
    }

    &.score-3 {
      border-color: #5f358b;
      background-color: #f3e7f4;
    }
  }

  .specialScore {
    width: 32px;
    height: 32px;
    margin: 10px 5px;
    border: 2px solid #bbb;
    font-size: 22px;
    background-color: #fdfdfd;
    line-height: 33px;
  }

  .points {
    width: 65px;
    height: 32px;
    margin: 10px 5px;
    border: 2px solid #131313;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    font-size: 24px;
    font-weight: bold;
    color: black;
    background-color: #fdfdfd;
    line-height: 33px;
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
