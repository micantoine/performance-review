<template>
  <div :class="{'font-small' : hasExcerpt}">
    <Row prop="gutter-tiny vgutter-less">
      <Column v-if="reviewer" prop="fit">
        <img width="20" src="@/assets/bubble.svg" alt="" />
      </Column>
      <Column v-if="reviewer" class="display">
        <strong class="d-block color-primary">{{ reviewer | displayName }}</strong>
      </Column>
      <Column :prop="dateProp">
        <small class="d-block color-secondary">{{ review.updatedAt | formatDate }}</small>
      </Column>
    </Row>
    <p
      class="color-body"
      :class="{'excerpt' : hasExcerpt}"
    >
      <strong
       v-if="showReviewee"
       class="reviewee"
       :class="{'color-primary' : !reviewer}"
      >@{{ reviewee | displayName }}</strong>
      <span :class="{'font-italic' : hasExcerpt}">{{ review.content }}</span>
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
    showReviewee: {
      type: Boolean,
      default: true,
    },
    hasExcerpt: {
      type: Boolean,
      default: true,
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
    dateProp() {
      return this.reviewer ? 'fit self-valign-top' : '';
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
