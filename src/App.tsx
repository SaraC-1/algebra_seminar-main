import React, { useState, useEffect, useRef } from 'react';
import './styles/styles.scss';
import pikachur from "./assets/pikachu-right.png";
import pikachul from "./assets/pikachu-left.png";
import Messages from './components/messages';
import Input from './components/input';

declare global {
  interface Window {
    Scaledrone: any;
  }
}

function randomName() {
  const PokemonNature = [
    "adamant", "bold", "brave", "calm", "careful", "docile", "gentle",
    "hardy", "hasty", "impish", "jolly", "lax", "lonely", "mild", "modest",
    "naive", "quiet", "quirky", "rash", "relaxed", "sassy", "serious",
    "timid"
  ];
  const PokemonGen1 = [
    "Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard",
    "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree",
    "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot", "Rattata",
    "Raticate", "Spearow", "Fearow", "Ekans", "Arbok", "Pikachu", "Raichu",
    "Sandshrew", "Sandslash", "Nidoran♀", "Nidorina", "Nidoqueen", "Nidoran♂",
    "Nidorino", "Nidoking", "Clefairy", "Clefable", "Vulpix", "Ninetales",
    "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume",
    "Paras", "Parasect", "Venonat", "Venomoth", "Diglett", "Dugtrio", "Meowth",
    "Persian", "Psyduck", "Golduck", "Mankey", "Primeape", "Growlithe", "Arcanine",
    "Poliwag", "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop",
    "Machoke", "Machamp", "Bellsprout", "Weepinbell", "Victreebel", "Tentacool",
    "Tentacruel", "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash", "Slowpoke",
    "Slowbro", "Magnemite", "Magneton", "Farfetch'd", "Doduo", "Dodrio", "Seel",
    "Dewgong", "Grimer", "Muk", "Shellder", "Cloyster", "Gastly", "Haunter",
    "Gengar", "Onix", "Drowzee", "Hypno", "Krabby", "Kingler", "Voltorb",
    "Electrode", "Exeggcute", "Exeggutor", "Cubone", "Marowak", "Hitmonlee",
    "Hitmonchan", "Lickitung", "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey",
    "Tangela", "Kangaskhan", "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu",
    "Starmie", "Mr. Mime", "Scyther", "Jynx", "Electabuzz", "Magmar", "Pinsir",
    "Tauros", "Magikarp", "Gyarados", "Lapras", "Ditto", "Eevee", "Vaporeon",
    "Jolteon", "Flareon", "Porygon", "Omanyte", "Omastar", "Kabuto", "Kabutops",
    "Aerodactyl", "Snorlax", "Articuno", "Zapdos", "Moltres", "Dratini", "Dragonair",
    "Dragonite", "Mewtwo", "Mew"
  ];
  const adjective = PokemonNature[Math.floor(Math.random() * PokemonNature.length)];
  const noun = PokemonGen1[Math.floor(Math.random() * PokemonGen1.length)];
  return adjective + noun;
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<{ member: any; text: any; }[]>([]);
  const [member, setMember] = useState({
    username: randomName(),
    color: randomColor(),
    id: ''
  });

  const droneRef = useRef<any>(null);

  useEffect(() => {
    const drone = new window.Scaledrone("CnHMJ9mC2bzJsEsa", {
      data: member
    });

    drone.on('open', (error: any) => {
      if (error) {
        return console.error(error);
      }
      const updatedMember = { ...member };
      updatedMember.id = drone.clientId;
      setMember(updatedMember);
    });

    const room = drone.subscribe("observable-room");
    room.on('data', (data: any, member: any) => {
      setMessages(prevMessages => [...prevMessages, { member, text: data }]);
    });

    droneRef.current = drone;

    return () => {
      drone.close();
    };
  }, []);

  const onSendMessage = (message: string) => {
    if (droneRef.current) {
      droneRef.current.publish({
        room: "observable-room",
        message
      });
    }
  };

  return (
    <div className="app">
      <div className="header">
        <img src={pikachur} alt="Pikachu" />
        <h1>Pokemon Trainer Chat</h1>
        <img src={pikachul} alt="Pikachu" />
      </div>
      <Messages messages={messages} currentMember={member} />
      <Input onSendMessage={onSendMessage} />
    </div>
  );
}

export default App;