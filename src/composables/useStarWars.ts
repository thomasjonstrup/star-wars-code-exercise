import { computed, ref, type Ref } from 'vue'
import { useQuery, keepPreviousData } from '@tanstack/vue-query'
import type { StarWarsCharacterApiResult, StarWarsFilmApiResult } from '@/utils/types'

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

  const fetchStarWarsFilms = async (): Promise<StarWarsFilmApiResult> =>
    await fetch(`https://swapi.dev/api/films`).then((response) => response.json())

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

  const { data: dataFilms } = useQuery<StarWarsFilmApiResult>({
    queryKey: ['films', page],
    queryFn: () => fetchStarWarsFilms(),
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
    const newList = data.value?.results.map((item) => {
      const listOfFilms = item.films.map((film) => {
        const texts = film.split('/').filter((item) => item)

        const text = texts[texts.length - 1]

        return dataFilms.value?.results.filter((item) => item.episode_id === Number(text))[0]?.title
      })
      return { ...item, films: listOfFilms }
    })

    if (searchValue.value) {
      const lowerCasedSearchValue = searchValue.value

      return newList?.filter((item) => {
        const lowerCasedValue = item.name.toLowerCase()
        return lowerCasedValue.includes(lowerCasedSearchValue)
      })
    }

    if (gender.value) {
      return newList?.filter((item) => item.gender.includes(gender.value))
    }

    if (hairColor.value) {
      return newList?.filter((item) => item.hair_color.includes(hairColor.value))
    }

    return newList
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
    hairColors
  }
}

export { useStarWars }
