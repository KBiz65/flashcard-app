import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { listDecks } from "../../utils/api";
import DeckList from "./DeckList";

function Home() {
  const history = useHistory();
  const [allDecks, setAllDecks] = useState([]);

  function handleButtonClick(event) {
    event.preventDefault();
    switch (event.target.name) {
      case "createDeck":
        history.push(`/decks/new`);
        break;
      case "viewDeck":
        history.push(
          `/decks/${event.target.parentNode.parentNode.parentNode.id}`
        );
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    const abortCtrl = new AbortController();
    async function showDecks() {
      setAllDecks(await listDecks(abortCtrl.signal));
    }
    showDecks();
  }, []);

  return (
    <div>
      <button
        className="btn btn-secondary"
        name="createDeck"
        onClick={handleButtonClick}
        value="new"
      >
        <span className="oi oi-plus"></span> Create Deck
      </button>
      <DeckList decks={allDecks} />
    </div>
  );
}

export default Home;
