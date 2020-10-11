<template>
  <div class="box">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Box',
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
</style>
