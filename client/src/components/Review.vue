<template>
  <div>
    <Row prop="gutter-tiny vgutter-less">
      <Column prop="fit">
        <img width="20" src="@/assets/bubble.svg" alt="" />
      </Column>
      <Column class="display font-small">
        <strong class="d-block">{{ reviewer | displayName }}</strong>
      </Column>
      <Column
        prop="fit self-valign-top"
        class="font-small"
      >
        <small class="color-secondary">{{ review.updatedAt | formatDate }}</small>
      </Column>
    </Row>
    <p class="excerpt color-body font-small">
      <strong class="reviewee">@{{ reviewee | displayName }}</strong>
      <span class="font-italic">{{ review.content }}</span>
    </p>
  </div>
</template>

<script>
import { Row, Column } from './Loop';
import { formatDate, displayName } from '../utils';

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
  filters: {
    formatDate,
    displayName,
  },
  computed: {
    reviewee() {
      return this.review.reviewee;
    },
    reviewer() {
      return this.review.reviewer;
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
