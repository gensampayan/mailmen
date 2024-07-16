
const ComposeBtn = ({ onWriting }) => {
  return (
    <button 
      className="ml-5 py-4 px-3 w-fit rounded text-white bg-custom-blue"
      onClick={onWriting}
    >
      Compose
    </button>
  )
}

export default ComposeBtn;
