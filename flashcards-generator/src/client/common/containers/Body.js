import { connect } from 'react-redux'
import { getTopicsFromAPI } from '../../manage/actions/creators'
import Body from '../Body'

const mapDispatchToProps = dispatch => {
  return {
    loadTopics: () => {
      dispatch(getTopicsFromAPI())
    }
  }
}

export default connect(null, mapDispatchToProps)(Body)