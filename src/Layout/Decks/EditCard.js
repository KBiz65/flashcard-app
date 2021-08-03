import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { readDeck, readCard } from "../../utils/api";
import Breadcrumb from "../Common/Breadcrumb";
import CardForm from "../Common/CardForm";

function EditCard() {
  const {
    params: { deckId, cardId },
  } = useRouteMatch();
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});

  // gets the deck info and sets the deck
  useEffect(() => {
    const abortCtrl = new AbortController();
    readDeck(deckId, abortCtrl.signal)
      .then((deckToSet) => setDeck(deckToSet))
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.log(error);
        }
      });
    return () => {
      abortCtrl.abort();
    };
  }, [deckId]);

  // if the deck or cardId changes this will get the specific
  // card that is being edited and set it to the card variable
  useEffect(() => {
    const abortCtrl = new AbortController();
    readCard(cardId, abortCtrl.signal)
      .then((cardToEdit) => setCard(cardToEdit))
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.log(error);
        }
      });
    return () => {
      abortCtrl.abort();
    };
  }, [deck, cardId]);

  // only returns when the card has been set.
  if (card.id) {
    return (
      <div>
        <Breadcrumb
          navArray={[
            { name: deck.name, url: `decks/${deck.id}` },
            { name: `Edit Card ${cardId}` },
          ]}
        />
        <h2>
          Edit Card: <span>{deck.name}</span>
        </h2>
        <CardForm front={card.front} back={card.back} />
      </div>
    );
  } else {
    return "Loading...";
  }
}

export default EditCard;
