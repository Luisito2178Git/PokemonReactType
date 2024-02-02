import react, { useEffect, useState } from "react";
// Librerias de Bootstrap
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import Figure from 'react-bootstrap/Figure';

// Llamando al Listado de Pokemons
import { getPokemon } from "../controller/getpokemon";
import { Pokemon } from "../models/pokemon.m";

const Listado=()=>{

        const [pokemons, setPokemons] = useState<Pokemon[]>([]);
        const [query, setQuery] = useState("");

        useEffect(()=>{
            const ObtenerTodos = async()=>{
                const allPokemons = await getPokemon();
                setPokemons(allPokemons);
            }
            ObtenerTodos();
        });

        const filtrarPokemon = pokemons?.slice(0,649).filter((pokemon)=>{
            return pokemon.name.toLowerCase().match(query.toLowerCase());
        });
    return(
        <>
            <h1 className="text-center">Pokemons 5ta generation</h1>
            <header className="w-25 p-3">
                <input  className="form-control mr-sm-2  my-5" value={query} placeholder="Buscar Pokemon" onChange={(event)=> setQuery(event.target.value.trim())} type="text"/>
            </header>
            <div className="content-wrap">
                <div className="content">
                    <div className="row gap-4">
                        {filtrarPokemon?.slice(0,649).map((pokemon)=>( 
                            <Card className="mx-auto" style={{ width: '18rem' }}>
                            <Card.Header className="text-center">Type: {pokemon.type} {pokemon.type2} </Card.Header>
                                <Card.Img width="80px" height="100px" variant="top" src= {pokemon.imggif} className="d-block mx-auto w-50"/>
                                <Card.Body>
                                    <Card.Title className="text-center">{pokemon.id} - {pokemon.name}</Card.Title>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <Figure.Image width={16} height={16} src="https://cdn-icons-png.flaticon.com/128/833/833472.png"/><b> HP:</b> {pokemon.hp} 
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Figure.Image width={16} height={16} src="https://cdn-icons-png.flaticon.com/512/3522/3522092.png"/><b> Attack:</b> {pokemon.attack}
                                            </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Figure.Image width={16} height={16} src="https://cdn-icons-png.flaticon.com/512/929/929429.png"/><b> Defense:</b> {pokemon.defense}
                                            </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Figure.Image width={16} height={16} src="https://cdn-icons-png.flaticon.com/512/1671/1671062.png"/><b> Special Attack:</b> {pokemon.sp_atk}
                                            </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Figure.Image width={16} height={16} src="https://cdn-icons-png.flaticon.com/512/1671/1671062.png"/><b> Special Defense:</b> {pokemon.sp_def}
                                            </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Figure.Image width={16} height={16} src="https://cdn-icons-png.flaticon.com/512/8853/8853763.png"/><b> Speed:</b> {pokemon.speed}
                                            </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </div>

            </div>
            
        </>
    );
}

export default Listado;