import { useState, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import axiosCall from "../utils/axiosCall";
import ComposeBtn from "../components/ComposeBtn";
import ComposeForm from "../components/ComposeForm";
import MailList from "../components/MailList";
import { initialState, MailReducer } from "../reducers/MailReducer";

const Mailbox = () => {
  const [isWriting, setIsWriting] = useState(false);
  const [formData, setFormData] = useState({
    contact: "",
    subject: "",
    body: "",
    attachment: null
  });
  const [state, dispatch] = useReducer(MailReducer, initialState);
  const [error, setError] = useState("");
  const [localMails, setLocalMails] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchMails = async () => {
      try {
        const { data } = await axiosCall("get", "emails");
        dispatch({ type: "LIST_MAIL", payload: data });
        setLocalMails(data);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };
    fetchMails();
  }, []);

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();

      const formDataToSend = new FormData();
      formDataToSend.append("contact", formData.contact);
      formDataToSend.append("subject", formData.subject);
      formDataToSend.append("body", formData.body);
      formDataToSend.append("attachment", formData.attachment);

      const { data } = await axiosCall("post", "emails/compose", formDataToSend);

      const updatedMails = [data, ...state.mails];
      localStorage.setItem("mails", JSON.stringify(updatedMails));
      dispatch({ type: "ADD_MAIL", payload: data });

      setFormData({
        contact: "",
        subject: "",
        body: "",
        attachment: null
      });
      setIsWriting(false);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  const handleFileData = (e) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      attachment: file
    }));
  };

  const handleComposeBtn = () => {
    setIsWriting((writing) => !writing);
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredMails = localMails.filter(mail =>
    mail.contact.toLowerCase().includes(searchInput.toLowerCase()) ||
    mail.subject.toLowerCase().includes(searchInput.toLowerCase()) ||
    mail.body.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="mt-1">
      <div className="flex flex-row">
        <div className="w-1/4 ml-5">
          <p className="font-bold text-custom-blue p-3">
            <Link to="/mailbox">
              MailMen
            </Link>
          </p>
        </div>
        <div className="w-3/4">
          <input 
            type="text" 
            placeholder="Search mail" 
            className="w-3/4 p-2 border border-gray-200 rounded-md outline-none"
            value={searchInput}
            onChange={handleSearchInput}
          />
        </div>
      </div>
      <div className="flex flex-row gap-5">
        <div>
          <ComposeBtn onWriting={handleComposeBtn} />
          {isWriting && (
            <ComposeForm
              inContactValue={formData.contact}
              inSubjectValue={formData.subject}
              inContentValue={formData.body}
              inUploadValue={formData.attachment}
              inUploadChange={handleFileData}
              inChange={handleFormData}
              inSubmit={handleFormSubmit}
            />
          )}
        </div>
        <div>
          <MailList mails={filteredMails} />
        </div>
      </div>
    </div>
  );
}

export default Mailbox;
