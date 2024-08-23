export type StarWarsCharacter = {
  name: string
  birth_year: string
  created: string
  eye_color: string
  height: string
  hair_color: string
  gender: string
  films: string[]
  species: string[]
  starShips: string[]
}

export type StarWarsFilm = {
  title: string
  episode_id: number
}

export type BaseApiResult = {
  count: number
  next: string
  previous: string
}

export type StarWarsCharacterApiResult = {
  results: StarWarsCharacter[]
} & BaseApiResult

export type StarWarsFilmApiResult = {
  results: StarWarsFilm[]
} & BaseApiResult
