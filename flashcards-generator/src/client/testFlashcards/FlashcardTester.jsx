import Flashcard from './Flashcard'
import React, { useState } from 'react'
import { TestSettings } from './FlashcardsTestSettings'
import TopicSelect from '../common/TopicSelect'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import { getFlashcards } from '../connectors/serverData'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedo } from '@fortawesome/free-solid-svg-icons'
import CardColumns from 'react-bootstrap/CardColumns'

const FlashcardsTester = () => {

    const [name, setName] = useState("");
    const [topicId, setTopicId] = useState("");
    const [term, setTerm] = useState("");
    const [cardsList, setCardsList] = useState([]);
    const [errorMessage, setError] = useState("")
    const [showError, setShowError] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [successMessage, setSuccess] = useState("")
    const [showSuccess, setShowSuccess] = useState(false)
    // testOption: [0 = Manual, 1=Automatic/Semantic Similarity]
    const [testOption, setTestOption] = useState(1)
    const [disableOptions, setDisableOptions] = useState(false)
    const [cardListSize, setCardListSize] = useState(0)
    const [showProgress, setShowProgress] = useState(false)
    const [scoreObject, setScoreObject] = useState({})
    const [pendingAnswers, setPendingAnswers] = useState(0)
    const [incorrectAnswers, setIncorrectAnswers] = useState(0)
    const [correctAnswers, setCorrectAnswers] = useState(0)
    const [finishedTest, setFinishedTest] = useState(false)

    const createTestObject = (data) => {
        const testObject = {}
        data.map((card) => {
            testObject[card.id] =  ''
        })
        setScoreObject(testObject)
    }

    const handleSubmit = async () => {
        setLoading(true)

        const resp = await getFlashcards(name, topicId, term)

        if (resp && resp.data) {
            setLoading(false)

            if (resp.data.length > 0) {
                console.log(`Got results: ${resp.data.length}`)
                setTerm("")
                setName("")
                setTopicId("")
                setCardsList(resp.data)
                setDisableOptions(true)
                setCardListSize(resp.data.length)
                createTestObject(resp.data)
            }
            else {
                setSuccess(`Query succesful - No results were returned ${resp.data.length}`)
                setCardListSize(0)
                setShowSuccess(true)
            }
        }

        if (resp && resp.error) {
            setError(`Sorry! Something went wrong :( \n ${resp.error}`)
            setShowError(true)
            setLoading(false)
            setCardListSize(0)
        }
    }

    const handleTestOptionChange = (optionValue) => {
        setTestOption(optionValue)
    }

    const handleTopicChange = (topic) => {
        if (topic && topic.value) {
            setTopicId(topic.value)
        }
    }

    const updateScore = (data, answerType) => {
        const count =  Object.values(data).reduce((n, val) => {
            return n + (val===answerType)
        }, 0)
        return ((count / cardListSize) * 100).toFixed(2)
    }

    const handleScoreUpdate = ({id, status}) => {
        setShowProgress(true)
        const newScoreObject = { ...scoreObject, [id]: status }
        setScoreObject(newScoreObject)

        const newCorrectScore = updateScore(newScoreObject, "correct")

        setCorrectAnswers(newCorrectScore)
        setIncorrectAnswers(updateScore(newScoreObject, "incorrect"))
        setPendingAnswers(updateScore(newScoreObject, ""))

        if (newCorrectScore == 100.00) {
            setShowProgress(false)
            setSuccess("Congratulations! You got them all right! :)")
            setShowSuccess(true)
            setFinishedTest(true)
        }
    }

    return (
        <div className="flashcardsTester">
            <TestSettings disableOptions={disableOptions} handleTestOptionChange={handleTestOptionChange} />
            <br />
            <Form>
                <TopicSelect
                    handleTopicChange={handleTopicChange}
                />

                <Form.Group controlId="formFlashcardTerm">
                    <Form.Label>Term</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="By Term"
                        name="flashcardTerm"
                        onChange={(e) => setTerm(e.target.value)}
                        value={term}
                        disabled
                    />
                    <Form.Text className="text-muted">
                        Enter the term you want to search for
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formFlashcardTerm">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="By Name"
                        name="flashcardName"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <Form.Text className="text-muted">
                        Enter the definition you want to search by
                    </Form.Text>
                </Form.Group>
                <Alert
                    variant="success"
                    show={showSuccess}
                    onClose={() => setShowSuccess(false)}
                    dismissible
                >
                    <Alert.Heading>{successMessage}</Alert.Heading>
                </Alert>
                <Alert
                    variant="danger"
                    show={showError}
                    onClose={() => setShowError(false)}
                    dismissible
                >
                    <Alert.Heading>{errorMessage}</Alert.Heading>
                </Alert>
                <Button
                    variant="primary"
                    onClick={() => handleSubmit()}>
                    {isLoading ? 'Loading...' : 'Submit'}
                </Button>
                {finishedTest
                    ? <Button
                        variant="primary"
                        onClick={() => console.log("REDO!")}
                    >Restart <FontAwesomeIcon icon={faRedo} /></Button>
                    : ""
                }
            </Form>
            <br />
            { showProgress
                ?   <><ProgressBar>
                    <ProgressBar striped animated variant="success" now={correctAnswers} label={`${correctAnswers}%`} key={1}/>
                    <ProgressBar striped animated variant="danger" now={incorrectAnswers} label={`${incorrectAnswers}%`} key={2}/>
                    <ProgressBar striped animated variant="warning" now={pendingAnswers} label={`${pendingAnswers}%`} key={3}/>
                    </ProgressBar><br/></>
                : ""
            }
            <CardColumns>
                {cardsList.map(({ id, term, definition, colour }, index) => (
                    <Flashcard
                        key={index}
                        id={id}
                        term={term}
                        definition={definition}
                        testOption={testOption}
                        handleScoreUpdate={handleScoreUpdate}
                    />
                ))}
            </CardColumns>
        </div>
    )
}

export default FlashcardsTester