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

    renderIcon = (percentage) => {
        var color = this.getColor(percentage);
        var linear = "linear-gradient(to right, " + color + " 0%, " + color + " " + Math.ceil(percentage * 100) + "%, white" + Math.ceil(percentage * 100) + "%, white 100%)";
        
        return (
            <div className="icon" style={{
                background: `
                linear-gradient(
                    to right, 
                    ${color} 0%,
                    ${color} ${Math.ceil(percentage * 100)}%,
                    white ${Math.ceil(percentage * 100)}%,
                    white 100%
                )
                `
            }}>
                {Math.ceil(percentage * 100) + "%"}
            </div>
        )
    }

    getColor = (percentage) => {
        var percentColor = [
            { pct: 0.0, color: { r: 255, g: 0, b: 0 } },
            { pct: 0.5, color: { r: 255, g: 255, b: 0 } },
            { pct: 1.0, color: { r: 0, g: 255, b: 0 } } ];
        for(var i = 1; i < percentColor; i++){
            if(percentage < percentColor[i].pct){
                break;
            }
        }
        var firstColor = percentColor[i - 1];
        var secondColor = percentColor[i];
        var range = secondColor.pct - firstColor.pct;
        var rangePct = (percentage - firstColor.pct) / range;
        var pctLower = 1 - rangePct;
        var pctUpper = rangePct;
        var color = {
            r: Math.floor(firstColor.color.r * pctLower + secondColor.color.r * pctUpper),
            g: Math.floor(firstColor.color.g * pctLower + secondColor.color.g * pctUpper),
            b: Math.floor(firstColor.color.b * pctLower + secondColor.color.b * pctUpper)
        };

        return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';

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
                    <div className="edit-button" onClick={() => { this.handleEditClick() }}>
                        <Edit />
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
                                {this.renderIcon(.20)}
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
                    <div className="edit-button" onClick={() => { this.handleFinishClick() }}>
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
