import { Component } from "inferno";
import { math } from "mage-engine";

export class Speedometer extends Component {

    constructor(props) {
        super(props);
        this.state = { value: 0 };
    }

    componentDidMount() {
        const { car } = this.props;

        setInterval(() => {
            const { speed } = car.getPhysicsState();
            const value = math.clamp(speed, 0, speed);

            this.setState({ value: Math.floor(value) })
        }, 250);
    }

    render() {
        return (
            <span ref={this.element} className='speedometer'>{ this.state.value }</span>
        )
    }
}

export default Speedometer;