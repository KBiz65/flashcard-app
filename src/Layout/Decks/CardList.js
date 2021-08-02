import React from "react";
import CardListItem from "./CardListItem";

function CardList({ cards }) {
  const cardList = cards.map((card, index) => {
    return <CardListItem key={index} card={card} />;
  });

  return cardList;
}

export default CardList;
