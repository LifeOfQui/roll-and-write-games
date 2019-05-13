<template>
  <div class="nav">
    <router-link to="/qwinto/dices">
      Qwinto DICES
    </router-link>
    <img src="../assets/blocks/qwinto2.jpg" style="width: 400px;" />

    <div style="margin: 20px 0;">
      <div style="display: flex; justify-content: center; align-items: center;">
        <div class="btn" @click="createGame">New game</div>
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
  </div>
</template>

<script>
export default {
  name: "Qwinto"
};
</script>

<style lang="less" scoped>
.nav {
  display: flex;
}
</style>
