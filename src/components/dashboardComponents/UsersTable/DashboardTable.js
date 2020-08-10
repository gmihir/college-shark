import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import '../../../css/DashboardTable.css';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import '../../../css/DashboardToolbar.css';
import Select from 'react-select';

class DashboardTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            headers: this.props.headers,
            users: this.props.users,
            edit: false,
            options: [],
            descending: true,
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

    componentDidMount() {
        let options = [{ value: "Tuition", label: "Tuition" }];
        var allOptions = ["early_decision", "regular_decision", "transcripts", "mid_year", "letter_of_rec_required", 
            "subject_tests", "acceptance_rate",
            "population", "national_ranking", "early_action", "scholarship_date","common_app", "coalition_app", "school_type", "sat_overall", "act_overall", "locale"];
        allOptions.map(header => {
            var option = { value: this.convertToHeader(header), label: this.convertToHeader(header) };
            options.push(option);
        })
        this.setState({ options: options });
    }

    calculateNumberOfEssaysRequired(essays) {
        if (typeof essays === 'string') {
            var essayArrayInit = essays.split("|");
            if (essayArrayInit.length > 1) {
                var required = parseInt(essays, 10);
                if (!isNaN(required)) {
                return required;
            }
            }
            else {
                return 0;
            }
        }
        else {
            return 0;
        }
    }

    renderIcon = (user) => {
        var supplementalEssays = this.props.userInfo['colleges'][user.college_name]['essayStatus'];
        let count = 0;
        for (let j = 0; j < supplementalEssays.length; j++) {
            if (supplementalEssays[j] === 1) {
                count++;
            }
        }
        if(this.props.userInfo["information"]["generalEssays"])
        var percentage;
        if(this.calculateNumberOfEssaysRequired(user.supplemental_essays) === 0) {
            percentage = 1;
        }
        else {
            percentage = count / this.calculateNumberOfEssaysRequired(user.supplemental_essays);
        }



        console.log(percentage);
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
                    rgb(225, 247, 250) ${Math.ceil(percentage * 100)}%,
                    rgb(225, 247, 250) 100%
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
            { pct: 0.5, color: { r: 245, g: 220, b: 0 } },
            { pct: 1.0, color: { r: 0, g: 199, b: 39 } }];
        var j;
        let i = 1;
        if(percentage === 1) {
            i = 2;
        }
        else {
        for (let j = 0; j < percentColor.length; j++) {
            if (percentage < percentColor[j].pct) {
                i = j;
                break;
            }
        }}
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
        let order = this.quickSort(this.state.users, 0, this.state.users.length - 1, category);
        this.setState({ users: order, descending: !this.state.descending });
    }

    quickSort(array, low, high, category) {
        var place;
        if (low < high) {
            place = this.partition(array, low, high, category);
            console.log(array);
            this.quickSort(array, low, place - 1, category);
            this.quickSort(array, place + 1, high, category);
        }
        return array;
    }

    categoryRender(user, category) {
        if (category === 'tuition_oos') {
            return this.numFormat(user[category]) + "\n Out-of-State";
        } else if (category === 'tuition_normal') {
            return this.numFormat(user[category]) + "\n In-State";
        } else if (category === 'regular_decision') {
            return this.dateFormat(user[category]);
        } else if (category === 'early_decision') {
            return this.dateFormat(user[category]);
        } else if (category === 'early_action') {
            return this.dateFormat(user[category]);
        } else {
            return user[category];
        }
    }

    convertToHeader(header) {
        if (header === 'tuition_oos') {
            return 'Out-of-State Tuition';
        } else if (header === 'tuition_normal') {
            return 'In-State Tuition';
        } else if (header === 'regular_decision') {
            return 'RD Deadline';
        } else if (header === 'early_decision') {
            return 'ED Deadline';
        } else if (header === 'early_action') {
            return 'Early Action';
        } else if (header === 'national_ranking') {
            return 'Ranking';
        } 
        else if(header === 'sat_overall') {
            return "Average SAT";
        }
        else if(header === 'act_overall') {
            return "Average ACT";
        }
        else {
            let name = '';
            var splitName = header.split("_");
            for (let i = 0; i < splitName.length; i++) {
                let holder = splitName[i];
                holder = holder.substring(0, 1).toUpperCase() + holder.substring(1, holder.length);
                name += holder + ' ';
            }
            name = name.substring(0, name.length - 1);
            return name;
        }
    }

    partition(array, low, high, column) {
        let pivot = array[high];
        let i = (low - 1);
        var j;
        var category = this.convertHeader(column, array[0]['state']);
         for (let j = low; j <= high - 1; j++) {
            let bool = true;
            var k;
            console.log(array[j][category]);
            console.log(category);
            if (array[j][category].toString().length < pivot[category].toString().length) {

            } else if (array[j][category].toString().length > pivot[category].toString().length) {
                bool = false;
            } else {
                for (let k = 0; k < array[j][category].toString().length; k++) {
                    if (array[j][category].toString().charCodeAt(k) > pivot[category].toString().charCodeAt(k)) {
                        bool = false;
                        break;
                    } else if (array[j][category].toString().charCodeAt(k) < pivot[category].toString().charCodeAt(k)) {
                        bool = true;
                        break;
                    } else {

                    }
                }
            }
            if (this.state.descending) {
                bool = !bool;
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

    changeHeaders(newHeader, oldHeader) {
        let newHeaders = [];
        var index = this.state.headers.indexOf(oldHeader);
        var i;
        for (let i = 0; i < this.state.headers.length; i++) {
            if (i === index) {
                newHeaders.push(newHeader['value']);
            } else {
                newHeaders.push(this.state.headers[i]);
            }
        }
        fetch("/settabs", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Tabs: newHeaders,
                Email: localStorage.getItem("userData")
            })
        }).then(response => {
            return response.json();
        }).then(data => {
            this.setState({ headers: newHeaders });
        })
    }

    convertHeader(header, state) {
        if (header === 'Tuition') {
            if (state === this.props.state) {
                return 'tuition_normal';
            } else {
                return 'tuition_oos';
            }
        } else if (header === 'RD Deadline') {
            return 'regular_decision';
        } else if (header === 'ED Deadline') {
            return 'early_decision';
        } else if (header === 'Early Action') {
            return 'early_action';
        } else if (header === 'Rank') {
            return 'national_ranking';
        } else {
            let name = '';
            var splitName = header.split(" ");
            for (let i = 0; i < splitName.length; i++) {
                let holder = splitName[i];
                holder = holder.toLowerCase();
                name += holder + '_';
            }
            name = name.substring(0, name.length - 1);
            return name;
        }
    }

    renderRegular() {
        return (
            <div>
                <div className="toprow">
                    <div className="dashboard-header">{""}</div>
                    <div className="edit-button" onClick={() => { this.handleEditClick() }}>
                        <Edit />
                        {"Edit"}
                    </div>
                </div>

                <div className="table">
                    <div className="headers">
                        {this.state.headers.map(title => {
                            if (title === "College Name") {
                                return (
                                    <div className="name-position">{title}</div>
                                )
                            } else if (title === "Status") {
                                return (
                                    <div className="other-position">{title}</div>
                                )    
                            } else {
                                return (
                                    <div className="other-position" onClick={() => { this.handleSort(title) }}>{title}</div>
                                )
                            }
                        })}
                    </div>
                    {this.state.users.map(user => {
                        return (
                            <div className="individual-table">
                                <Link style={{ textDecoration: 'none', color: 'black' }} to={`/page/${user.college_name}`}>
                                    <img className="logo-table" src={user.college_logo} alt="Hello" />
                                </Link>
                                <div className="name-position-logo">
                                    <Link style={{ textDecoration: 'none', color: 'black' }} to={`/page/${user.college_name}`}>{this.categoryRender(user, this.convertHeader(this.state.headers[0], user.state))}</Link>
                                </div>
                                <div className="other-position-table">
                                    <Link style={{ textDecoration: 'none', color: 'black' }} to={`/page/${user.college_name}`}>{this.categoryRender(user, this.convertHeader(this.state.headers[1], user.state))}</Link>
                                </div>
                                <div className="other-position-table">
                                    <Link style={{ textDecoration: 'none', color: 'black' }} to={`/page/${user.college_name}`}>{this.categoryRender(user, this.convertHeader(this.state.headers[2], user.state))}</Link>
                                </div>
                                <div className="other-position-table">
                                    <Link style={{ textDecoration: 'none', color: 'black' }} to={`/page/${user.college_name}`}>{this.categoryRender(user, this.convertHeader(this.state.headers[3], user.state))}</Link>
                                </div>
                                <div className="other-position-table">
                                    <Link style={{ textDecoration: 'none', color: 'black' }} to={`/page/${user.college_name}`}>{this.categoryRender(user, this.convertHeader(this.state.headers[4], user.state))}</Link>
                                </div>
                                <div className="other-position-table">
                                    <Link style={{ textDecoration: 'none', color: 'black' }} to={`/page/${user.college_name}`}>{this.categoryRender(user, this.convertHeader(this.state.headers[5], user.state))}</Link>
                                </div>
                                {this.renderIcon(user)}
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
                    <div className="dashboard-header">{""}</div>
                    <div className="edit-button" onClick={() => { this.handleFinishClick() }}>
                        <Edit />
                        {"Finish"}
                    </div>
                </div>

                <div className="table">
                    <div className="headers">
                        <div className="name-position">College Name</div>
                        {this.state.headers.map(title => {
                            if (title === "College Name" || title === "Status") {

                            } else {
                                return (
                                    <div className="other-position-edit">
                                        <Select onChange={(e) => {
                                            this.changeHeaders(e, title);
                                        }}
                                            options={this.state.options} placeholder={title}
                                        />
                                    </div>
                                )
                            }
                        })}
                        <div className="other-position">Status</div>
                    </div>
                    <div className="fade-table">
                        {this.state.users.map(user => {
                            return (
                                <div className="individual-table">
                                    <Link style={{ textDecoration: 'none', color: 'black' }} to={`/page/${user.college_name}`}>
                                        <img className="logo-table" src={user.college_logo} alt="Hello" />
                                    </Link>
                                    <div className="name-position-logo">
                                        <Link style={{ textDecoration: 'none', color: 'black' }} to={`/page/${user.college_name}`}>{this.categoryRender(user, this.convertHeader(this.state.headers[0], user.state))}</Link>
                                    </div>
                                    <div className="other-position-table">
                                        <Link style={{ textDecoration: 'none', color: 'black' }} to={`/page/${user.college_name}`}>{this.categoryRender(user, this.convertHeader(this.state.headers[1], user.state))}</Link>
                                    </div>
                                    <div className="other-position-table">
                                        <Link style={{ textDecoration: 'none', color: 'black' }} to={`/page/${user.college_name}`}>{this.categoryRender(user, this.convertHeader(this.state.headers[2], user.state))}</Link>
                                    </div>
                                    <div className="other-position-table">
                                        <Link style={{ textDecoration: 'none', color: 'black' }} to={`/page/${user.college_name}`}>{this.categoryRender(user, this.convertHeader(this.state.headers[3], user.state))}</Link>
                                    </div>
                                    <div className="other-position-table">
                                        <Link style={{ textDecoration: 'none', color: 'black' }} to={`/page/${user.college_name}`}>{this.categoryRender(user, this.convertHeader(this.state.headers[4], user.state))}</Link>
                                    </div>
                                    <div className="other-position-table">
                                        <Link style={{ textDecoration: 'none', color: 'black' }} to={`/page/${user.college_name}`}>{this.categoryRender(user, this.convertHeader(this.state.headers[5], user.state))}</Link>
                                    </div>
                                    {this.renderIcon(user)}
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
        console.log(this.state.options);
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
