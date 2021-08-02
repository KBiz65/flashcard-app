import React from "react";
import { Link } from "react-router-dom";

function CardListItem({ card: { id, front, back, deckId } }) {
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
              <Link className="btn btn-secondary">
                <span className="oi oi-pencil"></span> Edit
              </Link>
              <Link className="btn btn-danger ml-2">
                <span className="oi oi-trash"></span>
              </Link>
            </div>
          </div>
        </li>
      </div>
    </div>
  );
}

export default CardListItem;
