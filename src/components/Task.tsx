import React from "react";
import {useDispatch} from "react-redux";
import {getTodo} from "../asyncActions/thunkFunctions";
import {selectTaskAction, unselectTaskAction} from "../store/reducerTodo";
import PopupWithForm from "./PopupWithForm";
import axios from "axios";
import {dateFormat, getDateNowByDDmmyyyy} from "../utils/DateHelper";
import {listCategories} from "../utils/listCategories";
import locale from "antd/es/date-picker/locale/ru_RU";
import {DatePicker} from "antd";
import moment from "moment";


function Task(props: any) {
    const dispatch = useDispatch();

    // для смены статуса Выполнено
    const handleChange = () => {
        // отослать статус таски
        axios.patch(`http://localhost:3001/todo/${props.id}`, {"status": !props.status})
            .then(resp => {
                dispatch(getTodo());
            })
            .catch(error =>
                console.log('error:', error))

    }

    // попап Хотите удалить?
    const [isOpenPopupDeleteTask, setIsOpenPopupDeleteTask] = React.useState(false);

    // попап Хотите удалить?
    function handleOpenPopupDeleteTask() {
        setIsOpenPopupDeleteTask(true);
    }

    function handleClosePopupDeleteTask() {
        setIsOpenPopupDeleteTask(false);
    }

    // сабмит попапа Удалить таск
    function handleSubmitDeleteTask(e: any) {
        e.preventDefault();
        axios.delete(`http://localhost:3001/todo/${props.id}`)
            .then(resp => {
                dispatch(getTodo());
            })
            .catch(error =>
                console.log('error:', error));
        console.log('SUBMIT Удалить сработал!');
        handleClosePopupDeleteTask();
    }

    const handleSelect = (event: any) => {
        const checked = event.target.checked;
        const taskId = props.id;
        // отослать статус таски
        if (checked) {
            dispatch(selectTaskAction({id: taskId}))
        } else {
            dispatch(unselectTaskAction({id: taskId}))
        }
    }

    // попап Изменить таск
    const [isChangeTaskPopupOpen, setIsChangeTaskPopupOpen] = React.useState(false);

    // попап Изменить таск
    function handleOpenPopupChangeTask() {
        setIsChangeTaskPopupOpen(true);
    }

    // закрыть попап
    function handleClosePopupChangeTask() {
        setIsChangeTaskPopupOpen(false);
    }

    // сабмит попапа Изменить таск
    function handleSubmitChangeTask(e: any) {
        e.preventDefault();
        axios.patch(`http://localhost:3001/todo/${props.id}`, {
                "category": category,
                "name": name,
                "description": description,
                "date_change": dateNow,
                "date_deadline": dateDeadline
            })
            .then(resp => {
                dispatch(getTodo());
            })
            .catch(error =>
                console.log('error:', error));
        console.log('SUBMIT Изменить сработал!');
        handleClosePopupChangeTask();
    }

    const [category, setCategory] = React.useState(props.category);
    const [name, setName] = React.useState(props.name);
    const [description, setDescription] = React.useState(props.description);
    const [dateDeadline, setDateDeadline] = React.useState(props.date_deadline);

    function handleChangeCategory(e: any) {
        setCategory(e.target.value);
    }

    function handleChangeName(e: any) {
        setName(e.target.value);
    }

    function handleChangeDescription(e: any) {
        setDescription(e.target.value);
    }

    // Дата изменения
    const dateNow = getDateNowByDDmmyyyy();

    function handleChangeDateDeadline(date: any, dateString: string) {
        setDateDeadline(dateString);
    }


    return (
        <>
            <li className={props.status ? "tasks__item_completed" : "tasks__item"}>
                <input className="tasks__checkbox" type="checkbox" onClick={handleSelect}/>
                <p className="tasks__item-title">{props.name}</p>
                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <p style={{width: "100px", font: "inherit", margin: "0"}}>{props.category}</p>
                    <p className="tasks__date">{props.date_create}</p>
                    <p className="tasks__date">{props.date_change}</p>
                    <p className="tasks__date">{props.date_deadline}</p>
                </div>
                <div style={{width: "370px", display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
                    <button className="tasks__button-delete"
                            onClick={handleChange}>{props.status ? 'Не выполнено' : 'Выполнено'}</button>
                    <button className="tasks__button-archive"
                            onClick={handleOpenPopupChangeTask}>Изменить</button>
                    <button className="tasks__button-archive"
                            onClick={handleOpenPopupDeleteTask}>Удалить</button>
                    <button className="tasks__button-archive">Отложить</button>
                </div>
            </li>

            {/*попап Хотите удалить?*/}
            <PopupWithForm name="confirm_delete"
                           title="Хотите удалить?"
                           buttonText="Да"
                           isOpen={isOpenPopupDeleteTask}
                           onClose={handleClosePopupDeleteTask}
                           onSubmit={handleSubmitDeleteTask}
            >
                <button className=""
                        type="button"
                        aria-label="Отмена"
                        onClick={handleClosePopupDeleteTask}
                >Нет</button>
            </PopupWithForm>

            {/*попап Изменить таск*/}
            <PopupWithForm name="change-task"
                           title="Изменить таск"
                           buttonText="Изменить"
                           isOpen={isChangeTaskPopupOpen}
                           onClose={handleClosePopupChangeTask}
                           onSubmit={handleSubmitChangeTask}
            >
                <p style={{maxWidth: "300px", margin: "5px auto 0", textAlign: "center", overflow: "hidden", textOverflow: "ellipsis",
                    whiteSpace: "nowrap", fontSize: "18px"}}>"{props.name}"</p>
                <p className="popup__task-name">Выберите категорию:</p>
                <select className="popup__input-text"
                        value={category}
                        onChange={handleChangeCategory}>
                    {listCategories.map((item) => (
                        <option key={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
                <p className="popup__task-name">Название:</p>
                <input className="popup__input-text"
                       type="text"
                       name="task-name"
                       placeholder="Введите название таска"
                       required
                       onChange={handleChangeName}
                       value={name}
                />
                <p className="popup__task-name">Описание:</p>
                <input className="popup__input-text"
                       type="text"
                       name="task-description"
                       placeholder="Введите описание таска"
                       required
                       onChange={handleChangeDescription}
                       value={description}
                />
                <p className="popup__task-name">Крайний срок исполнения:</p>
                <DatePicker onChange={handleChangeDateDeadline}
                            format={dateFormat}
                            locale={locale}
                            value={moment(dateDeadline, dateFormat)}/>
            </PopupWithForm>
        </>
    );
}

export default Task;
