import { connect } from 'react-redux'

import Footer from './Footer'
import { fetchProjects } from '../../actions/entitiesActions'

function mapStateToProps(state) {
  const {
    entities: {
      meta: { lastUpdate }
    }
  } = state
  return {
    lastUpdate
  }
}

const mapDispatch = { fetchProjects }

export default connect(
  mapStateToProps,
  mapDispatch
)(Footer)
