<template>
  <div class="container clearfix">
    <Box>
      <h1 class="text-center mt-0 mb-30">Register<br>New Employee</h1>
      <Row prop="gutter-small">
        <Column prop="span12 auto@sm">
          <label for="input-firstname">
            Firstname
            <small class="color-secondary">(Optional)</small>
          </label>
          <Input
            class="mb-10"
            id="input-firstname"
            type="text"
            v-model="firstname" />
        </Column>
        <Column>
          <label for="input-lastname">
            Lastname
            <small class="color-secondary">(Optional)</small>
          </label>
          <Input
            class="mb-10"
            id="input-lastname"
            type="text"
            v-model="lastname" />
        </Column>
      </Row>

      <label for="input-email">Email</label>
      <Input
        class="mb-10"
        id="input-email"
        type="email"
        :variant="emailStatus"
        v-model="email"
        required />

      <label for="input-password">Password</label>
      <Input
        class="mb-10"
        id="input-password"
        type="password"
        :variant="passwordStatus"
        v-model="password"
        required />

      <label for="input-department">
        Department
        <small class="color-secondary">(Optional)</small>
      </label>
      <div data-oo-select>
        <select
          v-model="departmentId"
          class="mb-30">
          <option disabled :value="null">Please select a Department</option>
          <option
            v-for="department in departments"
            :key="`department-${department.id}`"
            :value="department.id"
          >{{ department.name }}</option>
        </select>
      </div>

      <Button
        class="mb-5"
        variant="primary full"
        label="Create"
        @onClick="create" />
      <Button
        variant="secondary full"
        label="Cancel"
        @onClick="cancel" />
      <ul
        v-if="messages"
        class="font-tiny color-danger mt-15 mb-0">
        <li v-for="message in messages" :key="message.context">
          {{ message.message.join(', ') }}
        </li>
      </ul>
    </Box>
  </div>
</template>

<script>
import EmployeeService from '../../middlewares/EmployeeService';
import DepartmentService from '../../middlewares/DepartmentService';
import Box from '../../components/Box.vue';
import {
  Button, Input, Column, Row
} from '../../components/Loop';

export default {
  name: 'AddEmployee',
  components: {
    Box,
    Button,
    Column,
    Input,
    Row,
  },
  data() {
    return {
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      departmentId: null,
      messages: [],
      departments: [],
    };
  },
  computed: {
    emailStatus() {
      return this.messages.filter(message => message.context === 'email')[0] ? 'danger' : '';
    },
    passwordStatus() {
      return this.messages.filter(message => message.context === 'password')[0] ? 'danger' : '';
    },
  },
  async mounted() {
    const response = await DepartmentService.list();
    if (response.success) {
      this.departments = response.data;
    }
  },
  methods: {
    async create() {
      const response = await EmployeeService.create({
        email: this.email,
        password: this.password,
        firstname: this.firstname,
        lastname: this.lastname,
        departmentId: this.departmentId,
      });

      if (response.success) {
        this.$router.push('/admin');
      }

      if (response.error) {
        this.messages = response.messages;
      }
    },
    cancel() {
      this.$router.push('/admin');
    },
  },
};
</script>

<style scoped>
  .box {
    margin-top: 10vh;
    margin-left: auto;
    margin-right: auto;
    max-width: 500px;
  }
</style>
