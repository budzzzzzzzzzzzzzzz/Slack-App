'use client';

import React from 'react'
import styles from './page.module.css'
import { useState } from 'react'
import { Provider } from 'react-redux';
import { store } from '../store';
import Link from 'next/link';
import Image from 'next/image';
import slackEmptyAvatar from 'app/icons/slack-avatar.png'
import paperPlane from 'app/icons/paper-plane.png'
import coworkerAvatarIcon from 'app/icons/slack-avatar-coworkers.png'
import copyLink from 'app/icons/copy-link.png'
import { inputName } from '../store';
import { useSelector, useDispatch } from 'react-redux';

export default function StepThree() {
    const [teamName, setTeamName] = useState("");
    const [names, setNames] = useState([""]);
    const [coworkers, setCoworker] = useState([""]);
    const [isThereNames, setIsThereNames] = useState(false);
    const updateTeamName = (e: any) => {
        setTeamName(e.target.value);
    }

    const workspaceName = useSelector((state: any) => {return state.teamName.value.nameTeam});
    const avatarName = useSelector((state: any) => {return state.teamName.value.profileName});

    const handleKeyDown = (event: any) => {
      if (event.key !== 'Enter') return;
      const nameVal = event.target.value;

      if (!nameVal.trim()) return;
      setNames([...names, nameVal]);
      for (let i = 0; i < nameVal.length; ++i) {
        if (nameVal[i] === '@') {
          const newString = nameVal.substr(0, i);
          setCoworker([...coworkers, newString]);
        }
      }
      setIsThereNames(true);
      event.target.value = "";
    }

    const deleteTag = (index: number) => {
      setNames(names.filter((el, i) => i !== index));
      setCoworker(coworkers.filter((el, i) => i !== index));
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
                <span className={styles.userName}>{avatarName}</span>
                <span className={styles.youContainer}>you</span>
              </div>
              {
                coworkers.map((value, index) => {
                  if (value === "") return;
                  return <div className={styles.avatarAndName} key={index}>
                            <Image src={coworkerAvatarIcon} width={20} height={20} alt='slack-avatar' className={styles.avatarPic}/>
                            <span className={styles.userName}>{value}</span>
                          </div>
                })
              }
            </div>
        </div>
          <div className={styles.rightSideBarCont}>
            <div className={styles.stepsCounterCont}>
              Step 3 of 4
            </div>
            <h2 className={styles.setupHeader}>Who else is on the {workspaceName} team?</h2>
            <div className={styles.addCoWorkerText}>
                <div>Add coworker by email</div>
            </div>

            <div className={styles.container}>
                <div className={styles.tagContainer}>
                {
                      names.map((values, index) => {
                        if (values === "") {
                          return
                        }
                        return <div className={styles.tag} key={index}>
                          <span className={styles.paperPlane}><Image src={paperPlane} width={20} height={20} alt='paper-plane'/>
                          </span>
                          <span>{values}</span>
                          <span className="material-symbols-outlined" onClick={() => deleteTag(index)}>close</span>
                        </div>
                      })
                }
                </div>
                <div className={styles.tagInputContainer}>
                  <input className={styles.tagInput} placeholder={isThereNames? "" : 'Ex. ellis@gmail.com'} onKeyDown={handleKeyDown}/>
                </div>
            </div>

              <div className={styles.inputContainer}>
                  <Link href="/">
                    <button type="submit" className={styles.nextButton} style={{backgroundColor: (names[names.length - 1] !== ""? "#4a154b" : "rgb(53, 55, 59)"), color: (names[names.length - 1] !== ""? "#fff" : "rgba(209, 210, 211, 0.75)")}} aria-disabled={teamName !== ""? "false" : "true"}>Next</button>
                  </Link>

                  <button className={styles.copyLinkButton}>
                    <div className={styles.chainImageCont}>
                      <Image src={copyLink} className={styles.chainImage} width={18} height={18} alt='copy-link'/>
                    </div>
                    <span className={styles.copyLinkLabel}>Copy Invite Link </span>
                  </button>
                  <button className={styles.skipButton}>Skip this step</button>
              </div>
          </div>
      </div>
      </Provider>
  )
}
