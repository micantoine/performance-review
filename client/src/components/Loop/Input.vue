<template>
  <input :data-oo-input="variant">
</template>

<script>
export default {
  name: 'Input',
  props: {
    variant: {
      type: String,
      default: '',
    },
  },
};
</script>
