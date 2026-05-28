export interface PokemonList {
    count:    number;
    next:     string;
    previous?: string;
    results:  PokemonApi[];
}

export interface PokemonApi {
    name: string;
    url:  string;
}

export interface PokemonInfo{
    id: number;
    name: string;
    url: string;
}
