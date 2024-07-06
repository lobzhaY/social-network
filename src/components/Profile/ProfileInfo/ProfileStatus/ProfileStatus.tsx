import React, { useEffect, useState } from 'react';

type ProfileStatusPropsType = {
    status: string;
    setUserStatus: (status: string) => void;
};

export const ProfileStatus: React.FC<ProfileStatusPropsType> = ({status, setUserStatus}) => {
    const [editMode, setEditMode] = useState(false);
    const [statusState, setStatusState] = useState(status);

    const handleActivateEditMode = () => {
        setEditMode(true);
    };

    const handleDeactivateEditMode = () => {
        setEditMode(false);
        setUserStatus(statusState);
    };

    const handleChangeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatusState(e.target.value);
    };

    useEffect(() => {
        setStatusState(status);
    }, [status]);

    return (
        <div>
                {!editMode ? (
                    <div>
                        <span onDoubleClick={() => handleActivateEditMode()}>
                            {status || '-----'}
                        </span>
                    </div>
                ) : (
                    <div>
                        <input
                            autoFocus
                            type='text'
                            value={statusState}
                            onChange={handleChangeStatus}
                            onBlur={() => handleDeactivateEditMode()}
                        />
                    </div>
                )}
            </div>
    )
}