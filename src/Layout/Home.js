import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { listDecks } from "../utils/api";

function Home() {
  const history = useHistory();
  const abortCtrl = new AbortController();
  const [allDecks, setAllDecks] = useState([]);

  function handleButtonClick(event) {
    event.preventDefault();
    switch (event.target.name) {
      case "createDeck":
        history.push(`/decks/new`);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    async function showDecks() {
      setAllDecks(await listDecks(abortCtrl.signal));
    }
    showDecks();
  }, []);

  return (
    <div>
      <button
        className="btn btn-primary"
        name="createDeck"
        onClick={handleButtonClick}
        value="new"
      >
        + Create Deck
      </button>
      {allDecks.map((deck) => (
        <div className="border list-group mt-3">
          <li key={deck.id} className="list-group-item">
            <div className="row d-flex justify-content-between">
              <div className="col d-flex justify-content-start font-weight-bold">
                {deck.name}
              </div>
              <div className="col d-flex justify-content-end">
                {deck.cards.length} cards
              </div>
            </div>
            <div className="row mt-1">
              <div className="col">{deck.description}</div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <button className="btn btn-secondary">
                  <span>👁️</span>
                  <span className="ml-2">View</span>
                </button>
                <button className="btn btn-primary ml-2">
                  <span>🎓</span>
                  <span className="ml-2">Study</span>
                </button>
              </div>
              <div className="col">
                <button className="btn btn-danger">
                  <span>🗑️</span>
                  <span className="ml-2">Delete</span>
                </button>
              </div>
            </div>
          </li>
        </div>
      ))}
    </div>
  );
}

export default Home;
