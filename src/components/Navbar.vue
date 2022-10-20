<script setup lang="ts">

</script>

<template>
  <nav class="flex items-center h-20 bg-neutral-900 text-gray-50 px-10 text-md">
    <div class="container flex items-center justify-between mx-auto">
      <RouterLink to="/" class="flex flex-row items-center gap-2 router-link">
        <img src="../assets/vue.svg" alt="Vue logo">
        <span class="text-2xl font-semibold pt-1">Vue typing</span>
      </RouterLink>
      <RouterLink to="/leaderboards" class="pt-2 router-link">
        Leaderboards
      </RouterLink>
      <div class="flex pt-2 gap-6">
        <RouterLink to="/sign_in" class="router-link pt-2">
          Log In
        </RouterLink>
        <RouterLink to="/sign_up" class="hover:bg-green-500 hover:text-neutral-800 font-semibold 
        transition-all duration-150 border-2 border-green-500 rounded-lg px-4 py-1">
          Sign Up
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>

