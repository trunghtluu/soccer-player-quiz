import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './AddPlayerForm.css';

class PlayerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageUrl: '',
        };

        this.onFieldChange = this.onFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onAddPlayer(this.state);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="AddPlayerForm__input">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={this.state.name} onChange={this.onFieldChange}/>
                </div>
                <div className="AddPlayerForm__input">
                    <label htmlFor="imageUrl">Image URL</label>
                    <input type="text" name="imageUrl"  value={this.state.imageUrl} onChange={this.onFieldChange}/>
                </div>
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}

function AddPlayerForm({match, onAddPlayer}) {
    return (
    <div className="AddPlayerForm">
        <h1>Add Player</h1>
        <PlayerForm onAddPlayer={onAddPlayer}/>
    </div>);
}

function mapDispatchToProps(dispatch, props) {
    return {
        onAddPlayer: (player) => {
            dispatch({ type: 'ADD_PLAYER'}, player);
            props.history.push('/');
        }
    };
}

export default withRouter(connect(() => {}, mapDispatchToProps)(AddPlayerForm));