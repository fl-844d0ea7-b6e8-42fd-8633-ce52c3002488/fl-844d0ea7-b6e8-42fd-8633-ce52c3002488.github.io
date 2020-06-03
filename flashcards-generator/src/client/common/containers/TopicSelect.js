import { connect } from 'react-redux'
import TopicSelect from '../TopicSelect'

const mapStateToProps = state => {
  console.log('common/containers mapStateToProps => ', state)
  return {
    topics: state.topics.items
  }
}

export default connect(mapStateToProps)(TopicSelect)