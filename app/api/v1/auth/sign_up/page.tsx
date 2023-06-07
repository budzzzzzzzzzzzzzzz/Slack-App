'use client';

import React from 'react'
import Image from 'next/image'
import styles from './page.module.css'
import slackIcon from 'app/icons/slack-icon.png'
import { Provider } from 'react-redux/es/exports'
import { inputName } from '../../../../rightsidebar/store'
import { store } from '../../../../rightsidebar/store'
import { useDispatch } from 'react-redux/es/exports';
import {useState} from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup'
import {addDoc, collection, doc, updateDoc} from 'firebase/firestore'
import { db } from '../../../../config/firebase';
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from '../../../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link'

interface RegisterForm {
    email: string;
    password: string;
    confirm_password: string;
    userId: string;
}

export default function SignUp() {

    const [user] = useAuthState(auth);

    const dataValidation = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
        confirm_password: yup.string().oneOf([yup.ref("password")]).required(),
    })

    const [email, setNewEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const {register, handleSubmit, formState: {errors}} = useForm<RegisterForm>({
        resolver: yupResolver(dataValidation),
    });
    const [profileName, setProfileName] = useState("");

    const registrationCollector = doc(db, "user_registration", "JkMUbpz5jnxaEv147k2L");

    const submitRegistration = async (data: RegisterForm) => {
        await updateDoc(registrationCollector, {
            email: data.email,
            password: data.password,
            userId: user?.uid,
            confirm_password: data.confirm_password,
        })
    }

    const signUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {console.log(userCredential)})
        .catch((error) => {console.log(error)});
      }

    const dispatch = useDispatch();

    const filterName = () => {
        for (let i = 0; i < email.length; ++i) {
            if (email[i] === '@') {
                setProfileName(email.substring(0, i));
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
        <form method="post">
                <h1 className={styles.registerToSlack}>Register to Slack</h1>
                    <input type="text" className={styles.emailInput} placeholder="Enter email..." {...register("email")} onChange={(e) => {{setNewEmail(e.target.value)}; filterName()}}/>
                    <div className={styles.errorMessage}></div>
                    <input type="password" className={styles.passwordInput} placeholder="Enter password..." {...register("password")} onChange={(e) => {setPassword(e.target.value)}}/>
                    <div className={styles.errorMessage}></div>
                    <input type="password" className={styles.passwordInput} placeholder="Confirm password..." {...register("confirm_password")} onChange={(e) => {setConfirmPassword(e.target.value)}
                }/>
                    <div className={styles.errorMessage}>
                    </div>
                    <div className={styles.registerButtonContainer}>

                            <button className={styles.registerButton} type="submit" onClick={handleSubmit(submitRegistration)}>
                            <Link href="/mainInterface" onClick={() => {dispatch(inputName({emailAdd: email, password: password, confirm_password: confirmPassword}))}}>
                                    Sign Up
                            </Link>
                            </button>
                        {/*<Link href="/mainInterface" onClick={() => {dispatch(inputName({emailAdd: email, password: password, confirm_password: confirmPassword}))}}></Link>*/}
                    </div>
            </form>
    </div>
    </Provider>
  )
}


