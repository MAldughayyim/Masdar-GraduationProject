import './Main_Style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Img_Form_Component from "./Img_Form_Component.jsx";
import Text_Form_Component from "./Text_Form_Component.jsx";
import Voice_Form_Component from "./Voice_Form_Component.jsx";
import Video_Form_Component from "./Video_Form_Component.jsx";

const Ai_Check_Component = () => {
  return (
    <div >
          <div style={{textAlign:"center"}}>
              <ul style={{ display: "inline-block",textAlign: "center",marginRight: "30px",listStyle: "none"}} > 
                <li><Text_Form_Component/></li>
                <li><Voice_Form_Component/></li>
              </ul>
              <ul style={{ display: "inline-block",textAlign: "center",marginRight: "30px",listStyle: "none"}} > 
                <li><Img_Form_Component/></li>
                <li><Video_Form_Component/></li>
              </ul>
          </div>
    </div>
  )
}
export default Ai_Check_Component;