import React, { Component } from 'react';
import '../css/Individual.css';
import { Spinner } from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';
import Heart from '../components/content/Heart';
import { IoIosUndo } from "react-icons/io";
import NavBar from '../components/content/Navbar';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import {Redirect} from 'react-router';
import {Route} from 'react-router';
import Map from '../components/MapComponent';
import { Pie } from 'react-chartjs-2';

const officialSite = "https://admissions.ucsd.edu/";
const housing = "https://hdh.ucsd.edu/housing/incoming/pages/";
const financialAid = "https://fas.ucsd.edu/forms-and-resources/financial-aid-estimator/index.html";
const commonApp = "https://www.commonapp.org/apply/essay-prompts";
const coalitionApp = "https://www.coalitionforcollegeaccess.org/essays";
const UCApp = "https://admission.universityofcalifornia.edu/how-to-apply/applying-as-a-freshman/personal-insight-questions.html";

class ActiveTab extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <h1 className={this.props.isActive ? "active-essay": "inactive-essay"} onClick={this.props.onActiveTab}>{this.props.content}</h1>
        )
    }
}

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
            Loading: true,
            selectedPrompts: [],
            activeKey: 0, 
            essayContent: "Common Application", 
            labels: ["White", "Asian", "Black", "Hispanic", "Other"], 
            datasets :[{
                data: [20, 40, 10, 15, 15], 
                backgroundColor: ["Blue", "White", "Black", "Gray", "#313b4c"]
            }]
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
        this.setActiveTab = this.setActiveTab.bind(this);
        this.generateLink = this.generateLink.bind(this);
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

    isActive = (key) => {
        return this.state.activeKey === key;
    }

    setActiveTab = (key) => {
        this.setState({activeKey: key})
    }

    handleClick(index) {
        this.setState({activeKey: index})
    }

    essayContentHeader(application) {
        if(typeof application === 'string') {
            var applicationArray = application.split("/");
            var applicationHeader = applicationArray[this.state.activeKey];
        return applicationHeader;
        }
        else {
            return application;
        }
    }

    essayContent(application) {
        if(typeof application === 'string') {
            var applicationArray = application.split (" ");
            var type = applicationArray[0];
            var coalitionType = "none";
            if(applicationArray.length > 1) {
                coalitionType = applicationArray[1];
            }
            if (type === "Common") {
                return (
                <div>
                     <p>1. Some students have a background, identity, interest, or talent so meaningful they believe their application would be incomplete without it. If this sounds like you, please share your story.</p>
                        <p>2. The lessons we take from obstacles we encounter can be fundamental to later success. Recount a time when you faced a challenge, setback, or failure. How did it affect you, and what did you learn from the experience?</p>
                        <p>3. Reflect on a time when you questioned or challenged a belief or idea. What prompted your thinking? What was the outcome?</p>
                        <p>4. Describe a problem you’ve solved or a problem you’d like to solve. It can be an intellectual challenge, a research query, an ethical dilemma — anything of personal importance, no matter the scale. Explain its significance to you and what steps you took or could be taken to identify a solution.</p>
                        <p>5. Discuss an accomplishment, event, or realization that sparked a period of personal growth and a new understanding of yourself or others.</p>
                        <p>6. Describe a topic, idea, or concept you find so engaging it makes you lose all track of time. Why does it captivate you? What or who do you turn to when you want to learn more?</p>
                        <p>7. Share an essay on any topic of your choice. It can be one you’ve already written, one that responds to a different prompt, or one of your own design.</p>
                </div>
                );
            }
            else if (coalitionType === "Coalition") {
                return (
                <div>
                    <p>1. Tell a story from your life, describing an experience that either demonstrates your character or helped to shape it.</p>
                        <p>2. Describe a time when you made a meaningful contribution to others in which the greater good was your focus. Discuss the challenges and rewards of making your contribution.</p>
                        <p>3. Has there been a time when you’ve had a long-cherished or accepted belief challenged? How did you respond? How did the challenge affect your beliefs?</p>
                        <p>4. What is the hardest part of being a student now? What’s the best part? What advice would you give a younger sibling or friend (assuming they would listen to you)?</p>
                        <p>5. Submit an essay on a topic of your choice.</p>
                </div>
                );
            }
            else if (type === "Coalition") {
                return (
                <div>
                    <p>1. Tell a story from your life, describing an experience that either demonstrates your character or helped to shape it.</p>
                        <p>2. Describe a time when you made a meaningful contribution to others in which the greater good was your focus. Discuss the challenges and rewards of making your contribution.</p>
                        <p>3. Has there been a time when you’ve had a long-cherished or accepted belief challenged? How did you respond? How did the challenge affect your beliefs?</p>
                        <p>4. What is the hardest part of being a student now? What’s the best part? What advice would you give a younger sibling or friend (assuming they would listen to you)?</p>
                        <p>5. Submit an essay on a topic of your choice.</p>
                </div>
                );
            }
            else if (type === "UC") {
                return (
                <div>
                    <p>1. Describe an example of your leadership experience in which you have positively influenced others, helped resolve disputes or contributed to group efforts over time.</p>
                        <p>2. Every person has a creative side, and it can be expressed in many ways: problem solving, original and innovative thinking, and artistically, to name a few. Describe how you express your creative side.</p>
                        <p>3. What would you say is your greatest talent or skill? How have you developed and demonstrated that talent over time?  </p>
                        <p>4. Describe how you have taken advantage of a significant educational opportunity or worked to overcome an educational barrier you have faced.</p>
                        <p>5. Describe the most significant challenge you have faced and the steps you have taken to overcome this challenge. How has this challenge affected your academic achievement?</p>
                        <p>6. Think about an academic subject that inspires you. Describe how you have furthered this interest inside and/or outside of the classroom.</p>
                        <p>7. What have you done to make your school or your community a better place?</p>
                        <p>8. Beyond what has already been shared in your application, what do you believe makes you stand out as a strong candidate for admissions to the University of California?</p>
                </div>
                );
            }
            else {
                return "Visit Website";
            }
        }
        else {
            return application
        }
    }

    essaySelect() {
        console.log("hellocontent")
        var keyCounter = 0;
        return (
        <div className="active-essay-bar" >
        <h1>Choose your Application Type: </h1>
        {this.state.selectedPrompts.map((prompts, counter) => {
            var header = "";
            if(counter == 0) {
                header = "Common";
            }
            else if (counter == 1) {
                header = "Coalition";
            }
            else {
                header = "UC";
            }
            if (prompts == true) {
                keyCounter++;
                this.setState({essayContent: header})
            return (
                <ActiveTab key={keyCounter} content = {header} onActiveTab={(keyCounter) => {this.setActiveTab(keyCounter)}} isActive={(keyCounter) => {this.isActive(keyCounter)}}  />
            )
            }
            else {
                return;
            }
        })}
        </div>
        );
    }

    essayFormat(essays, application) {
        if (typeof essays === 'string' && typeof application === 'string') {
            var essayArrayInit = essays.split("|");
            var essayArray = [];
            for (var i = 1; i < essayArrayInit.length; i++) {
                essayArray.push(essayArrayInit[i]);
            }
            var commonReturn = false;
            var applicationArray = application.split("/");
            applicationArray.map((applications) => {
                var typeArray = applications.split(" ");
                var type = typeArray[0];
                var coalitionType = "none";
                if(typeArray.length > 1) {
                    coalitionType = typeArray[1];
                }
                if (type === "Common") {
                    commonReturn = true;
                    this.state.selectedPrompts.push(true);
                }
                else {
                    this.state.selectedPrompts.push(false);
                }
                if(type === "Coalition") {
                    this.state.selectedPrompts.push(true);
                }
                else if(coalitionType === "Coalition") {
                    this.state.selectedPrompts.push(true);
                }
                else {
                    this.state.selectedPrompts.push(false);
                }
                if(type === "UC") {
                    this.state.selectedPrompts.push(true);
                }
                else {
                    this.state.selectedPrompts.push(false);
                }
            })
                return (
                    <div className="essay-text">
                        <div className = "essay-header">
                            <h1>Choose Application Type:</h1>
                        </div>
                        <div className="essay-header2">
                        {applicationArray.map((applications, index) => {
                             var typeArray = applications.split(" ");
                             var type = typeArray[0];
                             console.log(this.state.essayContent);
                             var coalitionType = "none";
                             const active = this.state.activeKey === index ? "active-essay" : "inactive-essay";
                             console.log(index);
                             console.log(this.state.activeKey);
                             if(typeArray.length > 1) {
                                 coalitionType = typeArray[1];
                             }
                            return (
                                <h1 style={{width:"100%"}}>
                                    <a className={active} key={index} onClick={this.handleClick.bind(this, index, applications)}>{applications}</a>
                                </h1>
                            );
                        })}
                        </div>
                        <h1 style={{marginTop:"1rem"}}>Essays Required:</h1>
                        <Accordion style={{width: "100%", backgroundColor: "#313b4c"}}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon style={{color: "white"}}/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                            <h1 style={{color: "white"}}> {this.essayContentHeader(this.state.college_json["app_site"])} </h1>
                            </AccordionSummary>
                            <AccordionDetails style={{backgroundColor: "white", flexDirection: "column", border: "none"}}>
                                {this.essayContent(this.essayContentHeader(this.state.college_json["app_site"]))}
                            </AccordionDetails>
                        </Accordion>
                        <Accordion style={{width: "100%", backgroundColor: "#313b4c"}}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon style={{color: "white"}}/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                            <h1 style={{color: "white"}}>
                                Supplemental Essay Questions {this.essayHeaderFunc(this.state.college_json["supplemental_essays"])}
                            </h1>
                            </AccordionSummary>
                            <AccordionDetails style={{backgroundColor: "white", flexDirection: "column", border: "none"}}>
                                {essayArray.map((essay, index) => {
                                return (
                                    <p style={{width: "100%"}}>{index + 1}.{essay}</p>
                                )
                                })}
                            </AccordionDetails>
                        </Accordion>
                        <h1 style={{marginTop:"1rem"}}>Other Helpful Links</h1>
                                <p>
                                    Official Site: <a href={this.generateLink(this.state.college_json["school_url"])} target="_blank" rel="noopener noreferrer">{this.generateLink(this.state.college_json["school_url"])}</a>
                                </p>
                                <p>
                                    Financial Aid: <a href={this.generateLink(this.state.college_json["npc_url"])} target="_blank" rel="noopener noreferrer">{this.generateLink(this.state.college_json["npc_url"])}</a>
                                </p>
                                <p>
                                    Housing: <a href={financialAid} target="_blank" rel="noopener noreferrer">{financialAid}</a>
                                </p>
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
                Loading: false,
            });
        });

    }

    generateLink(link) {
        var linkArray = link.split("https://");
        if(linkArray.length>1) {
            return link;
        }
        else{
            return "https://"+link;
        }
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
                    {this.essayFormat(this.state.college_json["supplemental_essays"], this.state.college_json["app_site"])}
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
                                <p>
                                    State: {this.state.college_json["state"]}
                                </p>
                                <p>
                                    Location Type: {this.state.college_json["locale"]}
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
                                <p>
                                    Average SAT: {this.state.college_json["sat_overall"]}
                                </p>
                                <p>
                                    Average ACT: {this.state.college_json["act_overall"]}
                                </p>
                            </Grid>
                            </Grid>
                    </div>
                    <div className = "application-type" >
                        <h1 className = "application-header" >Map Location</h1>
                        <Map lat= {this.state.college_json["latitude"]} lng={this.state.college_json["longitude"]}/>
                        <div style={{width:"100%", height:"100%"}} />
                        <h1 className="ethnicity-header">Ethnicity Breakdown</h1>
                        <div style={{marginLeft:"-5%"}} >
                        <Pie height="225%"
                            data={{
                                labels: ['Asian', 'White', 'Black', 'Hispanic', 'International'], 
                                datasets: [{data: [this.state.college_json["ethnicity_asian"]*100, this.state.college_json["ethnicity_white"]*100, this.state.college_json["ethnicity_black"]*100, this.state.college_json["ethnicity_hispanic"]*100, this.state.college_json["ethnicity_nra"]*100],
                                            backgroundColor: ['#313b4c', '#cccccc', '#737373', '#6666ff', 'green', 'red', 'purple']}]
                            }}
                            options={{
                                tooltips: {
                                    callbacks: {
                                        label: function(tooltipItem, data) {
                                            let value = data.datasets[0].data[tooltipItem.index]
                                            return Math.round(value) + '%'
                                        }, 
                                        title: function(tooltipItem, data) {
                                            return data.labels[tooltipItem[0].index];
                                        }
                                    }
                                }
                            }}
                        />
                        </div>
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
                <NavBar searchBarInUse={this.searchBarInUse} setSearch={this.setSearch} searchBar={this.state.searchBar} active="0" />
                {this.state.Loading ? this.renderSpinner() : this.renderIndividual()}
            </div>
        );
    }
}

export default Individual;


