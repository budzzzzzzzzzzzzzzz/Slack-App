'use client';

import { useState } from 'react'
import styles from './page.module.css'
import Link from 'next/link';
import { Provider, useSelector } from 'react-redux';
import { store } from './store';
import { useDispatch } from 'react-redux';
import { inputName } from './store';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../config/firebase';
import * as yup from 'yup'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';

interface RegisterForm {
  team_name: string;
}

export default function StepOne() {

  const dataValidation = yup.object().shape({
    team_name: yup.string(),
  })

  const [teamName, setTeamName] = useState("");
  const dispatch = useDispatch();
  const initialName = useSelector((state: any) => {return state.teamName.value.emailAdd});

  const [user] = useAuthState(auth);

  const {register, handleSubmit} = useForm<RegisterForm>({
    resolver: yupResolver(dataValidation),
  });

  const registrationCollector = doc(db, "user_registration", "JkMUbpz5jnxaEv147k2L");

  const submitRegistration = async (data: RegisterForm) => {
    await updateDoc(registrationCollector, {
        team_name: data.team_name,
    })
}


  const updateTeamName = (e: any) => {
      setTeamName(e.target.value);
  }

  return (
    <Provider store={store}>
    <div className={styles.setupContainer}>
      <div className={styles.teamNameContainer}>
            <div className={styles.containerInfo}>
                <div className={styles.sideBarHeaderTeamName}>
                    <span className={styles.teamNameText}>{teamName}</span>
                </div>
            </div>
        </div>
        <div className={styles.rightSideBarCont}>
          <div className={styles.stepsCounterCont}>
            Step 1 of 4
          </div>
          <h2 className={styles.setupHeader}>What's the name of your company or team?</h2>
          <div className={styles.subHeader}>This will be the name of your Slack workspace - choose something that your team will recognize.
          </div>
          <form method='POST'>
            <div className={styles.inputContainer}>
                <input type='text' placeholder='Ex: Avion School' className={styles.teamNameInput} maxLength={50} {...register("team_name")} onChange={updateTeamName} required/>
                <div className={styles.characterCount}>50</div>

                  <button type="submit" className={styles.nextButton} style={{backgroundColor: (teamName !== ""? "#4a154b" : "rgb(53, 55, 59)"), color: (teamName !== ""? "#fff" : "rgba(209, 210, 211, 0.75)")}} aria-disabled={teamName !== ""? "false" : "true"} onClick={handleSubmit(submitRegistration)}>
                    <Link href="./rightsidebar/steptwo" onClick={() => dispatch(inputName({nameTeam: teamName, emailAdd: initialName}))}>
                    Next
                    </Link>
                  </button>
            </div>
          </form>
        </div>
    </div>
    </Provider>

  )
}
