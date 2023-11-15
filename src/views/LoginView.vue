<script setup>
import { ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';

const { handleSubmit, resetForm } = useForm();
const { value: username, errorMessage: userError } = useField('username', validateField);
const { value: password, errorMessage: passwordError } = useField('password', validatePassword);
const toast = useToast();

const submitCount = ref(0); // Adicionando a variável para controlar a ativação da validação.

function validateField(username) {
  if (!username) {
    return 'Name - Surname is required.';
  }

  return true;
}

function validatePassword(password) {
  if (!password) {
    return 'Password is required.';
  }

  return true;
}

const router = useRouter();

const onSubmit = handleSubmit((values) => {
  submitCount.value++; // Incrementar submitCount para ativar a validação
  if (values.username && values.username.length > 0 && values.password) {
    toast.add({ severity: 'info', summary: 'User Submitted', detail: values.username, life: 3000 });
    resetForm();

    // Redirecione para a página desejada após a submissão do formulário
    router.push('/MenuView'); // Substitua 'MenuView' pelo nome correto da sua rota
  }
})

</script>


<template>
  <div class="container">
    <Card style="width: 25em">
      <template #header>
        <ThemeSwitcher />
        <div class="flex justify-center">
          <img alt="user header" class="shadow-md2" src="https://primefaces.org/cdn/primevue/images/usercard.png" />
        </div>
      </template>
      <template #title>Advanced Card</template>
      <template #content>
        <Form @submit="onSubmit">
          <div class="p-field p-fluid">
            <span class="p-float-label">
                <InputText id="username" v-model="username" type="text" :class="{ 'invalid': userError }" aria-describedby="text-error" />
                <label for="username">User Name</label>
            </span>
            <small class="p-error user" id="text-error">{{ userError || '&nbsp;' }}</small>
          </div>

          <div class="p-field p-fluid">
            <span class="p-float-label">
              <Password id="password" v-model="password" type="text" :class="{ 'invalid': passwordError }" aria-describedby="text-error" toggleMask :feedback="false" />
              <label for="password">Password</label>
            </span>
            <small class="p-error pass" id="text-error">{{ passwordError || '&nbsp;' }}</small>
          </div>
          
          <Button type="submit" label="Submit" class="p-button-rounded p-button-primary" />
          
        </Form>
        <Toast/>
      </template>
    </Card>
  </div>
</template>



<style scoped>
.invalid {
  border: 2px solid rgba(240, 48, 48, 0.568);
  border-radius: 10px;
}
.user, .pass {
  padding-left: 11.6rem;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  min-height: 95vh;
}

.shadow-md2 {
  --tw-shadow: 0 0px 2px 0px rgba(0, 0, 0, 0.158), 0 0px 2px 0px rgba(0, 0, 0, 0.075);
  --tw-shadow-colored: 0 0px 4px 0px var(--tw-shadow-color), 0 0px 4px 0px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #7a7a7a00), var(--tw-ring-shadow, 0 0 #86868600), var(--tw-shadow);
  width: 24rem;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.041);
}
</style>
