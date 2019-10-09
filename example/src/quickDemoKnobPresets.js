/* eslint no-useless-concat: "off" */

import { FullonKnob, MidlaneKnob, ConcentricKnob, BlindfoldKnob } from 'react-knobs';

export default [
  {
    Component: FullonKnob,
    title: 'Fb',
    valueStrokeColors: ['#669EFF', '#4580E6', '#2965CC'],
    strokeLineCap: 'butt',
    tooltip:
      '<FullonKnob ' + '\n' +
      '  title="Fb"' + '\n' +
      '  scale={{scale}}' + '\n' +
      '  valueStrokeColor="{valueStrokeColor}"' + '\n' +
      '  strokeLineCap="butt"' + '\n' +
      '/>',
  },
  {
    Component: FullonKnob,
    title: 'Fr',
    valueStrokeColors: ['#AD99FF', '#9179F2', '#7157D9'],
    strokeLineCap: 'round',
    tooltip:
      '<FullonKnob ' + '\n' +
      '  title="Fr"' + '\n' +
      '  scale={{scale}}' + '\n' +
      '  valueStrokeColor="{valueStrokeColor}"' + '\n' +
      '  strokeLineCap="round"' + '\n' +
      '/>',
  },
  {
    Component: MidlaneKnob,
    title: 'Mb',
    valueStrokeColors: ['#FFC940', '#F2B824', '#D99E0B'],
    strokeLineCap: 'butt',
    tooltip:
      '<MidlaneKnob ' + '\n' +
      '  title="Mb"' + '\n' +
      '  scale={{scale}}' + '\n' +
      '  valueStrokeColor="{valueStrokeColor}"' + '\n' +
      '  strokeLineCap="butt"' + '\n' +
      '/>',
  },
  {
    Component: MidlaneKnob,
    title: 'Mr',
    valueStrokeColors: ['#D1F26D', '#B6D94C', '#9BBF30'],
    strokeLineCap: 'round',
    tooltip:
      '<MidlaneKnob ' + '\n' +
      '  title="Mr"' + '\n' +
      '  scale={{scale}}' + '\n' +
      '  valueStrokeColor="{valueStrokeColor}"' + '\n' +
      '  strokeLineCap="round"' + '\n' +
      '/>',
  },
  {
    Component: ConcentricKnob,
    title: 'Co',
    valueStrokeColors: ['#2EE6D6', '#14CCBD', '#00B3A4'],
    tooltip:
      '<ConcentricKnob ' + '\n' +
      '  title="Co"' + '\n' +
      '  scale={{scale}}' + '\n' +
      '  valueStrokeColor="{valueStrokeColor}"' + '\n' +
      '/>',
  },
  {
    Component: BlindfoldKnob,
    title: 'Bl',
    valueStrokeColors: ['#FFC940', '#F2B824', '#D99E0B'],
    tooltip:
      '<BlindfoldKnob ' + '\n' +
      '  title="Bl"' + '\n' +
      '  scale={{scale}}' + '\n' +
      '/>',
  },
];
