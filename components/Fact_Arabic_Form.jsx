import './Main_Style.css';
import { useState } from 'react';
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Arabic_Result from "./Arabic_Result.jsx";

const Fact_Arabic_Form = () => {
  const [show, set_Show] = useState(false);
  const [text, set_Text] = useState('');
  const [upload_Status, set_Upload_Status] = useState(null); 
  const [show_Second_Modal, set_Show_Second_Modal] = useState(false);
  const [error_Visible, set_Error_Visible] = useState(false);  // New state for error visibility
  
  const Handle_Show = () => set_Show(true);

  const Handle_Close_Second_Modal = () => { 
    set_Text(''); 
    set_Show_Second_Modal(false);
  }

  const Handle_Close = () => {
    set_Show(false);
    set_Upload_Status(null);
    set_Text(''); 
    set_Error_Visible(false);
  };

  const Submit_Form = () =>{
    set_Show_Second_Modal(true);
    set_Show(false);
    set_Upload_Status(null);
  }

  const Handle_Text_Change = (Event) => {
    const input_Text = Event.target.value;
    set_Text(input_Text);

    // Regex to detect non-English characters
    if (/[^ا-ي\u0600-\u06FF .,?!'"()&$%-_@:;\n]/.test(input_Text)) {
      set_Error_Visible(true);
    } else {
      set_Error_Visible(false);
    }
  };

  const handleFormSubmit = async (Event) => {
    Event.preventDefault();
    console.log('Show Text submitted:', text);

    try {
      const response = await axios.post('YOUR_API_ENDPOINT', { text });

      console.log('Text uploaded successfully', response.data);
      set_Upload_Status('Text uploaded successfully');
    } catch (error) {
      console.error('Error uploading text', error);
      set_Upload_Status('Error uploading text');
    }
  };

  return (
    <>
      <Button variant="dark" className={"button-dimension D12"} onClick={Handle_Show} block>
      <svg className="ICONS" xmlns="http://www.w3.org/2000/svg">
  <text className="ICONS" x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="60" fontFamily="Gulzar" fontWeight="bold" fill="white">ع</text>
</svg>
      </Button>
      <p className="Paragraph_Under_Button">Check Arabic text</p>

      <Modal size="md" show={show} onHide={Handle_Close} backdrop="static" keyboard={false} centered>
        <Modal.Header className={"Modal_Header"} closeButton>
          <Modal.Title className="M10">Provide your Arabic text:</Modal.Title>
        </Modal.Header>

        <Modal.Body className="Modal_Body" style={{paddingBottom: "30px", maxHeight: "520px"}}>
          <form onSubmit={handleFormSubmit}>
            <Form.Control className="custom-textarea" as="textarea" value={text} onChange={Handle_Text_Change} placeholder="Type your text here..." style={{ height: '200px', border: "none" }} />
            {error_Visible && (
              <div id="showMe" className='Text_Message_Error'>
                <svg style={{display:"inline"}} aria-hidden="true" className="stUf5b qpSchb" fill="currentColor" focusable="false" width="16px" height="16px" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
                  </svg> &nbsp;&nbsp;Text must be in Arabic
              </div>
            )}
            {text && !error_Visible ? (
              <div style={{ textAlign: "center" }}>                                         
                <Button variant="dark" className={"D12 D11"} type="submit" onClick={Submit_Form} centered>Submit</Button>
              </div>
            ) : (
              <div style={{ textAlign: "center" }}>
                <Button disabled className={"D11"} variant="dark" type="submit">Submit</Button>
              </div>
            )}
          </form>
          {upload_Status && (<span></span>)}
        </Modal.Body>
      </Modal>

      <Modal show={show_Second_Modal} onHide={Handle_Close_Second_Modal} size="xl" animation={false} centered>
        <div className={"Result_Background_Color p-3 shadow"} style={{ opacity:"1",backgroundColor:"rgb(114, 181, 184)",borderRadius: "5px", color: "black" }}>
          <Container>
            <Row>
              <Col xs={12} md={12}>
                <Modal.Body className={"Result_Background_Color"} style={{padding:"1rem 0px"}}>
                  <h2 className="Title_Arabic_Result">النتائج </h2>
                  <Arabic_Result/>
                  <div style={{textAlign:"left"}}>
                    <Button className="Go_Back_Buttons D12" onClick={Handle_Close_Second_Modal} variant="dark">
                    ← رجوع
                    </Button>
                  </div>
                </Modal.Body>
              </Col>
            </Row>
          </Container>
        </div>
      </Modal>
    </>
  );
}

export default Fact_Arabic_Form;
