import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import styled, { css } from 'styled-components';

import Knob from './components/Knob';
import FullonKnob from './components/FullonKnob';
import examples from './examples';

const KNOB_PRESETS = [
  { Component: FullonKnob, title: 'fullon-butt', strokeLineCap: 'butt' },
  { Component: FullonKnob, title: 'fullon-round', strokeLineCap: 'round' },
  { Component: Knob, title: 'midlane-butt' },
  { Component: Knob, title: 'midlane-round' },
  { Component: Knob, title: 'concentric' },
  { Component: Knob, title: 'blindfold' },
];

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: auto 800px auto;
  grid-template-rows: 100px auto 60px;
  grid-template-areas:
    ". header ."
    ". main   ."
    ". footer .";
  width: 100%;
  height: 100%;
  background-color: #193540;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

const AppHeader = styled.header`
  grid-area: header;
  align-self: end;
  font-size: 20pt;
  padding-bottom: 10pt;
  color: #5F7884;
`;

const AppBody = styled.div`
  display: grid;
  grid: 40px auto / 100%;
  grid-area: main;
  background-color: #899EAA;
`;

const AppFooter = styled.footer`
  grid-area: footer;
  text-align: center;
  font-size: 14pt;
  padding-top: 8pt;
  color: #405D64;
`;

const TabsContainer = styled.div`
  display: grid;
  grid: 32pt / 50% 50%;
  width: 100%;
`;

const Tab = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  font-size: 14pt;
  color: #899EAA;
  background-color: #405D64;
  ${props => props.active && css`
    color: #193540;
    background-color: #5F7884;
    text-decoration: underline;
  `}
  &:hover {
    cursor: pointer;
    color: #193540;
  }
`;

const KnobsContainer = styled.div`
  display: grid;
  grid: 33% 33% 33% / 40% 40%;
  width: 100%;
  height: 100%;
  padding: 60px;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
`;

const ExamplesContainer = styled.div`
  display: grid;
  grid: 340px 200px / 220px 480px auto;
  align-items: center;
  justify-content: center;
`;

const Conditional = styled.div`
  ${props => props.visible === false && css`
    display: none;
  `}
`;

const Centered = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
`;

export default function () {
  const [activeTab, setActiveTab] = useState('quick-demo');
  const [knobValues, setKnobValues] = useState(
    Array.from({ length: KNOB_PRESETS.length }, () => Math.random())
  );

  const handleKnobProgressChange = (index, value) => {
    const newKnobValues = [...knobValues];
    newKnobValues[index] = value;
    setKnobValues(newKnobValues);
  };

  return (
    <AppContainer>
      <AppHeader>
        react-knobs-demo
      </AppHeader>
      <AppBody>
        <TabsContainer>
          <Tab
            active={activeTab === 'quick-demo'}
            onClick={() => setActiveTab('quick-demo')}
          >
            Quick Demo
          </Tab>
          <Tab
            active={activeTab === 'code-examples'}
            onClick={() => setActiveTab('code-examples')}
          >
            Code Examples
          </Tab>
        </TabsContainer>
        <Conditional visible={activeTab === 'quick-demo'}>
          <KnobsContainer>
            {KNOB_PRESETS.map(({ Component, ...props }, index) => (
              <Centered key={props.title}>
                <Component
                  {...props}
                  value={knobValues[index]}
                  onChange={(value) => handleKnobProgressChange(index, value)}
                />
              </Centered>
            ))}
          </KnobsContainer>
        </Conditional>
        <Conditional visible={activeTab === 'code-examples'}>
          <ExamplesContainer>
            {examples.map(([code, Component], index) => (
              <React.Fragment key={index}>
                <Centered>
                  <Component />
                </Centered>
                <SyntaxHighlighter language="javascript" style={docco}>
                  {code}
                </SyntaxHighlighter>
              </React.Fragment>
            ))}
          </ExamplesContainer>
        </Conditional>
      </AppBody>
      <AppFooter>
        Andrii Polishchuk (c) 2019
      </AppFooter>
    </AppContainer>
  );
}
