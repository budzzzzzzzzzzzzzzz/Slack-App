import Image from 'next/image'
import styles from './page.module.css'
import slackIcon from 'app/icons/slack-icon.png'
import googleIcon from 'app/icons/google.png'
import appleLogo from 'app/icons/apple-logo.png'
import Link from 'next/link'


export default function Home() {
  return (
    <main>
      <div className={styles.signInContainer}>
        <header className={styles.signInHeader}>
            <div className={styles.leftColumn}></div>
            <div className={styles.centerColumn}>
              <Image src={slackIcon} width={32} height={32} alt='slack-icon'/>
              <h1 className={styles.slackText}>slack</h1>
            </div>
            <div className={styles.rightColumn}>
              <span>New To Slack?</span>
                      <Link href="/registration" className={styles.registrationLink}>
                          <span>Create an account</span>
                      </Link>
            </div>
        </header>
        <div className={styles.signIn}>
          <h1 className={styles.signInToSlack}>
            Sign in to Slack
          </h1>
          <span className={styles.suggestSpan}>We suggest using the <strong>email address you use at work.</strong>
          </span>

          <div className={styles.buttonsContainer}>
              <Link href="/">
                  <button className={styles.googleSignInButton}>
                  <Image src={googleIcon} width={18} height={18} alt='google icon'/>
                  <span className={styles.signInWithGoogle}>Sign In With Google
                  </span>
                  </button>
              </Link>
                  <Link href="/">
                    <button className={styles.appleSignInButton}>
                    <Image src={appleLogo} width={18} height={18} alt='apple icon'/>
                    <span className={styles.signInWithApple}>Sign In With Apple
                    </span>
                    </button>
                  </Link>
          </div>
          <div className={styles.orContainer}>
                  <hr className={styles.leftHorizontalLine}/>
                  <div className={styles.or}>OR</div>
                  <hr className={styles.rightHorizontalLine}/>
          </div>
          <div className='email-input-container'>
                    <form className={styles.emailForm} method='get'>
                        <input className={styles.emailInput} type='text' placeholder='name@work-email.com'/>
                        <span className={styles.errorMessage}></span>
                        <input className={styles.passwordInput} type='password' placeholder='Enter Password'/>
                        <span className={styles.errorMessage}></span>
                        <button type='submit' className={styles.emailSubmitButton}>Log In</button>
                    </form>
                </div>
        </div>
      </div>
    </main>
  )
}
