import React, { Component } from 'react'
import '../css/Table.css'

class Table extends Component {
   constructor(props) {
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      this.state = { //state is by default an object
         students: [
            { college_name: "Berkeley", tuition: '5,000', deadlines: "11/30/20", ranking: '100' },
            { college_name: "UC San Diego", tuition: '15,000', deadlines: "11/30/20", ranking: '1' },
            { college_name: "UC Miramar", tuition: '10,000', deadlines: "11/30/20", ranking: '10' },
            { college_name: "Purdue", tuition: '50,000', deadlines: "11/30/20", ranking: '1000' }
         ]
      }
   }

   renderTableData() {
      return this.state.students.map((student, index) => {
         const { college_name, tuition, deadlines, ranking } = student //destructuring
         return (
            <tr key={college_name}>
               <td>{college_name}</td>
               <td>{tuition}</td>
               <td>{deadlines}</td>
               <td>{ranking}</td>
            </tr>
         )
      });
    }

    renderTableHeader() {
        let header = Object.keys(this.state.students[0])
        return header.map((key, index) => {
           return <th key={index}>{key.toUpperCase()}</th>
        });
     }

   render() { //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
      return (
        <div>
                <table id='students'>
                    <tbody>
                        <tr>{this.renderTableHeader()}</tr>
                        {this.renderTableData()}
                    </tbody>
                </table>
        </div>
      )
   }
}

export default Table //ex