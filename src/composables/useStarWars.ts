import { computed, ref, type Ref } from 'vue'
import { useQuery, keepPreviousData } from '@tanstack/vue-query'
import type { StarWarsCharacterApiResult } from '@/utils/types'

const useStarWars = () => {
  const page = ref<number>(1)
  const searchValue = ref<string>('')
  const hairColor = ref<string>('')
  const gender = ref<string>('')

  const fetchStarWarsPeople = async (
    pageSelected: Ref<number>
  ): Promise<StarWarsCharacterApiResult> =>
    await fetch(`https://swapi.dev/api/people?page=${pageSelected.value}`).then((response) =>
      response.json()
    )

  const { data, isError, isFetched, isPending, error, isPlaceholderData } =
    useQuery<StarWarsCharacterApiResult>({
      queryKey: ['people', page],
      queryFn: () => fetchStarWarsPeople(page),
      placeholderData: keepPreviousData
      /* 	initialData : {
		count: 0,
		next: null,
		previous: null,
		results: []
	} */
    })

  const prevPage = () => {
    if (data.value?.previous) {
      page.value = Math.max(page.value - 1, 1)
    }
  }

  const nextPage = () => {
    if (!isPlaceholderData.value && data.value?.next) {
      page.value = page.value + 1
    }
  }

  const resetFilters = () => {
    searchValue.value = ''
    gender.value = ''
    hairColor.value = ''
  }

  const filtered = computed(() => {
    if (searchValue.value) {
      return data.value?.results.filter((item) => item.name.includes(searchValue.value))
    }

    if (gender.value) {
      return data.value?.results.filter((item) => item.gender.includes(gender.value))
    }

    if (hairColor.value) {
      return data.value?.results.filter((item) => item.hair_color.includes(hairColor.value))
    }

    return data.value?.results
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
    hairColors
  }
}

export { useStarWars }
