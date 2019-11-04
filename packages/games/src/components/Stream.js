import React, { Component } from 'react'
import { observer } from 'mobx-react'
import langs from 'langs'
import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { StoreContext } from '../store/context'
import { withStoreContext } from '../utils/hoc'

@observer
class Stream extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    console.info('render Stream')

    const {
      streamsStore,
      stream: { title, thumbnailUrl, viewerCount, userName, language }
    } = this.props

    const picUrl = thumbnailUrl.replace('{width}', 210).replace('{height}', 125)

    const style = { width: '210px', cursor: 'pointer' }

    const lang = langs.where('1', language).local

    return (
      <Card onClick={this.onShow} as='li' style={style} className='mb-3'>
        <Card.Img src={picUrl} alt={title} variant='top' />
        <Card.Body>
          <Card.Title style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{userName} <Badge variant='light'>{lang}</Badge></Card.Subtitle>
        </Card.Body>
        <Card.Footer className="text-muted">
          <ProgressBar label={viewerCount} now={viewerCount} max={streamsStore.maxViewer.viewerCount} min='0' variant="info" />
        </Card.Footer>
      </Card>
    )
  }

  onShow = () => {
    this.props.viewStore.playGamePlaying(this.props.stream.userName)
  }
}

export default withStoreContext(StoreContext)(Stream)
