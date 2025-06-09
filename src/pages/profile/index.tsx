
import usersGlobalStore, { type usersStoreType } from '../../store/users-store';
import PageTitle from '../../components/PageTitle';
import { getDateTimeFormat } from '../../formatting/dateTime';

function ProfilePage() {
  const {currentUser}: usersStoreType = usersGlobalStore() as usersStoreType

  if (!currentUser) return null
   const renderUserInfo = (label: string, value: any) => {
    return (
        <div className="flex flex-col">
            <span className=" text-gray-500">{label}</span>
            <span className="text-gray-800  font-semibold">{value}</span>
        </div>
    )
  }
  return (
    <div>
      <PageTitle title="Profile" />

      <div className='flex flex-col items-start h-96  justify-evenly'>
        <div className='bg-gray-100 text-xl px-3 rounded-lg'>

        {renderUserInfo("Name", currentUser?.name)}
        </div>
        <div className='bg-gray-100 text-xl px-3 rounded-lg'>
        {renderUserInfo("Email", currentUser?.email)}
        </div>
        <div className='bg-gray-100 text-xl px-3 rounded-lg'>

        {renderUserInfo("User Id", currentUser?._id)}
        </div>
        <div className='bg-gray-100 text-xl px-3 rounded-lg'>

        {renderUserInfo("Role", currentUser?.isStaff ? "Admin" : "User")}
        </div>
        <div className='bg-gray-100 text-xl px-3 rounded-lg '>

        {renderUserInfo("Created At", getDateTimeFormat(currentUser?.createdAt))}
        </div>

      </div>
    </div>
  )
}

export default ProfilePage
