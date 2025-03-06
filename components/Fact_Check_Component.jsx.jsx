import './Main_Style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Fact_English_Form from "./Fact_English_Form.jsx";
import Fact_Arabic_Form from "./Fact_Arabic_Form.jsx";

const Fact_Check_Component = () => {
  return (
    <div >
          <div style={{textAlign:"center"}}>
              <ul style={{ display: "inline-block",textAlign: "center",marginRight: "30px",listStyle: "none"}} > 
                <li><Fact_English_Form/></li>
              </ul>
              <ul style={{ display: "inline-block",textAlign: "center",marginRight: "30px",listStyle: "none"}} > 
                <li><Fact_Arabic_Form/></li>
              </ul>
          </div>
    </div>
  )
}
export default Fact_Check_Component;