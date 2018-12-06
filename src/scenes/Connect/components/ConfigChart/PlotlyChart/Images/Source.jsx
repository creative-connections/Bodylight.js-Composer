import React, { Component, Fragment } from 'react'
import { Input, Image } from 'semantic-ui-react'
import ButtonLink from '@components/ButtonLink'
import DropZone from '@components/DropZone'

class Source extends Component {
  constructor(props) {
    super(props)
    this.delete = this.delete.bind(this)
    this.upload = this.upload.bind(this)
  }

  delete(e) {
    this.props.onChange(e, { name: this.props.name, value: '' })
  }

  upload(files) {
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.props.onChange(null, { name: this.props.name, value: reader.result })
    }
    reader.readAsDataURL(file);
  }

  render() {
    const data = this.props.value.startsWith('data')
    const image = this.props.value !== ''

    return <Fragment>


      {image &&
        <Fragment>
          <Image src={this.props.value} fluid/>
          <ButtonLink onClick={this.delete}>{'remove'}</ButtonLink>
        </Fragment>
      }

      {image === false &&
        <DropZone display={true}
          className='dropzone'
          onDropAccepted={this.upload}
          description='Drop an image'
          />
      }

      {data === false &&
        <Fragment>
          <span style={{display:'block'}}>URL:</span>
          <Input
            name={this.props.name}
            value={this.props.value}
            onChange={this.props.onChange}
            />
        </Fragment>
      }
    </Fragment>
  }
}

export default Source