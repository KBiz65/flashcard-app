import React, { useState, useEffect } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { createCard, updateCard } from "../../utils/api";

function CardForm({
  front = "Front side of card",
  back = "Back side of card",
}) {
  const {
    url,
    params: { deckId = null, cardId = null },
  } = useRouteMatch();

  const history = useHistory();

  const [cardInfo, setCardInfo] = useState({
    // id and deckId come through as strings so have to change them to integers
    id: parseInt(cardId),
    front: front,
    back: back,
    deckId: parseInt(deckId),
  });

  const [toEdit, setToEdit] = useState(false);

  useEffect(() => {
    if (url === `/decks/${deckId}/cards/new`) {
      setToEdit(false);
    }
    if (url === `/decks/${deckId}/cards/${cardId}/edit`) {
      setToEdit(true);
    }
  }, [toEdit, url, deckId, cardId]);

  function handleSubmit(event) {
    event.preventDefault();
    const abortCtrl = new AbortController();

    // determines if the user is creating a new card
    if (!toEdit) {
      createCard(cardInfo.deckId, cardInfo, abortCtrl.signal).then(() => {
        history.go(0);
      });
    }

    // determines if the user is editin an existing card
    if (toEdit) {
      updateCard(cardInfo, abortCtrl.signal).then((response) => {
        history.push(`/decks/${response.deckId}`);
      });
    }
  }

  // will run whenever one of the fields is changed to always keep the
  // controlled variable updated
  function changeHandler(event) {
    event.preventDefault();
    setCardInfo({
      ...cardInfo,
      [event.target.name]: event.target.value,
    });
  }

  function handleButtonClick(event) {
    event.preventDefault();
    // checks if cancel was clicked. Added as an if statement in
    // case there are buttons added in the future that could use
    // this function.
    if (event.target.name === "cancel") {
      history.push(`/decks/${deckId}`);
    }
  }

  if (toEdit && cardInfo.id) {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            className="form-control"
            id="front"
            name="front"
            onChange={changeHandler}
            rows="4"
            value={cardInfo.front}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            className="form-control"
            id="back"
            name="back"
            onChange={changeHandler}
            rows="4"
            value={cardInfo.back}
          ></textarea>
        </div>
        <div className="form-group">
          <button
            className="btn btn-secondary"
            name="cancel"
            onClick={handleButtonClick}
          >
            {url === `/decks/${deckId}/cards/new` ? "Done" : "Cancel"}
          </button>
          <button className="btn btn-info ml-2" name="submit" type="submit">
            {url === `/decks/${deckId}/cards/new` ? "Save" : "Submit"}
          </button>
        </div>
      </form>
    );
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            className="form-control"
            id="front"
            name="front"
            onChange={changeHandler}
            rows="4"
            placeholder={cardInfo.front}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            className="form-control"
            id="back"
            name="back"
            onChange={changeHandler}
            rows="4"
            placeholder={cardInfo.back}
          ></textarea>
        </div>
        <div className="form-group">
          <button
            className="btn btn-secondary"
            name="cancel"
            onClick={handleButtonClick}
          >
            {url === `/decks/${deckId}/cards/new` ? "Done" : "Cancel"}
          </button>
          <button className="btn btn-info ml-2" name="submit" type="submit">
            {url === `/decks/${deckId}/cards/new` ? "Save" : "Submit"}
          </button>
        </div>
      </form>
    );
  }
}

export default CardForm;
