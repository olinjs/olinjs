var HelloWorld = React.createClass({
  render: function() {
    return (
      <div>
        <h1> Hello World </h1>
      </div>
    );
  }
});

ReactDOM.render(
  <HelloWorld />,
  document.getElementById('content')
);
