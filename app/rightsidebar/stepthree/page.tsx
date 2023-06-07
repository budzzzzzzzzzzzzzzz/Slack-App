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
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/app/config/firebase';
import * as yup from 'yup'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateDoc, doc } from 'firebase/firestore';
import { arrayUnion } from 'firebase/firestore';

interface RegisterForm {
  coworker_names: Array<string>;
}

export default function StepThree() {

    const dataValidation = yup.object().shape({
      coworker_names: yup.array().of(yup.string())
    })

    const {register, handleSubmit, formState: {errors}} = useForm<RegisterForm>({
      resolver: yupResolver(dataValidation),
    });

    const [user] = useAuthState(auth);
    const [names, setNames] = useState([""]);
    const [coworkers, setCoworker] = useState([""]);
    const [isThereNames, setIsThereNames] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const workspaceName = useSelector((state: any) => {return state.teamName.value.nameTeam});
    const avatarName = useSelector((state: any) => {return state.teamName.value.profileName});
    const avatarPicture = useSelector((state: any) => {return state.teamName.value.profilePicture});


    const dispatch = useDispatch();

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

    const registrationCollector = doc(db, "user_registration", "JkMUbpz5jnxaEv147k2L");

    const submitRegistration = async (data: RegisterForm) => {
      await updateDoc(registrationCollector, {
          coworker_names: arrayUnion(data.coworker_names),
      })
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
                <Image src={avatarPicture} width={20} height={20} alt='slack-avatar' className={styles.avatarPic}/>
                <span className={styles.userName}>{avatarName}</span>
                <span className={styles.youContainer}>you</span>
              </div>
              {
                coworkers.map((value, index) => {
                  if (value === "") return;
                  return <div className={styles.avatarAndName} key={index} >
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
                  <input type='email' className={styles.tagInput} placeholder={isThereNames? "" : 'Ex. ellis@gmail.com'} onKeyDown={handleKeyDown} {...register("coworker_names")}/>
                </div>
            </div>
              <div className={styles.inputContainer}>
                    <button type="submit" className={styles.nextButton} style={{backgroundColor: (names[names.length - 1] !== ""? "#4a154b" : "rgb(53, 55, 59)"), color: (names[names.length - 1] !== ""? "#fff" : "rgba(209, 210, 211, 0.75)")}} aria-disabled={names.length === 1? "false" : "true"} onClick={handleSubmit(submitRegistration)}>
                    <Link href="./rightsidebar/stepfour" onClick={() => dispatch(inputName({coworkers: coworkers, profilePicture: avatarPicture, nameTeam: workspaceName, profileName: avatarName}))}>
                      Next
                    </Link>
                    </button>
                  <button className={styles.copyLinkButton}>
                    <div className={styles.chainImageCont}>
                      <Image src={copyLink} className={styles.chainImage} width={18} height={18} alt='copy-link'/>
                    </div>
                    <span className={styles.copyLinkLabel}>Copy Invite Link </span>
                  </button>
                    <button className={styles.skipButton} onClick={() => setShowConfirmation(true)} >Skip this step
                    </button>
              </div>
          </div>
      </div>
      {showConfirmation && <Confirmation toShow={showConfirmation} function={() => {setShowConfirmation(!showConfirmation)}} array={names}/>}
      </Provider>
  )
}

function Confirmation(props: any) {

  return (

      <div className={styles.confirmationCont} style={{display: props.toShow? "flex" : "none"}}>
        {props.array.length === 1 && (<div className={styles.confirmation}>
          <div className={styles.titleBar}>
            <div className={styles.questionTextCont}>
              <h1 className={styles.questionText}>Skip without inviting?</h1>
            </div>
              <div className={styles.closeButtonCont}>
                <button className={styles.closeButton}>
                  <span className="material-symbols-outlined" onClick={props.function}>
                    close
                  </span>
                </button>
              </div>
          </div>
          <div className={styles.content}>
              <p className={styles.textStatement}>To really get a feel for Slack - and to see all the ways it can simplify your team's work - you'll need a few coworkers here.</p>
          </div>
          <div className={styles.skipCancelCont}>
            <div className={styles.skipCancelButtons}>
              <button className={styles.cancelButton} onClick={props.function}>Cancel</button>
              <Link href="./rightsidebar/stepfour2">
              <button className={styles.skipStepButton}>Skip Step</button>
              </Link>
            </div>
          </div>
        </div>)}

        {props.array.length === 2 && (<div className={styles.confirmation}>
          <div className={styles.titleBar}>
            <div className={styles.questionTextCont}>
              <h1 className={styles.questionText}>Skip without inviting?</h1>
            </div>
              <div className={styles.closeButtonCont}>
                <button className={styles.closeButton}>
                  <span className="material-symbols-outlined" onClick={props.function}>
                    close
                  </span>
                </button>
              </div>

          </div>
          <div className={styles.content}>
              <p className={styles.textStatement}>Are you sure you want to skip this step without inviting <strong>{props.array[1]}</strong>?</p>
          </div>
          <div className={styles.skipCancelCont}>
            <div className={styles.skipCancelButtons}>
              <button className={styles.cancelButton} onClick={props.function}>Cancel</button>
              <Link href="./rightsidebar/stepfour2">
              <button className={styles.skipStepButton}>Skip Step</button>
              </Link>
            </div>
          </div>
        </div>)}

        {props.array.length === 3 && (<div className={styles.confirmation}>
          <div className={styles.titleBar}>
            <div className={styles.questionTextCont}>
              <h1 className={styles.questionText}>Skip without inviting?</h1>
            </div>
              <div className={styles.closeButtonCont}>
                <button className={styles.closeButton}>
                  <span className="material-symbols-outlined" onClick={props.function}>
                    close
                  </span>
                </button>
              </div>

          </div>
          <div className={styles.content}>
              <p className={styles.textStatement}>Are you sure you want to skip this step without inviting <strong>{props.array[1]}</strong> and <strong>{props.array[2]}</strong>?</p>
          </div>
          <div className={styles.skipCancelCont}>
            <div className={styles.skipCancelButtons}>
              <button className={styles.cancelButton} onClick={props.function}>Cancel</button>
              <Link href="./rightsidebar/stepfour2">
              <button className={styles.skipStepButton}>Skip Step</button>
              </Link>
            </div>
          </div>
        </div>)}

        {props.array.length > 3 && (<div className={styles.confirmation}>
          <div className={styles.titleBar}>
            <div className={styles.questionTextCont}>
              <h1 className={styles.questionText}>Skip without inviting?</h1>
            </div>
              <div className={styles.closeButtonCont}>
                <button className={styles.closeButton}>
                  <span className="material-symbols-outlined" onClick={props.function}>
                    close
                  </span>
                </button>
              </div>

          </div>
          <div className={styles.content}>
              <p className={styles.textStatement}>Are you sure you want to skip this step without inviting <strong>{props.array[1]}</strong> and <strong>{props.array[2]}</strong> and {props.array.length - 3} {props.array.length - 3 > 1? "others" : "other"}?</p>
          </div>
          <div className={styles.skipCancelCont}>
            <div className={styles.skipCancelButtons}>
              <button className={styles.cancelButton} onClick={props.function}>Cancel</button>
              <Link href="./rightsidebar/stepfour2">
              <button className={styles.skipStepButton}>Skip Step</button>
              </Link>
            </div>
          </div>
        </div>)}
      </div>
    )
}
