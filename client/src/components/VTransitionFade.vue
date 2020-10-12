<template>
  <transition name="fade">
    <slot />
  </transition>
</template>

<script>
export default {
  name: 'VTransitionFade',
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
