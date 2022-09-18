import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { ChangeEvent } from 'react'
import style from "./input.module.css"

interface InputProps {
    title: string
    placeholder?: string
    onChange(e: ChangeEvent<HTMLInputElement>): void
    value: string
}

const Input = (props: InputProps) => {
    return (
        <div className={style.inputWrapper}>
            <h5 className={style.title}>{props.title ?? "title here"}</h5>
            <input className={style.input} placeholder={props.placeholder ?? "text here"} onChange={(e) => { props.onChange(e) }} value={props.value} />
        </div>

    )
}

export default Input
