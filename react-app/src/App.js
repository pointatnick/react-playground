import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      a: ''
    }
  }
  update(e) {
    this.setState({
      a: e.target.value,
      b: this.refs.b.value,
      c: this.c.value,
      d: ReactDOM.findDOMNode(this.d).value,
      e: this.e.refs.input.value
    })
  }
  render() {
    return (
      <div>
        <input
          type="text"
          onChange={this.update.bind(this)}
        /> {this.state.a}
        <hr />
        <input
          ref="b"
          type="text"
          onChange={this.update.bind(this)}
        /> {this.state.b}
        <hr />
        <input
          ref={node => this.c = node}
          type="text"
          onChange={this.update.bind(this)}
        /> {this.state.c}
        <hr />
        <Input
          ref={component => this.d = component}
          update={this.update.bind(this)}
        /> {this.state.d}
        <hr />
        <DivInput
          ref={component => this.e = component}
          update={this.update.bind(this)}
        /> {this.state.e}
      </div>
    )
  }
}

class Input extends React.Component {
  render() {
    return <input type="text" onChange={this.props.update} />
  }
}

class DivInput extends React.Component {
  render() {
    return (
      <div>
        <input ref="input" type="text" onChange={this.props.update} />
      </div>
    )
  }
}

export default App
