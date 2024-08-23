<script setup lang="ts">
import type { StarWarsCharacter } from '@/utils/types'

const props = defineProps<{
	character: StarWarsCharacter
}>()

const splits = props.character.url.split('/').filter((item) => item)
const linkId = splits[splits.length - 1]
const route = `/character/${linkId}`
</script>

<template>
	<RouterLink
		v-bind:to="route"
		class="flex flex-col rounded shadow p-6 bg-light-grey dark:bg-slate-700"
	>
		<h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			{{ character.name }}
		</h2>

		<div class="grid grid-cols-2 pb-4 gap-2">
			<div>
				<svg
					class="w-6 h-6 text-gray-800 dark:text-white"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					fill="none"
					viewBox="0 0 24 24"
				>
					<path
						stroke="currentColor"
						stroke-width="2"
						d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
					/>
				</svg>
				<p class="text-gray-800 dark:text-white">{{ character.gender }}</p>
			</div>
			<div>
				<svg
					class="w-6 h-6 text-gray-800 dark:text-white"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					fill="none"
					viewBox="0 0 24 24"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
					/>
				</svg>

				<p class="text-gray-800 dark:text-white">{{ character.birth_year }}</p>
			</div>
			<div>
				<svg
					class="w-6 h-6 text-gray-800 dark:text-white"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					fill="none"
					viewBox="0 0 24 24"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 7H7m2 3H7m2 3H7m4 2v2m3-2v2m3-2v2M4 5v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-9a1 1 0 0 1-1-1V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1Z"
					/>
				</svg>
				<p class="text-gray-800 dark:text-white">{{ character.height }}</p>
			</div>

			<div>
				<svg
					class="w-6 h-6 text-gray-800 dark:text-white"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					fill="none"
					viewBox="0 0 24 24"
				>
					<path
						stroke="currentColor"
						stroke-width="2"
						d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
					/>
				</svg>
				<p class="text-gray-800 dark:text-white">{{ character.hair_color }}</p>
			</div>
		</div>

		<p class="pb-1 text-gray-800 dark:text-white">Films:</p>
		<ul class="flex-1 pb-2">
			<li v-for="film in character.films" class="text-gray-800 dark:text-white" :key="film">
				{{ film }}
			</li>
		</ul>

		<div class="flex gap-2 items-center">
			<svg
				class="w-6 h-6 text-blueish-grey dark:text-white"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
				/>
			</svg>
			<p class="text-blueish-grey dark:text-white">
				{{
					new Intl.DateTimeFormat('en-US', {
						dateStyle: 'medium'
					}).format(new Date(character.created))
				}}
			</p>
		</div>
	</RouterLink>
</template>
