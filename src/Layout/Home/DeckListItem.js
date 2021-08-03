import React from "react";
import { Link } from "react-router-dom";
import DeleteButton from "../Common/DeleteButton";

function DeckListItem({ deck }) {
  const abrtSignal = new AbortController().signal;

  return (
    <div className="border list-group mt-3">
      <li key={deck.id} id={deck.id} className="list-group-item">
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
        <div className="row mt-3 d-flex justify-content-between">
          <div className="col d-flex justify-content-start">
            <Link
              to={`decks/${deck.id}`}
              className="btn btn-secondary"
              name="viewDeck"
              value="view"
            >
              <span className="oi oi-eye"></span> View
            </Link>
            <Link to={`/decks/${deck.id}/study`} className="btn btn-info ml-2">
              <span className="oi oi-book"></span> Study
            </Link>
          </div>
          <div className="col d-flex justify-content-end">
            <DeleteButton
              func="deleteDeck"
              deckId={deck.id}
              abrtSignal={abrtSignal}
            />
          </div>
        </div>
      </li>
    </div>
  );
}

export default DeckListItem;
