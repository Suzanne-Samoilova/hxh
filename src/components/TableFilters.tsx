import React from "react";
import {useDispatch} from "react-redux";
import {
    filterNameTaskAction,
    sortingNameTaskAction,
    filterCategoryTaskAction,
    filterStatusTaskAction,
} from "../store/reducerTodo";
import {filtersTasks} from "../asyncActions/thunkFunctions";
import store from "../store/configureStore";
import {listCategoriesForFilter} from "../utils/listCategoriesForFilter";
import {selectSortingName, selectSortingStatus} from "../utils/listSelectsForFilter";


function TableFilters() {
    const dispatch = useDispatch();

    function handleFilterName(e: any) {
        let filterName = e.target.value;
        if (filterName.length !== 0) {
            dispatch(filterNameTaskAction({nameTask: filterName}));
        } else {
            dispatch(filterNameTaskAction({nameTask: null}));
        }
        dispatch(filtersTasks());
    }

    function handleSortingName(e: any) {
        let sortNameTask = e.target.value;
        // if (status in ['Не выполнено', 'Выполнено']) {
            if (sortNameTask === 'По возрастанию') {
            dispatch(sortingNameTaskAction({sortNameTask: 'По возрастанию'}));
        } else if (sortNameTask === 'По убыванию') {
            dispatch(sortingNameTaskAction({sortNameTask: 'По убыванию'}));
        } else {
            dispatch(sortingNameTaskAction({sortNameTask: null}));
        }
        dispatch(filtersTasks());
    }

    function handleSortingCategory(e: any) {
        let category = e.target.value;
        if (category === 'Любая категория') {
            dispatch(filterCategoryTaskAction({categoryTask: null}));
        } else {
            dispatch(filterCategoryTaskAction({categoryTask: category}));
        }
        dispatch(filtersTasks());
    }

    function handleSortingStatus(e: any) {
        let status = e.target.value;
        if (status === 'Не выполнено') {
            dispatch(filterStatusTaskAction({statusTask: 'Не выполнено'}));
        } else if (status === 'Выполнено') {
            dispatch(filterStatusTaskAction({statusTask: 'Выполнено'}));
        } else {
            dispatch(filterStatusTaskAction({statusTask: null}));
        }
        dispatch(filtersTasks());
    }


    return (
        <div className="table-filters">
            <input className="table-filters__input-name"
                   placeholder="Введите название"
                   onChange={handleFilterName}/>

            <select className="table-filters__sorting"
                    onChange={handleSortingName}>
                {selectSortingName.map((item) => (
                    <option key={item.id}
                            selected={store.getState().todo.sortNameTask && store.getState().todo.sortNameTask === item.name}>
                        {item.name}
                    </option>
                ))}
            </select>

            <select className="table-filters__sorting"
                    onChange={handleSortingCategory}>
                {listCategoriesForFilter.map((item) => (
                    <option key={item.id}
                            selected={store.getState().todo.categoryTask && store.getState().todo.categoryTask === item.name}>
                        {item.name}
                    </option>
                ))}
            </select>

            <select className="table-filters__sorting"
                    onChange={handleSortingStatus}>
                {selectSortingStatus.map((item) => (
                    <option key={item.id}
                            selected={store.getState().todo.statusTask && store.getState().todo.statusTask === item.name}
                    >
                        {item.name}
                    </option>
                ))}

            </select>
        </div>
    );
}

export default TableFilters;
