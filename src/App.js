import React, {Component} from 'react';
import './App.css';
import Layout from './hoc/layout/Layout';
import Quiz from './containers/Quiz'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import QuizList from './containers/QuizList/QuizList'
import Auth from './containers/Auth/Auth'
import {Route, Switch} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/quiz-creator" component={QuizCreator} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/" component={QuizList} />
        </Switch>
        
        {/* <Quiz /> */}
      </Layout>
    )
  }
}

export default App;
