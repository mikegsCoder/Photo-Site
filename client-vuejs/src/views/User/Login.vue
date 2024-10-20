<script setup>
import { computed, reactive, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { email, helpers, minLength, required } from '@vuelidate/validators';
import { useRouter } from 'vue-router';
import { loginUser } from '../../dataProviders/auth';
import { useUserStore } from '../../stores/userStore';
import Message from 'primevue/message';
import FormItem from '../../components/FormItem.vue';
import Loader from '../../components/Loader.vue';

const router = useRouter();
const userStore = useUserStore();
const isLoading = ref(false);
const data = ref({});

const user = {
  email: '',
  password: '',
};

const formData = reactive({ ...user });

const rules = computed(() => ({
  email: { 
    required: helpers.withMessage('Email is required.', required), 
    email: helpers.withMessage('Invalid email provided.', email)},
  password: {
    required: helpers.withMessage('Password is required.', required),
    minLength: helpers.withMessage('Password should be at least 4 characters long.', minLength(4)),
  },
}));

const v$ = useVuelidate(rules, formData);

async function onSubmit() {
	isLoading.value = true;
  const isValid = await v$.value.$validate();

  if (isValid) {
    data.value = {};
    data.value = await loginUser(formData);
    
    if (data.value.message) {
      console.log(data.value.message);
    } else {
      userStore.setProfile(data.value);
      router.push('/');
    }
    
    isLoading.value = false;
  }
}
</script>

<template>
  <section id="login-page">
    
    <div class="loginSection">
			<div class="info">
				<h2>Welcome, again!</h2>
				<p>View new posts.</p>
			</div>
      <Loader v-if="isLoading" />
			<form @submit.prevent="onSubmit" action="" class="loginForm">
				<fieldset>
          <Message 
            v-if="data.message" 
            severity="error" 
            :life="4000"
          >
            {{ data.message }}
          </Message>
          <h2>Login</h2>
				  <ul class="noBullet">
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
					<li id="center-btn">
						<button 
							type="submit" 
							id="login-btn" 
							:loading="isLoading"
            	:disabled="isLoading"
						>
							Login
						</button>
					</li>
					<li id="register-link">
						Don't have an account?
						<RouterLink to="/register">
              Register
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