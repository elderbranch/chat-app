import { useEffect, useState, useRef } from 'react'
import { useChatStore } from '../../entities/chatStore/useChatStore'
import SidebarSkeleton from './skeletons/SideBarSkeleton';
import { useAuthStore } from '../../entities/authStore/useAuthStore';
import Burger from './burger';

const SideBar = () => {
  const { getUsers, users, setSelectedUser, selectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [showSideBar, setShowSidebar] = useState(true);
  const [searchText, setSearchText] = useState("");

  const [sidebarWidth, setSidebarWidth] = useState(240); // Initial width in pixels
  const sidebarRef = useRef(240);

  useEffect(() => {
    getUsers();
    console.log(users);
  }, [getUsers]);

  const handleResize = () => {
    setShowSidebar(!showSideBar);
    setSidebarWidth(showSideBar ? 85 : 240)
  };

  const filteredUsers = showOnlineOnly
    ? users.filter(user => onlineUsers.includes(user._id))
    : users.filter(user => user.fullName.toLowerCase().includes(String(searchText).toLowerCase()));

    const handleMouseDown = () => {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };
  
    const handleTouchStart = () => {
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
    };
  
    const handleMouseMove = (e) => {
      resizeSidebar(e.clientX);
    };
  
    const handleTouchMove = (e) => {
      resizeSidebar(e.touches[0].clientX);
    };
  
    const resizeSidebar = (positionX) => {
      const newWidth = positionX - sidebarRef.current.getBoundingClientRect().left;
      if (newWidth > 180 && newWidth < 800) {
        setSidebarWidth(newWidth);
      } 
      if (newWidth < 180) {
        handleResize(); // Возможно, функция скрытия
      }
    };
  
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  
    const handleTouchEnd = () => {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  

  if (isUsersLoading) return <SidebarSkeleton />
  
  return (
    <aside
      ref={sidebarRef}
      className={`relative h-full border-r border-base-300 flex flex-col transition-all duration-200  `}
      style={{ width: sidebarWidth }}
    >
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2 mb-2.5"  onClick={() => handleResize()}>
          <Burger className="mr-3 cursor-pointer" />
          <span className={`${showSideBar ? '' : 'hidden'}`}>Chats</span>
        </div>
        <label className={`input rounded-[8px] flex items-center gap-2 ${showSideBar ? '' : 'hidden'}`}>
          <input type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)} className="grow" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd" />
          </svg>
        </label>
        <div className={`mt-3 hidden sm:flex items-center gap-2 ${showSideBar ? '' : 'hidden'}`}>
          <label className={`cursor-pointer flex items-center gap-2 ${showSideBar ? '' : 'hidden'}`}>
            <input type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className='text-sm'>Show online only</span>
          </label>
          <span className={`text-xs text-zinc-500 ${showSideBar ? '' : 'hidden'}`}>({onlineUsers.length - 1} online)</span>
        </div>
      </div>
      <div
        className="absolute right-0 h-full w-2.5 cursor-col-resize "
        onMouseDown={handleMouseDown}
      />
      <div className={`overflow-y-auto w-full py-3`}>
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3 max-lg:justify-between
              hover:bg-base-300 transition-colors overflow-hidden
              ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
          >
            <div className="relative block lg:mx-0 min-w-3">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12  rounded-full object-cover"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            <div className={`block text-left min-w-0  ${showSideBar ? '' : 'hidden'}`}>
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400 text-right lg:text-left">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>

    </aside>
  )
}

export default SideBar;