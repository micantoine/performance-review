<template>
  <div>
    <Row prop="gutter-tiny vgutter-less">
      <Column prop="fit">
        <img width="20" src="@/assets/bubble.svg" alt="" />
      </Column>
      <Column class="display font-small">
        <strong class="d-block">{{ display(reviewer) }}</strong>
      </Column>
      <Column
        prop="fit self-valign-top"
        class="font-small"
      >
        <small class="color-secondary">{{ review.updatedAt | formatDate }}</small>
      </Column>
    </Row>
    <p class="excerpt color-body font-small">
      <strong class="reviewee">@{{ display(reviewee) }}</strong>
      <span class="font-italic">{{ review.content }}</span>
    </p>
  </div>
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
  .excerpt {
    overflow: hidden;

    display: block;
    display: -webkit-box;

    max-height: 65px;
    line-height: 1.2;

    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    text-overflow: ellipsis;
  }

  .reviewee::after {
    margin-right: 10px;
    margin-left: 5px;
    content: '—';
    font-weight: 400;
    letter-spacing: -5px;
  }
</style>
