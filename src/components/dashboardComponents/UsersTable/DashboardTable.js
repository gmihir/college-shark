import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import '../../../css/DashboardTable.css';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import '../../../css/DashboardToolbar.css';

class DashboardTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            headers: this.props.headers,
            users: this.props.users,
            edit: false
        };
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleFinishClick = this.handleFinishClick.bind(this);
    }

    dateFormat = (input) => {
        if (input === -1) {
            return ("N/A");
        }
        else if (input === 0) {
            return ("Rolling");
        }
        var myDate = new Date(input * 1000);
        return ((myDate.getUTCMonth() + 1) + "/" + myDate.getUTCDate() + "/" + myDate.getUTCFullYear());
    }


    numFormat = (num) => {
        if (num === null) {
            return num;
        } else {
            return "$" + num.toLocaleString();
        }
    }

    renderIcon = () => {
        var num = Math.random();
        if (num < .33) {
            return (
                <div className="done-icon">
                    {"Done"}
                </div>
            )
        } else if (num < .66) {
            return (
                <div className="inprogress-icon">
                    {"In Progress"}
                </div>
            )
        } else {
            return (
                <div className="notstarted-icon">
                    {"Not Started"}
                </div>
            )
        }
    }

    handleEditClick() {
        this.setState({ edit: true });
    }

    handleFinishClick() {
        this.setState({ edit: false });
    }

    renderRegular() {
        return (
            <div>
                <div className="toprow">
                    <div className="dashboard-header">{"My Colleges"}</div>
                    <div className="edit-button" onClick={() => {this.handleEditClick()}}>
                        <Edit/>
                        {"Edit the Table"}
                    </div>
                </div>

                <div className="table">
                    <div className="headers">
                        <div className="name-position">College Name</div>
                        {this.state.headers.map(title => {
                            return (
                                <div className="other-position">{title}</div>
                            )
                        })}
                    </div>
                    {this.state.users.map(user => {
                        return (
                            <div className="individual-table">
                                <Link style={{ textDecoration: 'none', color: 'black' }} to={`/loginhome/page/${user.college_name}`}>
                                    <img className="logo-table" src={user.college_logo} alt="Hello" />
                                </Link>
                                <div className="name-position-logo">
                                    <Link style={{ textDecoration: 'none', color: 'black' }} to={`/loginhome/page/${user.college_name}`}>{user.college_name}</Link>
                                </div>
                                <div className="other-position-table">
                                    <Link style={{ textDecoration: 'none', color: 'black' }} to={`/loginhome/page/${user.college_name}`}>{`${user.state}`}</Link>
                                </div>
                                <div className="other-position-table">
                                    <Link style={{ textDecoration: 'none', color: 'black' }} to={`/loginhome/page/${user.college_name}`}>{this.dateFormat(user.regular_decision)}</Link>
                                </div>
                                <div className="other-position-table">
                                    <Link style={{ textDecoration: 'none', color: 'black' }} to={`/loginhome/page/${user.college_name}`}>{this.dateFormat(user.early_decision)}</Link>
                                </div>
                                <div className="other-position-table">
                                    <Link style={{ textDecoration: 'none', color: 'black' }} to={`/loginhome/page/${user.college_name}`}>{this.numFormat(user.tuition_normal)}</Link>
                                </div>
                                <div className="other-position-table">
                                    <Link style={{ textDecoration: 'none', color: 'black' }} to={`/loginhome/page/${user.college_name}`}>{this.numFormat(user.tuition_oos)}</Link>
                                </div>
                                {this.renderIcon()}
                                <DeleteOutline className="trashcan" style={{ cursor: 'pointer' }} onClick={async () => {
                                    const finish = await this.props.removeColleges(user.college_name);
                                }} />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    renderEdit() {
        return (
            <div>
                <div className="toprow">
                    <div className="dashboard-header">{"My Colleges"}</div>
                    <div className="edit-button" onClick={() => {this.handleFinishClick()}}>
                        <Edit />
                        {"Finish Editing"}
                    </div>
                </div>

                <div className="table">
                    <div className="headers">
                        <div className="name-position">College Name</div>
                        {this.state.headers.map(title => {
                            return (
                                <div className="other-position">{title}</div>
                            )
                        })}
                    </div>
                    <div className="fade-table">
                        {this.state.users.map(user => {
                            return (
                                <div className="individual-table">
                                    <Link style={{ textDecoration: 'none', color: 'black' }} to={`/loginhome/page/${user.college_name}`}>
                                        <img className="logo-table" src={user.college_logo} alt="Hello" />
                                    </Link>
                                    <div className="name-position-logo">
                                        <Link style={{ textDecoration: 'none', color: 'black' }} to={`/loginhome/page/${user.college_name}`}>{user.college_name}</Link>
                                    </div>
                                    <div className="other-position-table">
                                        <Link style={{ textDecoration: 'none', color: 'black' }} to={`/loginhome/page/${user.college_name}`}>{`${user.state}`}</Link>
                                    </div>
                                    <div className="other-position-table">
                                        <Link style={{ textDecoration: 'none', color: 'black' }} to={`/loginhome/page/${user.college_name}`}>{this.dateFormat(user.regular_decision)}</Link>
                                    </div>
                                    <div className="other-position-table">
                                        <Link style={{ textDecoration: 'none', color: 'black' }} to={`/loginhome/page/${user.college_name}`}>{this.dateFormat(user.early_decision)}</Link>
                                    </div>
                                    <div className="other-position-table">
                                        <Link style={{ textDecoration: 'none', color: 'black' }} to={`/loginhome/page/${user.college_name}`}>{this.numFormat(user.tuition_normal)}</Link>
                                    </div>
                                    <div className="other-position-table">
                                        <Link style={{ textDecoration: 'none', color: 'black' }} to={`/loginhome/page/${user.college_name}`}>{this.numFormat(user.tuition_oos)}</Link>
                                    </div>
                                    {this.renderIcon()}
                                    <DeleteOutline className="trashcan" style={{ cursor: 'pointer' }} onClick={async () => {
                                        const finish = await this.props.removeColleges(user.college_name);
                                    }} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }

    render() {
        if (this.state.edit === false) {
            return (
                <div>
                    {this.renderRegular()}
                </div>
            )
        } else {
            return (
                <div>
                    {this.renderEdit()}
                </div>
            )
        }
    }
}

export default DashboardTable;
