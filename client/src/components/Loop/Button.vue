<template>
  <button
    type="button"
    :data-oo-Button="variant"
    @click="onClick">{{ label }}</button>
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
  methods: {
    onClick() {
      this.$emit('onClick', true);
    },
  },
};
</script>
