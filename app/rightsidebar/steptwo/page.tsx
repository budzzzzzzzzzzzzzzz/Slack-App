'use client';

import React from 'react'
import styles from './page.module.css'
import { useState } from 'react'
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import slackEmptyAvatar from 'app/icons/slack-avatar.png'
import { Provider } from 'react-redux/es/exports';
import { inputName, store } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/app/config/firebase';
import * as yup from 'yup'
import { addDoc, collection } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface RegisterForm {
  profile_name: string;
  image_url: string;
}

export default function StepTwo() {

    const [user] = useAuthState(auth);

    const dataValidation = yup.object().shape({
      profile_name: yup.string(),
      image_url: yup.string(),
    })

    const {register, handleSubmit, formState: {errors}} = useForm<RegisterForm>({
      resolver: yupResolver(dataValidation),
    });

    const workspaceName = useSelector((state: any) => {return state.teamName.value.nameTeam});
    const initialName = useSelector((state: any) => {return state.teamName.value.emailAdd});
    const [profileName, setProfileName] = useState(initialName);
    const [selectedImage, setSelectedImage] = useState<File | StaticImageData>(slackEmptyAvatar);
    const dispatch = useDispatch();
    const [isUploadImage, setIsUploadedImage] = useState(false);
    const [imageURL, setImageURL] = useState<string>("");

    const updateProfileName = (e: any) => {
        setProfileName(e.target.value);
    }

    const updateImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setSelectedImage(e.target.files[0]);
        setIsUploadedImage(true);
        setImageURL(URL.createObjectURL(e.target.files[0]));
      }
      else {
        setIsUploadedImage(false);
      }
    }

    const registrationCollector = collection(db, "user_registration");

    const submitRegistration = async (data: RegisterForm) => {
      await addDoc(registrationCollector, {
          profile_name: data.profile_name,
          image_url: data.image_url,
          userId: user?.uid,
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
                <Image src={isUploadImage? imageURL : slackEmptyAvatar} width={20} height={20} alt='slack-avatar' className={styles.avatarPic}/>
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
            <form method='post'>
              <div className={styles.inputContainer}>
                  <input type='text' {...register("profile_name")} placeholder='Enter your full name' className={styles.teamNameInput} onChange={updateProfileName} defaultValue={profileName}  required/>

              <div className={styles.stepTwoRegisterCont}>
                <label className={styles.text}><span className={styles.textTwo}>Your profile photo</span> <span className={styles.textThree}>(optional)</span></label>
                <div className={styles.photoRegisterCont}>
                  <div className={styles.avatarCont}>
                    <Image src={isUploadImage? imageURL : slackEmptyAvatar} width={112} height={112} alt='slack-avatar-icon'/>
                  </div>
                  <div className={styles.avatarButtonCont}>
                    <div className={styles.statement}>Help your teammates know they're talking to the right person.</div>
                    <div className={styles.uploadButtonCont}>
                      <button className={styles.uploadButton} type='button'>
                        Upload Photo
                        <input {...register("image_url")} accept="image/*;capture=camera" aria-hidden="true" className={styles.hidden} type="file" data-qa="edit_profile_file_upload" onChange={updateImage}/>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
                    <button type="submit" className={styles.nextButton} style={{backgroundColor: (profileName !== ""? "#4a154b" : "rgb(53, 55, 59)"), color: (profileName !== ""? "#fff" : "rgba(209, 210, 211, 0.75)")}} aria-disabled={profileName !== ""? "false" : "true"} onClick={handleSubmit(submitRegistration)}>
                    <Link href="./rightsidebar/stepthree"  onClick={() => dispatch(inputName({nameTeam: workspaceName, profileName: profileName, profilePicture: imageURL}))}>Next</Link>
                    </button>
              </div>
            </form>
          </div>
      </div>
      </Provider>

  )
}
