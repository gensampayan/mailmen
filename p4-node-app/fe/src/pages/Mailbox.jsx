import { useState, useEffect } from "react";
import axiosCall from "../utils/axiosCall";
import ComposeBtn from "../components/ComposeBtn";

const Mailbox = () => {
  const [isWriting, setIsWriting] = useState(true);

  const handleComposeBtn = () => {
    setIsWriting(writing => !writing);
    console.log(isWriting)
  }

  return (
    <div className="mt-1">
      <div className="flex flex-row">
        <div className="w-1/4 ml-5">
          <p className="font-bold text-custom-blue">
            MailMen
          </p>
        </div>
        <div className="w-3/4">
          <input type="text" placeholder="Search mail"/>
        </div>
        <div className="w-auto">
          <p>Profile</p>
        </div>
      </div>
      <div>
        <ComposeBtn 
          onWriting={handleComposeBtn}
        />
      </div>
    </div>
  )
}

export default Mailbox;
