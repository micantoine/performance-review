<template>
  <div :data-oo-row="prop">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Row',
  props: {
    prop: String,
  },
};
</script>
