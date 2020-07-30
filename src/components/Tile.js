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
            return <h3 className="ranking">Rank: Unranked</h3>
        } else {
            return <h3 className="ranking">Rank: #{this.props.Ranking}</h3>
        }
    }

    render() {
        return (
            <div className="tile-layout">
                <div className="center-header">
                    <div className="college-icon">
                        <img src={this.props.Logo} alt="Logo" height="120" width="125" />
                    </div>

                    <div className="header-tile">
                        <Link style={{textDecoration: 'none', color: 'black', width: '100%'}} to={`/page/${this.props.collegeName}`}>
                            <div className="college-name">
                                <h1>{this.props.Alias}</h1>
                            </div>

                            <div className="ranking">
                                {this.handleRanking()}
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="favorite-icon">
                    <Heart collegeName={this.props.collegeName} key={this.props.collegeName} />
                </div>

                <Link style={{textDecoration: 'none', color: 'black'}} to={`/page/${this.props.collegeName}`}>
                    <div className="specifications">
                    <hr></hr>
                        <div className="info-container">
                            <div className="information-div">
                                <h3>Population: </h3>
                                <h3>{sessionStorage.getItem('userState') === this.props.State ? "In State Tuition: " : "Out of State Tuition: "}</h3>
                                <h3>App. Fee: </h3>
                                <h3>Acceptance Rate: </h3>
                            </div>

                            <div className="info-div-number">
                                <h3>{this.props.Population}</h3>
                                <h3>${sessionStorage.getItem('userState') === this.props.State ? this.props.Tuition : this.props.TuitionOOS}</h3>
                                <h3>${this.props.Fee}</h3>
                                <h3>{this.props.Acceptance}%</h3>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
       )
    }
}

export default Tile;