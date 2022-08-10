import { Component } from 'inferno';
import { connect, Scripts } from 'mage-engine';
import Blobs from './blobs';
import Footer from './footer';
import Header from './header';
import Hero from './hero';
import LoadingScreen from './LoadingScreen';
import CarControls from './carcontrols';

import { playEngineSound } from '../levels/Main/sounds';

const MainContent = (props) => (
    <>
        <Header />
        <Blobs/>
        <Hero />
        <CarControls { ...props } />
        <Footer />
    </>
)

class Root extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fading: false,
            loading: props.loadingScreenVisible,
            engineStarted: false
        };

        this.handleEngineStartClick = this.handleEngineStartClick.bind(this);
    }

    handleEngineStartClick() {
        const { car } = this.props;

        if (!this.state.engineStarted) {
            car.getScript(Scripts.BUILTIN.BASECAR).startEngine();
            playEngineSound(.4).then(audio => car.addScript('CarEngineAudio', { audio }));
    
            this.setState({ engineStarted: true });
        }

    }

    componentDidUpdate(prevProps) {
        if (prevProps.loadingScreenVisible && !this.props.loadingScreenVisible) {
            setTimeout(() => {
                this.setState({
                    fading: true
                })
            }, 2000);

            setTimeout(() => {
                this.setState({ fading: false, loading: false })
            }, 3200);
        }
    }

    render() {
        const { loading, fading, engineStarted } = this.state;
        const { speedometerVisible, car } = this.props;

        return  (
            <>
                { loading && <LoadingScreen fading={fading} /> }
                <MainContent
                    car={car}
                    engineStarted={engineStarted}
                    onEngineStartClick={this.handleEngineStartClick}
                    speedometerVisible={speedometerVisible} />
            </>
        );
    }
}

const mapStateToProps = ({ ui, track }) => ({
    ...ui,
    ...track
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Root);