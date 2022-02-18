# Techreek Backend Assignment (APIs)

* GET REQUEST FOR ALL PRODUCTS

localhost:5000/
localhost:5000/students





* POST REQUEST

  localhost:5000/student
  
{
    "firstName": "jude",
    "lastName": "Roman",
    "middleName": "",
    "dob": "Sept",
    "email": "Roman@gmail.com",
    "phoneNumber": "08188251329",
    "stateOfOrigin": "Rivers",
    "gender": "male",
    "course": "coding",
    "address": "Rumuola",
    "lga": "obio akpor"

}
register 

{
    "name": "david",
    "email": "david@gmail.com",
    "password": "123456"
}




REGISTER FORM   REGISTER FORM     REGISTER FORM     REGISTER FORM 

const RegisterForm = () => {

  const initialState = { 
    name: '', email: '', password: '', cf_password: '' 
  }

  const [userRegister, setUserRegister] = useState(initialState)

  const { name, email, password, cf_password } = userRegister



  const handleChangeInput = (e) => {
    const {value, name} = e.target
    setUserRegister({...userRegister, [name]:value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()


     const config = {
      header: {
        "Content-Type": "application/json",
      },
    };


    if (password !== confirmpassword) {
    setPassword("");
    setConfirmPassword("");
    setTimeout(() => {
      setError("");
    }, 5000);
    return setError("Passwords do not match");
    }



    try {
      const { data } = await axios.post(
        "/api/register",
        {
         userRegister
        },
        config
      );

      localStorage.setItem("authToken", data.token);

      history.push("/");


    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }





    
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label htmlFor="name" className="form-label">Name</label>

        <input type="text" className="form-control" id="name"
        name="name" value={name} onChange={handleChangeInput}
        placeholder="Your name is up to 20 chars." />
      </div>

    </form>
  )
}





LOGIN FORM LOGIN FORM    LOGIN FORM    LOGIN FORM    LOGIN FORM    LOGIN FORM



const LoginForm = () => {

  const initialState = { 
     email: '', password: '' 
  }

  const [userLogin, setUserLogin] = useState(initialState)

  const {  email, password } = userLogin



  const handleChangeInput = (e) => {
    const {value, name} = e.target
    setUserLogin({...userLogin, [name]:value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()


     const config = {
      header: {
        "Content-Type": "application/json",
      },
    };



    try {
      const { data } = await axios.post(
        "/api/login",
        {
         userLogin
        },
        config
      );

      localStorage.setItem("authToken", data.token);

      history.push("/");


    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }



  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label htmlFor="name" className="form-label">Name</label>

        <input type="text" className="form-control" id="name"
        name="name" value={name} onChange={handleChangeInput}
        placeholder="Your name is up to 20 chars." />
      </div>

    </form>
  )
}