<template>
  <Row prop="gutter-tiny vgutter-less">
    <Column prop="fit">
      <img width="20" src="@/assets/bubble.svg" alt="" />
    </Column>
    <Column class="display font-small">
      <strong>{{ display(reviewer) }}</strong><br/>
      <small class="color-secondary">{{ review.updatedAt | formatDate }}</small>
    </Column>
  </Row>
</template>

<script>
import { Row, Column } from './Loop';
import { formatDate } from '../utils';

export default {
  name: 'Review',
  components: {
    Column,
    Row,
  },
  props: {
    review: {
      type: Object,
      required: true,
    },
  },
  computed: {
    reviewee() {
      return this.review.reviewee;
    },
    reviewer() {
      return this.review.reviewer;
    },
  },
  filters: {
    formatDate,
  },
  methods: {
    display(user) {
      if (!user.firstname && !user.lastname) {
        return user.email;
      }
      return `${user.firstname} ${user.lastname}`;
    },
  },
};
</script>

<style scoped>
  .display {
    word-break: break-word;
  }
</style>
