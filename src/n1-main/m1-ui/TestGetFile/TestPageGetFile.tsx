import {ChangeEvent, useRef, useState} from "react";


export const TestPageGetFile = () => {

    const clickInputRef = useRef<HTMLInputElement>(null);

    const [fileInput, setFileInput] = useState<any>();
    const [fileURL, setFileURL] = useState<any>();

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files && e.target.files[0]

        if (file) {
            setFileInput(file)
            setFileURL(window.URL.createObjectURL(file));
        }
    }
    return (

        <div style={{textAlign: "center"}}>
            <div>
                <input
                    type="file"
                    style={{display: "none"}}
                    ref={clickInputRef}
                    onChange={inputChangeHandler}
                />

                <button onClick={() => clickInputRef && clickInputRef.current && clickInputRef.current.click()}>
                    add file
                </button>
                
                <div>
                    <img src={fileURL} alt=""/>
                </div>
            </div>


        </div>


    )
}