'use client';

import React from 'react'
import styles from './page.module.css'
import { useState } from 'react'
import { Provider } from 'react-redux';
import { store } from '../store';
import Link from 'next/link';
import Image from 'next/image';
import paperPlane from 'app/icons/paper-plane.png'
import coworkerAvatarIcon from 'app/icons/slack-avatar-coworkers.png'
import copyLink from 'app/icons/copy-link.png'
import { inputName } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import hashtag from 'app/icons/hashtagIcon.png'

export default function StepThree() {
    const [projectName, setProjectName] = useState("");

    const workspaceName = useSelector((state: any) => {return state.teamName.value.nameTeam});
    const avatarName = useSelector((state: any) => {return state.teamName.value.profileName});
    const avatarPicture = useSelector((state: any) => {return state.teamName.value.profilePicture});

    const updateProjectName = (event: any) => {
      setProjectName(event.target.value);
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
            <div className={styles.channelCont}>
                <div className={styles.channelText}>
                  Channels
                </div>
                <div className={styles.channelNameCont} style={{display: projectName === ""? "none" : "flex"}}>
                  <div className={styles.hashtagCont}>
                    <Image src={hashtag} width={16} height={16} alt='hashtag-logo' className={styles.hashtagIcon}/>
                  </div>
                  <span className={styles.channelName}>{projectName}</span>
                </div>
            </div>
            <div className={styles.directMessageLabelCont}>
                <div className={styles.directMessageLabel}>
                        Direct messages
                </div>
            </div>
            <div className={styles.avatarAndNameCont}>
              <div className={styles.avatarAndName}>
                <Image src={avatarPicture} width={20} height={20} alt='slack-avatar' className={styles.avatarPic}/>
                <span className={styles.userName}>{avatarName}</span>
                <span className={styles.youContainer}>you</span>
              </div>
            </div>
        </div>
          <div className={styles.rightSideBarCont}>
            <div className={styles.stepsCounterCont}>
              Step 4 of 4
            </div>
            <h2 className={styles.setupHeader}>What's your team working on right now?</h2>
            <div className={styles.statement}>This could be anything: a project, campaign, event, or the deal you're trying to close.</div>
            <div className={styles.tagInputContainer}>
                  <input type='text' className={styles.tagInput} placeholder="Ex: Q4 budget, autumn campaign" onChange={updateProjectName} maxLength={80}/>
            </div>
              <div className={styles.inputContainer}>
                  <Link href="/">
                    <button type="submit" className={styles.nextButton} style={{backgroundColor: (projectName !== ""? "#4a154b" : "rgb(53, 55, 59)"), color: (projectName !== ""? "#fff" : "rgba(209, 210, 211, 0.75)")}} >Next
                    </button>
                  </Link>
              </div>
          </div>
      </div>
      </Provider>
  )
}
