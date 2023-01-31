import { SetStateAction, useEffect, useState } from 'react';
import './main.scss';
import UsersItem from './UsersItem/UsersItem';
import { validName, validEmail, validPhone } from '../../Regexp/Regexp';

const Main = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [specialty, setSpecialty] = useState<string>('');

    const [nameBorder, setNameBorder] = useState<string>('1px solid grey');
    const [emailBorder, setEmailBorder] = useState<string>('1px solid grey');
    const [phoneBorder, setPhoneBorder] = useState<string>('1px solid grey');

    const [url, setUrl] = useState<string>('http://localhost:3000/users');
    const [users, setUsers] = useState([]);

    const [btnDisabled, setBtnDisabled] = useState<boolean>(true);

    const nameHandleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setName(event.target.value);
    };

    const emailHandleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setEmail(event.target.value);
    };

    const phoneHandleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setPhone(event.target.value);
    };

    const specialtyHandleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSpecialty(event.target.value);
        checkBtnDisabled();
    };

    const validNameHandleChange = () => {
        if (validName.test(name)) {
            setNameBorder('2px solid green');
        }
        else if (name === '') {
            setNameBorder('1px solid grey');
        }
        else {
            setNameBorder('2px solid red');
        }
    };

    const validEmailHandleChange = () => {
        if (validEmail.test(email)) {
            setEmailBorder('2px solid green');
        }
        else if (email === '') {
            setEmailBorder('1px solid grey');
        }
        else {
            setEmailBorder('2px solid red');
        }
    };

    const validPhoneHandleChange = () => {
        if (validPhone.test(phone)) {
            setPhoneBorder('2px solid green');
        }
        else if (phone === '') {
            setPhoneBorder('1px solid grey');
        }
        else {
            setPhoneBorder('2px solid red');
        }
    };

    const getUsers = async () => {
        const response = await fetch(url);
        const data = await response.json();
        setUsers(data);
    };

    useEffect(() => {
        getUsers();
    }, []);

    const registerBtn = async () => {
        await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                specialty: specialty
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).finally(() => {
            getUsers();
        });
    };

    const checkBtnDisabled = () => {
        console.log(specialty);
        if (validName.test(name) && validEmail.test(email) && validPhone.test(phone) && specialty !== '') {
            setBtnDisabled(false);
        }
        else {
            setBtnDisabled(true);
        };
    };

    useEffect(() => {
        checkBtnDisabled();
    }, [checkBtnDisabled]);

    return (
        <div className="main">
            <div className="peoples">
                <h1>Working with GET request</h1>
                <div className="peoples-item">
                    {users.map((elem: { name: string; email: string; phone: string; specialty: string; id: number; }) => {
                        return <UsersItem elem={elem} key={elem.id} />
                    })}
                </div>
                <div className="peoples-btn">
                    <button>Show more</button>
                </div>
            </div>
            <div className='registration'>
                <h1>Working with POST request</h1>
                <form action="" className='registration-form'>
                    <input
                        style={{ border: `${nameBorder}` }}
                        className='inputText'
                        type="text"
                        onChange={nameHandleChange}
                        onKeyUp={validNameHandleChange}
                        placeholder='Your name'
                    />
                    <input
                        style={{ border: `${emailBorder}` }}
                        className='inputText'
                        type="text"
                        onChange={emailHandleChange}
                        onKeyUp={validEmailHandleChange}
                        placeholder='Email'
                    />
                    <input
                        style={{ border: `${phoneBorder}` }}
                        className='inputText'
                        type="text"
                        onChange={phoneHandleChange}
                        onKeyUp={validPhoneHandleChange}
                        placeholder='Phone'
                    />
                    <p className='registration-form-regexpPhone_p'>+38 (XXX) XXX - XX - XX</p>
                    <p className='registration-form-specialty_p'>Select your position</p>
                    <div className="registration-form_input">
                        <input
                            className='inputRadio'
                            name='specialty'
                            type="radio"
                            onChange={specialtyHandleChange}
                            value="Frontend developer"
                        /><span>Frontend developer</span>
                    </div>
                    <div className="registration-form_input">
                        <input
                            className='inputRadio'
                            name='specialty'
                            type="radio"
                            onChange={specialtyHandleChange}
                            value="Backend developer"
                        /><span>Backend developer</span>
                    </div>
                    <div className="registration-form_input">
                        <input
                            className='inputRadio'
                            name='specialty'
                            type="radio"
                            onChange={specialtyHandleChange}
                            value="Designer"
                        /><span>Designer</span>
                    </div>
                    <div className="registration-form_input">
                        <input
                            className='inputRadio'
                            name='specialty'
                            type="radio"
                            onChange={specialtyHandleChange}
                            value="QA"
                        /><span>QA</span>
                    </div>
                    <input type="file" className='registration-form_inputFile'/>  {/* i don`t know */}
                    {btnDisabled &&
                        <input className='registration-form-btn' type="submit" onClick={registerBtn} disabled />
                    }
                    {btnDisabled === false &&
                        <input className='registration-form-btn' type="submit" onClick={registerBtn} />
                    }
                </form>
            </div>
        </div>
    )
};

export default Main;