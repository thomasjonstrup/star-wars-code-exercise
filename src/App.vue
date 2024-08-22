<script setup lang="ts">
import '@fontsource-variable/inter';
import { RouterView } from 'vue-router'
</script>

<template>
  <header class="container lg:p-20 mx-auto flex flex-wrap items-center justify-between p-4">
    <RouterLink to="/"><img src="/Logo.svg" alt="Star wars exercise logo" /></RouterLink>
    <button class="bg-black text-white p-2 px-4 flex justify-center rounded">
      <svg class="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
        height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M12 21a9 9 0 0 1-.5-17.986V3c-.354.966-.5 1.911-.5 3a9 9 0 0 0 9 9c.239 0 .254.018.488 0A9.004 9.004 0 0 1 12 21Z" />
      </svg>

    </button>
  </header>

  <main class="container p-6 lg:p-8 mx-auto">
    <RouterView />
  </main>

  <!--   <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->


  <footer class="mx-auto mt-0 w-full bg-black p-6 text-white dark:bg-gray-900">
    <div class="flex max-w-screen-xl justify-between sm:text-left">
      <p class="text-xs">2024 by Thomas Jonstrup</p>
    </div>
  </footer>
</template>