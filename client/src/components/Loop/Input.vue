<template>
  <input
    :data-oo-input="variant"
    :value="value"
    @input="$emit('input', $event.target.value)" />
</template>

<script>
export default {
  name: 'Input',
  props: {
    variant: {
      type: String,
      default: '',
    },
    value: String,
  },
};
</script>
