import React, { Component } from 'react';
import '../css/Table.css';
import Node from './Node';

class Table extends Component {
   constructor(props) {
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      this.state = { //state is by default an object
         students: [
            { college_name: "Berkeley", tuition: '5,000', deadlines: "11/30/20", ranking: '100', location: 'New York' },
            { college_name: "UC San Diego", tuition: '15,000', deadlines: "11/30/20", ranking: '1', location: 'California' },
            { college_name: "UC Miramar", tuition: '10,000', deadlines: "11/30/20", ranking: '10', location: 'California' },
            { college_name: "Purdue", tuition: '50,000', deadlines: "11/30/20", ranking: '1000', location: 'Illinois' }
         ]
      }
   }

   renderTableData() {
      return this.state.students.map((student, index) => {
         const { college_name, tuition, deadlines, ranking, location } = student //destructuring
         return (
            <Node collegeName={college_name} tuitionCost={tuition} deadline={deadlines} rankings={ranking} location={location} />
         )
      });
   }

   renderTableHeader() {
      // let header = Object.keys(this.state.students[0])
      // return header.map((key, index) => {
      //    if (key === 'college_name') {
      //       key = 'college';
      //    }
      //    return <th key={index}>{key.toUpperCase()}</th>
      // });
   }

   render() { //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
      return (
         <div>
            <table id='students'>
               {this.renderTableHeader()}
               <tbody>
                  {this.renderTableData()}
               </tbody>
            </table>
         </div>
      )
   }
}

export default Table //ex