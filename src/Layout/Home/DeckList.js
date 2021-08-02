import React from "react";
import DeckListItem from "./DeckListItem";

function DeckList({ decks }) {
  const deskList = decks.map((deck, index) => {
    return <DeckListItem key={index} deck={deck} />;
  });
  return deskList;
}

export default DeckList;
