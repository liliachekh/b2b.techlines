import style from "./addAdminParamsForm.module.scss";
import { useGetFiltersQuery } from "../../store/api/filter.api";
import { Edit } from "../icons";
import { useState } from "react";

export default function AddAdminParamsForm({ adminParam, onCloseForm }) {
  const { data: filtersBD = [] } = useGetFiltersQuery();
  const [selectedParams, setSelectedParams] = useState([]);
  const [editParamId, setEditParamId] = useState(null);

  const handleEditParam = (paramId) => {
    // встановити айді для редагування
    setEditParamId(paramId);
  };

  const handleCancelEdit = () => {
    // скинути редагування
    setEditParamId(null);
  };

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
            <button className={style.adminParams__btn}>Close</button>
          </div>
          <nav className={style.adminParams__nav}>
            <button className={style.adminParams__btn}>Add</button>
            <button className={style.adminParams__btn}>Delete</button>
          </nav>
          <ul className={style.adminParams__list}>
        {filtersBD
          .filter((param) => param.type === adminParam)
          .map((param) => (
            <li key={param._id} className={style.adminParams__listItem}>
              <input type="checkbox" />
              <span>{param.name}</span>
              <button onClick={() => handleEditParam(param._id)}>
                <Edit/>
              </button>
            </li>
          ))}
      </ul>
        </div>
      </div>
    </>
  );
}


{/* <table className={style.adminParams__table}>
              <thead className={style.adminParams__thead}>
                <tr>
                  <th></th>
                  <th scope="col">Name</th>
                  <th scope="col">Edit</th>
                </tr>
              </thead>
              <tbody>
                {filtersBD
                  .filter((param) => param.type === adminParam)
                  .map((param) => (
                    <tr key={param.id}>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>{param.name}</td>
                      <td>
                        <button>Edit</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table> */}