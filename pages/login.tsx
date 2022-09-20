import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'
// import Button from '../components/button'
// import Input from '../components/input'
import { useData } from '../contexts/dataContext'
import styles from '../styles/Login.module.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Cookies from 'js-cookie'


const Login: NextPage = () => {
  const router = useRouter();
  const accessToken = () => Cookies.get('access_token')

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { logIn }: any = useData()

  const onSubmitForm = useCallback(async (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault()
    try {
      await logIn(username, password)
      router.replace("/");
    } catch (error) {
      console.log(error)
    }
  }, [username, password])

  useEffect(() => {
    if (accessToken()) {
      router.replace("/");
    }
  }, [])


  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.page}>

        <div className={styles.main}>
          <Image src="/logo_original 1.png" width={220} height={72} />


          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 2, width: '100%' },
            }}

            autoComplete="off"

            className={styles.form} onSubmit={(e) => { onSubmitForm(e) }}>
            <TextField label='Email' placeholder='Email' value={username} onChange={(e) => { setUsername(e.target.value) }} />

            <TextField label='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" />

            <Button variant="contained" type="submit" color="primary">Sign Up</Button>

          </Box>

        </div>
        <div className={styles.background}>        <Image src="/background.png" layout="fill" objectFit='cover' />
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Login
