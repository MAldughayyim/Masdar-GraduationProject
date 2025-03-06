import  { useState, useEffect } from 'react';
import axios from 'axios';
import Stack from 'react-bootstrap/Stack';

const English_Result = () => {
  const [Links, set_Links] = useState([]);
  const [Cliam_Result, set_Cliam_Result] = useState('');
  const [Determination_Result, set_Determination_Result] = useState('');
  const [Explanation_Result, set_Explanation_Result] = useState('');
  const [percentage, set_Percentage] = useState('');

  useEffect(() => {
    // Fetch data from the JSONPlaceholder API
    axios.get('/Test_Api_Links.json')
      .then(Response => {
        // Assuming the Response data has properties Cliam_Result, Determination_Result, and Explanation_Result
        const { Cliam_Result, Determination_Result, Explanation_Result,percentage, Links } = Response.data;
        set_Cliam_Result(Cliam_Result);
        set_Determination_Result(Determination_Result);
        set_Explanation_Result(Explanation_Result);
        set_Percentage(percentage);
        set_Links(Links);
      })
      .catch(Error => {
        console.Error('Error fetching data:', Error);
      });
  }, []);

  return (
    <div style={{width:"0% 100%"}}>
                  <Stack  gap={3}>
                    <div id="scroll" style={{ maxHeight: "600px", overflowY: "auto",borderRadius: "5px",backgroundColor:"white",minHeight: "400px" }}>
                      <div className="p-2"><h5 style={{ display: "inline" }}>Cliam: </h5>{Cliam_Result}</div>
                      <div className="p-2"><h5 style={{ display: "inline" }}>Determination: </h5>{Determination_Result}</div>
                      <div className="p-2"><h5 style={{ display: "inline" }}>Explanation: </h5>{Explanation_Result}</div>
                      <div className="p-2"><h5 style={{ display: "inline" }}>Percentage: </h5>{percentage}%</div>
                        <div className="p-2"><h5 >Source:</h5>
                      <ul style={{ listStyleType: "none"}}>
                          {Links.map(Link => (
                              <li style={{margin:"0% 0% 0% 6%"}} className="p-2" key={Link.id} ><a href={Link.url}>{Link.title}</a></li>
                        ))}
                      </ul>
                        </div>
                    </div>
                  </Stack>
    </div>
  );
}
export default English_Result;