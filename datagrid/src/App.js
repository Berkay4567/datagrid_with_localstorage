import React from "react";


import 'devextreme/dist/css/dx.light.css';
import Header from "./header/header.js";
import Main from "./main/main.js";
import './App.css';

class App extends React.Component {


  addText = { text: 'Yeni Hesap Ekle' };
  render() {
    return (
      <div>
        <Header /> 
        <Main/>
      </div>
    );
  }
}

export default App;
