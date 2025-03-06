import React from'react';
import {useState,useEffect} from "react";
import './css/history.css';
import Footer_1 from './Footer_1';
import Header_1 from './Header_1';
import Header_2 from './Header_2';
import axios from "axios";
function History() {
  const [history, setHistory] = useState([]);
  const [error, seterror] = useState(false);
  useEffect(() => {




  ///////////////////////////////////////////////////////////////////////////////////////////ما فيه شي فوق ///////////////////////////////////////////////////////////////////////////////////


    axios.get('your-api-url')          //endpoints 
      .then(response => {
        setHistory(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
        seterror(true);
      });

///////////////////////////////////////////////////////////////////////////////////////////ما فيه شي تحت ///////////////////////////////////////////////////////////////////////////////////////



  }, []);

  return (
    <>
      <div className='backgroundimage'>
        <Header_2/>
    
        <div className="table-container">
  {error&& <p style={{position:'absolute',marginTop:'-100px',color:'red'}}> there was a problem displaying your history, please try again</p>}
          <table className="styled-table">
            
            <thead>
              <tr>
              <th>Name</th>
                <th>AI/Fact</th>
                <th>Type</th>
                <th>Accuracy</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.AIorFact}</td>
                  <td>{item.type}</td>
                  <td>{item.accuracy}</td>
                  <td>{item.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Footer_1/>
      </div>
    </>
  );
}

export default History;