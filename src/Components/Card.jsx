import React from "react";
import logo from "./img.png";

const Card = ({ pokemon, loading, infoPoke }) => {
  console.log(pokemon);
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        pokemon.map((item, index) => {
          return (
            <div className="card" key={item.id} onClick={() => infoPoke(item)}>
              <h2>{item.id}</h2>
              <img src={item.sprites.front_default} alt="" />
              <h2>{item.name}</h2>
            </div>
          );
        })
      )}
    </>
  );
};

export default Card;
