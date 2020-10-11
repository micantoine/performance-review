<template>
  <div class="container">
    <h1>Perfomance Reviews</h1>
    <Row>
      <Column prop="span12 auto@sm span4@md">
        <Box>
          <Row prop="gutter-small vgutter-less valign-middle">
            <Column prop="fit">
              <img class="avatar" width="80" src="@/assets/user.svg" alt="" />
            </Column>
            <Column>
              <h3 class="mt-0 mb-0">{{ user | displayName }}</h3>
              <span
                v-if="user.department"
                class="color-secondary font-large"
              >{{ user.department.name }}</span>
            </Column>
          </Row>
        </Box>
      </Column>
      <Column>
        <Box>
          <ul class="list-unstyle">
            <li
              v-for="review in reviews" :key="review.id"
              class="list-item"
            >
              <Review
                :review="review"
                :showReviewee="false"
                :hasExcerpt="false"
              />
            </li>
          </ul>
        </Box>
      </Column>
    </Row>
  </div>
</template>

<script>
import ReviewService from '@/middlewares/ReviewService';
import { Box, Review } from '@/components';
import { Row, Column } from '@/components/Loop';
import { displayName } from '@/utils';

export default {
  name: 'AdminReviews',
  components: {
    Box,
    Row,
    Column,
    Review,
  },
  filters: {
    displayName,
  },
  data() {
    return {
      user: null,
      reviews: [],
    };
  },
  async beforeMount() {
    const { revieweeId } = this.$route.params;
    const reviews = await ReviewService.view(revieweeId);
    if (reviews.success) {
      this.reviews = reviews.data.reviews;
      this.user = reviews.data.user;
    }
  },
};
</script>

<style scoped>
  .avatar {
    padding: 8px;
    display: block;
    border-radius: 50%;
    background-color: #f8f8f8;
    border: 1px solid #cdcdcd;
  }
  .list-item:not(:last-child)::after {
    margin-top: 2rem;
    margin-bottom: 2rem;
    display: block;
    content: '';
    border-top: 1px solid #eeeeee;
  }
</style>
