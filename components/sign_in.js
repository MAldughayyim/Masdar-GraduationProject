import React from'react';
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import './css/sign.css';
import Footer_1 from './Footer_1';
import Header_1 from './Header_1';
import {useState} from "react";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import CloseButton from 'react-bootstrap/CloseButton';
function Sign_in(){





  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, "-Password must be at least 8 characters")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "-Password must contain at least one symbol"
      )
      .matches(/[0-9]/, "-Password must contain at least one number")
      .matches(/[A-Z]/, "-Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "-Password must contain at least one lowercase letter & must be in english").required("-Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "-Passwords must match")
      .required("-Confirm password is required")
  
  });
  const [problem, setproblem] = useState(false);
///////////////////////////////////////////////////////////////////////////////////////////ما فيه شي فوق //////////////////////////////////////////////////////////////////////////




  const HandleSubmit = (e) => {            //تتنفذ بعد ما اليوزر يسجل دخول
    e.preventDefault();

  const email = e.target.elements.floatingEmail.value;
  const passwords = e.target.elements.floatingPassword.value;


console.log('Sending this data to the backend:', email, passwords);                                 //هنا نشوف اذا فيه قيمه بتنرسل للباك اند ولا لا
  // Make a POST request to the backend with the email and password after the user logs in
   //put the endpoints inside ('/your-endpoint')   مهم!!!
  axios.post('/your-endpoint', {                                                            //نتاكد ان الايميل والباسوورد صح وموجوده في الداتا بيس
    email,
    passwords

  })
  .then(response => {                        
           
    if (response.data === true) {
      // If the backend returns true, the login was successful                              //اذا صح وموجوده ترجع ترو      
      console.log('Login successful');
    //navigate('/MainPage'); //رجعها
    } else if(response.data === false){
      // If the backend returns false, the login failed                                    //اذا لا ترجع فولس
      setWrongEmailOrPassword(true)
      console.log('Login failed');
    }
  })
  .catch(error => {
      navigate('/MainPage'); //شلها
    console.error(error);
    setproblem(true);
  });

  };



  const HandleEmailSubmit = (e) => {      //هنا اذا نسى اليوزر حسابه نطلب ايميله ونرسله للباك اند(forgot password)      1
    e.preventDefault();

    //goes to the back end and checks for the submitted email
    //if exists keep going if not inform the user 

    const email = e.target.elements.floatingEmailForgot.value;
    console.log('Sending this email to the backend:', email);       //هنا نشوف اذا فيه قيمه بتنرسل للباك اند ولا لا
 //put the endpoints inside ('/your-endpoint')   مهم!!!
    axios.post('/your-endpoint', {                                       //هنا يرسل ايميله للباك اند (forgot password)             
      email                                                                 //نتاكد ان الايميل موجود في الداتا بيس  
    })
    .then(response => {
      if (response.data === true) {                                                        //اذا صح وموجود ترجع ترو 
        console.log('Email exists in the database');                       
        setShowDialog(false);
        setShowConfirmation(true);                                             
      } else if (response.data === false) {
        console.log('Email does not exist in the database');                                   //اذا لا ترجع فولس
        setEmailConfirmationError(true);
      }
    })
    .catch(error => {
      console.error(error);
      setproblem(true);
    });

  };


  const HandleConfirmationSubmit = (e) => {  //تتنفذ بعد ما اليوزر يدخل الرمز اللي انرسل لايميله  (forgot password)           2
    e.preventDefault();                                         // هنا نرسل الكود للباك اند ونتاكد اذا هو نفس اللي ارسلناه لايميله ولا لا
    const confirmationCode = e.target.elements.floatingConfirmationCode.value;

    console.log('Sending this cofrimartion code to the backend:', confirmationCode);   //هنا نشوف اذا فيه قيمه بتنرسل للباك اند ولا لا
    //here check for the submitted confirmation code if correct inform the user the password has changed if not inform the user its not correct

//put the endpoints inside ('/your-endpoint')   مهم!!!
    axios.post('/your-endpoint', {                                       // نرسل الكود اللي دخله اليوزر للباك اند
      confirmationCode                                                                                                                              
    })
    .then(response => {
      if (response.data === true) {
        console.log('Confirmation code is correct');              //اذا الكود اللي دخله نفس اللي ارسلناه لايميله ترجع ترو 
        setShowConfirmation(false);
        setShowNewPassword(true);
   
      } else if (response.data === false) {
        console.log('Confirmation code is incorrect');                    // اذا مب نفسه ترجع فولس
        setconfirmationCodeError(true);
    
      }
    })
    .catch(error => {
      console.error(error);
      setproblem(true);
    });



  };


   const HandleNewPasswordSubmit = async (e) => {          //  هنا نرسل الرمز الجديد (forgot password)                              3
     e.preventDefault();
     const password =  formData.password;
     console.log('Sending this email to the backend:', password);       //هنا نشوف اذا فيه قيمه بتنرسل للباك اند ولا لا

     try {
      await validationSchema.validate(formData, {abortEarly: false});
      // If validation is successful, there are no errors.
      // So, clear any previous errors.
      setErrors({});
  
   //axios to save new password 
    //put the endpoints inside ('/your-endpoint')   مهم!!!
   axios.post('/your-endpoint', {password                                 // هنا الرمز الجديد (forgot password)
    
  })
  .then(response => {
    if (response.data === true) {
      console.log('Password change was successful');                        //اذا انرسل وكل شي كويس ترجع ترو
      setShowNewPassword(false); 
      setSuccessfull(true);
    } else if (response.data === false) {                                             
      console.log('Password change was not successful');                      //اذا فيه مشكله وما انحفط في الداتا بيس ترجع فولس
      setUnsuccessfull(true);
    }
  })
  .catch(error => {
    console.error(error);
    setUnsuccessfull(true);
  });


    } catch (error) {
      const newErrors = {};
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };
///////////////////////////////////////////////////////////////////////////////////////////ما فيه شي تحت //////////////////////////////////////////////////////////////////////////
    const handleChange = (e) => {
      const {name, value} = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };






  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);

  const HandleForgotPassword = () => {
    setShowDialog(true);
  };

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [unsuccessfull, setUnsuccessfull] = useState(false);
  const [successfull, setSuccessfull] = useState(false);

  



 


  const [confirmationCodeError, setconfirmationCodeError] = useState(false);// depends ON the backend
  const [emailCondirmationError, setEmailConfirmationError] = useState(false);// depends ON the backend
  const [showNewPassword, setShowNewPassword] = useState(false);// depends ON the backend
  const [WrongEmailOrPassword, setWrongEmailOrPassword] = useState(false);


  
  return(
    <>
      <div className='backgroundimage'>
      <Header_1/>
  
      <p className='middle'>

      <div id="login-form">
      <h1>sign in</h1>
      <form onSubmit={HandleSubmit}>
      <FloatingLabel controlId="floatingEmail" label="Email address" className="mb-3">
        <Form.Control type="email" placeholder="" required  />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password" required>
        <Form.Control type="password" placeholder="" required  />
      </FloatingLabel>
      {WrongEmailOrPassword && <p className='error'>Wrong email or password, Please try again</p>}
      <input type="submit"/>
      {problem &&<div className='error'>there was a problem, please try again </div> }
    
      <span className='link' onClick={HandleForgotPassword}>forgot password?</span>
    </form>
      </div>

  {showDialog&&<div className='overlay'></div>}

 <div className={`Forgot-password ${showDialog ? 'show' : ''}`} >

 <div style={{ position: 'absolute', top: 0, right: 0 }}>
    <CloseButton onClick={()=>setShowDialog(false)} />
  </div>

    <p style={{color:'white'}}>please enter your email</p>
          
<form onSubmit={HandleEmailSubmit}>
          <FloatingLabel 
  controlId="floatingEmailForgot"
  label="Email address"
  className="mb-3"
>
  <Form.Control name="email" type="email" placeholder=""  required/>
{emailCondirmationError  &&<div className='error'>-the Email is incorrect</div>}
{problem &&<div className='error'>there was a problem, please try again</div> }
</FloatingLabel>
   <input className="confirmationButton" type="submit"/>
   
</form>
 </div>
  

 {showConfirmation&&<div className='overlay'></div>}
 <div className={`Forgot-password ${showConfirmation ? 'show' : ''}`}>
 <div style={{ position: 'absolute', top: 0, right: 0 }}>
    <CloseButton onClick={()=>setShowConfirmation(false)} />
  </div>
  
  <p style={{color:'white'}}>please enter the confirmation code</p>
          
<form onSubmit={HandleConfirmationSubmit}>
          <FloatingLabel 
  controlId="floatingConfirmationCode"
  label="Confirmation code"
  className="mb-3"
>
  <Form.Control placeholder="" required/>
  {confirmationCodeError &&<div className='error'>-the condirmation code is incorrect</div>}
  {problem &&<div className='error'>there was a problem please, try again laer</div> }
</FloatingLabel>
<input className="confirmationButton"  type="submit"/>
</form>
 </div>




 {showNewPassword&&<div className='overlay'></div>}
 <div className={`Forgot-password ${showNewPassword ? 'show' : ''}`}>
 <div style={{ position: 'absolute', top: 0, right: 0 }}>
    <CloseButton onClick={()=>setShowNewPassword(false)} />
  </div>
  
  <p style={{color:'white'}}>please enter the new password</p>
          
<form onSubmit={HandleNewPasswordSubmit}>

<FloatingLabel controlId="floatingPassword" label="Password">
  <Form.Control name="password" type="password" placeholder="" value={formData.password} onChange={handleChange} />
</FloatingLabel>
        {errors.password && <div className="error">{errors.password}</div>}
        {problem &&<div className='error'>there was a problem, please try again</div> }

        <FloatingLabel controlId="floatingPasswo" label="Confirm Password">
  <Form.Control name="confirmPassword" type="password" placeholder="" value={formData.confirmPassword} onChange={handleChange} style={{marginTop:"10px",marginBottom:"10px"}}/>
</FloatingLabel>
<p className='notify2'>-password must be at least 8 characters</p>
      <p className='notify2'>-password must contain at least one symbol</p>
      <p className='notify2'>-password must contain at least one number</p>
     <p className='notify2'>-password must contain at least one uppercase letter</p>
     <p className='notify2'>-password must contain at least one lowercase letter</p>
<input className="confirmationButton"  type="submit"/>
</form>
 </div>





 {successfull&&<div className='overlay'></div>}
 <div className={`Forgot-password ${successfull ? 'show' : ''}`}>
 <div style={{ position: 'absolute', top: 0, right: 0 }}>
    <CloseButton onClick={()=>setSuccessfull(false)} />
  </div>
  
  <p style={{color:"rgb(5, 51, 5)",marginTop:"10px"}}>Password changed succesfully</p>
          
 </div>



 {unsuccessfull&&<div className='overlay'></div>}
 <div className={`Forgot-password ${unsuccessfull ? 'show' : ''}`}>
 <div style={{ position: 'absolute', top: 0, right: 0 }}>
    <CloseButton onClick={()=>setUnsuccessfull(false)} />
  </div>
  
  <p style={{color:"red",marginTop:"10px"}}>there was a problem changing the password</p>
          

 </div>


    </p>
    <Footer_1/>
    </div>
    </>
    );
}
export default Sign_in;