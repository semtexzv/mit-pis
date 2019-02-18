import React from 'react'
import ReactDom from 'react-dom'
import App from 'App'

const rootElement = document.getElementById('root')
if (!rootElement) document.write('Missing root element <div id="root"></div>')

ReactDom.render(<App />, rootElement)

/* remove loader */
var loader = document.getElementById('app-loader-container')
document.body.removeChild(loader)
