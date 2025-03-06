import  { useState, useEffect } from 'react';
import axios from 'axios';
import Stack from 'react-bootstrap/Stack';

const Arabic_Result = () => {
  const [Links, set_Links] = useState([]);
  const [Cliam_Result, set_Cliam_Result] = useState('');
  const [Determination_Result, set_Determination_Result] = useState('');
  const [Explanation_Result, set_Explanation_Result] = useState('');
  const [percentage, set_Percentage] = useState('');

  useEffect(() => {
    // Fetch data from the JSONPlaceholder API
    axios.get('/Test_Arabic_Api.json')
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
    <div style={{width:"0% 100%",textAlign:'right',direction:"rtl"}}>
                  <Stack  gap={3}>
                    <div id="scroll" style={{ maxHeight: "600px", overflowY: "auto",borderRadius: "5px",backgroundColor:"white",minHeight: "400px" }}>
                      <div className="p-2"><h5 style={{ display: "inline" }}>ادعاء: </h5>{Cliam_Result}</div>
                      <div className="p-2"><h5 style={{ display: "inline" }}>تحديد: </h5>{Determination_Result}</div>
                      <div className="p-2"><h5 style={{ display: "inline" }}>التفسير: </h5>{Explanation_Result}</div>
                      <div className="p-2"><h5 style={{ display: "inline" }}>النسبة: </h5>{percentage}%</div>
                        <div className="p-2"><h5 >مصدر:</h5>
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
export default Arabic_Result;