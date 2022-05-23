import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
const Main = () => {
  const [pokeData, setpokeData] = useState([]);
  const [loading, setloading] = useState();
  const [url, seturl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextUrl, setnextUrl] = useState();
  const [prevUrl, setprevUrl] = useState();
  const [pokeDex, setpokeDex] = useState();

  const pokefun = async () => {
    setloading(true);
    const res = await axios.get(url);
    setnextUrl(res.data.next);
    setprevUrl(res.data.previous);
    getPokemon(res.data.results);
    setloading(false);
  };

  const getPokemon = async (res) => {
    res.map(async (item) => {
      const res = await axios.get(item.url);
      setpokeData((state) => {
        state = [...state, res.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    });
  };

  useEffect(() => {
    pokefun();
  }, [url]);

  return (
    <div className="container">
      <div className="left-content">
        <Card
          pokemon={pokeData}
          loading={loading}
          infoPoke={(poke) => setpokeDex(poke)}
        />
        <div className="btn-group">
          {prevUrl && (
            <button
              onClick={() => {
                setpokeData([]);
                seturl(prevUrl);
              }}
            >
              previous
            </button>
          )}
          {nextUrl && (
            <button
              onClick={() => {
                setpokeData([]);
                seturl(nextUrl);
              }}
            >
              next
            </button>
          )}
        </div>
      </div>
      <div className="right-content">
        <Pokeinfo data={pokeDex} />
      </div>
    </div>
  );
};

export default Main;
