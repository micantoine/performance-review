<template>
  <div :data-oo-col="prop">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Column',
  props: {
    prop: String,
  },
};
</script>
