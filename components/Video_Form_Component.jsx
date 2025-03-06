import './Main_Style.css';
import { Modal, Button,Container,Col,Row } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import Result_Component from "./Result_Component.jsx"

const Video_Form_Component = () => {
  const [show, set_Show] = useState(false);
  const [video, set_Video] = useState(null);
  const [upload_Status, set_Upload_Status] = useState(null);
  const [video_Preview, set_Video_Preview] = useState(null);
  const [is_Hovered, set_Is_Hovered] = useState(false);
  const [show_Second_Modal, set_Show_Second_Modal] = useState(false);

  const Handle_Show = () => set_Show(true);

  const Handle_Close_Second_Modal = () =>{
    set_Video(null);
    set_Show_Second_Modal(false);
  };

  const Handle_Close = () => {
    set_Show(false);
    set_Upload_Status(null);
    set_Video(null);
    set_Video_Preview(null);
  };

  const Submit_Form = () =>{
    set_Show(false);
    set_Upload_Status(null);
    set_Video_Preview(null);
    set_Show_Second_Modal(true);
  };

  const Handle_Video_Change = (Event) => {
    const Selected_Video = Event.target.files[0];
    set_Video(Selected_Video);

    const Reader = new FileReader();
    Reader.onloadend = () => {
      set_Video_Preview(Reader.result);
    };
    if (Selected_Video) {
      Reader.readAsDataURL(Selected_Video);
    }
  };

  const Handle_Remove_Video = () => {
    set_Video(null);
    set_Video_Preview(null);
  };

  const Handle_Form_Submit = async (Event) => {
    Event.preventDefault();
    console.log('Video submitted:', video);

    const Form_Data = new FormData();
    Form_Data.append('video', video);

    try {
      const Response = await axios.post('YOUR_VIDEO_API_ENDPOINT', Form_Data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Video uploaded successfully', Response.data);
      set_Upload_Status('Video uploaded successfully');
    } catch (Error) {
      console.Error('Error uploading video', Error);
      set_Upload_Status('Error uploading video');
    }
  };

  const Handle_Drop = (Event) => {
    Event.preventDefault();
    const Dropped_Files = Array.from(Event.dataTransfer.files);

    
    const Video_Files = Dropped_Files.filter(file => file.type.startsWith('video/'));
    if (Video_Files.length === 0) {
      
      document.getElementById('showMe').style.display = 'block';
      return;
    }

    const Dropped_Video = Video_Files[0]; 
    set_Video(Dropped_Video);

    const Reader = new FileReader();
    Reader.onloadend = () => {
      set_Video_Preview(Reader.result);
    };
    Reader.readAsDataURL(Dropped_Video);
  };

  const Handle_Drag_Over = (Event) => {
    Event.preventDefault();
  };

  return (
    <>
      
      <Button onClick={Handle_Show} variant="dark" className={"button-dimension D12"}  block>
        <svg  xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={"bi bi-camera-video ICONS"} viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z"/>
        </svg>
      </Button>
        <p className="Paragraph_Under_Button">Check video</p>

      <Modal
        show={show}
        onHide={Handle_Close}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header className={"Modal_Header"} closeButton >
          <Modal.Title className="M10">Provide your video recording:</Modal.Title>
        </Modal.Header>

        <Modal.Body className={"Modal_Body"} style={{paddingBottom: "30px",maxHeight: "520px"}}>

          <form onSubmit={Handle_Form_Submit}>
              {video_Preview ? (
                <>
                  {video && (
                    <div style={{background:"white"}}
                    className={`Form_Style hovered`}
                    onDrop={Handle_Drop}
                    onDragOver={Handle_Drag_Over}
                  >
                    
                    <div style={{ backgroundColor: "rgb(11, 220, 235,0.7)", height: "40px", margin: "90px 0px 100px 0px", fontSize: "25px", borderRadius: "5px",color:"rgba(0, 0, 0, 1)",textAlign:"center" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-file-earmark-play" viewBox="0 0 16 16">
                          <path d="M6 6.883v4.234a.5.5 0 0 0 .757.429l3.528-2.117a.5.5 0 0 0 0-.858L6.757 6.454a.5.5 0 0 0-.757.43z"/><path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
                        </svg>
                      <span style={{fontSize:"70%",marginBottom:"4px"}}>{video.name}</span>
                      <span  className={"times"} onClick={()=>{Handle_Remove_Video() 
                        set_Is_Hovered(false)}} >&times;</span>
                    </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                <label htmlFor="Input_Type_Video">
                    <div style={{background:"white"}}
                      className={`Form_Style ${is_Hovered ? 'hovered' : ''}`}
                      onDrop={Handle_Drop}
                      onDragOver={Handle_Drag_Over}
                      onMouseEnter={() => set_Is_Hovered(true)}
                    onMouseLeave={() => set_Is_Hovered(false)}
                    >
                  <input id="Input_Type_Video" type="file" accept='video/*' className='input-field' onChange={Handle_Video_Change} hidden />
                 <br/>
                    
                    <svg  xmlns="http://www.w3.org/2000/svg" width="75" height="75" fill="currentColor" className="bi bi-camera-video" viewBox="0 0 16 16"><path fillRule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z"/></svg>
                    <br/><p>Drag drop or click in this area</p>
                    </div>
                    </label>
                   <div id="showMe" className='Dragdrop_Message_Error' style={{ display: 'none' }}>  <svg style={{display:"inline"}} aria-hidden="true" className="stUf5b qpSchb" fill="currentColor" focusable="false" width="16px" height="16px" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
                   </svg> &nbsp;Please upload a video file </div>
                </>
              )}
            
            {video_Preview ? (
            <div style={{ textAlign: "center" }}>
              <Button className={"D12 D11"} variant="dark"  type="submit" onClick={Submit_Form} centered>Submit</Button>
              </div>) : (<div style={{ textAlign: "center" }}>
                <Button disabled className={"D11"} variant="dark" type="submit">Submit</Button>
                </div>)}
          </form>
          {upload_Status && (<span></span>)}
        </Modal.Body>
      </Modal>
      <Modal show={show_Second_Modal} onHide={Handle_Close_Second_Modal} size="xl" animation={false} centered>
        
      <div className={"Result_Background_Color p-3 shadow"}  style={{ opacity:"1",backgroundColor:"rgb(114, 181, 184)",borderRadius: "5px",  color: "black" }}>
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
export default Video_Form_Component;