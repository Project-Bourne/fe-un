import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import WorkspaceDetails from './WorkspaceDetails';
import { useDispatch, useSelector } from "react-redux";
import { AddNewChat } from '@/redux/reducers/chat/chatReducer';
import chatEmpty from "../../../../public/icons/chat.empty.svg";
import Image from "next/image";
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function WorkspaceModal({ setModalType }) {
    const [value, setValue] = React.useState(0);
    const dispatch = useDispatch();
    const {allWorkspaceByUser} = useSelector((state: any) => state?.chats);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleClick = (uuid, spaceName, image, spaceStatus) => {
        dispatch(
            AddNewChat({
                uuid,
                spaceName,
                image,
                spaceStatus,
            }),
        );
        setModalType('')
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Create New Worspace" {...a11yProps(0)} />
                    <Tab label="View Available Workspaces" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <WorkspaceDetails setModalType={setModalType} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                {allWorkspaceByUser?.length > 0 ? <ul className="h-[50vh] overflow-y-auto">
                    {allWorkspaceByUser?.map((el) => (
                        <li
                            className="flex items-center gap-x-4 hover:cursor-pointer hover:bg-slate-100 rounded-md px-3 py-2.5"
                            key={el.uuid}
                            onClick={() =>
                                handleClick(
                                    el.uuid,
                                    el.spaceName,
                                    el.image,
                                    el.spaceStatus,
                                )
                            }
                        >
                            {/* <div className=""> */}
                            <img
                                src={el.image}
                                alt={el.spaceName}
                                className="h-[35px] w-[35px] rounded-full bg-red-400"
                            />
                            {/* </div> */}
                            <p className="md:text-[16px] text-[14px]">
                                {el.spaceName}
                            </p>
                        </li>
                    ))}
                </ul> : <div className="grid gap-y-10 mt-[2rem] md:mt-[5rem]">
                    <div className="mx-auto">
                        <Image src={chatEmpty} alt="empty-chats" />
                    </div>
                    <div className="grid gap-y-5 text-center">
                        <div className="md:w-[20%] w-[80%] mx-auto grid gap-y-2">
                            <h3 className="text-[17px] font-semibold">No Workspace to show</h3>

                            <p className="text-[15px] text-[#A1ADB5]">
                                Your Workspaces will appear here.
                            </p>
                        </div>
                    </div>
                </div>}
            </CustomTabPanel>
        </Box>
    );
}
