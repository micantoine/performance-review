<template>
  <div>
    <div class="overlay"
      @click="cancel" />
    <Box class="modal">
      <section>
        <div class="body">
          <slot />
        </div>
        <footer>
          <Button
            class="mb-5"
            variant="primary full"
            label="Send Invitation"
            @onClick="confirm"
          />
          <Button
            variant="secondary full"
            label="Cancel"
            @onClick="cancel" />
        </footer>
      </section>
    </Box>
  </div>
</template>

<script>
import { Box } from '@/components';
import { Button } from '@/components/Loop';

export default {
  name: 'Modal',
  components: {
    Box,
    Button,
  },
  mounted() {
    window.addEventListener('keydown', this.onkeyDown);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.onkeyDown);
  },
  methods: {
    onkeyDown(e) {
      if (e.keyCode === 27) {
        this.cancel();
      }
    },
    cancel() {
      this.$emit('onClose', true);
    },
    confirm() {
      this.$emit('onConfirm', true);
    },
  },
};
</script>


<style lang="scss" scoped>
  .overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 5;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    max-width: 100%;
    background-color: #fff;
  }
  @media (min-width: 680px) {
    .modal {
      top: 50%;
      left: 50%;
      width: 400px;
      min-height: 50%;
      max-height: 500px;
      transform: translateX(-50%) translateY(-50%);
    }
  }

  section {
    flex: 0 1 auto;
    flex-direction: column;
    display: flex;
    height: 100%;
    overflow: hidden;
  }
  .body {
    padding: 12px;
    flex: 1 0 0;
    min-height: 0;
    max-height: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }
  @media (min-width: 680px) {
    .body {
      padding: 16px;
    }
  }

  ul {
    display: flex;
    flex: 1 0 auto;
    flex-direction: column;
  }
  li {
    margin-bottom: 10px;
  }

  footer {
    padding-top: 20px;
    flex: 0 0 auto;
    border-top: 1px solid #d9d9d9;
  }

  input[type='checkbox']:checked + label {
    font-weight: 400;
  }
</style>
