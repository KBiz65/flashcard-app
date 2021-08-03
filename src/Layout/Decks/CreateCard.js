import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router";
import Breadcrumb from "../Common/Breadcrumb";
import CardForm from "../Common/CardForm";
import { readDeck } from "../../utils/api";

function CreateCard() {
  const {
    params: { deckId },
  } = useRouteMatch();

  const [deck, setDeck] = useState({});

  // gets the deck information from the server
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

  return (
    <div>
      <Breadcrumb
        navArray={[
          { name: deck.name, url: `/decks/${deckId}` },
          { name: "Create Card" },
        ]}
      />
      <h2>
        {deck.name}: <span>Add Card</span>
      </h2>
      <CardForm />
    </div>
  );
}

export default CreateCard;
