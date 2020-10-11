<template>
  <Row prop="gutter-small vgutter-less valign-middle">
    <Column prop="fit">
      <img class="avatar" src="@/assets/user.svg" alt="" />
    </Column>
    <Column class="display">
      {{ display }}<br/>
      <span
        v-if="user.department"
        class="color-secondary font-small"
      >{{ user.department.name }}</span>
    </Column>
  </Row>
</template>

<script>
import { Row, Column } from './Loop';

export default {
  name: 'Employee',
  components: {
    Column,
    Row,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {
    display() {
      if (!this.user.firstname && !this.user.lastname) {
        return this.user.email;
      }
      return `${this.user.firstname} ${this.user.lastname}`;
    },
  },
};
</script>

<style scoped>
  .avatar {
    padding: 8px;
    display: block;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background-color: #f8f8f8;
    border: 1px solid #cdcdcd;
  }
  .display {
    word-break: break-word;
  }
</style>
