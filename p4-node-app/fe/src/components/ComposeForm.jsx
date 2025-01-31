
const ComposeForm = ({ inContactValue, inSubjectValue, inContentValue, inUploadValue, inUploadChange, inChange, inSubmit }) => {

  return (

    <div className="border-2 border-gray-400 w-1/3 ml-5 mt-1 fixed absolute z-50">
      <p className="bg-gray-300">New Message</p>
      <form 
        onSubmit={inSubmit}
        className="flex flex-col"
      >
      <div className="flex flex-row border-b-2 border-gray-400 w-full p-1">
        <label>To:</label>
        <input 
          type="text" 
          name="contact"
          value={inContactValue}
          onChange={inChange}  
          className="outline-none pl-1"
        />
      </div>
      <input 
        type="text" 
        name="subject"
        placeholder="Subject" 
        value={inSubjectValue}  
        onChange={inChange}  
        className="border-b-2 border-gray-400 w-auto outline-none p-1"
      />
      <textarea
        name="body"
        value={inContentValue}
        onChange={inChange}  
        className="resize-none h-96 border-b-2 border-gray-400 w-auto outline-none p-1  "
      >
      </textarea>
      <input 
        type="file" 
        name="email-image"
        onChange={inUploadChange}  
      />
      <button 
        type="submit"
        className="p-2 w-auto text-white bg-custom-blue"
      >
        Send
      </button>
    </form>
    </div>
  )
}

export default ComposeForm;
