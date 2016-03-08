import './App.less';

export default class App extends React.Component {
  render(){
    const { children } = this.props;

    return (
      <div className="app">
        <h1>Univeral app bolierplate s</h1>
        {children}
      </div>
    );
  }
}
