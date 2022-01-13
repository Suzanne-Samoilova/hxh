import PopupWithForm from "./PopupWithForm";
import React from "react";
import {push} from "connected-react-router";
import {useDispatch} from "react-redux";
import {deleteTask} from "../asyncActions/thunkFunctions";


function PopupConfirmDelete(props: any) {
    const dispatch = useDispatch();

    // сабмит попапа Удалить таск
    function handleSubmitDeleteTask(e: any) {
        e.preventDefault();
        const taskId = props.id;
        dispatch(deleteTask(taskId));
        props.onClose();
        dispatch(push(`/`));
    }


    return (
        <PopupWithForm name="confirm_delete"
                       title="Хотите удалить?"
                       buttonText="Да"
                       isOpen={props.isOpen}
                       onClose={props.onClose}
                       onSubmit={handleSubmitDeleteTask}>
            <p style={{maxWidth: "300px", margin: "5px auto 0", textAlign: "center", overflow: "hidden", textOverflow: "ellipsis",
                whiteSpace: "nowrap", fontSize: "18px"}}>"{props.name}"</p>
            <button className="popup__button-save popup__button-cancel"
                    type="button"
                    aria-label="Отмена"
                    onClick={props.onClose}>Нет</button>
        </PopupWithForm>
    )
}

export default PopupConfirmDelete;