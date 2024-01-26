import style from "./addAdminParamsForm.module.scss";
import { useGetFiltersQuery } from "../../store/api/filter.api";
import { Edit, Check, Close } from "../icons";
import { useState } from "react";
import AddAdminParamsForm from "../AddAdminParamsForm";

export default function AdminParams({ adminParam, onCloseForm }) {
  const { data: filtersBD = [] } = useGetFiltersQuery();
  const [selectedParams, setSelectedParams] = useState([]);
  // Edit
  const [editParamId, setEditParamId] = useState(null);
  const [editedParams, setEditedParams] = useState({});
  // Add
  const [addParam, setAddParam] = useState(false);

  const handleEditParam = (paramId) => {
    // встановити айді для редагування
    setEditParamId(paramId);
  };

  const handleInputChange = (value) => {
    // Запись нового значения в стейт
    setEditedParams({ [editParamId]: value });
    console.log(editedParams);
    console.log(editParamId);
  };

  const handleCancelEdit = () => {
    // скинути редагування
    setEditParamId(null);
    setEditedParams({});
  };

  const handleAddParam = () => {
    setAddParam(true);
  }

  const handleCancelAddParam = () => {
    setAddParam(false);
  }

  // const handleCheckboxChange = (paramId) => {
  //   // оновлення масиву з параметрами при встановленні чекбоксу
  //   if (selectedParams.includes(paramId)) {
  //     setSelectedParams(selectedParams.filter((id) => id !== paramId));
  //   } else {
  //     setSelectedParams([...selectedParams, paramId]);
  //   }
  // };

  return (
    <>
      <div className={style.adminParams}>
        <div className={style.adminParams__container}>
          <div className={style.adminParams__titleItems}>
            <h1 className={style.adminParams__title}>{adminParam}</h1>
            <button className={style.adminParams__btn} onClick={onCloseForm}>Close</button>
          </div>
          <nav className={style.adminParams__nav}>
            <button className={style.adminParams__btn} onClick={handleAddParam}>Add</button>
            <button className={style.adminParams__btn}>Delete</button>
          </nav>
          <div className={style.adminParams__main}>
          <table className={style.adminParams__table}>
                <tr>
                  <th></th>
                  <th scope="col">Name of the {adminParam}</th>
                  <th scope="col">Edit</th>
                </tr>
                {filtersBD
                  .filter((param) => param.type === adminParam)
                  .map((param) => (
                    <tr key={param._id}>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>
                  {editParamId === param._id ? (
                    <div className={style.adminParams__editItems}>
                    <input className={style.adminParams__editItemsInput}
                      type="text"
                      value={editedParams[param._id] || ''}
                      onChange={(e) => handleInputChange(e.target.value)}
                    />
                    <button className={style.adminParams__editItemsBtn}> <Check/> </button>
                    </div>
                  ) : (
                    param.name
                  )}
                </td>
                <td>
                  {editParamId === param._id ? (
                    <>
                      <button onClick={handleCancelEdit}> <Close/> </button>
                    </>
                  ) : (
                    <button onClick={() => handleEditParam(param._id)}>
                      <Edit/>
                    </button>
                  )}
                </td>
                    </tr>
                  ))}
            </table>
            {addParam && (
              <AddAdminParamsForm onCloseForm={handleCancelAddParam}/>
            )}
          </div>
        </div>
      </div>
    </>
  );
}



      //       <ul className={style.adminParams__list}>
      //   {filtersBD
      //     .filter((param) => param.type === adminParam)
      //     .map((param) => (
      //       <li key={param._id} className={style.adminParams__listItem}>
      //         <input type="checkbox" />
      //         <span>{param.name}</span>
      //         <button onClick={() => handleEditParam(param._id)}>
      //           <Edit/>
      //         </button>
      //       </li>
      //     ))}
      // </ul>