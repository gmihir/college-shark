import React from 'react';
import '../css/Settings.css';
import { Modal, Button, Col, Row, Container } from 'react-bootstrap';
import CreateIcon from '@material-ui/icons/Create';
import Select from 'react-select';
import { States } from './State';

class Profile extends React.Component {
    constructor(props) {
        super(props)
        console.log(props);

        this.state= {
            ReadName: true,
        }
        
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
                            <input type="text" defaultValue="Spainrulzs@gmail.com" readOnly={this.state.ReadEmail} ></input>
                        </div>
                    </section>

                    <hr></hr>

                    <section className="category-section">
                        <div className="label">
                            <h1>Name: </h1>
                        </div>
                        <div className={this.state.ReadName ? "input-field" : "border-input"}>
                            <input type="text" defaultValue="Amitesh Kumar Sharma" readOnly={this.state.ReadName} onFocus={(event) => event.target.select()}></input>
                        </div>
                        {!this.state.ReadName ? <div className="edit-icon" onClick={() => this.setState({ ReadName: true})}>
                            <button className="save-button">Save</button>
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
                            defaultValue={States[0]}
                            options={States}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            closeMenuOnSelect={true}
                        />
                        </div>
                    </section>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={this.props.handler}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default Profile;