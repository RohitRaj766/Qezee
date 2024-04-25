import './Register.scss'
import Form from '../../components/form/Form'
import Header from '../../components/header/Header'
// import Heading from '../../assets/images/heading.svg'

const Register = () => {
  return (
    <>
      <Header/>
     <div className="register">
      <div className="container">
      {/* <img src={Heading} alt="" />  */}
      <Form/>
      </div>
     </div>
    </>
  )
}

export default Register