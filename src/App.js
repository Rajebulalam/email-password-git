import './App.css';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from './firebase.init';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

const auth = getAuth(app);

function App() {

  // Form Validation with react bootstrap
  const [validated, setValidated] = useState(false);

  // Set Checkbox with handler
  const [register, setRegister] = useState(false);

  // Set Email from handler
  const [email, setEmail] = useState('');

  // Set Password from handler
  const [password, setPassword] = useState('');

  // Set Error Text
  const [error, setError] = useState('');

  // Set Success Text
  const [success, setSuccess] = useState('');

  // Get Email from user with onBlur(onBlur means click outside of specific input)
  const handleEmail = event => {
    setEmail(event.target.value);
    console.log(event.target.value);
  }

  // Get Password from user with onBlur
  const handlePassword = event => {
    setPassword(event.target.value);
    console.log(event.target.value);
  }

  // Get Checkbox from user interaction
  const handleRegister = event => {
    setRegister(event.target.checked);
    console.log(event.target.checked);
  }

  /* 
    Submit Click Handler : 
    When you click the submit button then this code will be executed  
  */
  const handleSubmit = event => {
    event.preventDefault();

    // Form validation with react bootstrap
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    // Password Validation
    if (!/^(?=^.{8,}$)(?=.*[0-9])(?=.+[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;&gt;.&lt;;,]).{1,}$/.test(password)) {
      setError('Password should contain at least 1 upper case, 1 lower case, 1 number, 1 special character and minimum 8 digit.')
    } else {
      setSuccess('Looks Good!')
    }

    // Store Email and Details from user
    if (register) {
      // If you already register then sign in
      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
        })
        .catch(error => {
          console.error(error);
          setError(error.message);
        })
    } else {
      // If not register then create your self 
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
        })
        .catch(error => {
          console.error(error);
          setError(error.message);
        })
    }
  }

  return (
    <div className="App">
      <div className='w-50 mx-auto m-5 p-5 shadow'>
        <h2 className='text-primary fw-bold mb-3'>Please {register ? 'Login' : 'Register'} !!</h2>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmail} type="email" required placeholder="Enter email" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please give a valid email address!
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePassword} type="password" required placeholder="Password" />
            <p className='text-danger'> {error} </p>
            <p className='text-success'> {success} </p>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegister} type="checkbox" label="Already Register?" />
          </Form.Group>
          <Button variant="primary" type="submit">
            {
              register ? 'Log In' : 'Register'
            }
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
