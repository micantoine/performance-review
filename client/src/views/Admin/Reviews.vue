<template>
  <div>
    <h1>Perfomance Reviews</h1>
    <Row>
      <Column prop="span12 auto@sm span4@md">
        <Box :hasHeader="true">
          <template v-slot:header>
            <h3 class="mt-0">Reviewee</h3>
          </template>
          <Row prop="gutter-small vgutter-less valign-middle">
            <Column prop="fit">
              <img class="avatar" width="80" src="@/assets/user.svg" alt="" />
            </Column>
            <Column>
              <h3 class="mt-0 mb-0">{{ user | displayName }}</h3>
              <span
                v-if="user && user.department"
                class="color-secondary font-large"
              >{{ user.department.name }}</span>
            </Column>
          </Row>
        </Box>
        <Button
          class="mt-30"
          variant="primary full"
          label="Request Feedback"
          @onClick="toggleModal" />
        <p v-if="showDemoMessage && checkedEmployees.length"
          class="color-danger mt-10">
          As a demo this action is not being executed.<br>
          No invitation has been sent.
        </p>
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
    <VTransitionFade>
      <Modal
        v-if="showModal"
        @onConfirm="confirmRequest"
        @onClose="toggleModal">
        <ul
          v-if="employees.length"
          class="list-unstyle"
        >
          <li
            v-for="employee in employees"
            :key="employee.id"
            class="mb-15">
            <input
              v-model="checkedEmployees"
              data-oo-checkbox="large"
              type="checkbox"
              :id="`checkbox-${employee.id}`"
              :value="employee.id"
            />
            <label
              class="font-base"
              :for="`checkbox-${employee.id}`">
              {{ employee | displayName }}
            </label>
          </li>
        </ul>
      </Modal>
    </VTransitionFade>
  </div>
</template>

<script>
import ReviewService from '@/middlewares/ReviewService';
import EmployeeService from '@/middlewares/EmployeeService';
import {
  Box, Review, Modal, VTransitionFade
} from '@/components';
import { Row, Column, Button } from '@/components/Loop';
import { displayName } from '@/utils';

export default {
  name: 'AdminReviews',
  components: {
    Box,
    Button,
    Column,
    Modal,
    Review,
    Row,
    VTransitionFade,
  },
  filters: {
    displayName,
  },
  data() {
    return {
      user: null,
      reviews: [],
      showModal: false,
      employees: [],
      checkedEmployees: [],
      showDemoMessage: false,
    };
  },
  watch: {
    async showModal(val) {
      if (val && this.employees.length === 0) {
        const employees = await EmployeeService.list();
        if (employees.success) {
          this.employees = employees.data;
        }
      }
    },
  },
  async beforeMount() {
    const { revieweeId } = this.$route.params;
    const reviews = await ReviewService.view(revieweeId);
    if (reviews.success) {
      this.reviews = reviews.data.reviews;
      this.user = reviews.data.user;
    }
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },
    confirmRequest() {
      this.showModal = !this.showModal;
      this.showDemoMessage = this.checkedEmployees.length;
    },
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
