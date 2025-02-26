const Burger = ({...props}) => {
  return (
    <div className={`flex flex-col gap-1 ${props.className}`}>
      <span className="w-[15px] h-[1px] bg-white rounded-full"></span>
      <span className="w-[15px] h-[1px] bg-white rounded-full"></span>
      <span className="w-[15px] h-[1px] bg-white rounded-full"></span>
    </div>
  )
}

export default Burger