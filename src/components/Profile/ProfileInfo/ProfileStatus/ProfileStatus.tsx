import React from 'react';

type ProfileStatusPropsType = {
    status: string;
};

type ProfileStatusStateType = {
    editMode: boolean;
};

export class ProfileStatus extends React.Component<ProfileStatusPropsType, ProfileStatusStateType> {
    state = {
        editMode: false,
    };

    handleActivateEditMode = () => {
        this.setState({editMode: true})
    }

    handleDeactivateEditMode = () => {
      this.setState({editMode: false})
    }

    render() {
        return (
            <div>
                {!this.state.editMode ? (
                    <div>
                        <span onDoubleClick={() => this.handleActivateEditMode()}>{this.props.status}</span>
                    </div>
                ) : (
                    <div>
                        <input autoFocus type='text' value={this.props.status} onBlur={() => this.handleDeactivateEditMode()} />
                    </div>
                )}
            </div>
        );
    }
}
