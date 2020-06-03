import { connect } from 'react-redux'
import { getTopicsFromAPI } from '../../manage/actions/creators'

import FlashcardCreator from '../FlashcardCreator'

const mapDispatchToProps = dispatch => ({
  loadTopics: () => dispatch(getTopicsFromAPI())
})

export default connect(null, mapDispatchToProps)(FlashcardCreator)