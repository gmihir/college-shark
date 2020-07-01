import React, { Component } from 'react';
import NavBar from '../components/content/Navbar';
import '../css/Essays.css';
import { OverlayTrigger, Spinner } from 'react-bootstrap';
import { Common, Coalition } from '../components/Popovers';
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Essays extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resultsFromSearch: [],
            searchBar: false,
            selectedColleges: [],
            numEssays: 0,
            rerender: false,
            Loading: true
        };
        this.searchBarInUse = this.searchBarInUse.bind(this);
        this.setSearch = this.setSearch.bind(this);
        this.requiresUCApp = this.requiresUCApp.bind(this);
        this.requiresCommonApp = this.requiresCommonApp.bind(this);
        this.requiresCoalitionApp = this.requiresCoalitionApp.bind(this);
        this.requiresOnlyCoalition = this.requiresOnlyCoalition.bind(this);
        this.requiresOnlyCommon = this.requiresOnlyCommon.bind(this);
        this.renderFirstHeader = this.renderFirstHeader.bind(this);
        this.renderUC = this.renderUC.bind(this);
        this.renderCommon = this.renderCommon.bind(this);
        this.requiresOnlyCoalition = this.requiresOnlyCoalition.bind(this);
        this.renderPopup = this.renderPopup.bind(this);
        this.calculateNumEssays = this.calculateNumEssays.bind(this);
        this.renderGeneralHeader = this.renderGeneralHeader.bind(this);
        this.requiresOnlyUC = this.requiresOnlyUC.bind(this);
        this.requiresSupplementals = this.requiresSupplementals.bind(this);
        this.renderSupplementalTitle = this.renderSupplementalTitle.bind(this);
        this.renderSupplementals = this.renderSupplementals.bind(this);
        this.renderSupplementalHeader = this.renderSupplementalHeader.bind(this);
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
          if (inUse) {
            this.setState({ searchBar: inUse, rerender: true });
          } else {
            this.setState({ searchBar: inUse, rerender: false });
          }
        }
      }

    requiresUCApp() {
        var requires = this.state.selectedColleges.some(college => college.app_site === "UC Application");
        console.log("uc app: " + requires);
        return requires;
    }

    requiresCommonApp() {
        var requires = this.state.selectedColleges.some(college => college.common_app === "y");
        console.log("common app: " + requires);
        return requires;
    }

    requiresCoalitionApp() {
        var requires = this.state.selectedColleges.some(college => college.coalition_app === "y");
        console.log("coalition app: " + requires);
        return requires;
    }

    requiresOnlyCommon() {
        var requires = this.state.selectedColleges.every(college => college.common_app === "y" || !college.app_site.includes("Coalition Application"));
        if(this.state.selectedColleges.length === 0) {
            return false;
        }
        console.log("only common: " + requires);
        return requires;
    }

    requiresOnlyCoalition() {
        var requires = this.state.selectedColleges.every(college => college.coalition_app === "y" || !college.app_site.includes("Common Application"));
        if(this.state.selectedColleges.length === 0) {
            return false;
        }
        console.log("only coalition: " + requires);
        return requires;
    }

    requiresOnlyUC() {
        var requires = this.state.selectedColleges.every(college => college.coalition_app === "n" && college.common_app === "n" && college.app_site === "UC Application");
        if(this.state.selectedColleges.length === 0) {
            return false;
        }
        console.log("only uc: " + requires);
        return requires;
    }

    requiresSupplementals() {
        var requires = this.state.selectedColleges.some(college => !(college.supplemental_essays === ""));
        return requires;
    }

    renderPopup() {
        var onlyCommon = this.requiresOnlyCommon();
        var onlyCoalition = this.requiresOnlyCoalition();

        if (onlyCommon && this.requiresCoalitionApp() && !this.requiresOnlyUC()) {
            return (
                <OverlayTrigger trigger="click" placement="right" overlay={Common} rootClose>
                    <div className="icon-background"><FontAwesomeIcon icon={faExclamation} style={{ opacity: '100%' }} /></div>
                </OverlayTrigger>
            )
        }
        else if (onlyCoalition && this.requiresCommonApp() && !this.requiresOnlyUC()) {
            return (
                <OverlayTrigger trigger="click" placement="right" overlay={Coalition} rootClose>
                   <div className="icon-background"><FontAwesomeIcon icon={faExclamation} style={{ opacity: '100%' }} /></div>
                </OverlayTrigger>
            )
        } 
    }

    calculateNumEssays() {
        var num = 0;
        if(this.state.selectedColleges.length === 0) {
            return 0;
        }
        // first do for general essays
        if (this.requiresOnlyUC()) {
            return 4;
        }

        if (this.requiresUCApp()) {
            num += 4;
        }

        if (this.requiresOnlyCommon()) {
            num++;
        }
        else if (this.requiresOnlyCoalition()) {
            num++;
        }
        else {
            if (this.requiresCommonApp()) {
                num++;
            }

            if (this.requiresCoalitionApp()) {
                num++;
            }
        }

        var json = this.state.selectedColleges;


        for (var i = 0; i < json.length; i++) {
            var curr = json[i].supplemental_essays;
            console.log(curr);
            var parsed = parseInt(curr, 10);
            if (!isNaN(parsed)) {
                num += parseInt(curr, 10);
            }
            console.log(num);
        }
        return num;
    }


    componentDidMount() {
        fetch("/essays", {
            method: "GET",
            header: {
                'Content-Type': 'application/json'
            },
        }).then(response => {
            console.log(response);
            return response.json()
        }).then(data => {
            let collegeList = [];
            data.map(college => {
                var collegeName = JSON.parse(college);
                collegeList.push(collegeName);
            })
            console.log(collegeList);
            this.setState({ 
                selectedColleges: collegeList, 
                numEssays: this.calculateNumEssays(), 
                rerender: true,
                Loading: false });
            console.log(this.state.selectedColleges);
        });
    }

    updateColleges(){
        fetch("/essays", {
            method: "GET",
            header: {
                'Content-Type': 'application/json'
            },
        }).then(response => {
            console.log(response);
            return response.json()
        }).then(data => {
            let collegeList = [];
            data.map(college => {
                var collegeName = JSON.parse(college);
                collegeList.push(collegeName);
            })
            console.log(collegeList);
            this.setState({ 
                selectedColleges: collegeList, 
                numEssays: this.calculateNumEssays(), 
                rerender: true,
                Loading: false });
            console.log(this.state.selectedColleges);
        });
    }

    renderUC = () => {
        var uc = this.requiresUCApp();
        if (uc) {
            return (
                <div>
                    <div className="header-div">
                        <h3 className="header-text">UC Application (4 of 8 Required)</h3>
                    </div>
                    <div className="essaytext">
                        <p>1. Describe an example of your leadership experience in which you have positively influenced others, helped resolve disputes or contributed to group efforts over time.</p>
                        <p>2. Every person has a creative side, and it can be expressed in many ways: problem solving, original and innovative thinking, and artistically, to name a few. Describe how you express your creative side.</p>
                        <p>3. What would you say is your greatest talent or skill? How have you developed and demonstrated that talent over time?  </p>
                        <p>4. Describe how you have taken advantage of a significant educational opportunity or worked to overcome an educational barrier you have faced.</p>
                        <p>5. Describe the most significant challenge you have faced and the steps you have taken to overcome this challenge. How has this challenge affected your academic achievement?</p>
                        <p>6. Think about an academic subject that inspires you. Describe how you have furthered this interest inside and/or outside of the classroom.</p>
                        <p>7. What have you done to make your school or your community a better place?</p>
                        <p>8. Beyond what has already been shared in your application, what do you believe makes you stand out as a strong candidate for admissions to the University of California?</p>
                    </div>
                </div>
            )
        }
    }

    renderCommon = () => {
        var common = this.requiresCommonApp();
        console.log("requires common: " + common);
        if (common) {
            return (
                <div>
                    <div className="header-div">
                        <h3 className="header-text">Common Application (1 of 7 Required)</h3>
                    </div>

                    <div className="essaytext">
                        <p>1. Some students have a background, identity, interest, or talent so meaningful they believe their application would be incomplete without it. If this sounds like you, please share your story.</p>
                        <p>2. The lessons we take from obstacles we encounter can be fundamental to later success. Recount a time when you faced a challenge, setback, or failure. How did it affect you, and what did you learn from the experience?</p>
                        <p>3. Reflect on a time when you questioned or challenged a belief or idea. What prompted your thinking? What was the outcome?</p>
                        <p>4. Describe a problem you’ve solved or a problem you’d like to solve. It can be an intellectual challenge, a research query, an ethical dilemma — anything of personal importance, no matter the scale. Explain its significance to you and what steps you took or could be taken to identify a solution.</p>
                        <p>5. Discuss an accomplishment, event, or realization that sparked a period of personal growth and a new understanding of yourself or others.</p>
                        <p>6. Describe a topic, idea, or concept you find so engaging it makes you lose all track of time. Why does it captivate you? What or who do you turn to when you want to learn more?</p>
                        <p>7. Share an essay on any topic of your choice. It can be one you’ve already written, one that responds to a different prompt, or one of your own design.</p>
                    </div>
                </div>
            )
        }
    }

    renderCoalition = () => {
        var coalition = this.requiresCoalitionApp();

        if (coalition) {
            return (
                <div>
                    <div className="header-div">
                        <h3 className="header-text">Coalition Application (1 of 5 Required)</h3>
                    </div>

                    <div className="essaytext" >
                        <p>1. Tell a story from your life, describing an experience that either demonstrates your character or helped to shape it.</p>
                        <p>2. Describe a time when you made a meaningful contribution to others in which the greater good was your focus. Discuss the challenges and rewards of making your contribution.</p>
                        <p>3. Has there been a time when you’ve had a long-cherished or accepted belief challenged? How did you respond? How did the challenge affect your beliefs?</p>
                        <p>4. What is the hardest part of being a student now? What’s the best part? What advice would you give a younger sibling or friend (assuming they would listen to you)?</p>
                        <p>5. Submit an essay on a topic of your choice.</p>
                    </div>
                </div>
            )
        }
    }

    renderFirstHeader = () => {
        console.log(this.state.selectedColleges)
        if(this.state.selectedColleges.length === 0) {
            return(
            <div className="empty-div">
                <div className="redirect-div">
                    <br />
                    <h3 className="explore-redirect">You currently have no colleges selected, check out the Explore tab to add some</h3>
                </div>
            </div>

            )
        } else {
            return (
                <div className="titleheader">
                    <div className="required">
                        <br />
                        <h3 className="required-text">You have <b>{this.calculateNumEssays(this.state.selectedColleges)}</b> required prompt(s).</h3>
                    </div>
                    <div className="popup">
                        {this.renderPopup()}
                    </div>
                </div>
    
            )
        }
    }

    renderGeneralHeader = () => {
        if (this.calculateNumEssays() !== 0) {
            return (
                    <div className="subtitle">
                        <h2>General Essays</h2>
                    </div>
            )
        }
    }

    renderSupplementalHeader = () => {
        if (this.requiresSupplementals()) {
            return (
                <div className="subtitle">
                    <h2>Supplemental Essays</h2>
                </div>
            )
        }
    }

    renderSupplementalTitle(college) {
        var total = college.supplemental_essays.split("|").length - 1;
        var required = parseInt(college.supplemental_essays, 10);
        if (!isNaN(required)) {
            return (
                <div className="header-div">
                    <h3 className="header-text">{college.college_name} ({required} of {total} Required)</h3>
                </div>
            );
        }
    }

    renderSupplementalBody(college) {
        var essays = college.supplemental_essays.split("|");
        essays.shift();
        console.log(essays);
        if (essays.length > 0) {
            return (
                <div>
                    {essays.map((prompt, index) => {
                        return (
                            <div className="supplementaltext">
                                <p>{index + 1}.{prompt}</p>
                            </div>
                        )
                    })}
                </div>
            );
        }
    }

    renderSupplementals = () => {
        return (
            <div>
                {this.state.selectedColleges.map((college) => {
                    console.log(college);
                    return (
                        <div>
                            {this.renderSupplementalTitle(college)}
                            {this.renderSupplementalBody(college)}
                        </div>
                    )
                })}
            </div>
        );
    }

    renderPage() {
        if (this.state.searchBar === false) {
            if(!this.state.rerender){
                this.updateColleges();
            }
            
            if (this.state.Loading) {
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
            return(
                <div>
                 {this.renderFirstHeader()}
                 {this.renderGeneralHeader()}
                 <div className="section">
                    {this.renderUC()}
                    {this.renderCommon()}
                    {this.renderCoalition()}
                 </div>
                 <div classname="section">
                    {this.renderSupplementalHeader()}
                    {this.renderSupplementals()}
                 </div>
               </div>
            )

        }
    }

    render() {
        return (
            <div>
                <NavBar searchBarInUse={this.searchBarInUse} setSearch={this.setSearch} searchBar={this.state.searchBar} active="3" />
                {this.renderPage()}
                <br></br>
                <br></br>
                <br></br>
            </div>
        )
    }
}
export default Essays;
