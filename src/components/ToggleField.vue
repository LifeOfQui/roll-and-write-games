<template>
  <div style="display: flex; flex-direction: column;">
    <div class="" @click="toggle()">Open / Close</div>

  </div>
</template>

<script>
export default {
  name: "ToggleField",
  props: ["propName"],
  data() {
    return {
      isOpen: true
    };
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>

<style lang="less" scoped></style>
