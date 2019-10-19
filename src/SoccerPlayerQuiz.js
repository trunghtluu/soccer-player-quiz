import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import './SoccerPlayerQuiz.css';
import './bootstrap.min.css';

function Hero() {
  return (
    <div className="row">
      <div className="jumbotron col-10 offset-1">
        <h1>Soccer Player Quiz</h1>
        <p>Select the correct name of the soccer player shown in the picture</p>
      </div>
    </div>
  );
}

function Answer({name, onClick}) {
  return (
    <div className="answer" onClick={() => {onClick(name);}}>
      <h4>{name}</h4>
    </div>
  );
}

function Turn({question, answers, highlight, onAnswerSelected}) {
  function highlightToBgColor(highlight){
    const mapping = {
      'none': '',
      'correct': 'green',
      'incorrect': 'red',
    };

    return mapping[highlight];
  }

  return (
    <div className="row turn" style={{backgroundColor: highlightToBgColor(highlight)}}>
      <div className="col-4 offset-1" style={{backgroundColor: "white"}}>
        <img src={question.imageUrl} className="playerimage" alt="Question"/>
      </div>
      <div className="col-6">
        {answers.map((name) => <Answer name={name} key={name} onClick={onAnswerSelected}/>)}
      </div>
    </div>
  );
};
Turn.propTypes = {
  question: Proptypes.shape({
    name: Proptypes.string.isRequired,
    imageUrl: Proptypes.string.isRequired,
    imageSource: Proptypes.string.isRequired
  }),
  answers: Proptypes.arrayOf(Proptypes.string).isRequired, 
  highlight: Proptypes.string.isRequired, 
  onAnswerSelected: Proptypes.func.isRequired
}

function Continue({show, onContinue}) {
  return (
    <div className="row continue">
    {
      show   
      ? <div className="col-11">
        <button className="btn btn-primary btn-lg float-right" onClick={onContinue}>Continue</button>
      </div>
      : null 
    }
    </div>
  );
};

function Footer() {
  return (
    <div id="footer" className="row">
      <div className="col-12">
        <p className="text-muted credit">
          All images are from <a href="https://www.premierleague.com/">the Premier League</a> and are in the public domain.
        </p>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    turnData: state.turnData,
    highlight: state.highlight
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAnswerSelected: (answer) => {
      dispatch({ type: 'ANSWER_SELECTED', answer});
    },
    onContinue: () => {
      dispatch({ type: 'CONTINUE'});
    }
  };
}

const SoccerPlayerQuiz = connect(mapStateToProps,mapDispatchToProps)(
  function  ({turnData, highlight, onAnswerSelected, onContinue}) {
  return (
    <div className="container-fluid">
      <Hero/>
      <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected}/>
      <Continue show={highlight==="correct"} onContinue={onContinue}/>
      <p><Link to="/add">Add a player</Link></p>
      <Footer/>
    </div>
  );
});

export default SoccerPlayerQuiz;
