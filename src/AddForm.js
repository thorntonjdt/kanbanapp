import React, { Component } from 'react';

class AddForm extends Component {

  componentWillMount(){
    this.setState({
      id: Date.now(),
      title: '',
      description: '',
      status: 'todo',
      date: ''
    });
  }

  handleChange(field, e){
    this.setState({[field]: e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.controlCallbacks.addCard(this.state);
    this.props.toggleAddForm();
  }

  render(){
    return (
      <div>
        <div className="card big">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input type='text'
                   value={this.state.title}
                   onChange={this.handleChange.bind(this,'title')}
                   placeholder="Title"
                   required={true}
                   autoFocus={true} />
            <br />
            <textarea value={this.state.description}
                      onChange={this.handleChange.bind(this,'description')}
                      placeholder="Description"
                      required={true} />
            <br />
            <input type='date'
                   value={this.state.date}
                   onChange={this.handleChange.bind(this,'date')}
                   placeholder="Date"
                   required={true} />
            <br />
            <label htmlFor="status">Status</label>
            <select id="status"
                    value={this.state.status}
                    onChange={this.handleChange.bind(this,'status')}>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <br />
            <div className='actions'>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddForm;
