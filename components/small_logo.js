import logo from './logo.jpeg';


function Small_logo(){
    return(
      <p className='smalllogo' >
      <img className='smalllogo' src={logo} alt='logo' style={{     height: "200px",
        marginTop: "30px"}}/>
      </p>
    );
  }
  export default Small_logo;