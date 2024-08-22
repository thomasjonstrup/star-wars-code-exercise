export type StarWarsCharacter = {
	name: string,
	birth_year: string,
	created: string,
	eye_color: string,
	height: string,
	hair_color: string,
	gender: string,
	films: string[],
	species: string[],
	starShips: string[]
};

export type StarWarsCharacterApiResult = {
	count: number,
	next: string,
	previous: string,
	results: StarWarsCharacter[]
}
