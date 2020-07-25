import React from "react";
import '../css/Explore.css';
import { OverlayTrigger, Spinner } from 'react-bootstrap';
import NavBar from '../components/content/Navbar';
import Tile from '../components/Tile';
import { States, Type, App, Sortby, LOR, OrderBy } from '../components/State';
import { Tuition, Rankings, AcceptanceRate, AppFee, Population, AppType, LetterRec,
     SchoolType, StateList, ACTScoreList, SATScoreList } from '../components/Popovers';
import {Slider} from 'primereact/slider';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primeicons/primeicons.css';
import Select from 'react-select';
import { faInfoCircle, faSadTear, faSort, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from 'react-router-dom';

class Explore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchBar: false,
            resultsFromSearch: [],
            College: [],
            School: [],
            App: [],
            LOR: [],
            Filter: [],
            IsDescending: [],
            SATAverage: [0, 1600],
            ACTAverage: [0, 36],
            AppFeeLower: '',
            AppFeeUpper: '',
            AcceptanceLower: '',
            AcceptanceUpper: '',
            PopulationLower: '',
            PopulationUpper: '',
            TuitionLower: '',
            TuitionUpper: '',
            RankingLower: '',
            RankingUpper: '',
            StateFilter: [],
            CheckedState: false,
            Loading: true,
            Open: false,
            Error: false,
            ToggleClear: false,
            DisplayResults: this.props.location.state !== undefined && this.props.location !== undefined ? true : false,
            ExploreRedirect: this.props.location.state !== undefined && this.props.location !== undefined ? true : false
        };
        this.setSearch = this.setSearch.bind(this);
        this.searchBarInUse = this.searchBarInUse.bind(this);
        this.renderExplore = this.renderExplore.bind(this);

        //Handle the click for the submit button
        this.handleClick = this.handleClick.bind(this);
        //Handle the filter by dropdown 
        this.handleFilter = this.handleFilter.bind(this);
        //Handle the OrderBy filter dropdown
        this.handleOrderBy = this.handleOrderBy.bind(this)
        //Handles the State array
        this.handleState = this.handleState.bind(this);
        //Clears the filters on the page
        this.clearFilter = this.clearFilter.bind(this);
        //Handle the enter key when pressed
        this.enterKey = this.enterKey.bind(this);
        //Renders the results, if any
        this.displayResults = this.displayResults.bind(this);
        //Toggle display for mobile
        this.togglePanel = this.togglePanel.bind(this);
        this.renderFilter = this.renderFilter.bind(this);

        this.numFormat = this.numFormat.bind(this);
        this.dateFormat = this.dateFormat.bind(this);
        this.pushToArray = this.pushToArray.bind(this);
        this.splitToArray = this.splitToArray.bind(this);
    }

    setSearch = (results) => {
        if (results !== this.state.resultsFromSearch) {
          this.setState({
            resultsFromSearch: results
          })
        }
      }

    componentDidMount() {
        window.scrollTo(0, 0);
        const getTuitionArray = sessionStorage.getItem("tuitionarray");
        console.log(getTuitionArray);
        let toArray = [];

        let tuitionLower = sessionStorage.getItem("normallower");
        if(tuitionLower !== null && tuitionLower !== '') {
            tuitionLower = parseInt(tuitionLower);
        }
        this.setState({ TuitionLower: tuitionLower });

        let tuitionUpper = sessionStorage.getItem("normalupper");
        if(tuitionUpper !== null && tuitionUpper !== '') {
            tuitionUpper = parseInt(tuitionUpper);
        }
        this.setState({ TuitionUpper: tuitionUpper });

        let savedArray = sessionStorage.getItem("array");
        let copyArray = [];
        if (savedArray === null || savedArray === undefined || savedArray === '') {
            //do nothing
            this.setState({ToggleClear: false});
        } else {
            copyArray = savedArray.split(",");
            if (copyArray[0] === "") {
                copyArray = [];
            }
            this.setState({ToggleClear: true});
        }

        const filterBy = sessionStorage.getItem("filterby");
        let indices = 0;
        if (filterBy !== null && filterBy !== ',') {
            const index = this.splitToArray(filterBy, Sortby);
            indices = index;
            this.setState({ Filter: Sortby[index] });
        } else {
            this.setState({ Filter: []});
            indices = 0;    
        }

        const checked = sessionStorage.getItem("checked");
        let checkOrderBy = false;
        if(checked !== null && checked !== 'undefined') {
            if(checked === 'false') {
                this.setState({ IsDescending: OrderBy[0]});
                checkOrderBy = false
            } else {
                this.setState({ IsDescending: OrderBy[1]});
                checkOrderBy = true    
            }
        } else {
            this.setState({ IsDescending: []});
            checkOrderBy = false    
        }

        if(getTuitionArray !== '' && getTuitionArray !== null) {
            toArray = getTuitionArray.split(",");
            toArray[0] = "tuition"
            toArray[1] = parseInt(toArray[1]);
            toArray[2] = parseInt(toArray[2]);
            this.setState({ToggleClear: true});
        }

        console.log(toArray);
        
        fetch("/filter", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Array: copyArray,
                Filter: Sortby[indices].value,
                IsDescending: checkOrderBy,
                Tuition: toArray,
                State: sessionStorage.getItem("userState")
            })
        }).then(response => {
            return response.json()
        }).then(data => {
            this.setState({
                College: data,
                Loading: false
            })
        });

        let satArr = [0, 1600];
        if(sessionStorage.getItem('satscore') !== null) {
            const satAverage = sessionStorage.getItem('satscore');
            let temp = [];
            satArr = satAverage.split(',');
            satArr.forEach((sat) => {
                temp.push(parseInt(sat));
            })
            this.setState({SATAverage: temp});
        } else {
            this.setState({SATAverage: satArr});
        }

        let actArr = [0, 36];
        if(sessionStorage.getItem('actscore') !== null) {
            const satAverage = sessionStorage.getItem('actscore');
            let acttemp = [];
            actArr = satAverage.split(',');
            actArr.forEach((sat) => {
                acttemp.push(parseInt(sat));
            })
            this.setState({ACTAverage: acttemp});
        } else {
            this.setState({ACTAverage: actArr});
        }

        const appFee = sessionStorage.getItem("feelower");
        this.setState({ AppFeeLower: appFee });

        const appFeeUpper = sessionStorage.getItem("feeupper");
        this.setState({ AppFeeUpper: appFeeUpper });

        const acceptLower = sessionStorage.getItem("acceptlower");
        this.setState({ AcceptanceLower: acceptLower });

        const acceptUpper = sessionStorage.getItem("acceptupper");
        this.setState({ AcceptanceUpper: acceptUpper });

        const populationLower = sessionStorage.getItem("populationlower");
        this.setState({ PopulationLower: populationLower });

        const populationUpper = sessionStorage.getItem("populationupper");
        this.setState({ PopulationUpper: populationUpper });

        const nationalLower = sessionStorage.getItem("nationallower");
        this.setState({ RankingLower: nationalLower });

        const nationalUpper = sessionStorage.getItem("nationalupper");
        this.setState({ RankingUpper: nationalUpper });

        const checkedState = sessionStorage.getItem("checkedstate");
        if (checkedState !== null) {
            this.setState({ CheckedState: checkedState });
        }

        const appType = sessionStorage.getItem("appfee");
        if (appType !== null) {
            if(appType.length === 0 || appType === ',') {
                this.setState({ App: []});
            } else {
                const index = this.splitToArray(appType, App);
                this.setState({ App: App[index]});
            }
        }

        const letterRec = sessionStorage.getItem("letterrec");
        if (letterRec !== null) {
            if(letterRec.length === 0 || letterRec === ',') {
                this.setState({ LOR: []});
            } else {
                const index = this.splitToArray(letterRec, LOR);
                this.setState({ LOR: LOR[index]});
            }          
        }

        const schoolType = sessionStorage.getItem("schooltype");
        if (schoolType !== null) {
            if(schoolType.length === 0 || schoolType === ',') {
                this.setState({ School: [] });
            } else {
                const index = this.splitToArray(schoolType, Type);
                this.setState({ School: Type[index] });
            }
        }

        const stateFilter = sessionStorage.getItem("statefilter");
        if (stateFilter !== null) {
            let newArray = [];
            if(stateFilter === "," || stateFilter.length === 0) {
                newArray = []
            } else {
                let splitArray = stateFilter.split(",");
                for (let i = 0; i < splitArray.length; i++) {
                    let obj = {
                        value: splitArray[i],
                        label: splitArray[i]
                    }
                    newArray.push(obj);
                }
            }

            this.setState({ StateFilter: newArray });
        }
    }

    splitToArray(type, compare) {
        let spliceApp = type.split(",");
        let appTypeObj = 0;
        for (let i = 0; i < compare.length; i++) {
            let getValue = spliceApp[0];
            if (!isNaN(parseFloat(getValue))) {
                getValue = Number.parseFloat(getValue);
            }

            if (getValue === compare[i].value) {
                appTypeObj = i;
            }
        }
        return appTypeObj;
    }

    searchBarInUse = (inUse) => {
        if (inUse !== this.state.searchBar) {
            this.setState({ searchBar: inUse });
        }
    }

    displayResults() {
        const getPropsState = this.props.location.state;
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
        } else if (this.state.College.length !== 0) {
            if(this.state.Open){ 
                return (
                    <div></div>
                )
            } else {
                if(getPropsState === undefined) {
                    return (
                        <div className="list-container">
                            <ul className="ListColleges">
                            {
                                this.state.College.map(college => {
                                let val = JSON.parse(college);
                                return (
                                    <li>
                                        <Tile Alias={val["alias"]} Tuition={this.numFormat(val["tuition_normal"])} TuitionOOS={this.numFormat(val["tuition_oos"])}
                                            Acceptance={val["acceptance_rate"]} Fee={val["app_fee"]} collegeName={val["college_name"]}
                                            Logo={val["college_logo"]} Type={val["school_type"]} Population={this.numFormat(val["population"])}
                                            Ranking={val["national_ranking"]}
                                        />
                                    </li>
                                )
                            })}
                            </ul>
                        </div>
                    )
                } else {
                    return (
                        <div className="list-container">
                            <ul className="ListColleges">
                            {
                                this.state.College.filter(college => getPropsState.Colleges.includes(JSON.parse(college)["college_name"])).map(college => {
                                let val = JSON.parse(college);
                                return (
                                    <li>
                                        <Tile Alias={val["alias"]} Tuition={this.numFormat(val["tuition_normal"])} TuitionOOS={this.numFormat(val["tuition_oos"])}
                                            Acceptance={val["acceptance_rate"]} Fee={val["app_fee"]} collegeName={val["college_name"]}
                                            Logo={val["college_logo"]} Type={val["school_type"]} Population={this.numFormat(val["population"])}
                                            Ranking={val["national_ranking"]}
                                        />
                                    </li>
                                )
                            })}
                            </ul>
                        </div>
                    )
                }
            }
        } else {
            return (
                <div className="results-div">
                    <div className="icon-results"><FontAwesomeIcon icon={faSadTear} /></div>
                    <h1 className="no-results">No results found...</h1>
                    {this.state.Error && <div className="error-message"><h1>Error: Please check your inputs and try again.</h1></div>}
                </div>
            )
        }
    }

    renderFilter(String) {
        return (
            <div className="filter" style={{display: String}}>
                <h1 className="filter-name">Filters</h1>

                {this.state.ToggleClear ? <div className="clear-filters"><button onClick={this.clearFilter}>Clear Filters</button></div> : null}
                {this.state.ExploreRedirect ? <div className="clear-filters"><button 
                onClick={() => {
                    this.props.history.push('/explore');
                    this.setState({DisplayResults: false, ExploreRedirect: false});
                }}>Return to Explore</button></div> : null}
                
                <hr></hr>

                <div className="tuition">
                    <div className="header">Population</div>
                    <form className="filter-form">
                        <input onChange={(e) => this.setState({ PopulationLower: e.target.value })} type="text" placeholder="Lower" size="100"
                            value={this.state.PopulationLower} onKeyDown={this.enterKey}
                        ></input>
                        <span>-</span>
                        <input onChange={(e) => this.setState({ PopulationUpper: e.target.value })} type="text" placeholder="Upper" size="100"
                            value={this.state.PopulationUpper} onKeyDown={this.enterKey}
                        ></input>
                    </form>

                    {(this.state.PopulationLower !== '' || this.state.PopulationUpper !== '') && (this.state.PopulationLower !== null || this.state.PopulationUpper !== null) ? 
                    <div className="clear-filter-icon" onClick={() => this.setState({ PopulationLower: '', PopulationUpper: ''}, () => this.handleClick())}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div> : null}

                    <OverlayTrigger trigger="click" placement="right" overlay={Population} rootClose>
                        <div><FontAwesomeIcon icon={faInfoCircle} style={{ opacity: '60%' }} /></div>
                    </OverlayTrigger>
                </div>

                <hr></hr>

                <div className="tuition">
                    <div className="header">Accpt. Rate</div>
                    <form className="filter-form">
                        <input onChange={(e) => this.setState({ AcceptanceLower: e.target.value })} type="text" placeholder="Lower" size="100"
                            value={this.state.AcceptanceLower} onKeyDown={this.enterKey}
                        ></input>
                        <span>-</span>
                        <input onChange={(e) => this.setState({ AcceptanceUpper: e.target.value })} type="text" placeholder="Upper" size="100"
                            value={this.state.AcceptanceUpper} onKeyDown={this.enterKey}
                        ></input>
                    </form>

                    {(this.state.AcceptanceLower !== '' || this.state.AcceptanceUpper !== '') && (this.state.AcceptanceLower !== null || this.state.AcceptanceUpper !== null) ? 
                    <div className="clear-filter-icon" onClick={() => this.setState({ AcceptanceLower: '', AcceptanceUpper: ''}, () => this.handleClick())}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div> : null}

                    <OverlayTrigger trigger="click" placement="right" overlay={AcceptanceRate} rootClose>
                        <div><FontAwesomeIcon icon={faInfoCircle} style={{ opacity: '60%' }} /></div>
                    </OverlayTrigger>
                </div>

                <hr></hr>

                <div className="tuition">
                    <div className="header">App. Fee</div>
                    <form className="filter-form">
                        <input onChange={(e) => this.setState({ AppFeeLower: e.target.value })} type="text" placeholder="Lower" size="100"
                            value={this.state.AppFeeLower} onKeyDown={this.enterKey}
                        ></input>
                        <span>-</span>
                        <input onChange={(e) => this.setState({ AppFeeUpper: e.target.value })} type="text" placeholder="Upper" size="100"
                            value={this.state.AppFeeUpper} onKeyDown={this.enterKey}
                        ></input>
                    </form>

                    {(this.state.AppFeeLower !== '' || this.state.AppFeeUpper !== '') && (this.state.AppFeeLower !== null || this.state.AppFeeUpper !== null) ? 
                    <div className="clear-filter-icon" onClick={() => this.setState({ AppFeeLower: '', AppFeeUpper: ''}, () => this.handleClick())}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div> : null}

                    <OverlayTrigger trigger="click" placement="right" overlay={AppFee} rootClose>
                        <div><FontAwesomeIcon icon={faInfoCircle} style={{ opacity: '60%' }} /></div>
                    </OverlayTrigger>
                </div>

                <hr></hr>

                <div className="tuition">
                    <div className="header">Ranking</div>
                    <form className="filter-form">
                        <input onChange={(e) => this.setState({ RankingLower: e.target.value })} type="text" placeholder="Lower" size="100"
                            value={this.state.RankingLower} onKeyDown={this.enterKey}
                        ></input>
                        <span>-</span>
                        <input onChange={(e) => this.setState({ RankingUpper: e.target.value })} type="text" placeholder="Upper" size="100"
                            value={this.state.RankingUpper} onKeyDown={this.enterKey}
                        ></input>
                    </form>

                    {(this.state.RankingLower !== '' || this.state.RankingUpper !== '') && (this.state.RankingLower !== null || this.state.RankingUpper !== null) ? 
                    <div className="clear-filter-icon" onClick={() => this.setState({ RankingLower: '', RankingUpper: ''}, () => this.handleClick())}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div> : null}

                    <OverlayTrigger trigger="click" placement="right" overlay={Rankings} rootClose>
                        <div><FontAwesomeIcon icon={faInfoCircle} style={{ opacity: '60%' }} /></div>
                    </OverlayTrigger>
                </div>

                <hr></hr>

                <div className="tuition">
                    <div className="header">Tuition</div>
                    <form className="filter-form">
                        <input onChange={(e) => this.setState({ TuitionLower: e.target.value })} type="text" placeholder="Lower" size="100"
                            value={this.state.TuitionLower} onKeyDown={this.enterKey}
                        ></input>
                        <span>-</span>
                        <input onChange={(e) => this.setState({ TuitionUpper: e.target.value })} type="text" placeholder="Upper" size="100"
                            value={this.state.TuitionUpper} onKeyDown={this.enterKey}
                        ></input>
                    </form>

                    {(this.state.TuitionLower !== '' || this.state.TuitionUpper !== '') && (this.state.TuitionLower !== null || this.state.TuitionUpper !== null) ? 
                    <div className="clear-filter-icon" onClick={() => this.setState({ TuitionLower: '', TuitionUpper: ''}, () => this.handleClick())}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div> : null}

                    <OverlayTrigger trigger="click" placement="right" overlay={Tuition} rootClose>
                        <div><FontAwesomeIcon icon={faInfoCircle} style={{ opacity: '60%' }} /></div>
                    </OverlayTrigger>
                </div>

                <hr></hr>

                <div className="app-type">
                    <div className="dropdown-div">
                        <div className="dropdown-main">
                            <Select onChange={(e) => {this.setState({ App: e }, () => {
                                this.handleClick();
                            }
                            )}} 
                            options={App} placeholder={"Application Type"} value={this.state.App}
                        />
                        </div>
                    </div>

                    {this.state.App.length !== 0 ? 
                    <div className="clear-filter-icon-dd" onClick={() => this.setState({ App: []}, () => this.handleClick())}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div> : null}

                    <OverlayTrigger trigger="click" placement="right" overlay={AppType} rootClose>
                        <div><FontAwesomeIcon icon={faInfoCircle}
                            style={{ opacity: '60%', marginLeft: 'calc(0.5rem)', marginTop: 'calc(0.6rem)' }} /></div>
                    </OverlayTrigger>
                </div>

                <hr></hr>

                <div className="app-type">
                    <div className="dropdown-div">
                        <div className="dropdown-main">
                            <Select onChange={(e) => this.setState({ LOR: e }, () => {
                                this.handleClick();
                            })}
                                options={LOR} placeholder={"Letters of Rec."} value={this.state.LOR}
                        />
                        </div>
                    </div>

                    {this.state.LOR.length !== 0 ? 
                    <div className="clear-filter-icon-dd" onClick={() => this.setState({ LOR: []}, () => this.handleClick())}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div> : null}

                    <OverlayTrigger trigger="click" placement="right" overlay={LetterRec} rootClose>
                        <div><FontAwesomeIcon icon={faInfoCircle}
                            style={{ opacity: '60%', marginLeft: 'calc(0.5rem)', marginTop: 'calc(0.6rem)' }} /></div>
                    </OverlayTrigger>
                </div>

                <hr></hr>

                <div className="school-type">
                    <div className="dropdown-div">
                        <div className="dropdown-main">
                            <Select onChange={(e) => this.setState({ School: e }, () => {
                                this.handleClick();
                            })}
                                options={Type} placeholder={"School Type"} value={this.state.School}
                        />
                        </div>
                    </div>

                    {this.state.School.length !== 0 ? 
                    <div className="clear-filter-icon-dd" onClick={() => this.setState({ School: []}, () => this.handleClick())}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div> : null}

                    <OverlayTrigger trigger="click" placement="right" overlay={SchoolType} rootClose>
                        <div><FontAwesomeIcon icon={faInfoCircle}
                            style={{ opacity: '60%', marginLeft: 'calc(0.5rem)', marginTop: 'calc(0.6rem)' }} /></div>
                    </OverlayTrigger>
                </div>

                <hr></hr>

                <div className="school-type">
                    <div className="dropdown-div">
                        <div className="dropdown-main">
                            <Select
                                placeholder="State(s)"
                                onChange={this.handleState}
                                isMulti
                                options={States}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                value={this.state.StateFilter}
                                closeMenuOnSelect={false}
                        />
                        </div>
                    </div>

                    <OverlayTrigger trigger="click" placement="right" overlay={StateList} rootClose>
                        <div><FontAwesomeIcon icon={faInfoCircle}
                            style={{ opacity: '60%', marginLeft: 'calc(0.5rem)', marginTop: 'calc(0.6rem)' }} /></div>
                    </OverlayTrigger>
                </div>

                <hr></hr>

                <div className="app-type">
                    <div className="div-slider">
                        <div className="slider-header">SAT Average: <p>{this.state.SATAverage[0]} - {this.state.SATAverage[1]}</p></div>
                        <div className="slider-main">
                            <Slider value={this.state.SATAverage} onChange={(e) => this.setState({SATAverage: e.value}, () => {
                                setTimeout(function() { this.handleClick(); }.bind(this), 1000);
                            })} range={true} max={1600}/>    
                        </div>
                    </div>

                    {this.state.SATAverage[0] !== 0 || this.state.SATAverage[1] !== 1600 ? 
                    <div className="clear-filter-icon-dd" onClick={() => this.setState({ SATAverage: [0, 1600]}, () => this.handleClick())}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div> : null}

                    <OverlayTrigger trigger="click" placement="right" overlay={SATScoreList} rootClose>
                        <div><FontAwesomeIcon icon={faInfoCircle}
                            style={{ opacity: '60%', marginLeft: 'calc(0.5rem)', marginTop: 'calc(1.1rem)' }} /></div>
                    </OverlayTrigger>
                </div>

                <hr></hr>

                <div className="app-type">
                    <div className="div-slider">
                        <div className="slider-header">ACT Average: <p>{this.state.ACTAverage[0]} - {this.state.ACTAverage[1]}</p></div>
                        <div className="slider-main">
                            <Slider value={this.state.ACTAverage} onChange={(e) => this.setState({ACTAverage: e.value}, () => {
                                setTimeout(function() { this.handleClick(); }.bind(this), 1000);
                            })} range={true} max={36}/>    
                        </div>
                    </div>

                    {this.state.ACTAverage[0] !== 0 || this.state.ACTAverage[1] !== 36 ? 
                    <div className="clear-filter-icon-dd" onClick={() => this.setState({ ACTAverage: [0, 36]}, () => this.handleClick())}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div> : null}

                    <OverlayTrigger trigger="click" placement="right" overlay={ACTScoreList} rootClose>
                        <div><FontAwesomeIcon icon={faInfoCircle}
                            style={{ opacity: '60%', marginLeft: 'calc(0.5rem)', marginTop: 'calc(1.1rem)' }} /></div>
                    </OverlayTrigger>
                </div>

                <hr></hr>
                

                <div className="filter-button-div">
                    <button onClick={this.handleClick} className="filter-button">APPLY</button>
                </div>
            </div>
        )
    }

    renderExplore = () => {
        if (this.state.searchBar === false) {
            return (
                <div className="container-div">
                    {this.renderFilter()}

                    <div className="content-display">
                        <div className="topbar-info">
                            <div className="filter-clear">
                                {this.state.DisplayResults ? <h3 className="display-search">Display Results for 
                                {this.props.location !== undefined && this.props.location.state !== undefined ? ` "` + this.props.location.state.Search + `"` : null}
                                </h3> : null}
                            </div>

                            <div className="float-display">
                                <div className="sort-by">
                                    <Select onChange={this.handleFilter} placeholder={"Order By"}
                                        options={Sortby} value={this.state.Filter}/>
                                </div>
                                <div className="order-by">
                                    <Select onChange={this.handleOrderBy} placeholder={"Sort By"}
                                        options={OrderBy} value={this.state.IsDescending}/>
                                </div>
                            </div>
                        </div>
                        {this.displayResults()}
                    </div>
                </div>
            )
        }
    }

    clearFilter(e) {
        this.setState({
            searchBar: false,
            College: [],
            School: [],
            App: [],
            LOR: [],
            Filter: [],
            IsDescending: [],
            AppFeeLower: '',
            AppFeeUpper: '',
            AcceptanceLower: '',
            AcceptanceUpper: '',
            PopulationLower: '',
            PopulationUpper: '',
            TuitionLower: '',
            TuitionUpper: '',
            RankingLower: '',
            RankingUpper: '',
            SATAverage: [0, 1600],
            ACTAverage: [0, 36],
            StateFilter: [],
            CheckedState: false,
            Loading: true,
            DisplayResults: false
        }, () => this.handleClick())
    }

    numFormat(num) {
        if (num === null) {
            return num;
        } else {
            return num.toLocaleString();
        }
    }

    dateFormat(input) {
        if(input === -1) {
            return("N/A");
        }
        else if(input === 0) {
          return("Rolling");
        }
        var myDate = new Date(input * 1000);
        return ((myDate.getUTCMonth() + 1) + "/" + myDate.getUTCDate() + "/" + myDate.getUTCFullYear());
      }
    

    pushToArray(state, string, array, sign, storage) {
        if (state === null || state === '') {
            //Nothing happens
            sessionStorage.setItem(storage, '');
        } else if (/^\d+$/.test(state)) {
            array.push(string);
            array.push(sign + state);
            this.setState({Error: false});
            sessionStorage.setItem(storage, state);
        } else {
            this.setState({Error: true});
            array.push(string);
            array.push("--1000");
        }
    }

    pushToTuitionArray(stateLower, stateUpper, array) {     
        let getLower = 0;
        let getHigher = 800000;
        
        if(/^\d+$/.test(stateLower)) {
            console.log(stateLower);
            getLower = parseInt(stateLower)
            this.setState({Error: false});
            sessionStorage.setItem("normallower", stateLower);
        } else {
            //Do nothing, this means stateLower is empty or not a real number
            console.log("error tuitionlower")
            this.setState({Error: true});
        }

        if(/^\d+$/.test(stateUpper)) {
            console.log(stateUpper);
            getHigher = parseInt(stateUpper);
            this.setState({Error: false});
            sessionStorage.setItem("normalupper", stateUpper);
        } else {
            //Do nothing, this means stateUpper is empty or not a real number
            console.log("error tuitionupper")
            this.setState({Error: true});
        }

        array.push("tuition");
        array.push(getLower);
        array.push(getHigher);
        console.log(array);
    }

    pushToArrayDouble(state, string, array, sign, storage) {
        if (state === null || state === '') {
            //Nothing happens
            sessionStorage.setItem(storage, '');
        } else if (/^[1-9]\d*(\.\d+)?$/.test(state)) {
            if(state.split(".").length > 2) {
                array.push(string);
                array.push("--1000");
                this.setState({Error: true});
                return;
            }
            array.push(string);
            array.push(sign + state);
            this.setState({Error: false});
            sessionStorage.setItem(storage, state);
        } else {
            this.setState({Error: true});
            array.push(string);
            array.push("--1000");
        }
    }


    enterKey(e) {
        if (e.key === 'Enter') {
            this.handleClick();
        }
    }

    handleClick(string) {
        if(string !== "state") {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }
        let array = [];
        let arrayTuition = [];

        this.pushToArray(this.state.AppFeeLower, "app_fee", array, "+", "feelower");

        this.pushToArray(this.state.AppFeeUpper, "app_fee", array, "-", "feeupper");

        this.pushToArrayDouble(this.state.AcceptanceLower, "acceptance_rate", array, "+", "acceptlower");

        this.pushToArrayDouble(this.state.AcceptanceUpper, "acceptance_rate", array, "-", "acceptupper");

        this.pushToArray(this.state.RankingLower, "national_ranking", array, "-", "nationallower");

        this.pushToArray(this.state.RankingUpper, "national_ranking", array, "+", "nationalupper");

        this.pushToArray(this.state.PopulationLower, "population", array, "+", "populationlower");

        this.pushToArray(this.state.PopulationUpper, "population", array, "-", "populationupper");

        if (this.state.TuitionLower !== '' || this.state.TuitionUpper !== '') {
            this.pushToTuitionArray(this.state.TuitionLower, this.state.TuitionUpper, arrayTuition);
        } 

        if (this.state.App.value !== 'Any' && this.state.App.length !== 0) {
            if (this.state.App.value === 'commonapp') {
                array.push("common_app");
                array.push("y");
            } else {
                array.push("coalition_app");
                array.push("y");
            }
        }

        if (this.state.School.value !== 'Any' && this.state.School.length !== 0) {
            array.push("school_type");
            array.push(this.state.School.value);
        }

        if (this.state.LOR.value !== 'Any' && this.state.LOR.length !== 0) {
            array.push("letter_of_rec_required");
            array.push(this.state.LOR.value);
        }

        if (this.state.StateFilter.value !== 'Any' && this.state.StateFilter.length !== 0) {
            this.state.StateFilter.forEach(state => {
                array.push("state")
                array.push(state.value);
            })
        }

        if(this.state.SATAverage[0] !== 0 || this.state.SATAverage[1] !== 1600) {
            array.push("sat_overall");
            array.push("+" + this.state.SATAverage[0]);
            array.push("sat_overall");
            array.push("-" + this.state.SATAverage[1]);
        }

        if(this.state.ACTAverage[0] !== 0 || this.state.ACTAverage[1] !== 36) {
            array.push("act_overall");
            array.push("+" + this.state.ACTAverage[0]);
            array.push("act_overall");
            array.push("-" + this.state.ACTAverage[1]);
        }

        const keys = [];
        this.state.StateFilter.forEach(state => {
            keys.push(state.value);
        })

        sessionStorage.setItem("filterby", [this.state.Filter.value, this.state.Filter.label]);
        sessionStorage.setItem("checked", this.state.IsDescending.value);
        sessionStorage.setItem("schooltype", [this.state.School.value, this.state.School.label]);
        sessionStorage.setItem("letterrec", [this.state.LOR.value, this.state.LOR.label]);
        sessionStorage.setItem("appfee", [this.state.App.value, this.state.App.label]);
        sessionStorage.setItem("statefilter", keys);
        sessionStorage.setItem("satscore", this.state.SATAverage);
        sessionStorage.setItem("actscore", this.state.ACTAverage);

        if(array.length !== 0 || arrayTuition.length !== 0 || (this.props.location !== undefined && this.props.location.state !== undefined)) {
            console.log("here: ", true);
            this.setState({ ToggleClear: true, ExploreRedirect: false });
        } else {
            this.setState({ ToggleClear: false, ExploreRedirect: false });    
        }

        sessionStorage.setItem("array", array);
        sessionStorage.setItem("tuitionarray", arrayTuition);
        console.log(arrayTuition);
        fetch("/filter", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Array: array,
                Filter: this.state.Filter.length === 0 ? Sortby[0].value : this.state.Filter.value,
                IsDescending: this.state.IsDescending.length === 0 ? OrderBy[0].value : this.state.IsDescending.value,
                Tuition: arrayTuition,
                State: sessionStorage.getItem('userState')
            })
        }).then(response => {
            return response.json();
        }).then(data => {
            this.setState({
                College: data,
                Loading: false
            })
        });

        if(this.state.Open === true) {
            this.togglePanel();
        }
    }

    handleFilter(e) {
        this.setState({ Filter: e }, () => {
            this.handleClick();
        });
    }

    handleOrderBy(e) {
        this.setState({ IsDescending: e }, () => {
            this.handleClick();
        });
    }

    handleState(e) {
        const state = this.state;
        state.StateFilter = [];

        if (e === null) {
            state.stateFilter = [];
        } else {
            e.forEach((option) => {
                state.StateFilter.push(option);
            });
        }
        this.setState({ StateFilter: state.StateFilter }, () => {
            let array = [];
            this.state.StateFilter.forEach(state => {
                array.push(state.value);
            })
            this.handleClick("state");
        });
    };

    togglePanel(e) {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        this.setState({ Open: !this.state.Open});
    }

    render() {
        return (
            <div className="Explore">
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                    integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
                    crossOrigin="anonymous"
                    />
                <NavBar searchBarInUse={this.searchBarInUse} setSearch={this.setSearch} searchBar={this.state.searchBar} active="2" 
                    location={this.props.location}
                />
                {this.renderExplore()}

                {this.state.Open ? this.renderFilter("block") : null}
                <button className="filter-toggle" onClick={(e) => this.togglePanel(e)}><FontAwesomeIcon icon={faSort} /></button>
            </div>
        );
    }
}

export default Explore;