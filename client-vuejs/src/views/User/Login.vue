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
.loginSection {
	background: url('../../assets/img/common/sky.jpeg');
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 40% 60%;
	margin: auto;
	width: 720px;
	height: 370px auto;
	margin-top: 7em;
	left: 35%;
	text-align: center;
	display: flex;
	color: white;
	box-shadow: 3px 10px 20px 5px rgba(0, 0, 0, .5);
}

.loginForm {
	width: 580px;
	padding: 30px 0;
	background: rgba(20, 40, 40, .8);
	transition: .2s;
}

.loginForm>h2 {
	font-weight: 350;
	font-size: 27px;
	margin-bottom: 0.8em;
}

.loginForm fieldset {
  border: none;
}

input:not(.input-error) {
	border-left: 0.3em solid green;
}

.login input {
	flex: 0 1 100%;
	border-right: 1px solid;
	border-top: 1px solid;
	border-bottom: 1px solid;
	padding: 0.3em;

	border-top-right-radius: 0.3em;
	border-bottom-right-radius: 0.3em;
}

.login i {
	border: 1px solid;
	border-right: none;
	padding: 0.55em;
	border-top-left-radius: 0.3em;
	border-bottom-left-radius: 0.3em;
	background-color: #e9ecef;
}

#login-btn {
	border: 1px solid rgba(10, 180, 180, 1);
	background: rgba(20, 20, 20, .6);
	font-size: 18px;
	color: white;
	margin: 20px 0px;
	padding: 10px 43px;
	cursor: pointer;
	transition: .4s;
}

#login-btn:hover {
	background: rgba(20, 20, 20, .8);
	padding: 10px 80px;
}

#register-link {
	font-size: 18px;
	color: white;
	text-align: center;
	margin-bottom: 20px;
}

#register-link>a {
	font-size: 18px;
	font-weight: bold;
	color: aquamarine;
	margin-inline: 10px;
}

li ::marker{
  color: transparent;
}
</style>