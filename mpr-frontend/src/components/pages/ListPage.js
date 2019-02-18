import React, { PureComponent } from 'react'
import PageWrapper from 'containers/common/PageWrapper'

/**
* standard page with one List for one entity
*/

export default class ListPage extends PureComponent {
  render() {
    const {title, heading, renderListComponent} = this.props
    return (
      <PageWrapper title={title} heading={heading}>
        {renderListComponent()}
      </PageWrapper>
    )
  }
}
