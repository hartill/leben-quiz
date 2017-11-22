import React from 'react';
import './quiz.css';
import quizQuestions from './../../api/quizQuestions'
import Lightbox from 'react-image-lightbox'
import Cookies from 'universal-cookie'
import GameOver from './GameOver'
import QuestionOverview from './QuestionOverview/'
import UserProgressBar from './UserProgressBar'
import Questions from './Questions'

class Quiz extends React.Component {
  constructor(props){
    super(props);
    this.cookies = new Cookies();
    this.questions = quizQuestions
    this.state = {
      question: {},
      progress: [],
      incorrect: [],
      showAnswer: false,
      selectedAnswer: null,
      completed: false,
      isOpen: false,
      viewProgress: false
    }
    this.generateNextQuestion = this.generateNextQuestion.bind(this);
    this.onAnswerSelected = this.onAnswerSelected.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.displayAnswers = this.displayAnswers.bind(this);
    this.restart = this.restart.bind(this);
    this.handleViewProgress = this.handleViewProgress.bind(this);
  }

  componentWillMount() {
    this.setState({
      question: this.generateNextQuestion(this.questions),
      progress: this.cookies.get('progress') || [],
      incorrect: this.cookies.get('incorrect') || [],
      showAnswer: false,
      selectedAnswer: null,
      completed: false,
      isOpen: false,
      viewProgress: false
    })
  }

  onAnswerSelected(event) {
    event.preventDefault()
    const target = event.target
    let questionId = target.name
    this.setState((prevState, props) => {
      return {
        selectedAnswer: target.id,
        showAnswer: true
      }
    })
    if (target.value === '1') {
      this.setState(prevState => ({
          progress: [...prevState.progress, questionId]
      }))
    } else {
      this.setState(prevState => ({
          incorrect: [...prevState.incorrect, questionId]
      }))
    }
  }

  displayAnswers() {
    this.setState(prevState => ({
      showAnswer: true
    }))
  }

  handleViewProgress() {
    if (this.state.viewProgress === true) {
      this.setState(prevState => ({
        viewProgress: false
      }))
    } else {
      this.setState(prevState => ({
        viewProgress: true
      }))
    }
  }

  componentDidUpdate(nextProps, nextState) {
    this.state.progress.sort(function (a, b){return a-b})
    this.state.incorrect.sort(function (a, b){return a-b})
    const expires = new Date()
    expires.setTime(expires.getTime()+(365*24*60*60*1000))
    expires.toUTCString()
    this.cookies.set('progress', this.state.progress, {expires: expires, path: '/' })
    this.cookies.set('incorrect', this.state.incorrect, {expires: expires, path: '/' })
  }

  generateNextQuestion(questions) {
    let correctAnswers = this.state.progress
    let maxNumber = 300 - correctAnswers.length
    let minNumber = 1
    let randNumber = Math.floor((Math.random() * maxNumber) + minNumber);
    for (let i = 0; i < correctAnswers.length; i++) {
      if (randNumber >= correctAnswers[i]) {
        randNumber += 1
      }
    }
    let randomNumbersIndex = randNumber - 1
    return questions[randomNumbersIndex]
  }

  restart() {
    this.setState({
        progress: [],
        incorrect: [],
        completed: false,
        showAnswer: false,
        selectedAnswer: null,
        isOpen: false,
        viewProgress: false
    })
  }

  nextQuestion() {
    if (this.state.progress.length >= 300) {
      this.setState({
        completed: true
      })
    } else {
      this.setState((prevState, props) => {
        return {
          question: this.generateNextQuestion(this.questions),
          selectedAnswer: null,
          showAnswer: false
        }
      })
    }
  }

  renderImage(image) {
    let isOpen = this.state.isOpen
    return (
      <div className="QuestionImage" onClick={() => this.setState({ isOpen: true })}>
        <p>
          Bild ansehen
        </p>
      {isOpen &&
      <Lightbox
          mainSrc={image}
          onCloseRequest={() => this.setState({ isOpen: false })}
          onMovePrevRequest={() => {}}
          onMoveNextRequest={() => {}}
      />
      }
      </div>
    )
  }

  render () {
    if (this.state.viewProgress === false) {
      if (this.state.completed === false) {
        return (
          <Questions
            question={this.state.question}
            handleViewProgress={this.handleViewProgress}
            showAnswer={this.state.showAnswer}
            selectedAnswer={this.state.selectedAnswer}
            onAnswerSelected={this.onAnswerSelected}
            progress={this.state.progress}
            nextQuestion={this.nextQuestion}
            displayAnswers={this.displayAnswers}
          />
        )
      } else {
        return (
          <GameOver restart={this.restart} progress={this.state.progress} handleViewProgress={this.handleViewProgress}/>
        )
      }
    } else {
      return (
        <QuestionOverview
          progress={this.state.progress}
          incorrect={this.state.incorrect}
          handleViewProgress={this.handleViewProgress}
          restart={this.restart}
        />
      )
    }
  }
}

export default Quiz
