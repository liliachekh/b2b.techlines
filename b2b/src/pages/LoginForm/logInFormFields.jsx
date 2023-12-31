import LoginFormAdditional from "../../components/LoginFormAdditional";

export const logInFormFields = [
  {
    tagType: 'regular',
    label: "Email address",
    id: "loginOrEmail",
    name: "loginOrEmail",
    type: "text",
    placeholder: "Enter your email",
  },
  {
    tagType: 'regular',
    label: "Password",
    id: "password",
    name: "password",
    type: "password",
    placeholder: "Enter your password",
  },
  {
    tagType: 'custom',
    content() { return <LoginFormAdditional key={"logIn"} /> }
  }
]