<script setup lang="ts">

  import { ref } from 'vue'
  import { FormKitNode } from '@formkit/core'

  const token = ref('');

  const dbURL = "https://x8ki-letl-twmt.n7.xano.io/api:VTauLUMK"

  async function login(formData: { email: string, password: string }, node: FormKitNode) {
    try {
      const response = await fetch(dbURL + "/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const { authToken } = await response.json();
      token.value = authToken;
    } catch (error) {
      node.setErrors({ email: 'Invalid email or password' });
    }
  }
</script>

<template>
  <h2>Welcome to colorbox</h2>
  <FormKit type="form"
           @submit="login">
    <FormKit type="email"
             label="Email"
             name="email"
             required
             validation="required" />
    <FormKit type="password"
             label="Password"
             name="password"
             required
             validation="required" />

  </FormKit>
  <pre>
    Logged in?:
    {{ !!token }}
  </pre>
</template>

<style lang="scss" scoped></style>
