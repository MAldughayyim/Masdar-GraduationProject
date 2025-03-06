import './Main_Style.css';
import { Modal, Button,Container,Col,Row } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import Result_Component from "./Result_Component.jsx"

const Voice_Form_Component = () => {
  const [show, set_Show] = useState(false);
  const [voice, set_Voice] = useState(null);
  const [upload_Status, set_Upload_Status] = useState(null);
  const [voice_Preview, set_Voice_Preview] = useState(null);
  const [is_Hovered, set_Is_Hovered] = useState(false);
  const [showModal2, set_Show_Second_Modal] = useState(false);

  const Handle_Show = () => set_Show(true);

  const Handle_Close_Second_Modal = () =>{
    set_Voice(null);
    set_Show_Second_Modal(false);
  };

  const Handle_Close = () => {
    set_Show(false);
    set_Upload_Status(null);
    set_Voice(null);
    set_Voice_Preview(null);
  };

  const Submit_Form = () =>{
    set_Show(false);
    set_Upload_Status(null);
    set_Voice_Preview(null);
    set_Show_Second_Modal(true);
  };

  const Handle_Voice_Change = (Event) => {
    const Selected_Voice = Event.target.files[0];
    set_Voice(Selected_Voice);

    const Reader = new FileReader();
    Reader.onloadend = () => {
      set_Voice_Preview(Reader.result);
    };
    if (Selected_Voice) {
      Reader.readAsDataURL(Selected_Voice);
    }
  };

  const Handle_Remove_Voice = () => {
    set_Voice(null);
    set_Voice_Preview(null);
  };

  const Handle_Form_Submit = async (Event) => {
    Event.preventDefault();
    console.log('Voice submitted:', voice);

    const Form_Data = new FormData();
    Form_Data.append('voice', voice);

    try {
      const Response = await axios.post('YOUR_VOICE_API_ENDPOINT', Form_Data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Voice uploaded successfully', Response.data);
      set_Upload_Status('Voice uploaded successfully');
    } catch (Error) {
      console.Error('Error uploading voice', Error);
      set_Upload_Status('Error uploading voice');
    }
  };

  const Handle_Drop = (Event) => {
    Event.preventDefault();
    const Dropped_Files = Array.from(Event.dataTransfer.files);

    
    const Audio_Files = Dropped_Files.filter(file => file.type.startsWith('audio/'));
    if (Audio_Files.length === 0) {
      
      document.getElementById('showMe').style.display = 'block';
      return;
    }

    const dropped_Voice = Audio_Files[0]; // Take the first audio file
    set_Voice(dropped_Voice);

    const Reader = new FileReader();
    Reader.onloadend = () => {
      set_Voice_Preview(Reader.result);
    };
    Reader.readAsDataURL(dropped_Voice);
  };

  const Handle_Drag_Over = (Event) => {
    Event.preventDefault();
  };

  return (
    <>
      
      <Button onClick={Handle_Show} variant="dark" className={"button-dimension D12"} block>
        <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor"className={"bi bi-mic ICONS"}  viewBox="0 0 16 16">
          <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5" /><path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3" />
        </svg>
      </Button>
        <p className="Paragraph_Under_Button">Check voice</p>

      <Modal
        show={show}
        onHide={Handle_Close}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header className={"Modal_Header"} closeButton>
          <Modal.Title className="M10">Provide your voice recording:</Modal.Title>
        </Modal.Header>

        <Modal.Body className={"Modal_Body"} style={{paddingBottom: "30px",maxHeight: "520px"}}>

          <form onSubmit={Handle_Form_Submit}>
              {voice_Preview ? (
                <>
                  {voice && (
                    <div  style={{background:"white"}}
                          className={`Form_Style hovered`}
                          onDrop={Handle_Drop}
                          onDragOver={Handle_Drag_Over}
                    >

                      <div style={{ backgroundColor: "rgb(11, 220, 235,0.7)", height: "40px", margin: "90px 0px 100px 0px", fontSize: "25px", borderRadius: "5px",color:"rgba(0, 0, 0, 1)",textAlign:"center" }}>
                        <svg style={{marginBottom:"4px"}} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-file-earmark-music-fill" viewBox="0 0 16 16">
                          <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M11 6.64v1.75l-2 .5v3.61c0 .495-.301.883-.662 1.123C7.974 13.866 7.499 14 7 14s-.974-.134-1.338-.377C5.302 13.383 5 12.995 5 12.5s.301-.883.662-1.123C6.026 11.134 6.501 11 7 11c.356 0 .7.068 1 .196V6.89a1 1 0 0 1 .757-.97l1-.25A1 1 0 0 1 11 6.64" />
                        </svg>
                          <span style={{fontSize:"70%",marginBottom:"4px"}}>{voice.name}</span><span  className={"times"} onClick={()=>{Handle_Remove_Voice() 
                                                                                                                                    set_Is_Hovered(false)}} >
                          &times;</span>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                <label htmlFor="Input_Type_Voice">
                    <div style={{background:"white"}}
                      className={`Form_Style ${is_Hovered ? 'hovered' : ''}`}
                      onDrop={Handle_Drop}
                      onDragOver={Handle_Drag_Over}
                      onMouseEnter={() => set_Is_Hovered(true)}
                    onMouseLeave={() => set_Is_Hovered(false)}
                    >
                  <input id="Input_Type_Voice" type="file" accept='audio/*' className='input-field' onChange={Handle_Voice_Change} hidden />
                 <br/>
                      <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" fill="currentColor" className="bi bi-mic" viewBox="0 0 16 16">
                        <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5" /><path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3" />
                      </svg>
                    <br/><p>Drag drop or click in this area</p>
                    </div>
                </label>
                   <div id="showMe" className='Dragdrop_Message_Error' style={{ display: 'none' }}>  <svg style={{display:"inline"}} aria-hidden="true" className="stUf5b qpSchb" fill="currentColor" focusable="false" width="16px" height="16px" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
                   </svg> &nbsp;Please upload a voice file </div>
                </>
              )}
            
            {voice_Preview ? (<div style={{ textAlign: "center" }}>
              <Button className={"D12 D11"} variant="dark" onClick={Submit_Form} type="submit" centered>Submit</Button>
              </div>) : (<div style={{ textAlign: "center" }}>
                <Button disabled className={"D11"} variant="dark" type="submit">Submit</Button>
                </div>)}
          </form>
          {upload_Status && (<span></span>)}
        </Modal.Body>
      </Modal>
      <Modal show={showModal2} onHide={Handle_Close_Second_Modal} size="xl" animation={false} centered>
        
      <div className={"Result_Background_Color p-3 shadow"}  style={{ opacity:"1",backgroundColor:"rgb(114, 181, 184)",borderRadius: "5px",  color: "black" }} >
        <Container>
          <Row>
            <Col xs={12} md={12}>
            <Modal.Body className={"Result_Background_Color"} style={{padding:"1rem 0px"}}>
        
          <h2 className="Title_Result">Results</h2>
          <Result_Component/>
          <div  style={{textAlign:"right"}}>
          <Button className={"Go_Back_Buttons D12"} onClick={Handle_Close_Second_Modal} variant="dark" >
              ← Go Back
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
export default Voice_Form_Component;