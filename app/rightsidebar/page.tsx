'use client';

import { useState } from 'react'
import styles from './page.module.css'
import Link from 'next/link';
import { Provider, useSelector } from 'react-redux';
import { store } from './store';
import { useDispatch } from 'react-redux';
import { inputName } from './store';

export default function StepOne() {

  const [teamName, setTeamName] = useState("");
  const dispatch = useDispatch();
  const initialName = useSelector((state: any) => {return state.teamName.value.emailAdd});

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
          <form method='get'>
            <div className={styles.inputContainer}>
                <input type='text' placeholder='Ex: Avion School' className={styles.teamNameInput} maxLength={50} onChange={updateTeamName} required/>
                <div className={styles.characterCount}>50</div>
                <Link href="./rightsidebar/steptwo">
                  <button type="submit" className={styles.nextButton} style={{backgroundColor: (teamName !== ""? "#4a154b" : "rgb(53, 55, 59)"), color: (teamName !== ""? "#fff" : "rgba(209, 210, 211, 0.75)")}} aria-disabled={teamName !== ""? "false" : "true"} onClick={() => dispatch(inputName({nameTeam: teamName, emailAdd: initialName}))}>Next</button>
                </Link>
            </div>
          </form>
        </div>
    </div>
    </Provider>

  )
}
