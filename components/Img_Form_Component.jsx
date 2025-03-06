import './Main_Style.css';
import { useState } from 'react';
import { Modal, Button,Container,Col,Row } from 'react-bootstrap';
import axios from 'axios';
import Result_Component from "./Result_Component.jsx"

const Image_Form_Component = () => {
  const [show, set_Show] = useState(false);
  const [image, set_Image] = useState(null);
  const [upload_Status, set_Upload_Status] = useState(null);
  const [image_Preview, set_Image_Preview] = useState(null);
  const [is_Hovered, set_Is_Hovered] = useState(false);
  const [show_Second_Modal, set_Show_Second_Modal] = useState(false);

  const Handle_Show = () => set_Show(true);

  const Handle_Close_Second_Modal = () =>{
    set_Image(null);
     set_Show_Second_Modal(false);
  }
     
  const Handle_Close = () => {
    set_Show(false);
    set_Upload_Status(null);
    set_Image(null);
    set_Image_Preview(null);
  };

  const Submit_Form = () =>{
    set_Show(false);
    set_Upload_Status(null);
    set_Image_Preview(null);
    set_Show_Second_Modal(true);
  }

  const Handle_Image_Change = (Event) => {
    const Selected_Image = Event.target.files[0];
    set_Image(Selected_Image);

    const Reader = new FileReader();
    Reader.onloadend = () => {
      set_Image_Preview(Reader.result);
    };
    if (Selected_Image) {
      Reader.readAsDataURL(Selected_Image);
    }
  };

  const Handle_Remove_Image = () => {
    set_Image(null);
    set_Image_Preview(null);
  };

  const Handle_Form_Submit = async (Event) => {
    Event.preventDefault();
    console.log('Image submitted:', image);

    const Form_Data = new FormData();
    Form_Data.append('image', image);

    try {
      const Response = await axios.post('YOUR_IMAGE_API_ENDPOINT', Form_Data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Image uploaded successfully', Response.data);
      set_Upload_Status('Image uploaded successfully');
    } catch (Error) {
      console.Error('Error uploading image', Error);
      set_Upload_Status('Error uploading image');
    }
  };

  const Handle_Drop = (Event) => {
    Event.preventDefault();
    const Dropped_Files = Array.from(Event.dataTransfer.files);

    // Filter only image files
    const Image_Files = Dropped_Files.filter(file => file.type.startsWith('image/'));
    if (Image_Files.length === 0) {
      // Replace alert with rendering of the div
      document.getElementById('showMe').style.display = 'block';
      return;
    }

    const Dropped_Image = Image_Files[0]; // Take the first image file
    set_Image(Dropped_Image);

    const Reader = new FileReader();
    Reader.onloadend = () => {
      set_Image_Preview(Reader.result);
    };
    Reader.readAsDataURL(Dropped_Image);
  };

  const Handle_Drag_Over = (Event) => {
    Event.preventDefault();
  };

  return (
    <>

      <Button onClick={Handle_Show} variant="dark" className={"button-dimension D12"} block>
        <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className={"bi bi-image ICONS"} viewBox="0 0 16 16">
          <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/><path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z"/>
        </svg>
      </Button>
        <p className="Paragraph_Under_Button">Check image</p>
              
      <Modal
        show={show}
        onHide={Handle_Close}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton className={"Modal_Header"}>
          <Modal.Title className="M10">Provide your image:</Modal.Title>
        </Modal.Header>
        <Modal.Body className={"Modal_Body"} style={{ paddingBottom: "30px", maxHeight: "520px" }}>

          <form onSubmit={Handle_Form_Submit}>
            {image_Preview ? (
              <>
                {image && (
                  <div  style={{background:"white"}}
                        className={`Form_Style hovered`}
                        onDrop={Handle_Drop}
                        onDragOver={Handle_Drag_Over}
                  >
                    
                    <div style={{ backgroundColor: "rgb(11, 220, 235,0.7)", height: "40px", margin: "90px 0px 100px 0px", fontSize: "25px", borderRadius: "5px",color:"rgba(0, 0, 0, 1)",textAlign:"center" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-file-earmark-image" viewBox="0 0 16 16">
                          <path d="M6.502 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/><path d="M14 14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zM4 1a1 1 0 0 0-1 1v10l2.224-2.224a.5.5 0 0 1 .61-.075L8 11l2.157-3.02a.5.5 0 0 1 .76-.063L13 10V4.5h-2A1.5 1.5 0 0 1 9.5 3V1z"/>
                        </svg>
                      <span style={{fontSize:"70%",marginBottom:"4px"}}>{image.name}</span><span  className={"times"} onClick={()=>{Handle_Remove_Image() 
                        set_Is_Hovered(false)}} >&times;</span>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Display drop area for image */}
                <label htmlFor="Input_Type_Image">
                  <div style={{background:"white"}}
                    className={`Form_Style ${is_Hovered ? 'hovered' : ''}`}
                    onDrop={Handle_Drop}
                    onDragOver={Handle_Drag_Over}
                    onMouseEnter={() => set_Is_Hovered(true)}
                    onMouseLeave={() => set_Is_Hovered(false)}
                  >
                    <input id="Input_Type_Image" type="file" accept='image/*' className='input-field' onChange={Handle_Image_Change} hidden />
                    <br/>
                      <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" fill="currentColor" className="bi bi-image" viewBox="0 0 16 16">
                        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/><path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z"/>
                      </svg>
                    <br/><p>Drag drop or click in this area</p>
                  </div>
                </label>
                <div id="showMe" className='Dragdrop_Message_Error' style={{ display: 'none' }}>
                  <svg style={{display:"inline"}} aria-hidden="true" className="stUf5b qpSchb" fill="currentColor" focusable="false" width="16px" height="16px" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
                  </svg> &nbsp;Please upload an image file </div>
              </>
            )}
            {image_Preview ? (
              <div style={{ textAlign: "center" }}>
                <Button className={"D12 D11"} variant="dark" type="submit" onClick={Submit_Form} centered>Submit</Button>
              </div>
            ) : (
              <div style={{ textAlign: "center" }}>
                <Button className={"D11"} disabled variant="dark" type="submit">Submit</Button>
              </div>
            )}
          </form>
          {upload_Status && (<span></span>)}
        </Modal.Body>
      </Modal>
       {/* Second Modal */}
      <Modal show={show_Second_Modal} onHide={Handle_Close_Second_Modal} size="xl" animation={false} centered>
        
      <div className={"Result_Background_Color p-3 shadow"}  style={{ opacity:"1",backgroundColor:"rgb(114, 181, 184)", margin: "0px 0px 0px 0px", borderRadius: "5px",  color: "black" }}>
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
export default Image_Form_Component;