import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Stack } from 'react-bootstrap';

const Result_Component = () => {
  const [percentage, set_Percentage] = useState('');
  const [contentType, setContentType] = useState('');
  const [SubmitHistory, setSubmitHistory] = useState('');

  useEffect(() => {
    axios.get('/Test.json')  // Ensure this path is correct
      .then(response => {
        // Assuming your JSON file has the properties as follows:
        const { Percentage, ContentType, SubmitHistory } = response.data;
        set_Percentage(Percentage);
        setContentType(ContentType);
        setSubmitHistory(SubmitHistory);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div style={{ width: "100%" }}>  
      <Stack gap={3}>
        <div id="scroll" style={{ maxHeight: "600px", overflowY: "auto", borderRadius: "5px", backgroundColor: "white", minHeight: "400px" }}>
          <h1 style={{ textAlign: "center", marginTop: "70px",fontSize:"50px" }}>AI Detector</h1>
          <p style={{ textAlign: "center", marginTop: "15px" }}>
            This is the approximate amount of ai modification included in the content provided
          </p>
          <Container style={{ marginTop: "100px" }}>
            <Row>
              <Col style={{ textAlign: "center" }}><h5 style={{fontSize:"30px"}}>{percentage}%</h5></Col>
              <Col style={{ textAlign: "center" }}><h5 style={{fontSize:"30px"}}>{contentType}</h5></Col>
              <Col style={{ textAlign: "center" }}><h5 style={{fontSize:"30px"}}>{SubmitHistory}</h5></Col>
            </Row>
            <Row>
              <Col style={{ textAlign: "center" }}>AI</Col>
              <Col style={{ textAlign: "center" }}>Content Type</Col>
              <Col style={{ textAlign: "center" }}>Submit Date</Col>
            </Row>
          </Container>
        </div>
      </Stack>
    </div>
  );
}

export default Result_Component;
