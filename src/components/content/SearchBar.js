import React from 'react';
import ReactDOM from 'react-dom';
import { Form } from "react-bootstrap";
import '../../App.css';
import '../../css/SearchBar.css';
import { Link, withRouter } from 'react-router-dom';
import Heart from './Heart';
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            searchResults: [],
            clickOutside: true,
            searchValue: ''
        };
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.exploreRedirect = this.exploreRedirect.bind(this);
        this.mapView = this.mapView.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        // document.addEventListener('keydown', this.handleClickOutside);
        this.setState({
            searchResults: []
        });
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
        // document.removeEventListener('keydown', this.handleClickOutside);
    }

    handleClickOutside(event) {
        const domNode = ReactDOM.findDOMNode(this);
        if (!domNode || !domNode.contains(event.target)) {
            console.log("handleCLickOutside");
            this.setState({
                clickOutside: true
            });
            this.props.searchBarInUse(false);
        }
    }

    exploreRedirect(e) {
        if(e.keyCode === 13) {
            let collegeNames = [];
            this.state.searchResults.forEach(college => {
                collegeNames.push(college[0]);
            })
            
            if(this.state.searchResults.length === 1) {
                this.props.history.push(`/page/${this.state.searchResults[0][0]}`);
                return;
            }
            
            this.props.history.push({
                pathname: `/explore/results`,
                search: `?results=AfeHYOXYhzE`,
                state: {Colleges: collegeNames, Search: this.state.searchValue}
            })
        }   
    }

    mapView(e) {
        //Check the keyCode
        if(e.keyCode === 13) {
            //Prevent the refresh from occuring
            e.preventDefault();
            if(this.state.searchResults.length === 0) {
                //If no results, nothing happens
                return;
            } else {
                //Get the first item from the list when user hits 'Enter'
                const getCollege = this.state.searchResults[0][0];
                //Call the onClick method from MapView.js
                this.props.onClick(getCollege)
                //Clear the searchbar when done
                this.setState({
                    clickOutside: true
                })
            }
        }
    }

    handleChange(e) {
        this.setState({searchValue: e.target.value});
        let currentResults = [];
        let filteredResults = [];
        let perfectMatches = [];
        let semiMatches = [];
        if (e.target.value !== "") {
            this.props.searchBarInUse(true);
            currentResults = this.props.list;
            currentResults.map(collegeArray => {
                var alreadyExists = false;
                var collegeNames = collegeArray[0];
                collegeNames.map(college => {
                    if (alreadyExists) {
                        return;
                    }
                    const collegeName = college.toLowerCase();
                    const typedIn = e.target.value.toLowerCase();
                    var matchPerfect = true;
                    var i;
                    var j;
                    for (let i = 0; i < typedIn.length; i++) {
                        if (typedIn.substring(i, i + 1) !== collegeName.substring(i, i + 1)) {
                            matchPerfect = false;
                            break;
                        }
                    }
                    if (matchPerfect) {
                        alreadyExists = true;
                        perfectMatches.push([collegeNames[0], collegeArray[1]]);
                        return;
                    }
                    const collegeNameSplit = collegeName.split(' ');
                    const typedInSplit = typedIn.split(' ');
                    for (i = 0; i < typedInSplit.length - 1; i++) {
                        var partMatch = false;
                        for (j = 0; j < collegeNameSplit.length; j++) {
                            if (collegeNameSplit[j] === typedInSplit[i]) {
                                partMatch = true;
                                collegeNameSplit.splice(j, 1);
                                typedInSplit.splice(i, 1);
                                continue;
                            }
                        }
                        if (!partMatch) {
                            return;
                        }
                    }
                    if (typedInSplit.length === 0) {
                        semiMatches.push([collegeNames[0], collegeArray[1]]);
                        alreadyExists = true;
                        return;
                    }
                    for (i = 0; i < collegeNameSplit.length; i++) {
                        var partMatch = true;
                        for (j = 0; j < typedInSplit[typedInSplit.length - 1].length; j++) {
                            if (typedInSplit[typedInSplit.length - 1].substring(j, j + 1) !== collegeNameSplit[i].substring(j, j + 1)) {
                                partMatch = false;
                                break;
                            }
                        }
                        if (partMatch) {
                            semiMatches.push([collegeNames[0], collegeArray[1]]);
                            alreadyExists = true;
                            return;
                        }
                    }
                })
            })
        } else {
            let blankResults = [];
            filteredResults = blankResults;
            this.props.searchBarInUse(false);
        }

        perfectMatches.map((college, i) => {
            if (filteredResults.length >= 10) {
                return;
            }
            filteredResults.push(college);
        })
        semiMatches.map(college => {
            if (filteredResults.length >= 10) {
                return;
            }
            filteredResults.push(college);
        })
        this.setState({
            searchResults: filteredResults,
            clickOutside: false
        });
    }

    render() {
        const divStyle = {
            width: this.props.barwidth ? this.props.barwidth : 'calc(35vw)'
        }
        const searchBar = {
            display: 'flex',
            flexDirection: 'column'
        }
        if (this.props.searchBar === this.state.clickOutside) {
            this.setState({ clickOutside: !this.props.searchBar })
        }

        return (
            <Form className="ml-5" style={searchBar}>
                <Form.Control type="text" onInput={this.handleChange} placeholder={this.props.nodelayout ? "Find College" : "Search for colleges" } className="mr-0" style={divStyle} 
                    onKeyDown={this.props.isMap ? this.mapView : this.exploreRedirect}
                />
                <div>
                    {this.state.searchResults.map(collegeArray => {
                        if (this.state.clickOutside) {

                        } else {
                            let college = collegeArray[0];
                            if(college.length > 43){
                                college = college.substring(0, 40) + "...";
                            }

                            if(this.props.nodelayout) {
                                console.log(this.props)
                                return (
                                    <div className="map-container">
                                        <div className="map-results">
                                            <div className="map-results-space">
                                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                                            </div>
                                            <div className="map-collegename" onClick={() => {
                                                this.props.onClick(college);
                                                this.setState({
                                                    clickOutside: true
                                                })
                                            }}>
                                                <p>{college}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            } else {
                                return (
                                    <div className="individual">
                                        <Link to={`/page/${college}`}>
                                            <div>
                                                <div className="circle">
                                                </div>
                                                <img className="logo" src={collegeArray[1]} alt="Hello" />
                                            </div>
                                            <div className="collegeName">
                                                {college}
                                            </div>
                                        </Link>
                                        <div className="heart">
                                            <Heart collegeName={college} key={college} />
                                        </div>
                                    </div>
                                )
                            }
                        }
                    })}
                </div>
            </Form>
        )
    }
}

export default withRouter(SearchBar);