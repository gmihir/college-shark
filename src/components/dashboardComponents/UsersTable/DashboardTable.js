import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import '../../../css/DashboardTable.css';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

class DashboardTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            headers: this.props.headers,
            users: this.props.users
        };
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

    render() {
        return (
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
                            <img className="logo-table" src={user.college_logo} alt="Hello" />
                            <div className="name-position-logo">
                                {user.college_name}
                            </div>
                            <div className="other-position">
                                <Link style={{ textDecoration: 'none', color: 'black' }} to={`/loginhome/page/${user.college_name}`}>{user.state}</Link>
                            </div>
                            <div className="other-position">
                                <Link style={{ textDecoration: 'none', color: 'black' }} to={`/loginhome/page/${user.college_name}`}>{this.dateFormat(user.regular_decision)}</Link>
                            </div>
                            <div className="other-position">
                                <Link style={{ textDecoration: 'none', color: 'black' }} to={`/loginhome/page/${user.college_name}`}>{this.dateFormat(user.early_decision)}</Link>
                            </div>
                            <div className="other-position">
                                <Link style={{ textDecoration: 'none', color: 'black' }} to={`/loginhome/page/${user.college_name}`}>{this.numFormat(user.tuition_normal)}</Link>
                            </div>
                            <div className="other-position">
                                <Link style={{ textDecoration: 'none', color: 'black' }} to={`/loginhome/page/${user.college_name}`}>{this.numFormat(user.tuition_oos)}</Link>
                            </div>
                            <DeleteOutline className="trashcan" />
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default DashboardTable;
