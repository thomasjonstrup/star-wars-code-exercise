<script setup lang="ts">
import type { StarWarsCharacter } from '@/utils/types';

import { formatDateString } from '@/utils/helpers';
import IconHeart from './icons/IconHeart.vue';
import IconMeasure from './icons/IconMeasure.vue';
import IconCalendar from './icons/IconCalendar.vue';
import IconPerson from './icons/IconPerson.vue';

const props = defineProps<{
	character: StarWarsCharacter
}>()

const splits = props.character.url.split('/').filter((item) => item)
const linkId = splits[splits.length - 1]
const route = `/character/${linkId}`
</script>

<template>
	<RouterLink v-bind:to="route" class="flex flex-col rounded shadow p-6 bg-light-grey dark:bg-slate-700">
		<h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			{{ character.name }}
		</h2>

		<div class="grid grid-cols-2 pb-4 gap-2">
			<div>
				<IconPerson />
				<p class="text-gray-800 dark:text-white">{{ character.gender }}</p>
			</div>
			<div>
				<IconHeart />

				<p class="text-gray-800 dark:text-white">{{ character.birth_year }}</p>
			</div>
			<div>
				<IconMeasure />
				<p class="text-gray-800 dark:text-white">{{ character.height }}</p>
			</div>

			<div>
				<IconPerson />
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
			<IconCalendar />
			<p class="text-blueish-grey dark:text-white">
				{{
					formatDateString(character.created)
				}}
			</p>
		</div>
	</RouterLink>
</template>