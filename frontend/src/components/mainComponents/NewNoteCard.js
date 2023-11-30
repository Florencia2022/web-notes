import React, { useState } from "react";
import ModalCreateEditNote from "../subComponents/ModalCreateEditNote.js";

const NewNoteCard = () => {
  const [modalIsOpenCreate, setModalIsOpenCreate] = useState(false);

  const closeModalCreate = () => {
    setModalIsOpenCreate(false);
  };

  return (
    <div className="container-note-card">
      <div
        className="container-new-note"
        onClick={() => setModalIsOpenCreate(true)}
      >
        <h3 className="container-new-note-title">Crea una nueva nota</h3>
      </div>
      <ModalCreateEditNote
        modalIsOpen={modalIsOpenCreate}
        onClose={closeModalCreate}
      />
    </div>
  );
};

export default NewNoteCard;
