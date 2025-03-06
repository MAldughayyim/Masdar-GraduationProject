import Button from 'react-bootstrap/Button'
import './css/Homepage.css';
import Small_logo from './small_logo';
import Footer_1 from './Footer_1';
import Header_1 from './Header_1';
import Header_2 from './Header_2';
import {Link} from "react-router-dom";
import AI from './AI.jpeg';
import React, { useState } from 'react';
function Homepage() {
  const [hover, setHover] = useState(false);



    return (

  
  <div className='backgroundimage'>


      <Header_1/>
<p className='middle'>
  <p className='text'> <svg xmlns="http://www.w3.org/2000/svg" height="32" width="36" viewBox="0 0 576 512">
<path fill="#232442" d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
</svg>
</p>
  <h1 className='heading'>Check if your<br/> content is AI or fact,<br/> Check authenticity of <br/> your information.</h1>


  
  <p style={ { fontSize: "17px", marginTop:"70px"}}> Masdar: Your trusted guide in the digital realm. <br/>We help distinguish AI-generated content and validate the authenticity of your information<br/> Navigate with confidence with Masdar.</p>
  <button class="button-glitch" role="button">CHECK AI</button>
  
  </p>



  <div class="button_container">




</div>

<Footer_1/>
</div>

    );
    }
    export default Homepage;