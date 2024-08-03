<script setup lang="ts">
    import { useAuthStore } from '@/stores/authStore';

    const authStore = useAuthStore();

</script>

<template>
    <div class="py-4">
        <h1 class="mb-4 text-4xl">ColorBox</h1>
        <FormKit type="form"
                 @submit="authStore.login">
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
    </div>
</template>

<style lang="scss" scoped></style>