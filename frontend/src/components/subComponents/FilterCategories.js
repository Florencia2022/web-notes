import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "../../styles/filterCategories.css";

const FilterCategories = ({
  categories,
  handleCategory = () => {},
  styleSelect,
  defaultValue,
  selectedCategory,
  isEdit,
  isLoadingCategories,
}) => {
  if (isLoadingCategories) {
    return (
      <div className="loading-spinner">
        <FontAwesomeIcon className="icon-filter" icon={faSpinner} spin />
      </div>
    );
  }
  return (
    <select
      key="SelectedCategories"
      style={styleSelect}
      onChange={handleCategory}
      value={
        isEdit ? defaultValue : selectedCategory ? selectedCategory : "holla"
      }
    >
      <option value="All">{defaultValue}</option>
      {categories?.length > 0 &&
        categories?.map((category) => {
          return (
            <option value={isEdit ? category.name : category.id}>
              {category.name}
            </option>
          );
        })}
    </select>
  );
};

export default FilterCategories;
