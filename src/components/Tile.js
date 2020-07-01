import React, { Component } from 'react';
import '../css/Tile.css';
import Heart from './content/Heart';
import { Link } from 'react-router-dom';

class Tile extends Component {    

    constructor(props) {
        super(props);
        this.handleRanking = this.handleRanking.bind(this);
    }

    handleRanking() {
        if(this.props.Ranking >= 500) {
            return <h3>Ranking: Unranked</h3>
        } else {
            return <h3>Ranking: {this.props.Ranking}</h3>
        }
    }

    render() {
        return (
            <div className="tile-layout">
                    <div className="center-header">
                        <div className="header-tile">
                            <Link style={{textDecoration: 'none', color: 'black', width: '100%'}} to={`/loginhome/page/${this.props.collegeName}`}>
                                <div className="college-name">
                                    <h1>{this.props.Alias}</h1>
                                </div>
                            </Link>
                        </div>

                        <div className="favorite-icon">
                            <Heart collegeName={this.props.collegeName} key={this.props.collegeName} />
                        </div>
                    </div>

                    <Link style={{textDecoration: 'none', color: 'black'}} to={`/loginhome/page/${this.props.collegeName}`}>
                        <div className="college-icon">
                            <img src={this.props.Logo} alt="Logo" height="175vh" width="63%" />
                        </div>

                        <div className="specifications">
                            <div className="tuition-display">
                                <h3>(In State): ${this.props.Tuition}</h3>
                                <span></span>
                                <h3>(Out of State): ${this.props.TuitionOOS}</h3>
                            </div>
                            
                            <div className="information-div">
                                {this.handleRanking()}
                                <h3>Acceptance Rate: {this.props.Acceptance}%</h3>
                                <h3>School Type: {this.props.Type}</h3>
                                <div className="tuition-display">
                                    <h3>App Fee: ${this.props.Fee}</h3>
                                    <span></span>
                                    <h3>Population: {this.props.Population}</h3>
                                </div>
                            </div>
                        </div>
                    </Link>
            </div>
       )
    }
}

export default Tile;