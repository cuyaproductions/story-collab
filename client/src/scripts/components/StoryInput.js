import React, {Component} from 'react';

class StoryInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ''
    }

    this.onTextChange = this.onTextChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onTextChange(event) {
    const message = event.target.value;
    this.setState({ message });
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.onAddMessage(this.state.message);
    this.setState({ message: ''});
  }

  render() {
    return (
      <footer className="user-input">
        <form className="user-input__form" id="input-form" onSubmit={this.onFormSubmit}>
          <input type="text" id="input-text" className="user-input__text" value={this.state.message} placeholder="Continue story here!" onChange={this.onTextChange}/>
          <button className="user-input__submit">Add</button>
        </form>
        {/*<small className="typing-notice" id="active-notice"><span className="typing-notice__number" id="active-authors"></span> authors are typing</small>*/}
      </footer>
    );
  }
};

export default StoryInput;