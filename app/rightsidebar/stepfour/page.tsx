'use client';

import React from 'react'
import styles from './page.module.css'
import { useState } from 'react'
import { Provider } from 'react-redux';
import { store } from '../store';
import Link from 'next/link';
import Image from 'next/image';
import coworkerAvatarIcon from 'app/icons/slack-avatar-coworkers.png'
import { useSelector, useDispatch } from 'react-redux';
import hashtag from 'app/icons/hashtagIcon.png'
import {addDoc, collection} from 'firebase/firestore'
import { db } from '@/app/config/firebase';
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from '@/app/config/firebase';
import * as yup from 'yup'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface RegisterForm {
  email: string;
  password: string;
  confirm_password: string;
  username: Array<string>;
  coworker_names: Array<string>;
  project_name: string;
  team_name: string;
  avatar_name: string;
  photo_url: string;
}

export default function StepThree() {
    const [names, setNames] = useState([""]);
    const [coworkers, setCoworker] = useState([""]);
    const [projectName, setProjectName] = useState("");

    const workspaceName = useSelector((state: any) => {return state.teamName.value.nameTeam});
    const avatarName = useSelector((state: any) => {return state.teamName.value.profileName});
    const avatarPicture = useSelector((state: any) => {return state.teamName.value.profilePicture});
    const coworkerNames = useSelector((state: any) => {return state.teamName.value.coworkers});
    const emailName = useSelector((state: any) => {return state.teamName.value.coworkers});
    const userPassword = useSelector((state: any) => {return state.teamName.value.coworkers});
    const userConfirmPassword = useSelector((state: any) => {return state.teamName.value.confirm_password});

    const [user] = useAuthState(auth);

    const dataValidation = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required(),
      confirm_password: yup.string().oneOf([yup.ref("password")]).required(),
      username: yup.string(),
      coworker_names: yup.array(),
      project_names: yup.string(),
      team_name: yup.string(),
      avatar_name: yup.string(),
      photo_url: yup.string(),
  })

  const {register, handleSubmit, formState: {errors}} =         useForm<RegisterForm>({
        resolver: yupResolver(dataValidation),
    });

    const updateProjectName = (event: any) => {
      setProjectName(event.target.value);
    }

    const registrationCollector = collection(db, "user_profile");
    const submitRegistration = async (data: RegisterForm) => {
        await addDoc(registrationCollector, {
            email: data.email,
            password: data.password,
            confirm_password: data.confirm_password,
            userId: user?.uid,
            coworker_names: data.coworker_names,
            project_name: data.project_name,
            username: data.username,
            photo_url: data.photo_url,
            team_name: data.team_name,
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
              {
                coworkers.length > 0 && coworkerNames.map((value: any, index: number) => {
                  if (value === "") return;
                  return <div className={styles.avatarAndName} key={index}>
                            <Image src={coworkerAvatarIcon} width={20} height={20} alt='slack-avatar' className={styles.avatarPic}/>
                            <span className={styles.userName}>{value}</span>
                          </div>
                })
              }
            </div>
        </div>
        <form method='post'>
        <div className={styles.rightSideBarCont}>
            <div className={styles.stepsCounterCont}>
              Step 4 of 4
            </div>

            <h2 className={styles.setupHeader}>What's your team working on right now?</h2>
            <div className={styles.statement}>This could be anything: a project, campaign, event, or the deal you're trying to close.</div>
            <div className={styles.tagInputContainer}>
                  <input type='text' {...register("project_name")} className={styles.tagInput} placeholder="Ex: Q4 budget, autumn campaign" onChange={updateProjectName} maxLength={80}/>
            </div>
              <div className={styles.inputContainer}>

                    <button type="submit" className={styles.nextButton} style={{backgroundColor: (projectName !== ""? "#4a154b" : "rgb(53, 55, 59)"), color: (projectName !== ""? "#fff" : "rgba(209, 210, 211, 0.75)")}}  onClick={handleSubmit(submitRegistration)}>Next
                    </button>
                    {/*<Link href="/"></Link>*/}
              </div>
          </div>
        </form>
      </div>
      </Provider>
  )
}
