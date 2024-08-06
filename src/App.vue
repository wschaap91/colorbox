<script setup lang="ts">

  import { watch } from 'vue'
  import useGlobalRouter from '@/router/globalRouterInstance'
  import { useRouter } from 'vue-router'
  import initRefreshStore from '@s/_initRefreshStores'
  initRefreshStore()

  const { gRouter } = useGlobalRouter()
  const router = useRouter()
  gRouter.value = router

  import { useAuthStore } from './stores/authStore';
  const authStore = useAuthStore()

  import { refreshStore } from '@/utilities/mapApiStore'


  watch(() => authStore.token, (newToken, oldToken) => {
    if (oldToken !== '' && newToken === '') {
      router.push({ name: 'login' })
    }
    if (newToken !== '') {
      console.log('fetching me')
      refreshStore('me');
    }
  }, { immediate: true })



</script>

<template>
  <div class="h-dvh bg-slate-50">
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>