import React from 'react';
import '../css/Feature.css';

import Navigationbar from '../components/content/Navigationbar';
import { Nav } from 'react-bootstrap';
import NavBar from '../components/content/Navbar';
import Image3 from './UCSD_3.jpg';

class Features extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchBar: false,
            resultsFromSearch: [],
            collegeName: ''
        };
        this.setSearch = this.setSearch.bind(this);
        this.searchBarInUse = this.searchBarInUse.bind(this);
    }
    searchBarInUse = (inUse) => {
        if (inUse !== this.state.searchBar) {
            console.log(inUse);
            this.setState({ searchBar: inUse });
        }
    }

    setSearch = (results) => {
        if (results !== this.state.resultsFromSearch) {
            this.setState({
                resultsFromSearch: results
            })
        }
    }

    renderFeatures = () => {
        if (this.state.searchBar === false) {
            return (
                <div>
                    {this.state.collegeName}
                </div>
            )
        } else {
            return (
                this.state.resultsFromSearch.map(college => (
                    <Nav.Link href={`/loginhome/features/${college}`} className="fixedHeight">
                        <div className="searchResult">
                            <img src={Image3} alt="Hello" className="imageBox" />
                            {college}
                            <div className="heart"></div>
                        </div>
                    </Nav.Link>
                )
                )
            )
        }
    }

    componentWillMount = () => {
        this.setState({ collegeName: this.props.match.params.collegeName })
    }

    render() {
        return (
            <div className="background-feature">
                <Navigationbar active="5" />
                <NavBar searchBarInUse={this.searchBarInUse} setSearch={this.setSearch} />
                {this.renderFeatures()}
            </div>
        );
    }
}

export default Features;