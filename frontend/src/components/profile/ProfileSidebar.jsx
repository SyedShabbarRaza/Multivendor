import React from 'react'
import { AiOutlineCreditCard, AiOutlineMessage } from 'react-icons/ai';
import { BiLogIn, BiShoppingBag } from 'react-icons/bi';
import { MdOutlineTrackChanges } from 'react-icons/md';
import { RxPerson } from 'react-icons/rx';
import { TbAddressBook } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import server from '../../server';
import { toast } from 'react-toastify';

function ProfileSidebar({active,setActive}) {
    const navigate=useNavigate();
    const logoutHandler=()=>{
    axios.get(`${server}/api/auth/logout`,{withCredentials:true}).then((res)=>{
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/login");
    }).catch((error)=>{
console.log(error.response.data.message)
    })        
    }
    return (
    <div className='w-full bg-white mt-10 shadow-2xl border border-green-300 rounded-[10px] p-4 pt-8'>
        <div className="flex cursor-pointer items-center mb-10 w-full" onClick={()=>setActive(1)}>
            <RxPerson size={20} color={active===1?"red":""}/>
            <span className={`${active===1?"text-[red] ":""} hidden md:block `} >Profile</span>
        </div>
        <div className="flex cursor-pointer items-center mb-10" onClick={()=>setActive(2)}>
            <BiShoppingBag size={20} color={active===2?"red":""}/>
            <span className={`${active===2?"text-[red] ":""} hidden md:block `}>orders</span>
        </div>
        <div className="flex cursor-pointer items-center mb-10" onClick={()=>setActive(3)}>
            <RxPerson size={20} color={active===3?"red":""}/>
            <span className={`${active===3?"text-[red] ":""} hidden md:block `}>Refunds</span>
        </div>
        <div className="flex cursor-pointer items-center mb-10" onClick={()=>setActive(4)|| navigate("/inbox")}>
            <AiOutlineMessage size={20} color={active===4?"red":""}/>
            <span className={`${active===4?"text-[red] ":""} hidden md:block `}>Inbox</span>
        </div>
        <div className="flex cursor-pointer items-center mb-10" onClick={()=>setActive(5)}>
            <MdOutlineTrackChanges size={20} color={active===5?"red":""}/>
            <span className={`${active===5?"text-[red] ":""} hidden md:block `}>Track Order</span>
        </div>
        <div className="flex cursor-pointer items-center mb-10" onClick={()=>setActive(6)}>
            <AiOutlineCreditCard size={20} color={active===6?"red":""}/>
            <span className={`${active===6?"text-[red] ":""} hidden md:block `}>Payment Method</span>
        </div>
        <div className="flex cursor-pointer items-center mb-10" onClick={()=>setActive(7)}>
            <TbAddressBook size={20} color={active===7?"red":""}/>
            <span className={`${active===7?"text-[red] ":""} hidden md:block `}>Address Book</span>
        </div>
        <div className="flex cursor-pointer items-center mb-10" onClick={()=>setActive(8)|| logoutHandler()}>
            <BiLogIn size={20} color={active===8?"red":""}/>
            <span className={`${active===8?"text-[red] ":""} hidden md:block `}>Login</span>
        </div>
    </div>
  )
}

export default ProfileSidebar