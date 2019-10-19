import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, {mount, shallow, render} from 'enzyme';
import Adpater from 'enzyme-adapter-react-16';
import SoccerPlayerQuiz from './SoccerPlayerQuiz';

Enzyme.configure({adapter: new Adpater()});

const state = {
  turnData: {
    answers: ['Harry Kane', 'Hugo Lloris', 'Jorginho', 'Alisson'],
    question: {
      name:           'Harry Kane',
      imageUrl:       'images/players/harry_kane.png',
      imageSource:    'Premier League'
    }
  },
  highlight: ''
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SoccerPlayerQuiz {...state} onAnswerSelected={()=>{}}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
