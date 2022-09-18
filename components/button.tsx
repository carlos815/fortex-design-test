import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import style from "./button.module.css"

interface ButtonProps {
    children: React.ReactNode
    onClick: Function
}

const Button = (props: ButtonProps) => {
    return (
        <button className={style.button} onClick={(e) => { props.onClick(e) }}>
            {props.children}
        </button>
    )
}

export default Button
