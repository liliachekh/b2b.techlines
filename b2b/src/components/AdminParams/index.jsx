import style from "./adminParams.module.scss";
import { useGetFiltersQuery, useDeleteFiltersMutation, useUpdateFilterMutation } from "../../store/api/filter.api";
import { Edit, Check, Close } from "../icons";
import { useState, useRef, useEffect } from "react";
import AddAdminParamsForm from "../AddAdminParamsForm";


export default function AdminParams({ adminParam, onCloseForm, setSuccessMsg, setErrorMsg }) {
  const { data: filtersBD = [], refetch } = useGetFiltersQuery();
  const [selectedParams, setSelectedParams] = useState([]);
  // Edit
  const [editParamId, setEditParamId] = useState(null);
  const [editedParams, setEditedParams] = useState('');
  const [updateFilterData] = useUpdateFilterMutation();
  const tableRef = useRef();
  // Add
  const [addParam, setAddParam] = useState(false);
  // Delete
  const [delFilters] = useDeleteFiltersMutation();


  const handleEditParam = (paramId, paramName) => {
    // встановити айді для редагування
    setEditParamId(paramId);
    setEditedParams(paramName);
  };

  const handleInputChange = (e) => {
    // Запис нового значення в стейт
    setEditedParams(e.target.value);
  };

  const handleCancelEdit = () => {
    // скинути редагування
    setEditParamId(null);
    setEditedParams({});
  };

  function handleClickOutside (event) {
    if (tableRef.current && !tableRef.current.contains(event.target)) {
      setEditParamId(null);
      setEditedParams({});
    }
  };

  const handleAddParam = () => {
    setAddParam(true);
  }

  const handleCancelAddParam = () => {
    setAddParam(false);
  }

  const handleCheckboxChange = (paramId) => {
    // оновлення масиву з параметрами при встановленні чекбоксу
    if (selectedParams.includes(paramId)) {
      setSelectedParams(selectedParams.filter((id) => id !== paramId));
    } else {
      setSelectedParams([...selectedParams, paramId]);
    }
  };

  async function deleteFilters(selectedParams) {
    try {
      const response = await delFilters(selectedParams);
      if (response.data) {
        setSuccessMsg(true);
        refetch();
      } else {
        setErrorMsg(response.error.data.message);
      }
    } catch (error) {
      setErrorMsg(error.data.message);
    }
  }

  async function updateFilter(id, body) {
    try {
      const response = await updateFilterData( { id, body: { name: body } } );
      if (response.data) {
        setSuccessMsg(true);
        refetch();
        setEditParamId(null);
      } else {
        setErrorMsg(response.error.data.message);
      }
    } catch (error) {
      setErrorMsg(error.data.message);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
            <button 
            className={`${style.adminParams__btn} ${selectedParams.length === 0 && style.adminParams__btnDisabled}`}
            disabled={selectedParams.length === 0}
            onClick={()=> deleteFilters(selectedParams)}
            >Delete
            </button>
          </nav>
          <div className={style.adminParams__main}>
          <table className={style.adminParams__table} ref={tableRef}>
                <thead>
                <tr>
                  <th></th>
                  <th scope="col">Name of the {adminParam}</th>
                  <th scope="col">Edit</th>
                </tr>
                </thead>
                <tbody>
                {filtersBD
                  .filter((param) => param.type === adminParam)
                  .map((param) => (
                    <tr key={param._id}>
                      <td>
                        <input type="checkbox" 
                        checked={selectedParams.includes(param._id)}
                        onChange={() => handleCheckboxChange(param._id)}
                        />
                      </td>
                      <td>
                  {editParamId === param._id ? (
                    <div className={style.adminParams__editItems}>
                    <input className={style.adminParams__editItemsInput}
                      type="text"
                      id="edit"
                      name="edit"
                      value={editedParams}
                      onChange={handleInputChange}
                    />
                    <button className={style.adminParams__editItemsBtn}
                      onClick={()=> updateFilter(editParamId, editedParams)}
                    > <Check/> </button>
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
                    <button onClick={() => handleEditParam(param._id, param.name)}>
                      <Edit/>
                    </button>
                  )}
                </td>
                    </tr>
                  ))}
                </tbody>
            </table>
            {addParam && (
              <AddAdminParamsForm 
              adminParam={adminParam} 
              onCloseForm={handleCancelAddParam} 
              refetch={refetch}
              setSuccessMsg={setSuccessMsg}
              setErrorMsg={setErrorMsg}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
