import { useState, useEffect, useReducer } from "react";
import axiosCall from "../utils/axiosCall";
import ComposeBtn from "../components/ComposeBtn";
import ComposeForm from "../components/ComposeForm";
import { initialState, MailReducer } from "../reducers/MailReducer";

const Mailbox = () => {
  const [isWriting, setIsWriting] = useState(true);
  const [formData, setFormData] = useState({
    contact: "",
    subject: "",
    body: "",
    attachment: null
  });
  const [state, dispatch] = useReducer(MailReducer, initialState);
  const [error, setError] = useState("");

  const handleFormData = (e) => {
    const {name, value} = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  }

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();

      const formDataToSend = new FormData();
      formDataToSend.append("contact", formData.contact);
      formDataToSend.append("subject", formData.subject);
      formDataToSend.append("body", formData.body);
      formDataToSend.append("attachment", formData.attachment);

      const { data } = await axiosCall("post", "emails/compose", formDataToSend);

      localStorage.setItem("mail", JSON.stringify(data));
      dispatch({ type: "ADD_MAIL", payload: data });
    } catch(error) {
      console.error(error);
      setError(error);
    }
  }

  const handleFileData = (e) => {
    const file = e.target.files[0];
    setFormData(prevFormData => ({
      ...prevFormData,
      attachment: file
    }));
  }

  const handleComposeBtn = () => {
    setIsWriting(writing => !writing);
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
        {
          isWriting && (
            <ComposeForm 
              inContactValue={formData.contact}
              inSubjectValue={formData.subject}
              inContentValue={formData.body}
              inUploadValue={formData.attachment}
              inUploadChange={handleFileData}
              inChange={handleFormData}
              inSubmit={handleFormSubmit}
            />
          )
        }
      </div>
    </div>
  )
}

export default Mailbox;
