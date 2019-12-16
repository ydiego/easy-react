import React from './react/index'
import ReactDom from './react-dom'

const el = (
    <div className="title" style={{marginTop: '10rem'}}>
        <h2>title</h2>
        <h3>body
            <div>content</div>
        </h3>
    </div>
)
ReactDom.render(el, document.getElementById('app'))
