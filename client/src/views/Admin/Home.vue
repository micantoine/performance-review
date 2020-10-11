<template>
  <div>
    <h1>Hi Admin</h1>
    <Row>
      <Column prop="span12 auto@sm span4@md">
        <Box :hasHeader="true">
          <template v-slot:header>
            <Button
              class="float-right"
              variant="primary tiny"
              label="Add"
              @onClick="addEmployee"
            />
            <h3 class="mt-0">Employees</h3>
          </template>
          <ul class="list-unstyle mb-0">
            <li
              v-for="employee in employees" :key="employee.id"
              class="employee list-item"
            >
              <router-link
                :to="{
                  name: 'admin-employee',
                  params: { employeeId: employee.id }
                }"
              >
              <Employee :user="employee" />
              </router-link>
            </li>
          </ul>
        </Box>
      </Column>
      <Column>
        <Box :hasHeader="true">
          <template v-slot:header>
            <h3 class="mt-0">Recent Reviews</h3>
          </template>
          <ul class="list-unstyle mb-0">
            <li
              v-for="review in reviews" :key="review.id"
              class="list-item"
            >
              <router-link
                :to="{
                  name: 'admin-review',
                  params: { revieweeId: review.id }
                }"
              >
                <Review :review="review" />
              </router-link>
            </li>
          </ul>
        </Box>
      </Column>
    </Row>
  </div>
</template>

<script>
import EmployeeService from '@/middlewares/EmployeeService';
import ReviewService from '@/middlewares/ReviewService';
import { Row, Column, Button } from '@/components/Loop';
import { Box, Employee, Review } from '@/components';

export default {
  name: 'AdminHome',
  components: {
    Button,
    Box,
    Column,
    Employee,
    Review,
    Row,
  },
  data() {
    return {
      employees: [],
      reviews: [],
    };
  },
  async mounted() {
    const employees = await EmployeeService.list();
    if (employees.success) {
      this.employees = employees.data;
    }
    const reviews = await ReviewService.list();
    if (reviews.success) {
      this.reviews = reviews.data;
    }
  },
  methods: {
    addEmployee() {
      this.$router.push({ name: 'add-employee' });
    },
  },
};
</script>

<style lang="scss" scoped>
  .list-item:not(:last-child)::after {
    margin-top: .8em;
    margin-bottom: .8em;
    display: block;
    content: '';
    border-top: 1px solid #eeeeee;
  }
  .employee a {
    position: relative;
    padding-right: 20px;
    display: flex;
    line-height: 1.2;
    &::after {
      position: absolute;
      top: 50%;
      right: 0;
      content: '';
      display: flex;
      width: 10px;
      height: 10px;
      border-top: 2px solid #cdcdcd;
      border-right: 2px solid #cdcdcd;
      transform: rotate(45deg) translateX(calc(-50% - 5px));
    }
  }
</style>
