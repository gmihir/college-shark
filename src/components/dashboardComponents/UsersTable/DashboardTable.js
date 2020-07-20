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
        let percentageComplete = Math.ceil(percentage * 100) + "%";
        if (Math.ceil(percentage * 100) === 0) {
            percentageComplete = "Not Started";
        }
        if (Math.ceil(percentage * 100) === 100) {
            percentageComplete = "Completed";
        }
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
                {percentageComplete}
            </div>
        )
    }

    getColor = (percentage) => {
        var percentColor = [
            { pct: 0.0, color: { r: 255, g: 0, b: 0 } },
            { pct: 0.5, color: { r: 255, g: 255, b: 0 } },
            { pct: 1.0, color: { r: 0, g: 255, b: 0 } }];
        var j;
        let i = 0;
        for (let j = 0; j < percentColor.length; j++) {
            if (percentage < percentColor[j].pct) {
                i = j;
                break;
            }
        }
        var firstColor = percentColor[i - 1];
        var secondColor = percentColor[i];
        var range = secondColor.pct - firstColor.pct;
        var rangePct = (percentage - firstColor.pct) / range;
        var color = {
            r: Math.floor(rangePct * (secondColor.color.r - firstColor.color.r) + firstColor.color.r),
            g: Math.floor(rangePct * (secondColor.color.g - firstColor.color.g) + firstColor.color.g),
            b: Math.floor(rangePct * (secondColor.color.b - firstColor.color.b) + firstColor.color.b)
        };

        return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';

    }

    handleEditClick() {
        this.setState({ edit: true });
    }

    handleFinishClick() {
        this.setState({ edit: false });
    }

    handleSort(category) {
        this.setState({ users: this.quickSort(this.state.users, 0, this.state.users.length - 1, category) })
    }

    // quickSort(arr, start, end) {
    //     if (arr.length <= 1) {
    //         return arr;
    //     }

    //     const pivot = arr[arr.length - 1]; //pivot value
    //     const left = [];  // left handside array
    //     const right = []; // right handside array
    //     while (start < end) {  // comparing and pushing
    //         if (arr[start] < pivot) {
    //             left.push(arr[start])
    //         }
    //         else {
    //             right.push(arr[start])
    //         }
    //         start++ //  incrementing start value
    //     }
    //     // calling quick sort recursively
    //     return this.quickSort(left, 0, left.length - 1).concat(pivot).concat(this.quickSort(right, 0 , right.length - 1));
    // }

    quickSort(array, low, high, category){
        var place;
        if(low < high){
            place = this.partition(array, low, high, category);
            this.quickSort(array, low, place - 1, category);
            this.quickSort(array, place + 1, high, category);
        }
        return array;
    }

    partition(array, low, high, category) {
        let pivot = array[high];
        let i = (low - 1);
        var j;
        for (let j = low; j <= high - 1; j++) {
            let bool = false;
            var k;
            for (let k = 0; k < array[j].length; k++) {
                if (k > pivot.length) {
                    break;
                } else if (array[j].category.charCodeAt(k) > pivot.category.charCodeAt(k)) {
                    break;
                } else if (array[j].category.charCodeAt(k) < pivot.category.charCodeAt(k)) {
                    bool = true;
                    break;
                } else {

                }
            }
            if (bool) {
                i++;
                let temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
        let temp = array[i + 1];
        array[i + 1] = array[high];
        array[high] = temp;
        return i + 1;
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
                                <div className="other-position" onClick={() => { this.handleSort(title) }}>{title}</div>
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
                                {this.renderIcon(Math.random())}
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
                                    {this.renderIcon(Math.random())}
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
