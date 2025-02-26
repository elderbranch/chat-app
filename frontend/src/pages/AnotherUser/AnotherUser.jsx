import { useParams } from "react-router-dom";
import { useChatStore } from "../../entities/chatStore/useChatStore";
import { Loader, User } from "lucide-react";
import { useEffect } from "react";


const AnotherUserPage = () => {
  const { id } = useParams();
  const { selectedUser, setSelectedUser, getUsers, users, isUsersLoading } = useChatStore();

  useEffect(() => {
    getUsers(); 
  }, []); 
  
  useEffect(() => {
    if (users.length > 0) {
      const user = users.find((user) => user._id === id);
      setSelectedUser(user);
    }
  }, [id, users]);

  if(isUsersLoading) {
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-20 animate-spin" />
    </div>
  }
  

  return (
    <div className="h-screen pt-20">
    <div className="max-w-2xl mx-auto p-4 py-8">
      <div className="bg-base-300 rounded-xl p-6 space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold ">Profile</h1>
          <p className="mt-2">Profile information</p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={selectedUser?.profilePic || "/avatar.png"}
              alt="Profile"
              className="size-32 rounded-full object-cover border-4 "
            />
          </div>
        </div>
        <div className="space-y-6">
          <div className="space-y-1.5">
            <div className="text-sm text-zinc-400 flex items-center gap-2">
              <User className="size-4" />
              Full Name
            </div>
            <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{selectedUser?.fullName}</p>
          </div>
        </div>

        <div className="mt-6 bg-base-300 rounded-xl p-6">
          <h2 className="text-lg font-medium mb-4">Account Information</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-zinc-700">
              <span>Member Since</span>
              <span>{selectedUser?.createdAt?.split("T")[0]}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span>Account Status</span>
              <span className="text-green-500">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div >
  )
}

export default AnotherUserPage;