import { InputHTMLAttributes } from "react";
import "./input.component.css"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export default function imput({label, ...props}: InputProps) {
    return (
        <div className="input-wrapper">
            <label>{ label }</label>
            <br />
            <input {...props} className="input-btn" />
        </div>
    )
}