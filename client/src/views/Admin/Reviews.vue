<template>
  <div>
    <h1>This is a Review page</h1>
  </div>
</template>

<script>
import ReviewService from '@/middlewares/ReviewService';
// import { Box, Review } from '@/components';

export default {
  name: 'AdminReviews',
  components: {
    // Box,
    // Review,
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
