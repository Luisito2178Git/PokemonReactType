import { Pokemon } from "../models/pokemon.m";

export async function getPokemon(): Promise<Pokemon[]>{
    // Llamada a la API REST
    // API FETCH La API Fetch proporciona una interfaz JS para acceder y manipular parte del canal HTTP, tales como peticiones y respuestas
    const response = await fetch("https://unpkg.com/pokemons@1.1.0/pokemons.json");

    const datos  = await response.json();
    const pokemons = datos.results.map((pokemon:any) => ({
        name: pokemon.name,
        id: pokemon.national_number,
        imggif: CorregirNombre(pokemon.sprites['animated']),
        imglarge: CorregirNombre(pokemon.sprites['large']),
        imgnormal: CorregirNombre(pokemon.sprites['normal']),
        type: pokemon.type[0],
        type2: pokemon.type[1],
        total: pokemon.total,
        hp: pokemon.hp,
        attack: pokemon.attack,
        defense: pokemon.defense,
        sp_atk: pokemon.sp_atk,
        sp_def: pokemon.sp_def,
        speed: pokemon.speed,
    }));

    const unicosPokemons = pokemons.filter(
        (pokemon:any,index:number)=>
        pokemons.findIndex((other:any) => other.id === pokemon.id) === index
    );

    return unicosPokemons;

}

// Corregir los nombres de los pokemon
export function CorregirNombre(name: string): string{
    if (name.includes("farfetch'd")){
        return name.replace("farfetch'd","farfetchd");
    }else if (name.includes("mr.-mime")){
        return name.replace("mr.-mime","mr-mime");
    }else if (name.includes("♂")){
        return name.replace("♂","-m");
    }else if (name.includes("♀")){
        return name.replace("♀","-f");
    }else{
        return name;
    }
}




