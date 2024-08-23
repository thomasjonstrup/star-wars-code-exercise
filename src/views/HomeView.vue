<script setup lang="ts">

import { useStarWars } from '@/composables/useStarWars';

const { data, error, isError, isPending, nextPage, prevPage, page, searchValue, filtered, gender, genders, resetFilters, hairColor, hairColors } = useStarWars();
</script>

<template>
  <section class="md:grid md:grid-cols-2">
    <h1 className="text-center md:text-left text-3xl md:text-5xl lg:text-6xl font-bold py-8">
      Star wars code exercise
    </h1>

    <img src="/Hero-image.svg" alt="Hero image" />
  </section>

  <section>
    <div class="flex flex-col md:flex-row pb-4 gap-4 md:justify-between">
      <input class="p-1 px-2 border rounded" v-model="searchValue">
      <select v-model="gender" class="border rounded p-1">
        <option disabled value="">Select gender</option>
        <option v-for="genderValue in genders" :key="genderValue">{{ genderValue }}</option>
      </select>
      <select v-model="hairColor" class="border rounded p-1">
        <option disabled value="">Select Hair color</option>
        <option v-for="hairColorValue in hairColors" :key="hairColorValue">{{ hairColorValue }}</option>
      </select>

      <button @click="resetFilters"
        class="bg-black text-white p-2 px-4 flex justify-center rounded dark:bg-white dark:text-black">
        ResetFilters
      </button>
    </div>
    <p v-if="isPending" class="text-center">Loading...</p>
    <p v-else-if="isError" class="text-center">An error has occurred: {{ error }}</p>
    <p v-else-if="!isPending && (!filtered || filtered && filtered.length === 0)" class="text-center">No items
    </p>
    <div v-else-if="filtered" class="grid grid-cols-1 auto-rows-fr md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="character in filtered" :key="character.name" class="flex flex-col rounded shadow p-6 bg-light-grey">
        <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {{ character.name }}
        </h2>

        <div class="grid grid-cols-2 pb-4 gap-2">
          <div>
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-width="2"
                d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            <p>{{ character.gender }}</p>
          </div>
          <div>
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
            </svg>

            <p>{{ character.birth_year }}</p>
          </div>
          <div>
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 7H7m2 3H7m2 3H7m4 2v2m3-2v2m3-2v2M4 5v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-9a1 1 0 0 1-1-1V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1Z" />
            </svg>
            <p>{{ character.height }}</p>
          </div>

          <div>
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-width="2"
                d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            <p>{{ character.hair_color }}</p>
          </div>
        </div>

        <p class="pb-1">Films:</p>
        <ul class="flex-1 pb-2">
          <li v-for="film in character.films" :key="film">{{ film }}</li>
        </ul>

        <div class="flex gap-2 items-center">
          <svg class="w-6 h-6 text-blueish-grey dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z" />
          </svg>
          <p class="text-blueish-grey">{{ new Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium',
          }).format(new Date(character.created))
            }}</p>
        </div>
      </div>
    </div>

    <div class="flex gap-2 justify-center mt-6 items-center">
      <button @click="prevPage" :disabled="page <= 1" :class="page <= 1 ? 'cursor-not-allowed opacity-80' : ''"
        class="bg-black text-white p-2 px-4 flex justify-center rounded dark:bg-white dark:text-black">Prev</button>
      <p>Current Page: {{ page }}</p>
      <button @click="nextPage" :disabled="!data?.next" :class="!data?.next ? 'cursor-not-allowed opacity-80' : ''"
        class="bg-black text-white p-2 px-4 flex justify-center rounded dark:bg-white dark:text-black">Next</button>
    </div>
  </section>

</template>