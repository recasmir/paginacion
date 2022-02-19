import { FetchAllPokemonResponse, Pokemon } from './../interfaces/pokemon.interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//el map me permite tomar una respuesta, un observable y regresar otra cosa dependiendo de mi necesidad.

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private url:string ='https://pokeapi.co/api/v2'
  
  constructor(private http: HttpClient) { }

  getAllPokemons():Observable<Pokemon[]>{

    //esto es un observable, que me va a devolver la información cuando alguien se suscriba a el.

    //el pipe permite definir todos los operadores de rxjs. En este caso el map. Lo que sea que retorne el map, es loq ue le va a llegar a quien consuma este fetch a API

    return this.http.get<FetchAllPokemonResponse>(`${this.url}/pokemon?limit=1500`)
    .pipe(
      map(this.transformSmallPokemonIntoPokemon)
    )
  }
    
  private transformSmallPokemonIntoPokemon(resp:FetchAllPokemonResponse):Pokemon[]{
   
  //este map no es de rxjs, es un metodo de un arreglo

    const pokemonList:Pokemon[] = resp.results.map(poke =>{

      //primero separamos el arreglo donde hay / para encontrar la posicion del id, 6.

      const urlArr=poke.url.split('/');
      const id=urlArr[6];
      const pic=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

      return {
        // id:id, esto seria lo que pondriamos pero es redundante, cuando tenemos una propiedad cuyo valor tiene el mismo nombre lo podemos dejar solo con la propiedad.
        id,
        pic,
        name:poke.name
      }
    })  
    
    return pokemonList;

    }
    
  
}
