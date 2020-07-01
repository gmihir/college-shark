import React, { Component } from 'react';
import '../css/Individual.css';
import { Spinner } from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';
import Heart from '../components/content/Heart';
import { IoIosUndo } from "react-icons/io";
import NavBar from '../components/content/Navbar';
import {Redirect} from 'react-router';

const commonApp = "https://www.commonapp.org/apply/essay-prompts";
const coalitionApp = "https://www.coalitionforcollegeaccess.org/essays";
const UCApp = "https://admission.universityofcalifornia.edu/how-to-apply/applying-as-a-freshman/personal-insight-questions.html";

class Individual extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.imageRef = React.createRef();
        this.state = {
            resultsFromSearch: [],
            college_name: "San Diego State University",
            college_json: [],
            searchBar: false,
            Loading: true
        }
        this.searchBarInUse = this.searchBarInUse.bind(this);
        this.setSearch = this.setSearch.bind(this);
        this.numFormat = this.numFormat.bind(this);
        this.dateFormat = this.dateFormat.bind(this);
        this.goBack = this.goBack.bind(this);
        this.essayFormat = this.essayFormat.bind(this);
        this.essayHeaderFunc = this.essayHeaderFunc.bind(this);
        this.applyFormat = this.applyFormat.bind(this);
        this.renderSpinner = this.renderSpinner.bind(this);

    }

    setSearch = (results) => {
        if (results !== this.state.resultsFromSearch) {
            this.setState({
                resultsFromSearch: results
            })
        }
    }

    searchBarInUse = (inUse) => {
        if (inUse !== this.state.searchBar) {
            this.setState({ searchBar: inUse });
        }
      }

    numFormat(num) {
        if (typeof num === 'number') {
            return num.toLocaleString();
        }
        else {
            return num;
        }
    }

    dateFormat(input) {
        if (input === -1) {
            return ("N/A");
        }
        else if(input === 0) {
            return("Rolling");
        }
        var myDate = new Date(input * 1000);
        return ((myDate.getUTCMonth() + 1) + "/" + myDate.getUTCDate() + "/" + myDate.getUTCFullYear());
    }

    goBack() {
        this.props.history.goBack();
    }

    essayFormat(essays) {
        if (typeof essays === 'string') {
            var essayArrayInit = essays.split("|");
            var essayArray = [];
            for (var i = 1; i < essayArrayInit.length; i++) {
                essayArray.push(essayArrayInit[i]);
            }
            return (
                <div className="essay-text">
                    <h1 className="essay-header">
                        Supplemental Essay Questions {this.essayHeaderFunc(this.state.college_json["supplemental_essays"])}
                </h1>
                    {essayArray.map((essay, index) => {
                        return (
                                <p>{index + 1}.{essay}</p>
                        )
                    })}
                </div>
            );
        }
        else {
            return essays;
        }
    }

    essayHeaderFunc(essays) {
        if (typeof essays === 'string') {
            var essayArrayInit = essays.split("|");
            if (essayArrayInit.length > 1) {
                var total = essayArrayInit.length - 1;
                var required = parseInt(essays, 10);
                if (!isNaN(required)) {
                return "(" + required + " of " + total + " Required)"
            }
            }
            else {
                return "(None Required)"
            }
        }
        else {
            return essays;
        }
    }

    applyFormat(application) {
        if (typeof application === 'string') {
            var applicationArray = application.split("/");
            return (
                <ul className="application-type">
                    <h1 className="application-header" >
                        Apply Via:
                    </h1>
                    {applicationArray.map((applications) => {
                        console.log(applications);
                        var typeArray = applications.split(" ");
                        var type = typeArray[0];
                        var coalitionType = "none";
                        if(typeArray.length > 1) {
                            coalitionType = typeArray[1];
                        }
                        if (type === "Common") {
                            return (
                                <li>
                                    <a className="application-link" href={commonApp} target="_blank" rel="noopener noreferrer">{applications}</a>
                                </li>
                            );
                        }
                        else if (coalitionType === "Coalition") {
                            return (
                                <li>
                                    <a className="application-link" href={coalitionApp} target="_blank" rel="noopener noreferrer">{applications}</a>
                                </li>
                            );
                        }
                        else if (type === "Coalition") {
                            return (
                                <li>
                                    <a className="application-link" href={coalitionApp} target="_blank" rel="noopener noreferrer">{applications}</a>
                                </li>
                            );
                        }
                        else if (type === "UC") {
                            return (
                                <li>
                                    <a className="application-link" href={UCApp} target="_blank" rel="noopener noreferrer">{applications}</a>
                                </li>
                            );
                        }
                        else {
                            return (
                                <li>
                                    {applications}
                                </li>
                            );
                        }
                    })}
                </ul>
            );
        }
        else {
            return application;
        }
    }


    componentDidMount() {
        window.scrollTo(0, 0);
        fetch("/individual", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.props.match.params.collegeName
            })
        }).then(response => {
            console.log(response)
            return response.json()
        }).then(data => {
            let value = JSON.parse(data);
            this.setState({ 
                college_json: value, 
                Loading: false 
            });
        });

    }

    renderSpinner = () => {
        return (
            <div className="spinner-center">
                <div className="spinner-div">
                    <Spinner animation="border" variant="secondary" role="status" className="load-spinner">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            </div>
        )
    }

    renderIndividual = () => {
        if (this.state.searchBar === false) {
            return (
                <div className="individual-container">
                    <img className="Geisel" src={this.state.college_json["college_campus"]} alt="College Campus" />
                    <div className="tint">
                    </div>
                    <div className="white-circle">
                    </div>
                    <img className="college-logo" src={this.state.college_json["college_logo"]} alt="College Logo" />
                    {this.essayFormat(this.state.college_json["supplemental_essays"])}
                    {this.applyFormat(this.state.college_json["app_site"])}
                    <div className="grid-layout">
                        <Grid container direction="column" spacing={5}>
                            <Grid item className="general-layout" >
                                <button onClick={this.goBack} className="return"><IoIosUndo /> Return</button>
                                <h1 className="general-text">
                                    General Info
                            </h1>
                                <p>
                                    Acceptance Rate: {this.state.college_json["acceptance_rate"]}%
                                </p>
                                <p>
                                    US News Ranking: {this.state.college_json["national_ranking"]}
                                </p>
                                <p>
                                    Undergrad Population: {this.numFormat(this.state.college_json["population"])}
                                </p>
                                <p>
                                    Tuition: ${this.numFormat(this.state.college_json["tuition_normal"])} (In)/ ${this.numFormat(this.state.college_json["tuition_oos"])} (Out)
                                </p>
                                <p>
                                    Application Fee: ${this.state.college_json["app_fee"]}
                                </p>
                                <p>
                                    School: {this.state.college_json["school_type"]}
                                </p>
                            </Grid>
                            <Grid item className="deadline-layout" >
                                <h1 className="deadline-header">
                                    Deadlines
                            </h1>
                                <p>
                                    Regular Decision: {this.dateFormat(this.state.college_json["regular_decision"])}
                                </p>
                                <p>
                                    Early Decision: {this.dateFormat(this.state.college_json["early_decision"])}
                                </p>
                                <p>
                                    Early Action: {this.dateFormat(this.state.college_json["early_action"])}
                                </p>
                                <p>
                                    Scholarship: {this.dateFormat(this.state.college_json["scholarship_date"])}
                                </p>
                            </Grid>
                            <Grid item className="sat-layout">
                                <h1 className="sat-header">
                                    Tests and Transcripts
                            </h1>
                                <p>
                                    Transcripts: {this.state.college_json["transcripts"]}
                                </p>
                                <p>
                                    Mid-Year Report: {this.state.college_json["mid_year"]}
                                </p>
                                <p>
                                    Letters of Rec. Required: {this.state.college_json["letter_of_rec_required"]}
                                </p>
                                <p>
                                    SAT/ACT: {this.state.college_json["sat"]}
                                </p>
                                <p>
                                    SAT/ACT Self-Report: {this.state.college_json["self_report"]}
                                </p>
                                <p>
                                    Subject Tests: {this.state.college_json["subject_tests"]}
                                </p>
                            </Grid>
                        </Grid>
                    </div>
                    <div className="description-container">
                    <div className="holder" >
                    </div>
                    <div className="description-box">
                        <p className="description-text" >
                            {this.state.college_json["college_description"]}
                        </p>
                    </div>
                    </div>
                    <div className="image-box">
                        <h1>
                            {this.state.college_json["college_name"]}
                            <span className="individual-heart">
                                <Heart collegeName={this.state.college_json["college_name"]} key={this.state.college_json["college_name"]} />
                            </span>
                        </h1>
                    </div>
                </div>
            );
        }
    }

    render() {
        if(!sessionStorage.getItem("userData")){
            return(<Redirect to='/loginhome/dashboard' />)
        }
        return (
            <div>
                <NavBar searchBarInUse={this.searchBarInUse} setSearch={this.setSearch} searchBar={this.state.searchBar} active="2" />
                {this.state.Loading ? this.renderSpinner() : this.renderIndividual()}
            </div>
        );
    }
}

export default Individual;
