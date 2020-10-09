<template>
  <button
    type="button"
    :data-oo-Button="variant">{{ label }}</button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    label: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      default: '',
    },
  },
};
</script>
