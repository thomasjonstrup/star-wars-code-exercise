import { computed, ref, type Ref } from 'vue'
import { useQuery, keepPreviousData } from '@tanstack/vue-query'
import type { Filter, StarWarsCharacterApiResult, StarWarsFilmApiResult } from '@/utils/types'
import { useRoute, useRouter } from 'vue-router'

const useStarWars = () => {
	const page = ref<number>(1)
	const searchValue = ref<string>('')
	const hairColor = ref<string>('')
	const gender = ref<string>('')

	const route = useRoute()
	const router = useRouter()

	if (route.query.search) {
		searchValue.value = route.query.search as string
	}
	if (route.query.hairColor) {
		hairColor.value = route.query.hairColor as string
	}
	if (route.query.page) {
		page.value = Number(route.query.page)
	}

	const updateFilter = (filter: string, value: string | number) => {
		router.push({
			name: route.name,
			query: {
				...route.query,
				[filter]: value
			}
		})
	}

	const fetchStarWarsPeople = async (
		pageSelected: Ref<number>
	): Promise<StarWarsCharacterApiResult> =>
		await fetch(`https://swapi.dev/api/people?page=${pageSelected.value}`).then((response) =>
			response.json()
		)

	const fetchStarWarsFilms = async (): Promise<StarWarsFilmApiResult> =>
		await fetch(`https://swapi.dev/api/films`).then((response) => response.json())

	const { data, isError, isFetched, isPending, error, isPlaceholderData } =
		useQuery<StarWarsCharacterApiResult>({
			queryKey: ['people', page],
			queryFn: () => fetchStarWarsPeople(page),
			placeholderData: keepPreviousData
		})

	const { data: dataFilms } = useQuery<StarWarsFilmApiResult>({
		queryKey: ['films', page],
		queryFn: () => fetchStarWarsFilms(),
		placeholderData: keepPreviousData
	})

	const prevPage = () => {
		if (data.value?.previous) {
			const pageValue = Math.max(page.value - 1, 1)
			page.value = pageValue
			updateFilter('page', pageValue)
		}
	}

	const nextPage = () => {
		if (!isPlaceholderData.value && data.value?.next) {
			const pageValue = page.value + 1
			page.value = pageValue
			updateFilter('page', pageValue)
		}
	}

	const resetFilters = () => {
		searchValue.value = ''
		gender.value = ''
		hairColor.value = ''

		router.replace({ name: route.name })
	}

	const filtered = computed(() => {
		const filteredList = data.value?.results.map((item) => {
			const listOfFilms = item.films
				.filter((item) => item)
				.map((film) => {
					const texts = film.split('/').filter((item) => item)

					const text = texts[texts.length - 1]

					return (
						dataFilms.value?.results.filter(
							(item) => item.episode_id === Number(text)
						)[0]?.title ?? ''
					)
				})
			return { ...item, films: listOfFilms }
		})

		const activeFilters: Filter[] = []

		if (searchValue.value) {
			activeFilters.push({ value: searchValue.value, type: 'search' })
		}

		if (gender.value) {
			activeFilters.push({ value: gender.value, type: 'gender' })
		}
		if (hairColor.value) {
			activeFilters.push({ value: hairColor.value, type: 'hairColor' })
		}

		if (activeFilters.length > 0) {
			return filteredList?.filter((filterItem) => {
				const check = activeFilters.filter((activeFilterItem) => {
					const lowerCasedSearchValue = activeFilterItem.value.toLowerCase()
					const lowerCasedValue = filterItem.name.toLowerCase()

					switch (activeFilterItem.type) {
						case 'search':
							return lowerCasedValue.includes(lowerCasedSearchValue)
						case 'hairColor':
							return activeFilterItem.value === filterItem.hair_color
						case 'gender':
							return activeFilterItem.value === filterItem.gender

						default:
							return true
					}
				})

				return check.length > 0 && check.length === activeFilters.length
			})
		}

		return filteredList
	})

	const genders = computed(() => {
		if (filtered.value) {
			return new Set(data.value?.results.map((item) => item.gender))
		}

		return []
	})

	const hairColors = computed(() => {
		if (filtered.value) {
			return new Set(data.value?.results.map((item) => item.hair_color))
		}

		return []
	})

	return {
		nextPage,
		prevPage,
		data,
		dataFilms,
		isError,
		isFetched,
		isPending,
		error,
		isPlaceholderData,
		page,
		searchValue,
		filtered,
		genders,
		gender,
		resetFilters,
		hairColor,
		hairColors,
		updateFilter
	}
}

export { useStarWars }
