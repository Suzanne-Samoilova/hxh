import React from "react";

function Form() {
    const [email, setEmail] = React.useState<string>();
    const [password, setPassword] = React.useState<string>();

    const handleEmail = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    };

    const handlePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    };

    function handleSubmit(e:React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        fetch(`http://localhost:3001/users?email=${email}&password=${password}`)
            .then(
            (resp) => {
                 return  resp.json()
            }
        ).then(
            (matchedUsers) => {
                if (matchedUsers.length) {
                    console.log(matchedUsers, "Юзер найден!")
                    document.location.href = 'http://stackoverflow.com'
                } else {
                    console.log(matchedUsers, "Такого юзера нет!")
                }
            }
        )
    }

    return (
        <div className="authorization">
            <h2 className="authorization__title">
                Введите логин и пароль
            </h2>
            <form className="authorization__form" onSubmit={handleSubmit}>
                <input className="authorization__form-input" id="email"
                       type="email"
                       name="email"
                       placeholder="Эл.почта"
                       required
                       onChange={handleEmail}
                       value={email}
                />
                <span className="authorization__form-error" id="email-error">Введите адрес эл.почты.</span>

                <input className="authorization__form-input" id="password"
                       type="text"
                       name="password"
                       placeholder="Пароль"
                       required
                       onChange={handlePassword}
                       value={password}
                />
                <span className="authorization__form-error" id="password-error">Введите пароль.</span>

                <button className="authorization__button-save" type="submit">Войти</button>
            </form>
        </div>
    );
}

export default Form;