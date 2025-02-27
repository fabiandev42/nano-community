import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { List } from 'immutable'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

import Post from '@components/post'
import { Post as PostRecord } from '@core/posts'

import './posts.styl'

export default class Posts extends React.Component {
  constructor(props) {
    super(props)
    this.state = { age: props.age }
  }

  handleChange = (e, value) => {
    this.setState({ age: value })
    this.props.getPosts(this.props.id, { age: value })
  }

  componentDidMount() {
    const { age } = this.state
    this.props.getPosts(this.props.id, { age })
  }

  render() {
    const { title, posts } = this.props

    let skeletons = new List()
    if (!posts.size) {
      skeletons = skeletons.push(new PostRecord())
      skeletons = skeletons.push(new PostRecord())
      skeletons = skeletons.push(new PostRecord())
    }

    const items = (posts.size ? posts : skeletons).map((p, k) => (
      <Post key={k} post={p} />
    ))

    return (
      <>
        <div className='posts__header'>
          <div className='posts__heading'>
            <span>{title}</span>
          </div>
          {this.props.id === 'top' && (
            <ToggleButtonGroup
              value={this.state.age}
              exclusive
              onChange={this.handleChange}
              aria-label='age'
              className='posts__age'>
              <ToggleButton value={72}>3D</ToggleButton>
              <ToggleButton value={168}>7D</ToggleButton>
              <ToggleButton value={720}>1M</ToggleButton>
            </ToggleButtonGroup>
          )}
        </div>
        <div className='posts__body'>{items}</div>
      </>
    )
  }
}

Posts.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  posts: ImmutablePropTypes.list,
  getPosts: PropTypes.func
}
