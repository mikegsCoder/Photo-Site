<script setup>
import { computed, reactive, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { email, helpers, minLength, required, sameAs } from '@vuelidate/validators';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../stores/userStore';
import { registerUser } from '../../dataProviders/auth';
import Message from 'primevue/message';
import FormItem from '../../components/FormItem.vue';
import Loader from '../../components/Loader.vue';

const user = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  rePassword: '',
};

const formData = reactive({ ...user });

const router = useRouter();
const userStore = useUserStore();
const isLoading = ref(false);
const data = ref({});

const rules = computed(() => ({
  firstName: {
    required: helpers.withMessage('First Name is required.', required),
    minLength: helpers.withMessage('First Name should be at least 3 characters long.', minLength(3)),
  },
  lastName: {
    required: helpers.withMessage('Last Name is required.', required),
    minLength: helpers.withMessage('Last Name should be at least 5 characters long.', minLength(5)),
  },
  email: { 
    required: helpers.withMessage('Email is required.', required), 
    email: helpers.withMessage('Invalid email provided.', email)},
  password: {
    required: helpers.withMessage('Password is required.', required),
    minLength: helpers.withMessage('Password should be at least 4 characters long.', minLength(4)),
  },
  rePassword: { 
    required: helpers.withMessage('Confirm Password is required.', required), 
    sameAs: helpers.withMessage('Passwords don\'t match.', sameAs(formData.password)) 
  },
}));

const v$ = useVuelidate(rules, formData);

async function onSubmit() {
  const isValid = await v$.value.$validate();
  // console.log(`Is form valid: ${isValid}`)
  
  if (isValid) {
    data.value = {};
    isLoading.value = true;
    data.value = await registerUser(formData);

    if (data.value.message) {
      console.log(data.value.message);
    } else {
      userStore.setProfile(data.value);
      router.push('/');
    }
    // if (userData) {
    //   userStore.setProfile(userData);
    //   router.push('/');
    // }
    isLoading.value = false;
  }
};
</script>

<template>
  <section id="register-page">
    <div class="signupSection">
      <div class="info">
        <h2>To discover and share knowledge about the environment in order to preserve and enrich life.</h2>
      </div>
      <Loader v-if="isLoading" />
      <form class="signupForm" action="" @submit.prevent="onSubmit">
        <fieldset>
          <Message 
            v-if="data.message" 
            severity="error" 
            :life="4000"
          >
            {{ data.message }}
          </Message>
          <h2>Register</h2>
          <ul class="noBullet">
            <!-- first name -->
            <li>
              <FormItem 
                :v$="v$" 
                field="firstName" 
                label="First Name" 
                required
              >
                <input
                  class="inputFields" 
                  id="first-name" 
                  v-model="formData.firstName" 
                  placeholder="Peter"
                />
              </FormItem>
            </li>

            <!-- last name -->
            <li>
              <FormItem 
                :v$="v$" 
                field="lastName" 
                label="Last Name" 
                required
              >
                <input 
                  class="inputFields" 
                  id="last-name" 
                  v-model="formData.lastName" 
                  placeholder="Petrov"
                />
              </FormItem>
            </li>

            <!-- email -->
            <li>
              <FormItem 
                :v$="v$" 
                field="email" 
                label="Email" 
                required
              >
                <input 
                  class="inputFields"
                  id="email" 
                  v-model="formData.email" 
                  placeholder="alex@gmail.com"
                />
              </FormItem>
            </li>

            <!-- password -->
            <li>
              <FormItem 
                :v$="v$" 
                field="password" 
                label="Password" 
                required
              >
                <input 
                  class="inputFields" 
                  id="password" 
                  placeholder="******"
                  v-model="formData.password" 
                  type="password" 
                  toggle-mask
                />
              </FormItem>
            </li>

            <!-- rePassword -->
            <li>
              <FormItem 
                :v$="v$" 
                field="rePassword" 
                label="Confirm Password" 
                required
              >
                <input 
                  class="inputFields"
                  id="rePassword" 
                  placeholder="******"
                  v-model="formData.rePassword" 
                  type="password"
                  toggle-mask
                />
              </FormItem>
            </li>

            <li id="center-btn">
              <button 
                type="submit" 
                id="join-btn"
              >
                Register
              </button>
            </li>

            <li id="login-link">
              Have an account?
              <RouterLink to="/login">
                Login
              </RouterLink>
            </li>
          </ul>
        </fieldset>
      </form>
    </div>
  </section>
</template>

<style scoped>
</style>
