<template>
  <div class="box">
    <div v-show="hasHeader" class="header">
      <slot name="header" />
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Box',
  props: {
    hasHeader: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
  .box {
    padding: 20px;
    width: 100%;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 5px 5px 5px -4px rgba(0,0,0, .15);
  }
  .header::after {
    margin: 15px -20px 20px;
    display: block;
    content: '';
    border-top: 3px solid #f8f8f8;
  }
</style>
