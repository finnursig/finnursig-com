import './App.less';

export default class App extends React.Component {
  render(){
    const { children } = this.props;

    return (
      <div className="app">
        <h1>finnursig.com</h1>
        {children}
      </div>
    );
  }
}
