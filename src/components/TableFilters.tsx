import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "../index";

import {
    filterNameTaskAction,
    sortingNameTaskAction,
    filterCategoryTaskAction,
    filterStatusTaskAction,
} from "../store/reducerTodo";
import { filtersTasks } from "../asyncActions/thunkFunctions";
import { listCategoriesForFilter } from "../utils/listCategoriesForFilter";
import { selectSortingName, selectSortingStatus } from "../utils/listSelectsForFilter";


function TableFilters() {
    const dispatch = useDispatch();

    const todo = useSelector((state: TRootState) => state.todo);


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
            dispatch(filterStatusTaskAction({statusTask: false}));
        } else if (status === 'Выполнено') {
            dispatch(filterStatusTaskAction({statusTask: true}));
        } else {
            dispatch(filterStatusTaskAction({statusTask: null}));
        }
        dispatch(filtersTasks());
    }

    function selectFilterStatus(item: any) {
        if (todo.statusTask === item.status) {
            return true
        } else {
            return false
        }
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
                            selected={todo.sortNameTask && todo.sortNameTask === item.name}>
                        {item.name}
                    </option>
                ))}
            </select>

            <select className="table-filters__sorting"
                    onChange={handleSortingCategory}>
                {listCategoriesForFilter.map((item) => (
                    <option key={item.id}
                            selected={todo.categoryTask && todo.categoryTask === item.name}>
                        {item.name}
                    </option>
                ))}
            </select>

            <select className="table-filters__sorting"
                    onChange={handleSortingStatus}>
                {selectSortingStatus.map((item) => (
                    <option key={item.id}
                            // selected={todo.statusTask && todo.statusTask === item.status}
                            selected={selectFilterStatus(item)}
                    >
                        {item.name}
                    </option>
                ))}

            </select>
        </div>
    );
}

export default TableFilters;
