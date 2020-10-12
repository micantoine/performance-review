<template>
  <div class="container">
    <h1>Hi {{ name }}</h1>
    <Row>
      <Column prop="span12 auto@sm span4@md">
        <Box :hasHeader="true">
          <template v-slot:header>
            <h3 class="mt-0 mb-0">Pending Feedback</h3>
          </template>
          <div v-if="pendingFeedback">
          </div>
          <span v-else>No required reviews</span>
        </Box>
      </Column>
      <Column>
        <Box :hasHeader="true">
          <template v-slot:header>
            <h3 class="mt-0 mb-0">Past Reviews</h3>
          </template>
          <ul
            v-if="reviews"
            class="list-unstyle"
          >
            <li
              v-for="review in reviews" :key="review.id"
              class="list-item"
            >
              <Review
                :review="review"
                :hasExcerpt="false"
              />
            </li>
          </ul>
          <span v-else>No reviews made</span>
        </Box>
      </Column>
    </Row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ReviewService from '@/middlewares/ReviewService';
import { Box, Review } from '@/components';
import { Row, Column } from '@/components/Loop';
import { displayName } from '@/utils';

export default {
  name: 'Reviews',
  components: {
    Box,
    Row,
    Column,
    Review,
  },
  data() {
    return {
      reviews: [],
      pendingReviews: [],
    };
  },
  computed: {
    ...mapState([
      'user',
    ]),
    name() {
      return displayName(this.user);
    },
  },
  async beforeMount() {
    const reviews = await ReviewService.mine();
    if (reviews.success) {
      this.reviews = reviews.data;
    }
  },
};
</script>
