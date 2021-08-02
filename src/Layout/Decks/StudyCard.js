import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

function StudyCard({ cards: { allCards }, index, setIndex }) {
  const [flipped, setFlipped] = useState(false);
  const [cardFront, setCardFront] = useState(true);
  const history = useHistory();

  function handleClick(event) {
    event.preventDefault();

    if (event.target.name === "flipped") {
      setFlipped(true);
      setCardFront(!cardFront);
    }

    if (event.target.name === "next") {
      // checking if we're at the end of the array of cards
      if (index + 1 >= allCards.length) {
        studyAgain();
      } else {
        setIndex(index + 1);
        setFlipped(false);
        setCardFront(true);
      }
    }
  }

  function studyAgain() {
    if (
      window.confirm(
        `Restart cards? \n\n Clicking cancel will return you to the home page`
      )
    ) {
      setIndex(0);
      setFlipped(false);
      setCardFront(true);
    } else {
      history.push("/");
    }
  }

  if (allCards.length < 3) {
    return (
      <div>
        <h4>Not enough cards.</h4>
        <p>
          You need at least 3 cards to study. There are {allCards.length} in
          this deck.
        </p>
        <Link
          className="btn btn-info"
          to={`/decks/${allCards[index].id}/cards/new`}
        >
          <span className="oi oi-plus"></span> Add Cards
        </Link>
      </div>
    );
  } else {
    return (
      <div>
        <div className="border rounded p-3">
          <h4 className="row pl-3">
            Card {index + 1} of {allCards.length}
          </h4>
          {cardFront === true ? (
            <div className="row pl-3">{allCards[index].front}</div>
          ) : (
            <div className="row pl-3">{allCards[index].back}</div>
          )}

          <div className="row">
            <button
              className="btn btn-secondary mt-4 ml-3 pl-3"
              name="flipped"
              onClick={handleClick}
            >
              Flip
            </button>
            {flipped === true ? (
              <button
                className="btn btn-info mt-4 ml-2 pl-3"
                name="next"
                onClick={handleClick}
              >
                Next
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default StudyCard;
