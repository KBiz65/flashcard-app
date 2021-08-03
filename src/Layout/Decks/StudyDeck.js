import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { readDeck } from "../../utils/api";
import Breadcrumb from "../Common/Breadcrumb";
import StudyCard from "./StudyCard";

function StudyDeck() {
  const {
    params: { deckId },
  } = useRouteMatch();
  const [deck, setDeck] = useState([]);
  const [cards, setCards] = useState({});
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    const abortCtrl = new AbortController();
    async function getDeck() {
      setDeck(await readDeck(deckId, abortCtrl.signal));
    }
    getDeck();
  }, [deckId]);

  useEffect(() => {
    const abortCtrl = new AbortController();
    console.log(deck);
    if (deck.cards) {
      setCards({
        allCards: deck.cards,
      });
      setIndex(0);
    }

    return () => {
      abortCtrl.abort();
    };
  }, [deck]);

  if (index >= 0) {
    return (
      <div>
        <Breadcrumb
          navArray={[
            { name: deck.name, url: `decks/${deckId}` },
            { name: "Study" },
          ]}
        />
        <h2>Study: {deck.name}</h2>
        <StudyCard
          cards={cards}
          index={index}
          setIndex={setIndex}
          deckId={deckId}
        />
      </div>
    );
  } else {
    return "Loading...";
  }
}

export default StudyDeck;
