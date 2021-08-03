import React from "react";
import CardListItem from "./CardListItem";

function CardList({ cards }) {
  // sends each card in the cards array to the CardListItem to
  // be created.
  const cardList = cards.map((card, index) => {
    return <CardListItem key={index} card={card} />;
  });

  return cardList;
}

export default CardList;
