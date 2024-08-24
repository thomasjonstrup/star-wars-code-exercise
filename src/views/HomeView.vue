<script setup lang="ts">
import GeneralButton from '@/components/GeneralButton.vue'
import CharacterCard from '@/components/CharacterCard.vue'

import { useStarWars } from '@/composables/useStarWars'
import HeroImage from '@/components/illustrations/HeroImage.vue'

const {
	data,
	error,
	isError,
	isPending,
	nextPage,
	prevPage,
	page,
	searchValue,
	filtered,
	gender,
	genders,
	updateFilter,
	resetFilters,
	hairColor,
	hairColors
} = useStarWars()
</script>

<template>
	<section class="md:grid md:grid-cols-2 items-center">
		<h1 className="text-center md:text-left text-3xl md:text-5xl lg:text-6xl font-bold py-8 dark:text-white">
			Star wars code exercise
		</h1>

		<HeroImage />
	</section>

	<section>
		<div class="flex flex-col md:flex-row pb-6 gap-4 md:justify-between">
			<div class="flex flex-col">
				<label for="search">Search</label>
				<input class="p-1 px-2 border rounded" id="search" v-model="searchValue" @input="(event) =>
					updateFilter('search', (event.target as HTMLInputElement).value ?? '')
					" />
			</div>
			<div class="flex flex-col">
				<label for="gender-select">Gender</label>
				<select v-model="gender" id="gender-select" class="border rounded p-1" @select="(event) =>
					updateFilter('gender', (event.target as HTMLInputElement).value ?? '')
					">
					<option disabled value="">Select gender</option>
					<option v-for="genderValue in genders" :key="genderValue">{{ genderValue }}</option>
				</select>
			</div>
			<div class="flex flex-col">
				<label for="hairColor-select">Hair Color</label>
				<select v-model="hairColor" id="hairColor-select" class="border rounded p-1" @select="(event) =>
					updateFilter('hairColor', (event.target as HTMLInputElement).value ?? '')
					">
					<option disabled value="">Select Hair color</option>
					<option v-for="hairColorValue in hairColors" :key="hairColorValue">
						{{ hairColorValue }}
					</option>
				</select>
			</div>

			<GeneralButton v-bind:on-click="resetFilters" class="self-end">Reset Filters</GeneralButton>
		</div>
		<p v-if="isPending" class="text-center">Loading...</p>
		<p v-else-if="isError" class="text-center">An error has occurred: {{ error }}</p>
		<p v-else-if="!isPending && (!filtered || (filtered && filtered.length === 0))" class="text-center">
			No items
		</p>
		<div v-else-if="filtered" class="grid grid-cols-1 auto-rows-fr md:grid-cols-2 lg:grid-cols-3 gap-6">
			<CharacterCard v-for="character in filtered" v-bind:character="character" :key="character.name" />
		</div>

		<div class="flex gap-2 justify-center mt-6 items-center">
			<GeneralButton v-bind:on-click="prevPage" v-bind:disabled="page <= 1">Prev</GeneralButton>
			<p class="dark:text-white">Current Page: {{ page }}</p>
			<GeneralButton v-bind:on-click="nextPage" v-bind:disabled="!data?.next">Next</GeneralButton>
		</div>
	</section>
</template>