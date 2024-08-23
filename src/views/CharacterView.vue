<script setup lang="ts">
import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import type { StarWarsCharacter } from '@/utils/types'

const route = useRoute()

const fetchStarWarsPeople = async (pageSelected: string): Promise<StarWarsCharacter> =>
	await fetch(`https://swapi.dev/api/people/${pageSelected}`).then((response) => response.json())

const id = route.params.id as string
const { data, isError, isPending, error } =
	useQuery<StarWarsCharacter>({
		queryKey: ['person', route.params.id],
		queryFn: () => fetchStarWarsPeople(id),
		placeholderData: keepPreviousData
	})
</script>

<template>
	<section class="md:grid md:grid-cols-2 items-center">
		<p v-if="isPending" class="text-center">Loading...</p>
		<p v-else-if="isError" class="text-center">An error has occurred: {{ error }}</p>
		<p v-else-if="!isPending && !data?.name" class="text-center">No character found</p>
		<h1 v-else-if="data?.name"
			className="text-center md:text-left text-3xl md:text-5xl lg:text-6xl font-bold py-8 dark:text-white">
			{{ data.name }}
		</h1>
		<!--     <HeroImage /> -->
	</section>
</template>