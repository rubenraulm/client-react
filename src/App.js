import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
        msg: "",
        status: false,
        userIdentifier: [],
        err: false,
        ok: false
    }
    this.call = this.call.bind(this);
  }
  call() {
    this.setState({ status: true });
    this.setState({ msg: "Generating your keys.." });
    this.setState({ err: false });
    this.setState({ ok: false });
    fetch('/generate')
      .then(msg => {
        this.setState({ msg: "Encrypting your keys.." });
        fetch('/encrypt')
          .then(msg => { 
            this.setState({ msg: "Saving record.." });
            fetch('/save')
              .then(msg => { 
                fetch('./userdata')
                  .then(msg => {
                    this.setState({ ok: true });
                    if(msg.status == 200){
                      this.setState({ msg: msg.statusText });
                      this.setState({ err: false });
                      this.setState({ ok: true });
                      
                    } else if(msg.status !== 200){
                      this.setState({ msg: msg.statusText });
                      this.setState({ err: true });
                      this.setState({ ok: false });
                    }
                  })
                })
          })
      })
  }
  tryAgain(){
    fetch('./userdata')
    .then(msg => {
      this.setState({ ok: true });
      if(msg.status == 200){
        this.setState({ msg: msg.statusText });
        this.setState({ err: false });
        this.setState({ ok: true });
        
      } else if(msg.status !== 200){
        this.setState({ msg: msg.statusText });
        this.setState({ err: true });
        this.setState({ ok: false });
      }
    })
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <button className="btn" onClick={this.call.bind(this)}>Sign up</button>
        </header>
        <div className={ !this.state.ok  ? 'show ' : 'hidden '}>
            <br/><br/><br/><br/>
            <div className={ "group " + (this.state.status  ? 'show ' : 'hidden ') + ( this.state.err  ? 'error' : '')}> 
                <div className="bigSqr">
                    <div className="square first"></div>
                    <div className="square second"></div>
                    <div className="square third"></div>
                    <div className="square fourth"></div>
                </div>
            </div>
            <h5 className={ this.state.err  ? 'error' : ''}>{this.state.msg}</h5>
        </div>
        <div className={ "checkmark " + (this.state.ok  ? 'show ' : 'hidden ')}></div>
        <button className={"btn min  " + (this.state.err  ? 'show' : '')} onClick={this.tryAgain.bind(this)}>Try again</button>
      </div>
    );
  }
}

export default App;
