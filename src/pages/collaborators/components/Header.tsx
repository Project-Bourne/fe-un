import { Button, CustomModal, Dropdown, DropdownWithFlag, Input } from "@/components/ui";
import Image from "next/image";
import { useState } from "react";
import { UserRoles } from "@/utils/constants";
import { HeaderModel } from "../models/users.module";
import Collaborate from "../modal pop up/CollabratePopUp";


function Header({ filter }: HeaderModel) {
  const [ toggleModal, setToggleModal ] = useState(false);

  const handleModal = () => {
    setToggleModal(false)
  }

    return( 
        <>
        <div className="flex justify-between pl-5 pr-2  py-3">
            <h1 className="text-[30px]">Collaborators</h1>
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
            style="bg-white md:w-[50%] w-[90%] relative top-[10%] rounded-xl mx-auto pt-3 px-3 pb-5" 
            closeModal={() => setToggleModal(false)}>
            <Collaborate onHandleModal={handleModal} />
        </CustomModal>
        }
        </>
    )
}

export default Header;