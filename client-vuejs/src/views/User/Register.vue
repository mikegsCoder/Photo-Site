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
.signupForm fieldset {
  border: none;
}

input:not(.input-error) {
  border-left: 0.3em solid green;
}

.register input {
  flex: 0 1 100%;
  border-right: 1px solid;
  border-top: 1px solid;
  border-bottom: 1px solid;
  padding: 0.3em;

  border-top-right-radius: 0.3em;
  border-bottom-right-radius: 0.3em;
}

.register i {
  border: 1px solid;
  border-right: none;
  padding: 0.55em;
  border-top-left-radius: 0.3em;
  border-bottom-left-radius: 0.3em;
  background-color: #e9ecef;
}

.signupSection {
  background: url('../../assets/img/common/sky.jpeg');
  background-repeat: no-repeat;
  background-position: 40% 60%;
  background-size: cover;
  margin: auto;
  width: 740px;
  height: 590px auto;
  margin-top: 2em;
  margin-bottom: 2em;
  left: 35%;
  text-align: center;
  display: flex;
  color: white;
  box-shadow: 3px 10px 20px 5px rgba(0, 0, 0, .5);
}

.signupForm {
  width: 540px;
  padding: 30px 0;
  background: rgba(20, 40, 40, .8);
  transition: .2s;
}

.signupForm>h2 {
  font-weight: 350;
  font-size: 27px;
  margin-bottom: 0.8em;
}

fieldset>h2 {
  margin: 1rem;
}

#join-btn {
  border: 1px solid rgba(10, 180, 180, 1);
  background: rgba(20, 20, 20, .6);
  font-size: 18px;
  color: white;
  margin: 20px 0px;
  padding: 10px 43px;
  cursor: pointer;
  transition: .4s;
}

#join-btn:hover {
  background: rgba(20, 20, 20, .8);
  padding: 10px 80px;
}

#login-link {
  font-size: 18px;
  color: white;
  text-align: center;
  margin-bottom: 20px;
}

#login-link>a {
  font-size: 18px;
  font-weight: bold;
  color: aquamarine;
  margin-inline: 10px;
}

li ::marker{
  color: transparent;
}
</style>
