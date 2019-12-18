import {setStateQueue} from "./setState";
class Component {
    constructor(props = {}) {
        this.props = props
        this.state = {}
    }

    setState(state) {
        // Object.assign(this.state, state)
        // renderComponent(this)
        setStateQueue(state, this)
    }
}
export default Component