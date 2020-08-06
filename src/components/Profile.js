import React from 'react';
import '../css/Settings.css';
import { Modal, Button } from 'react-bootstrap';
import CreateIcon from '@material-ui/icons/Create';
import Select from 'react-select';
import { States } from './State';

class Profile extends React.Component {
    constructor(props) {
        super(props)

        this.state= {
            ReadName: true,
            UserData: {},
            UserStates: [],
            UserName: ''
        }

        this.saveProfile = this.saveProfile.bind(this);
    }

    componentDidMount() {
        fetch("/userprofile", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              Email: localStorage.getItem('userData')
            })
          }).then(response => {
            return response.json()
          }).then(data => {
              this.setState({UserData: data, userName: data.name});

              //Find the user's state to set the value of the dropdown
              States.forEach(states => {
                if(this.state.UserData.state === states.value) {
                    this.setState({UserStates: states});
                }
            })
        })
    }

    saveProfile() {
        fetch("/updateprofile", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              Email: localStorage.getItem('userData'),
              State: this.state.UserStates.value,
              Name: this.state.userName 
            })
          }).then(response => {
            return response.json()
          }).then(data => {
              this.setState({userName: data.Name});
              localStorage.setItem('userState', data.State);
              localStorage.setItem('userName', data.Name);
              States.forEach(states => {
                if(data.State === states.value) {
                    this.setState({UserStates: states});
                }
              })
              window.location.reload(false);
          })    
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handler} backdrop="static">
                <Modal.Header closeButton onClick={this.props.handler}>
                    <Modal.Title>Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <section className="category-section-profile">
                        <div className="label">
                            <h1>Email: </h1>
                        </div>
                        <div className="input-field">
                            <input type="text" defaultValue={this.state.UserData.email} ></input>
                        </div>
                    </section>

                    <hr></hr>

                    <section className="category-section">
                        <div className="label">
                            <h1>Name: </h1>
                        </div>
                        <div className={this.state.ReadName ? "input-field" : "border-input"}>
                            <input type="text" defaultValue={this.state.UserData.name} 
                            readOnly={this.state.ReadName} 
                            onFocus={(event) => event.target.select()}
                            onChange={(e) => this.setState({userName: e.target.value})}
                            ></input>
                        </div>
                        {!this.state.ReadName ? <div className="edit-icon" onClick={() => this.setState({ ReadName: true})}>
                            <button className="save-button" onClick={() => this.setState({ ReadName: true})}>Save</button>
                        </div> : <div className="edit-icon" onClick={() => this.setState({ ReadName: false})}>
                            <CreateIcon />
                        </div>}
                    </section>

                    <hr></hr>

                    <section className="category-section">
                        <div className="label">
                            <h1>State: </h1>
                        </div>
                        
                        <div className="dropdown">
                        <Select
                            defaultValue={this.state.UserStates}
                            onChange={(e) => this.setState({UserStates: e})}
                            options={States}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            closeMenuOnSelect={true}
                        />
                        </div>
                    </section>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={() => {
                    this.saveProfile();
                    this.props.handler();
                    }}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default Profile;