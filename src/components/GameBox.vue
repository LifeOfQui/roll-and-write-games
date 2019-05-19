<template>
  <div class="gamebox">
    <img :src="getImgUrl(this.src)" :alt="this.alt" />
  </div>
</template>

<script>
export default {
  name: "GameBox",
  props: {
    src: String,
    alt: String
  },
  methods: {
    getImgUrl(pic) {
      return require("../assets/gameboxes/" + pic);
    }
  }
};
</script>

<style scoped lang="less">
.gamebox {
  width: 200px;

  img {
    max-width: 100%;
  }
}
</style>
