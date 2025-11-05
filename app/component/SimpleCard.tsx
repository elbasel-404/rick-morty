import { Character } from "@schema";

interface CharacterCardProps {
  character: Character;
}
export const CharacterCard = ({ character }: CharacterCardProps) => {
  const {
    id,
    name,
    image,
    status,
    episode,
    gender,
    location,
    origin,
    species,
    type,
  } = character;

  return (
    <div className="character-card">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>Status: {status}</p>
      <p>Episode: {episode}</p>
      <p>Gender: {gender}</p>
      <p>Location Name: {location.name}</p>
      <p>Location Url: {location.url}</p>
      <p>Origin Name: {origin.name}</p>
      <p>Origin Url: {origin.url}</p>
      <p>Species: {species}</p>
      <p>Type: {type}</p>
    </div>
  );
};
