
const Mailbox = ({}) => {

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
    </div>
  )
}

export default Mailbox;
