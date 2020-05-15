import React, { Component, StrictMode } from 'react';
import '../css/Node.css';

class Node extends Component {
    render() {
        return (
            <div className="node-layout">
                <span>
                    <h1 className="college-name">{this.props.collegeName}</h1>
                </span>

                <span>
                    <h1 className="tuition">{this.props.tuitionCost}</h1>
                </span>

                <span>
                    <h1 className="deadlines">{this.props.deadline}</h1>
                </span>

                <span>
                    <h1 className="ranking">{this.props.rankings}</h1>
                </span>

                <span>
                    <h1 className="location">{this.props.location}</h1>
                </span>
                
                <span className="button">
                    <button className="remove-button">Remove</button>
                </span>
            </div>
       )
    }
}

export default Node;