import React, { useEffect, useState } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import { readDeck } from "../../utils/api";
import Breadcrumb from "../Common/Breadcrumb";
import CardList from "./CardList";

function DeckView() {
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
                <Link to="/" className="btn btn-info ml-2">
                  <span className="oi oi-plus"></span> Add Cards
                </Link>
              </div>
              <div className="col-2 d-flex justify-content-end">
                <button className="btn btn-danger">
                  <span className="oi oi-trash"></span>
                </button>
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
