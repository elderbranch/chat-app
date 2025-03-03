const Modal = ({func, text, icon}) => {
  return (
    <>
      <button className="flex items-center gap-2 cursor-pointe" onClick={() => document.getElementById('my_modal_5').showModal()}>
        {icon}
        {text}
        </button>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle cursor-pointe">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Are you sure that you want to logout?</p>
          <div className="modal-action">
            <form method="dialog" className="flex justify-between w-full" >
              <button className="btn">Close</button>
              <button className="btn bg-amber-600" onClick={func}>Logout</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default Modal