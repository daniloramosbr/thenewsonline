/* eslint-disable @typescript-eslint/no-unused-vars */
import LoginForm from "../components/LoginForm"
import { cafeOutline  } from "ionicons/icons";
import { IonIcon } from "@ionic/react";

export default function Login() {
  
  return (
    <main className="main-container">
      <div className="content-wrapper">
        <header className="header">
          <h1 className="title"> <span> <IonIcon icon={cafeOutline} style={{ fontSize: "30px" }} /></span> The News</h1>
        </header>
        <div className="form-container">
          <LoginForm />
        </div>
      </div>
    </main>
  )
}
