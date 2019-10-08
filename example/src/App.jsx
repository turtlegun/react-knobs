import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import styled, { css } from 'styled-components';

import { FullonKnob, MidlaneKnob, ConcentricKnob, BlindfoldKnob } from 'react-knobs';
import examples from './examples';
import useEventListener from './utils/useEventListener';

const KNOB_PRESETS = [
  { Component: FullonKnob, title: 'Fb', valueStrokeColors: ['#669EFF', '#4580E6', '#2965CC'], strokeLineCap: 'butt' },
  { Component: FullonKnob, title: 'Fr', valueStrokeColors: ['#AD99FF', '#9179F2', '#7157D9'], strokeLineCap: 'round' },
  { Component: MidlaneKnob, title: 'Mb', valueStrokeColors: ['#FFC940', '#F2B824', '#D99E0B'], strokeLineCap: 'butt' },
  { Component: MidlaneKnob, title: 'Mr', valueStrokeColors: ['#D1F26D', '#B6D94C', '#9BBF30'], strokeLineCap: 'round' },
  { Component: ConcentricKnob, title: 'Co', valueStrokeColors: ['#2EE6D6', '#14CCBD', '#00B3A4'], },
  { Component: BlindfoldKnob, title: 'Bl', valueStrokeColors: ['#FFC940', '#F2B824', '#D99E0B'], },
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
  grid: 32pt auto / 100%;
  grid-area: main;
  background-color: #899EAA;
  overflow-y: hidden;
  height: 100%;
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
  display: ${props => props.visible ? 'grid' : 'none'};
  grid: 33% 33% 33% / 50% 50%;
  width: 100%;
  height: 100%;
  padding: 60px;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
`;

const KnobsGroup = styled.div`
  display: grid;
  grid: auto / auto auto auto auto;
  grid-gap: 5px;
  align-items: center;
  justify-content: center;
`;

const ExamplesContainer = styled.div`
  display: ${props => props.visible ? 'grid' : 'none'};
  grid: auto / 240px 500px;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  height: 100%;
  pre {
    border-radius: 10px;
  }
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

  useEventListener('keydown', (event) => {
    if (event.keyCode === 9) { // TAB
      event.preventDefault();
      setActiveTab(
        activeTab === 'quick-demo'
          ? 'code-examples'
          : 'quick-demo'
      );
    }
  });

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
        <KnobsContainer visible={activeTab === 'quick-demo'}>
          {KNOB_PRESETS.map(({ Component, valueStrokeColors, ...props }, i) => (
            <KnobsGroup key={i}>
              {[0.33, 0.66, 1].map((scale, j) => (
                <Component
                  key={j}
                  {...props}
                  scale={scale}
                  valueStrokeColor={valueStrokeColors[j]}
                  value={knobValues[i]}
                  onChange={(value) => handleKnobProgressChange(i, value)}
                />)
              )}
            </KnobsGroup>
          ))}
        </KnobsContainer>
        <ExamplesContainer visible={activeTab === 'code-examples'}>
          {examples.map(({ code, codeFontSize, Component }, index) => (
            <React.Fragment key={index}>
              <Centered>
                <Component />
              </Centered>
              <div style={{ fontSize: codeFontSize || 14 }}>
                <SyntaxHighlighter language="javascript" style={docco}>
                  {code}
                </SyntaxHighlighter>
              </div>
            </React.Fragment>
          ))}
        </ExamplesContainer>
      </AppBody>
      <AppFooter>
        Andrii Polishchuk (c) 2019
      </AppFooter>
    </AppContainer>
  );
}
