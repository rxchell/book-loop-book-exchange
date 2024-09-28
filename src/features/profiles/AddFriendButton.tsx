import Button, {ButtonPropsColorOverrides} from "@mui/joy/Button";
import React, {useEffect, useState} from "react";
import {acceptFriendRequest, sendFriendRequest} from "@/services/UserService";
import {OverridableStringUnion} from "@mui/types";
import {ColorPaletteProp} from "@mui/joy";

interface AddFriendButtonProps {
    currentUser: string;
    otherUser: string;
    relationship: string;
    onRelationshipChange: () => void; // Callback to trigger refresh
}

const AddFriendButton: React.FC<AddFriendButtonProps> = ({
                                                             currentUser,
                                                             otherUser,
                                                             relationship,
                                                             onRelationshipChange
                                                         }) => {
    const [buttonState, setButtonState] = useState({
        color: "neutral",
        buttonText: "Loading...",
        disabled: true
    });

    useEffect(() => {
        const updateButtonState = () => {
            if (relationship === "None") {
                setButtonState({
                    color: "primary",
                    buttonText: "Add friend",
                    disabled: false
                });
            } else if (relationship === "Requested") {
                setButtonState({
                    color: "warning",
                    buttonText: "Friend request sent",
                    disabled: true
                });
            } else if (relationship === "Pending") {
                setButtonState({
                    color: "success",
                    buttonText: "Accept friend request",
                    disabled: false
                });
            } else {
                setButtonState({
                    color: "neutral",
                    buttonText: "Already added!",
                    disabled: true
                });
            }
        };

        // Update button state whenever relationship changes
        updateButtonState();
    }, [relationship]);


    const handleButtonClick = async () => {
        if (relationship === "None") {
            await sendFriendRequest(currentUser, otherUser);
        } else if (relationship === "Pending") {
            await acceptFriendRequest(currentUser, otherUser);
        }
        // After action, update relationship state in parent component
        onRelationshipChange();
    };

    if (currentUser == otherUser) {
        return (<div></div>)
    } else {
        return (
            <Button
                color={buttonState.color as OverridableStringUnion<ColorPaletteProp, ButtonPropsColorOverrides>}
                onClick={handleButtonClick}
                disabled={buttonState.disabled}
            >
                {buttonState.buttonText}
            </Button>
        );
    }

};

export default AddFriendButton;