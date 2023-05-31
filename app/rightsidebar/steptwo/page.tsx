'use client';

import React from 'react'
import styles from './page.module.css'
import { useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import slackEmptyAvatar from 'app/icons/slack-avatar.png'
import { Provider } from 'react-redux/es/exports';
import { inputName, store } from '../store';
import { useSelector, useDispatch } from 'react-redux';

export default function StepTwo() {


    const workspaceName = useSelector((state: any) => {return state.teamName.value.nameTeam});
    const initialName = useSelector((state: any) => {return state.teamName.value.emailAdd});
    const [profileName, setProfileName] = useState("");
    const dispatch = useDispatch();

    const updateProfileName = (e: any) => {
        setProfileName(e.target.value);
    }

    return (
      <Provider store={store}>
    <div className={styles.setupContainer}>
        <div className={styles.leftSideBar}>
            <div className={styles.teamNameContainer}>
                <div className={styles.containerInfo}>
                    <div className={styles.sideBarHeaderTeamName}>
                      <span className={styles.teamNameText}>{workspaceName}</span>
                    </div>
                </div>
            </div>
            <div className={styles.directMessageLabelCont}>
                <div className={styles.directMessageLabel}>
                        Direct messages
                </div>
            </div>
            <div className={styles.avatarAndNameCont}>
              <div className={styles.avatarAndName}>
                <Image src={slackEmptyAvatar} width={20} height={20} alt='slack-avatar' className={styles.avatarPic}/>
                <span className={styles.userName}>{profileName}</span>
                <span className={styles.youContainer}>you</span>
              </div>
            </div>
        </div>
          <div className={styles.rightSideBarCont}>
            <div className={styles.stepsCounterCont}>
              Step 2 of 4
            </div>
            <h2 className={styles.setupHeader}>What's your name?</h2>
            <div className={styles.subHeader}>Adding your name and profile photo helps your teammates recognize and connect with you more easily.
            </div>
            <form method='get'>
              <div className={styles.inputContainer}>
                  <input type='text' placeholder='Enter your full name' className={styles.teamNameInput} onChange={updateProfileName} value={profileName} required/>

              <div className={styles.stepTwoRegisterCont}>
                <label className={styles.text}><span className={styles.textTwo}>Your profile photo</span> <span className={styles.textThree}>(optional)</span></label>
                <div className={styles.photoRegisterCont}>
                  <div className={styles.avatarCont}>
                    <Image src={slackEmptyAvatar} width={112} height={112} alt='slack-avatar-icon'/>
                  </div>
                  <div className={styles.avatarButtonCont}>
                    <div className={styles.statement}>Help your teammates know they're talking to the right person.</div>
                    <div className={styles.uploadButtonCont}>
                      <button className={styles.uploadButton} type='button'>
                        Upload Photo
                        <input accept="image/*;capture=camera" aria-hidden="true" className={styles.hidden} type="file" data-qa="edit_profile_file_upload"/>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
                  <Link href="./rightsidebar/stepthree">
                    <button type="submit" className={styles.nextButton} style={{backgroundColor: (profileName !== ""? "#4a154b" : "rgb(53, 55, 59)"), color: (profileName !== ""? "#fff" : "rgba(209, 210, 211, 0.75)")}} aria-disabled={profileName !== ""? "false" : "true"} onClick={() => dispatch(inputName({nameTeam: workspaceName, profileName: profileName}))}>Next</button>
                  </Link>
              </div>
            </form>
          </div>
      </div>
      </Provider>

  )
}
