import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { useAuth } from '@/context/auth-provider'
import { ChatAvatar } from './Avatars'
import { ChevronUp } from 'lucide-react'
import { removeToken } from '@/lib/auth'
import { useNavigate } from 'react-router-dom'

function Profile() {
    const {user, handleUser} = useAuth()

    const navigate = useNavigate()
    function handleLogout(){
      removeToken()
      handleUser(null)
      navigate(`/login`)
    }

    if(!user) return <></>
    
    
  return (
    <Popover >
        <PopoverContent onClick={handleLogout} className='cursor-pointer w-60 text-center'>
                 Logout
        </PopoverContent>
        <PopoverTrigger className='bg-black mx-2 h-14 gap-2 flex flex-row justify-between items-center'>
              <ChatAvatar />
              <h2 className='item-center flex justify-center text-xl font-normal'>
                    {
                        user.username
                    }
              </h2>
              <ChevronUp className='text-white w-10' />

        </PopoverTrigger>
    </Popover>
  )
}

export default Profile