<template>
  <Row prop="gutter-small vgutter-less valign-middle">
    <Column prop="fit">
      <img class="avatar" src="@/assets/user.svg" alt="" />
    </Column>
    <Column class="display">
      {{ user | displayName }}<br/>
      <span
        v-if="user.department"
        class="color-secondary font-small"
      >{{ user.department.name }}</span>
    </Column>
  </Row>
</template>

<script>
import { displayName } from '../utils';
import { Row, Column } from './Loop';

export default {
  name: 'Employee',
  components: {
    Column,
    Row,
  },
  filters: {
    displayName,
  },
  props: {
    user: {
      type: Object,
      required: true,
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
