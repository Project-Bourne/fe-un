import React from "react";

export interface ListItemModels {
    name: string,
    desc: string,
    message: string,
    time: string,
    handleChange: (index: any) => void,
    isMarked: boolean,
    actionButtons?: React.ReactNode,
    viewDeleteButtons?: React.ReactNode,
    buttonType: string
}