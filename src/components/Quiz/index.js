import React, { useState } from 'react'
import GameOver from './GameOver'
import QuestionOverview from './QuestionOverview'
import Question from './Question/index'
import { Container } from '../layout'
import { QuizContainer, DisplayImageText, Milk } from './styles'

function Quiz({
  images,
  viewProgress,
  restart,
  progress,
  incorrect,
  numberOfQuestions,
  completed,
  question,
  showAnswer,
  selectedAnswer,
  onAnswerSelected,
  displayAnswers,
}) {
  const [showImage, setShowImage] = useState(false)

  const renderImage = (image) => {
    const imageKey = 'image_' + image
    const ImageComponent = images[imageKey]

    if (!showImage) {
      return <DisplayImageText onClick={() => setShowImage(true)}>Bild ansehen</DisplayImageText>
    } else {
      return (
        <Milk onClick={() => setShowImage(false)}>
          <img src={ImageComponent} alt={imageKey} />
        </Milk>
      )
    }
  }

  if (viewProgress) {
    return <QuestionOverview restart={restart} progress={progress} incorrect={incorrect} numberOfQuestions={numberOfQuestions} />
  } else if (completed) {
    return (
      <Container>
        <QuizContainer>
          <GameOver restart={restart} progress={progress} numberOfQuestions={numberOfQuestions} />
        </QuizContainer>
      </Container>
    )
  } else {
    return (
      <Container>
        <QuizContainer>
          <Question
            question={question}
            showAnswer={showAnswer}
            selectedAnswer={selectedAnswer}
            onAnswerSelected={onAnswerSelected}
            progress={progress}
            displayAnswers={displayAnswers}
            renderImage={renderImage}
            maxNumberQuestions={numberOfQuestions}
          />
        </QuizContainer>
      </Container>
    )
  }
}

export default Quiz
