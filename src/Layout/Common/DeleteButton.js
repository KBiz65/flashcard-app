import React from "react";
import { useHistory } from "react-router-dom";
import { deleteDeck, deleteCard } from "../../utils/api";

function DeleteButton({ func, deckId, cardId = null, abrtSignal }) {
  const history = useHistory();

  function handleDelete() {
    // only option is to delete a deck or a card. Looks at the func
    // prop to determin which action to take
    switch (func) {
      case "deleteDeck":
        if (
          window.confirm(
            `Delete this deck? \n\n You will not be able to recover it.`
          )
        ) {
          deleteDeck(deckId, abrtSignal).then(() => {
            history.push("/");
            history.go(0);
          });
        }
        break;
      case "deleteCard":
        if (
          window.confirm(
            `Delete this card? \n\n You will not be able to recover it.`
          )
        ) {
          deleteCard(cardId, abrtSignal).then(() => {
            history.go(0);
          });
        }
        break;
      default:
        break;
    }
  }

  return (
    <button className="btn btn-danger" onClick={handleDelete}>
      <span className="oi oi-trash"></span>
    </button>
  );
}

export default DeleteButton;
