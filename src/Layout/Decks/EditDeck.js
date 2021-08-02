import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { readDeck } from "../../utils/api";
import Breadcrumb from "../Common/Breadcrumb";
import DeckForm from "./DeckForm";

function EditDeck() {
  const {
    params: { deckId },
  } = useRouteMatch();
  const [deck, setDeck] = useState({});

  useEffect(() => {
    const abortCtrl = new AbortController();
    readDeck(deckId, abortCtrl.signal)
      .then((response) => setDeck(response))
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.log(error);
        }
      });
    return () => {
      abortCtrl.abort();
    };
  }, [deckId]);

  if (deck.id) {
    return (
      <div>
        <Breadcrumb
          navArray={[
            { name: deck.name, url: `decks/${deck.id}` },
            { name: "Edit Deck" },
          ]}
        />
        <h2>Edit Deck</h2>
        <DeckForm name={deck.name} description={deck.description} />
      </div>
    );
  } else {
    return "Loading...";
  }
}

export default EditDeck;
