import Modal from "react-modal";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faSpinner } from "@fortawesome/free-solid-svg-icons";
import "../../styles/modalCreateEditNote.css";
import { usePostNote, usePutNote, useGetCategories } from "../../actions/index";
import FilterCategories from "./FilterCategories.js";

const ModalCreateEditNote = ({ modalIsOpen, onClose, isEdit }) => {
  const { postNote, isLoading } = usePostNote();
  const { putNote, isLoading: isLoadingPut } = usePutNote();
  const { data, isLoading: isLoadingCategories } = useGetCategories();
  const [newCategory, setNewCategory] = useState("");
  const [availableCategories, setAvailableCategories] = useState([]);

  const [noteData, setNoteData] = useState({
    title: isEdit?.title || "",
    description: isEdit?.description || "",
    categories: isEdit?.categories || [],
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });

  const handleSaveNote = async () => {
    const errors = {
      title:
        noteData.title.trim() === "" ? "El título no puede estar vacío." : "",
      description:
        noteData.description.trim() === ""
          ? "El contenido no puede estar vacío."
          : "",
    };

    setErrors(errors);

    if (errors.title === "" && errors.description === "") {
      if (!isEdit) {
        await postNote(noteData);
      } else {
        noteData.id = isEdit?.id;
        await putNote(noteData);
      }
      handleClose();
    }

    setTimeout(() => {
      setErrors({
        title: "",
        description: "",
      });
    }, 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNoteData({
      ...noteData,
      [name]: value,
    });
  };
  const handleCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  /**
   *  Agrega la categoria al estado local, y setea el input de "Nueva categoria"
   */
  const addCategory = () => {
    if (newCategory.trim() !== "") {
      setNoteData({
        ...noteData,
        categories: [...noteData.categories, { name: newCategory }],
      });
      setNewCategory("");
    }
  };

  const handleCategoryExistent = (e) => {
    const selectedCategory = e.target.value;

    if (selectedCategory.trim() !== "" && selectedCategory !== "All") {
      setNoteData({
        ...noteData,
        categories: [...noteData.categories, { name: selectedCategory }],
      });
    }
  };

  /**
   * Elimina la categoria seleccionada del estado local
   */
  const removeCategory = (index) => {
    const updatedCategories = [...noteData.categories];
    updatedCategories.splice(index, 1);
    setNoteData({
      ...noteData,
      categories: updatedCategories,
    });
  };

  const handleResetNote = () => {
    if (!isEdit) {
      setNoteData({
        title: "",
        description: "",
        categories: [],
      });
    }
    setErrors({
      title: "",
      description: "",
    });
    setNewCategory("");
    onClose();
  };

  const handleClose = () => {
    handleResetNote();
  };

  /**
   * Se ejecuta cuando se da Enter en "Nueva categoria"
   */
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addCategory();
    }
  };

  useEffect(() => {
    setAvailableCategories(
      data?.filter(
        (category) =>
          !noteData.categories.some(
            (selectedCategory) => selectedCategory.name === category.name
          )
      )
    );
  }, [data, noteData.categories]);

  return (
    <Modal
      isOpen={modalIsOpen}
      className="modal-content-note"
      overlayClassName="modal-overlay-note"
      ariaHideApp={false}
    >
      <h2>{isEdit ? "Edita tu nota" : "Crea tu nota"}</h2>
      <div className="separatorHeader" />

      <div className="input-container">
        <input
          type="text"
          id="titleInput"
          name="title"
          value={noteData.title}
          placeholder="Título"
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="input-container">
        <textarea
          rows={5}
          id="descripcion"
          name="description"
          value={noteData.description}
          className="container-label-input"
          placeholder="Crear nota"
          onChange={handleInputChange}
          required
        />
      </div>
      {errors.title ? (
        <p className="errors">¡Ups! El título no puede estar vacío.</p>
      ) : errors.description ? (
        <p className="errors">¡Ups! La descripción no puede estar vacía.</p>
      ) : null}
      <FilterCategories
        isLoadingCategories={isLoadingCategories}
        categories={availableCategories}
        handleCategory={handleCategoryExistent}
        defaultValue="Elegir categoria existente"
        isEdit
      />
      <div className="square-ul-container">
        <div>
          <input
            className="container-label-input"
            id="categoryInput"
            value={newCategory}
            onChange={handleCategoryChange}
            onKeyDown={handleKeyDown}
            placeholder="Nueva categoria"
          />
        </div>
        {noteData.categories.map((category) => (
          <div className="selectedCategory">
            {category.name}
            <FontAwesomeIcon
              className="icon-trash"
              icon={faCircleXmark}
              onClick={() => removeCategory()}
            />
          </div>
        ))}
      </div>

      <div className="container-label-button">
        <button onClick={handleClose} className="button">
          Cancelar
        </button>
        <button onClick={handleSaveNote} type="submit" className="button">
          {isLoading || isLoadingPut ? (
            <FontAwesomeIcon className="icon-spiner" icon={faSpinner} spin />
          ) : (
            "Guardar"
          )}
        </button>
      </div>
    </Modal>
  );
};

export default ModalCreateEditNote;
