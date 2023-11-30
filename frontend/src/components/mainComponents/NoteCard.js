import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ModalCreateEditNote from "../subComponents/ModalCreateEditNote.js";
import ModalDeleteCard from "../subComponents/ModalDeleteCard.js";
import "../../styles/noteCard.css";

import { usePatchNote } from "../../actions/index.js";

const NoteCard = ({ title, description, categories, id, isArchivedPage }) => {
  const [modalIsOpenDelete, setModalIsOpenDelete] = useState(false);
  const [modalIsOpenEdit, setModalIsOpenEdit] = useState(false);
  const { patchNote, isLoading } = usePatchNote();

  const handleEditNote = () => {
    setModalIsOpenEdit(true);
  };

  const closeModalEdit = () => {
    setModalIsOpenEdit(false);
  };

  const handleArchiveNote = async () => {
    await patchNote({ id, archived: true });
  };

  const handleUnarchiveNote = async () => {
    await patchNote({ id, archived: false });
  };
  return (
    <div className="container-note-card">
      <div className="container-note-card-text">
        <h2>{title?.toUpperCase()}</h2>
        <h4>{description}</h4>
      </div>

      <div className="container-button">
        <button
          onClick={isArchivedPage ? handleUnarchiveNote : handleArchiveNote}
        >
          {isLoading ? (
            <FontAwesomeIcon
              className="icon-spiner-note-card"
              icon={faSpinner}
              spin
            />
          ) : isArchivedPage ? (
            "Desarchivar"
          ) : (
            "Archivar"
          )}
        </button>
        <button onClick={handleEditNote}>Editar</button>
        <button onClick={() => setModalIsOpenDelete(true)}>Eliminar</button>
      </div>
      <ModalCreateEditNote
        isEdit={{ id, title, description, categories }}
        modalIsOpen={modalIsOpenEdit}
        onClose={closeModalEdit}
      />
      <ModalDeleteCard
        id={id}
        modalIsOpen={modalIsOpenDelete}
        onClose={() => setModalIsOpenDelete(false)}
      />
    </div>
  );
};

export default NoteCard;
