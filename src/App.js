import React from 'react';
import Knob1 from './components/Knob1';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="header">
        react-knobs-demo
      </header>
      <div className="knobs">
        <Knob1 scale={1} progress={0.75} />
      </div>
      <div className="themes">
        themes
      </div>
      <footer className="footer">
        Andrii Polishchuk, 2019
      </footer>
    </div>
  );
}

export default App;
