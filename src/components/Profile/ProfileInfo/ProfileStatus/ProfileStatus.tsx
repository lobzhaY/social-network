import React, { useState } from 'react';

type ProfileStatusPropsType = {
    status: string;
    setUserStatus: (status: string) => void;
};

type ProfileStatusStateType = {
    editMode: boolean;
    status: string;
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

/* export class ProfileStatus extends React.Component<ProfileStatusPropsType, ProfileStatusStateType> {
    state = {
        editMode: false,
        status: this.props.status,
    };

    handleActivateEditMode = () => {
        this.setState({ editMode: true });
    };

    handleDeactivateEditMode = () => {
        this.setState({ editMode: false });
        this.props.setUserStatus(this.state.status);
    };

    handleChangeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ status: e.target.value });
    };

    componentDidUpdate(
        prevProps: Readonly<ProfileStatusPropsType>,
        prevState: Readonly<ProfileStatusStateType>,
        snapshot?: any,
    ): void {
        if (prevProps.status !== this.props.status) {
            this.setState({ status: this.props.status });
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode ? (
                    <div>
                        <span onDoubleClick={() => this.handleActivateEditMode()}>
                            {this.props.status || '-----'}
                        </span>
                    </div>
                ) : (
                    <div>
                        <input
                            autoFocus
                            type='text'
                            value={this.state.status}
                            onChange={this.handleChangeStatus}
                            onBlur={() => this.handleDeactivateEditMode()}
                        />
                    </div>
                )}
            </div>
        );
    }
}
 */