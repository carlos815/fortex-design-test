import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import style from "./button.module.css"

const Button = () => {
    return (
        <button className={style.button}>
            This a button
        </button>
    )
}

export default Button
