import React from "react";
import { Link } from "react-router-dom";
import DeleteButton from "../Common/DeleteButton";

function CardListItem({ card: { id, front, back, deckId } }) {
  const abrtSignal = new AbortController().signal;

  return (
    <div>
      <div className="border list-group mt-3">
        <li key={id} id={id} className="list-group-item">
          <div className="row d-flex justify-content-between">
            <div className="col d-flex justify-content-start">{front}</div>
            <div className="col d-flex justify-content-end">{back}</div>
          </div>
          <div className="row mt-3">
            <div className="col d-flex justify-content-end">
              <Link
                to={`/decks/${deckId}/cards/${id}/edit`}
                className="btn btn-secondary mr-2"
              >
                <span className="oi oi-pencil"></span> Edit
              </Link>
              <DeleteButton
                func="deleteCard"
                deckId={deckId}
                cardId={id}
                abrtSignal={abrtSignal}
              />
            </div>
          </div>
        </li>
      </div>
    </div>
  );
}

export default CardListItem;
