import { Button, CustomModal, Dropdown, DropdownWithFlag, Input } from "@/components/ui";
import Image from "next/image";
import { useState } from "react";
import { UserRoles } from "@/utils/constants";
import { HeaderModel } from "../models/users.module";


const initialFormData = {
    email: '',
    role: 'Desk Officer',
    continent: 'Africa',
    country: {
        name: '',
    }
  }



function Header({ filter }: HeaderModel) {
  const [ toggleModal, setToggleModal ] = useState(false);
  const [ formData, setFormData ] = useState(initialFormData);
  const [ errors, setErrors ] = useState({
    email: ''
  });


    const handleSetCountry = (data: any) => {
        setFormData({...formData, country: data});
        console.log('header', data)
    }
    // handle modal form submit 
    const handleSubmit = () => {
        if(formData.email === ''){
        setErrors({...errors, email: 'Email must not be empty!'});
        return
        }
        console.log(formData);
    }

 


    // add user modal component 
    const AddUserModal = () => {
        return(
        <>
        <h1 className='font-semibold text-[24px] md:px-7 mb-3'> All Users </h1>
            <div className='flex justify-between'>
                <form className="w-full md:w-3/5 grid md:px-7 border-r-[1px] border-r-gray-100 mb-3">
                <div className='mb-2'>
                    <label htmlFor="email" className='text-sm'>Email</label>
                    <Input />
                </div>
                <div className='mb-2'>
                    <label htmlFor="role" className='text-sm'>User role</label>
                    <Dropdown
                        data={UserRoles}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor="continent" className='text-sm'>Continent</label>
                    <Input />
                </div>
                <div className='mb-2'>
                    <label htmlFor="country" className='text-sm'>Country</label>
                    <DropdownWithFlag
                        selectItem={handleSetCountry}
                    />
                </div>
                <Button
                    size='xl'
                    background='bg-sirp-primary'
                    classNameStyle='text-white p-2 mt-3 shadow-md'
                    value='Add User'
                    type='submit'
                />
                </form>
                <div className="hidden md:block md:w-2/5 px-5 text-[12px] ">
                <div className="grid gap-y-1">
                    <label>User permissions</label>
                    <p className='text-[#6F7A82] mt-1'>Access to only the country assigned</p>
                </div>
                <div className="grid gap-y-1 mt-4">
                    <label>States in Austrailia</label>
                    <p className='text-[#6F7A82] mt-1'>New South Wales, Victoria, Queensland, Western Australia, South Australia, and Tasmania</p>
                </div>
                </div>
            </div>
        </>
        )
    }
    

    return( 
        <>
        <div className="flex justify-between pl-5 pr-2  py-3">
            <h1 className="text-[30px]">Users</h1>
            <div className={`flex gap-x-3 ${filter ? 'md:w-[25%] w-[45%]' : 'md:w-[18%] w-[45%] justify-end mr-5'}`}>
                {filter && 
                <div className='bg-sirp-lightGrey cursor-pointer flex gap-x-1 py-2 px-3 rounded-lg justify-center items-center content-center'>
                    <Image
                        src={require("../../../assets/icons/filter.svg")}
                        alt="Filter"
                        width={18}
                        height={18}
                        className='self-center'
                        style={{alignSelf: 'center'}}
                        priority
                    />
                    <label className="text-[12px] items-center">Filter &#8964;</label>
                </div>
                }
                <Button 
                    className="flex gap-x-1 items-center" 
                    onClick={() => setToggleModal(true)}
                    size="md"
                    background="bg-sirp-primary"
                    value={
                        <div className="flex gap-x-1 text-[12px] items-center justify-center">
                            <Image
                                src={require("../../../assets/icons/add-user.svg")}
                                alt="add user"
                                width={14}
                                height={14}
                                className='self-center'
                                style={{alignSelf: 'center'}}
                                priority
                            />
                            <label className="text-white">Add User</label>
                        </div>
                    }
                />
            </div>
        </div>
        { toggleModal && 
        <CustomModal 
            style="bg-white md:w-[50%] w-[90%] relative top-[20%] rounded-xl mx-auto pt-3 px-3 pb-5" 
            closeModal={() => setToggleModal(false)}>
            <AddUserModal />
        </CustomModal>
        }
        </>
    )
}

export default Header;