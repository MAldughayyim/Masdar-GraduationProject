import React from'react';
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import './css/sign.css';
import Footer_1 from './Footer_1';
import Header_1 from './Header_1';
import {Link} from "react-router-dom";
import {useState} from "react";
import * as Yup from "yup";
import axios from "axios";
import CloseButton from 'react-bootstrap/CloseButton';
import { useNavigate } from 'react-router-dom';
function Sign_up(){
  const navigate = useNavigate();
 const [formData, setFormData] = useState({
    Name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [BEerror, setBEerror] = useState(false);

  const validationSchema = Yup.object({
    Name: Yup.string().required("-Name is Required"),
    email: Yup.string()
      .required("-Email is Required")
      .email("-Invalid email format"),
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



   const handleSubmit = async (e) => {            
     e.preventDefault();                             
     try {
      await validationSchema.validate(formData, {abortEarly: false});
      // If validation is successful, there are no errors.
      // So, clear any previous errors.
      setErrors({});

      HandleSendConfirmcode(e);
    } catch (error) {
      const newErrors = {};
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

    const handleChange = (e) => {
      const {name, value} = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };



  const [showDialog, setShowDialog] = useState(false);

  ///////////////////////////////////////////////////////////////////////////////////////////ما فيه شي فوق //////////////////////////////////////////////////////////////////////////

                                                                  //1
  const HandleSendConfirmcode = (e)=> {                           //هنا اول ما يدخل اليوزر معلوماته ويسوي حساب جديد          
   e.preventDefault();
   console.log('Sending the form data to the backend:', formData);                   //هنا نشوف اذا فيه قيمه بتنرسل للباك اند ولا لا      
         //here call the backend to send the user confirmation code ax                                                                                 
                                                                                                        
          

   //هنا نشوف اذا فيه قيمه بتنرسل للباك اند ولا لا      //user information will be sent as an object! مهم!!!!
 // so if you want to access the email you type formData.Email                            
// so Email=formData.Email and password=formData.password and name= formData.Name:
         axios.post('/endpoints', formData)                                      //نرسل معلومات حسابه الجديد للباك اند
         .then(response => {
           console.log(response);                                                    //ونرسل كود لايميله عشان نتاكد انه صدق حقه
           // Check the response data from the backend
           if (response.data === true) {                                                             //اذا ارسلت الكود لايميله ترجع ترو
             // If the backend sends true, do something                              
             console.log('confirmation code sent succefully');
             setShowDialog(true);
           } else if (response.data === false) {                                                     //اذا ما انرسل الكود لايميله لاي سبب من الاسباب ترجع فولس
             // If the backend sends false, do something else
             console.log('there was a problem sending the confirmation code');
             setBEerror(true);
             // Add your code here for when the backend returns false
           }
         })
         .catch(error => {
           console.log(error);
           setBEerror(true);
         });

  };

                                           //2
  const  handleSubmitConfirmation = (e)=> {                 // هنا نرسل الكود للباك اند ونتاكد اذا هو نفس اللي ارسلناه لايميله ولا لا
    e.preventDefault();
         //here check for the submitted confirmation code 
    
         const confirmationCode = e.target.elements.confirmationCode.value;
         console.log('Sending the confirmation code to the backend:', confirmationCode);          //هنا نشوف اذا فيه قيمه بتنرسل للباك اند ولا لا  
        //put the endpoints inside ('/your-endpoint')   مهم!!!
         axios.post('/your-endpoint', confirmationCode)
         .then(response => {
          if (response.data === true) {                                                     //اذا الكود اللي دخله نفس اللي ارسلناه لايميله ترجع ترو 
         console.log('account created succefully');                               
         setShowDialog(false) ;
setSuccessfull(true);
navigate('/Signin');
       } else if (response.data === false) {                                                          // اذا مب نفسه ترجع فولس
         console.log('there was a problem creating you account');
         setconfirmationCodeError(true);
       }
     })
         .catch(error => {
           console.log(error);
           setUnsuccessfull(true);
         });
         

   };


   ///////////////////////////////////////////////////////////////////////////////////////////ما فيه شي تحت //////////////////////////////////////////////////////////////////////////





  const [confirmationCodeError, setconfirmationCodeError] = useState(false);// depends ON the backend
  const [unsuccessfull, setUnsuccessfull] = useState(false);
  const [successfull, setSuccessfull] = useState(false);
  return(
    <>
     <div className='backgroundimage'>
      <Header_1/>
  
      <p className='middle'>
      
    
      <div id="login-form">
      <h1>sign up</h1>
      
      <form  onSubmit={handleSubmit}>
      <FloatingLabel 
  controlId="floatingInput"
  label="Name"
  className="mb-3"
  id="Name"
>
  <Form.Control name="Name" placeholder="" onChange={handleChange} value={formData.Name}/>
</FloatingLabel>
        {errors.Name && <div className="error">{errors.Name}</div>}
        <FloatingLabel 
  controlId="floatingInput"
  label="Email address"
  className="mb-3"
>
  <Form.Control name="email" type="email" placeholder="" value={formData.email} onChange={handleChange}/>
</FloatingLabel>
        {errors.email && <div className="error">{errors.email}</div>}
  
      
        <FloatingLabel controlId="floatingPassword" label="Password">
  <Form.Control name="password" type="password" placeholder="" value={formData.password} onChange={handleChange}/>
</FloatingLabel>
        {errors.password && <div className="error">{errors.password}</div>}
         

        <FloatingLabel controlId="floatingPasswo" label="Confirm Password">
  <Form.Control name="confirmPassword" type="password" placeholder="" value={formData.confirmPassword} onChange={handleChange}/>
</FloatingLabel>
         {errors.confirmPassword && (<div className="error">{errors.confirmPassword}</div>)}
         {BEerror&& <p className='error'>there was a problem creating your account, Please try again</p>}
     <p style={{textAlign:"left"}}> <p className='notify'>-password must be at least 8 characters</p>
      <p className='notify'>-password must contain at least one symbol</p>
      <p className='notify'>-password must contain at least one number</p>
     <p className='notify'>-password must contain at least one uppercase letter</p>
     <p className='notify'>-password must contain at least one lowercase letter</p></p>
      
        <input type="submit"/>

        <Link to="/signin"> <span className='link'>Already have an account?</span> </Link>
        

    </form>

    </div>
   





    {showDialog&&<div className='overlay'></div>}
    <div className={`Forgot-password ${showDialog ? 'show' : ''}`}>
       
<form onSubmit={handleSubmitConfirmation}>
<div style={{ position: 'absolute', top: 0, right: 0 }}>
    <CloseButton onClick={()=>setShowDialog(false)} />
  </div>
  <p>please enter the condirmation code</p>
          <FloatingLabel 
  controlId="confirmationCode"
  label="confirmation code"
  className="mb-3"
>
  <Form.Control  placeholder="" required/>
 
  {confirmationCodeError &&<div className='error'>-the condirmation code is incorrect</div>}
</FloatingLabel>

<input className="confirmationButton"type="submit"/>
</form>
 </div>



 {successfull&&<div className='overlay'></div>}
 <div className={`Forgot-password ${successfull ? 'show' : ''}`}>
 <div style={{ position: 'absolute', top: 0, right: 0 }}>
    <CloseButton onClick={()=>setSuccessfull(false)} />
  </div>
  
  <p style={{color:"rgb(5, 51, 5)",marginTop:"10px"}}>account created succesfully, please sign in</p>
          
 </div>



 {unsuccessfull&&<div className='overlay'></div>}
 <div className={`Forgot-password ${unsuccessfull ? 'show' : ''}`}>
 <div style={{ position: 'absolute', top: 0, right: 0 }}>
    <CloseButton onClick={()=>setUnsuccessfull(false)} />
  </div>
  
  <p style={{color:"red",marginTop:"10px"}}>there was a problem creating your account</p>
          

 </div>



















</p>
    <Footer_1/>
    </div>
    </>
    );
}
export default Sign_up;