import Image from 'next/image';
import React, { useState } from 'react'
import Reader from './components/Reader'
import HomeHistory from './components/history'
import TabLayout from '@/layout/TabLayout'
import { HomeSubData } from '@/utils/constants';
import {useRouter} from 'next/router';

const FileUpload = () => {
    const [formData, setFormData] = useState('');
    const [file, setFile] = useState(null);
    const showTitle = false;
    const [isFileUploded, setIsFileUploaded] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [showReader, setShowReader] = useState(false)
    const router = useRouter()

    const handleChange = (e) => {
        e.preventDefault();
        setFormData(e.target.value)
    };

    const handleFileUpload = (e) => {
        e.preventDefault();
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            setIsFileUploaded(true);
        }
    };

    const translate = () => {
        setIsLoading(true); // Set loading state to true
        setTimeout(() => {
            console.log(file, file?.name); // Upload the file to the server
            setIsLoading(false); // Set loading state to false after the process completes
        }, 10000); // Simulating a 10-second delay
    }

    const handleDragOver = (event) => {
        event.preventDefault();
    }

    const showNewReader = () => {
        setShowReader(true)
    }

    const handleDrop = (event) => {
        event.preventDefault();
        console.log(event)
        setFile(event.dataTransfer.files)
        if (file) {
            setIsFileUploaded(true);

        }
    }

    const goback = () => {
        router.back()
    }

    return (
        <div className='m-10 mt-[120px] py-5 rounded-[1rem] bg-[#F9F9F9]'>
            <div className="w-full h-full border-b cursor-pointer" onClick={goback}>
                <div className="flex px-7 items-center mb-3 align-middle justify-start">
                    <Image
                        className='flex align-middle justify-center'
                        src={require(`../../assets/icons/back-arrow.svg`)}
                        alt="upload image"
                        width={18}
                        height={18}
                        priority
                    />
                </div>
                {/* Header */}
                <div className="flex flex-row w-full px-7 items-center justify-between">
                    <h1 className="text-[18px] font-semibold">Add Content</h1>
                </div>
            </div>
            {/* copy and paste link */}
            {isFileUploded ?
                (<div className='mt-20'> {!showReader ? <div className='p-10 flex align-middle items-center w-full flex-col justify-center'>
                    <div className="p-5 flex w-[50%] align-middle justify-between bg-[#F3F5F6] border-2 border-[E8EAEC] rounded-[15px]">
                        <div className='flex align-middle items-center justify-center'>
                            <span className='rounded-full bg-[#E8F8FD] flex align-middle justify-center w-[40px] h-[40px]'>
                                <Image
                                    src={require(`../../assets/icons/file.svg`)}
                                    alt="upload image"
                                    width={20}
                                    height={20}
                                    priority
                                />
                            </span>
                            <div className='mx-4'>
                                <span>{file?.name}</span>
                                <div>
                                    <span className='text-xs text-[#6B7280]'>{file?.size}KB .</span>
                                    <span className='text-xs text-[#6B7280]'>100% uploaded</span>
                                </div>
                            </div>
                        </div>
                        <span className='rounded-full bg-[#FEE2E2] flex align-middle justify-center w-[40px] h-[40px]'>
                            <Image
                                src={require(`../../assets/icons/red-delete.svg`)}
                                alt="upload image"
                                width={18}
                                height={18}
                                priority
                            />
                        </span>
                    </div>
                    <div className="flex w-[50%] align-middle justify-end  mt-4">
                        {!isLoading && <div className="p-5 cursor-pointer flex w-[30%] align-middle justify-center bg-[#4582C4]  border-2 text-white rounded-[15px] font-extrabold">
                            <span className='ml-3' onClick={translate}>View content</span>
                        </div>}
                    </div>

                </div>
                    : <div><Reader /></div>}
                </div>
                ) :
                (<>
                    <div className='flex align-middle m-5 border-2 rounded-full border-[#E5E7EB]-500  border-dotted'>
                        <span className='flex align-middle justify-center mx-3'>
                            <Image
                                src={require(`../../assets/icons/link.svg`)}
                                alt="upload image"
                                width={20}
                                height={20}
                                priority
                            />
                            {/* <span className='ml-3 font-light text-[#A1ADB5]'>Copy and paste link here</span> */}
                        </span>
                        <input placeholder='Copy and paste link here' className='py-5 w-[95%] bg-[#F9F9F9] outline-none focus:ring-0' onChange={handleChange} />
                        <span className='flex align-middle justify-center mx-3'>
                            <Image
                                className='flex align-middle justify-center font-light text-[#A1ADB5]'
                                src={require(`../../assets/icons/x.svg`)}
                                alt="upload image"
                                width={20}
                                height={20} />
                        </span>
                    </div>

                    <div onDragOver={handleDragOver} onDrop={handleDrop} className='h-[30vh] m-5 flex align-middle justify-center border rounded-[30px] border-[#E5E7EB]'>
                        <div className='flex flex-col align-middle justify-center'>
                            <span className='flex align-middle justify-center mx-3'>
                                <Image
                                    className='flex align-middle justify-center'
                                    src={require(`../../assets/icons/cloud.svg`)}
                                    alt="upload image"
                                    width={25}
                                    height={25}
                                    priority
                                />
                            </span>
                            <span className='font-normal text-[#383E42]'>
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept=".txt,.rtf,.doc,.pdf,.svg,"
                                    className="hidden"
                                    multiple
                                    onChange={handleFileUpload}
                                />
                                <label className='text-blue-400 cursor-pointer' htmlFor="file-upload">Upload a file
                                </label>
                                or drag and drop</span>
                            <span className='font-light  text-[#383E42]'>TXT, RFT, DOC, PDF upto 5MB</span>
                        </div>
                    </div>
                </>
                )}
            <TabLayout showTitle={showTitle} data={HomeSubData}>
                <HomeHistory />
            </TabLayout>
        </div>
    )
}

export default FileUpload;