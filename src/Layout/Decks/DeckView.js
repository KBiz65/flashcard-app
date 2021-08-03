import React, { useEffect, useState } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import { readDeck } from "../../utils/api";
import Breadcrumb from "../Common/Breadcrumb";
import CardList from "./CardList";
import DeleteButton from "../Common/DeleteButton";

function DeckView() {
  const {
    params: { deckId },
  } = useRouteMatch();
  const [deck, setDeck] = useState({});

  // creates an abort controller signal to send through to
  // the delete button
  const AbrtCtrlSignal = new AbortController().signal;

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

  // only renders after the deck has been loaded by useEffect
  if (deck.id) {
    return (
      <div>
        <Breadcrumb navArray={[{ name: deck.name, url: `decks/${deck.id}` }]} />
        <div className="border list-group mt-3">
          <li key={deck.id} id={deck.id} className="list-group-item">
            <div className="row d-flex justify-content-between">
              <div className="col d-flex justify-content-start font-weight-bold">
                {deck.name}
              </div>
            </div>
            <div className="row mt-1">
              <div className="col">{deck.description}</div>
            </div>
            <div className="row mt-3 d-flex justify-content-between">
              <div className="col-10 d-flex justify-content-start">
                <Link
                  to={`/decks/${deckId}/edit`}
                  className="btn btn-secondary"
                  name="editDeck"
                  value="edit"
                >
                  <span className="oi oi-pencil"></span> Edit
                </Link>
                <Link
                  to={`/decks/${deckId}/study`}
                  className="btn btn-info ml-2"
                >
                  <span className="oi oi-book"></span> Study
                </Link>
                <Link
                  to={`/decks/${deckId}/cards/new`}
                  className="btn btn-info ml-2"
                >
                  <span className="oi oi-plus"></span> Add Cards
                </Link>
              </div>
              <div className="col-2 d-flex justify-content-end">
                <DeleteButton
                  func="deleteDeck"
                  deckId={deckId}
                  abrtSignal={AbrtCtrlSignal}
                />
              </div>
            </div>
          </li>
        </div>
        <h2 className="mt-4">Cards</h2>
        <CardList cards={deck.cards} />
      </div>
    );
  } else {
    return "Loading";
  }
}

export default DeckView;
