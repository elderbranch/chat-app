import { useState } from "react";

const ModalInput = ({ func, text, className }) => {
  const [changeName, setChangeName] = useState(text)
  return (
    <>
      <button className={`w-full text-left ${className}`} onClick={() => document.getElementById('my_modal_1').showModal()}>{text}</button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <p className="py-4">Вы можете изменить свое имя</p>
          <div className="modal-action">
            <form method="dialog" className="flex between content-center w-full justify-around">
              <input className={className} value={changeName} onChange={(e) => setChangeName(e.target.value)} />
              <button className="btn rounded-[4px]">Close</button>
              <button className="btn bg-amber-600 rounded-[4px]" onClick={() => {
                func(changeName);
              }}>Save changes</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ModalInput