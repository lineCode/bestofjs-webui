import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import TagFilter from '../components/home/TagFilter'
import populate from '../helpers/populate'
import log from '../helpers/log'
import * as uiActionCreators from '../actions/uiActions'

const TagFilterPage = React.createClass({

  shouldComponentUpdate(nextProps) {
    // `shouldComponentUpdate` has been implemented to avoid
    // rendering the page twice when browsing tags.
    if (!nextProps.tag) return false
    const sameUi = Object.keys(nextProps.ui).
      every(key => this.props.ui[key] === nextProps.ui[key])
    return nextProps.tag.id !== this.props.tag.id || !sameUi
  },

  render() {
    log('Render the <TagFilterPage> container', this.props)
    const { tagProjects, tag, isLoggedin, uiActions, ui } = this.props
    return (
      <TagFilter
        projects = { tagProjects }
        tag = { tag }
        maxStars = { tagProjects.length > 0 ? tagProjects[0].stars : 0 }
        isLoggedin = { isLoggedin }
        ui={ui}
        uiActions={uiActions}
      />
    )
  }

})

function mapStateToProps(state, props) {
  const {
    entities: { projects, tags, links },
    githubProjects,
    auth: {
      username
    },
    ui
  } = state

  const tagId = props.params.id

  const tagProjects = githubProjects[ui.starFilter]
    .map(id => projects[id])
    .filter(project => project.tags.indexOf(tagId) > -1)
    .slice(0, 50)
    .map(populate(tags, links))

  return {
    tagProjects,
    tag: tags[tagId],
    isLoggedin: username !== '',
    ui
  }
}

function mapDispatchToProps(dispatch) {
  return {
    uiActions: bindActionCreators(uiActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagFilterPage)
