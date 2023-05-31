'use client';

import React from 'react'
import Image from 'next/image'
import styles from './page.module.css'
import slackIcon from 'app/icons/slack-icon.png'
import Link from 'next/link'
import { Provider } from 'react-redux/es/exports'
import { inputName } from '../rightsidebar/store'
import { store } from '../rightsidebar/store'
import { useDispatch } from 'react-redux/es/exports';
import {useState} from 'react'

export default function Registration() {

    const [newEmail, setNewEmail] = useState("");
    const [defaultUserName, setDefaultUsername] = useState("");
    const dispatch = useDispatch();

    const updateEmail = (event: any) => {
        setNewEmail(event.target.value);
    }

    const filterName = () => {
        for (let i = 0; i < newEmail.length; ++i) {
            if (newEmail[i] === '@') {
                setDefaultUsername(newEmail.substring(0, i));
            }
        }
    }

    return (
        <Provider store={store}>
        <div className={styles.registrationContainer}>
        <header className={styles.signInHeader}>
            <div className={styles.leftColumn}></div>
                <div className={styles.centerColumn}>
                    <Image src= {slackIcon} width={32} height={32} alt='slack-icon'/>
                    <h1 className={styles.slackText}>slack</h1>
                </div>
                <div className={styles.rightColumn}>
            </div>
        </header>
        <form>
                <h1 className={styles.registerToSlack}>Register to Slack</h1>
                    <input type="text" className={styles.emailInput} placeholder="Enter email..." onChange={updateEmail}/>
                    <div className={styles.errorMessage}></div>
                    <input type="password" className={styles.passwordInput} placeholder="Enter password..."/>
                    <div className={styles.errorMessage}></div>
                    <input type="password" className={styles.passwordInput} placeholder="Confirm password..."/>
                    <div className={styles.errorMessage}>
                    </div>
                    <div className={styles.registerButtonContainer}>
                        <Link href="/mainInterface">
                            <button className={styles.registerButton} type="submit" onClick={() => {filterName();dispatch(inputName({emailAdd: defaultUserName}))}}>
                                    Sign Up
                            </button>
                        </Link>
                    </div>
            </form>
    </div>
    </Provider>
  )
}
