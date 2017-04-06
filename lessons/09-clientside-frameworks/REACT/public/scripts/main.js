var HelloWorld = React.createClass({
  
  getInitialState: function() {
    return {
      h1Text: ''
    };
  },

  componentDidMount: function() {
    $.ajax({
      url: '/api/',
      dataType: 'json',
      cache: false,
      type: 'GET',
      success: function(data) {
  //data from res.json in routes/index.js is {text: "HelloWorld"}, so we want to access the text field of data
          this.setState({
              h1Text: data.text
          });
      }.bind(this),
      failure: function(xhr, status, err) {
          console.error('GET /api', status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    return (
      <div>
        <h1>{this.state.h1Text}</h1>
        <DankParagraph pText={this.state.h1Text}/>
      </div>
    );
  }
});

var DankParagraph = React.createClass({
	render: function() {
		return (
			<div>
				<p> {this.props.pText} </p>
			</div>
		);
	}
});

ReactDOM.render(
  <HelloWorld />,
  document.getElementById('content')
);
