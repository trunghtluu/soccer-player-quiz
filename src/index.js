import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import {shuffle, sample} from 'underscore';
import './index.css';
import SoccerPlayerQuiz from './SoccerPlayerQuiz';
import AddPlayerForm from './AddPlayerForm';

const players = [
    {
        name:           'Harry Kane',
        imageUrl:       'images/players/harry_kane.png'
    },
    {
        name:           'Alisson',
        imageUrl:       'images/players/alisson.png'
    },
    {
        name:           'Christian Eriksen',
        imageUrl:       'images/players/christian_eriksen.png'
    },
    {
        name:           'Dele Alli',
        imageUrl:       'images/players/dele_alli.png'
    },
    {
        name:           'David Silva',
        imageUrl:       'images/players/david_silva.png'
    },
    {
        name:           'Ederson',
        imageUrl:       'images/players/ederson.png'
    },
    {
        name:           'Harry Winks',
        imageUrl:       'images/players/harry_winks.png'
    },
    {
        name:           'Hugo Lloris',
        imageUrl:       'images/players/hugo_lloris.png'
    },
    {
        name:           'Jesse Lingard',
        imageUrl:       'images/players/jesse_lingard.png'
    },
    {
        name:           'Jorginho',
        imageUrl:       'images/players/jorginho.png'
    },
    {
        name:           'Mesut Ozil',
        imageUrl:       'images/players/mesut_ozil.png'
    },
    {
        name:           'Virgil van Dijk',
        imageUrl:       'images/players/virgil_van_dijk.png'
    },
    {
        name:           'Teemu Pukki',
        imageUrl:       'images/players/teemu_pukki.png'
    },
];

function getTurnData(players) {
    const allPlayers = players.reduce(function(){
        let p = [];

        for (let i = 0; i < players.length; ++i)
            p.push(players[i].name);

        return p;
    }, []);
    const fourRandomPlayers = shuffle(allPlayers).slice(0 , 4);
    const answer = sample(fourRandomPlayers);

    return {
        answers: fourRandomPlayers,
        question: players.find((player) => player.name === answer)
    }
};

function reducer(
    state = { players, turnData: getTurnData(players), highlight: ''}, 
    action) 
{   
    switch (action.type){
        case 'ANSWER_SELECTED':
            const isCorrect = (state.turnData.question.name === action.answer);
            return Object.assign(
                {},
                state, 
                {highlight: isCorrect ? 'correct' : 'incorrect'}
            );
        case 'CONTINUE':
            return Object.assign(
                {},
                state, 
                {highlight: '', turnData: getTurnData(state.players)}
            );
        case 'ADD_AUTHOR':
            return Object.assign(
                {},
                state, 
                {players: state.players.concat([action.player])}
            );
        default:
            return state;
    }
}

let store = Redux.createStore(reducer);

ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <BrowserRouter>
            <React.Fragment>
                <Route exact path="/" component={SoccerPlayerQuiz}/>
                <Route path="/add" component={AddPlayerForm}/>
            </React.Fragment>
        </BrowserRouter>
    </ReactRedux.Provider>, 
    document.getElementById('root'));

serviceWorker.register();
