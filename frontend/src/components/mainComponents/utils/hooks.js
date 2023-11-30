export const handleNotesByCategory = (
  e,
  setShowNotes,
  allNotes,
  setSelectedCategory,
  categories
) => {
  const valueId = Number(e.target.value);
  if (!valueId) {
    setShowNotes(allNotes);
    setSelectedCategory("All");
  } else {
    const selectedCat = categories.find((category) => category.id === valueId);

    const notesByCategory = selectedCat?.notes?.flatMap((obj) => {
      return allNotes?.filter((note) => note.id === obj.id);
    });

    setShowNotes(notesByCategory);
    setSelectedCategory(selectedCat.id);
  }
};

export const handleMyNotes = (setSelectedOption, setIsArchivedPage) => {
  setSelectedOption("misNotas");
  setIsArchivedPage(false);
};

export const handleArchivedNotes = (setSelectedOption, setIsArchivedPage) => {
  setSelectedOption("notasArchivadas");
  setIsArchivedPage(true);
};
