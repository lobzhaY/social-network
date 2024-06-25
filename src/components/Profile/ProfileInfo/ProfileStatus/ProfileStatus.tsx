import React from 'react';

type ProfileStatusPropsType = {
    status: string;
    setUserStatus: (status: string) => void;
};

type ProfileStatusStateType = {
    editMode: boolean;
    status: string;
};

export class ProfileStatus extends React.Component<ProfileStatusPropsType, ProfileStatusStateType> {
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
