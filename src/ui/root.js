import { Component } from 'inferno';
import { connect } from 'mage-engine';
import Blobs from './blobs';
import Footer from './footer';
import Header from './header';
import Hero from './hero';
import LoadingScreen from './LoadingScreen';
import Speedometer from './Speedometer';

const MainContent = ({ speedometerVisible, car }) => (
    <>
        <Header />
        <Blobs/>
        <Hero />
        { speedometerVisible && <Speedometer car={car} /> }
        <Footer />
    </>
)

class Root extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fading: false,
            loading: props.loadingScreenVisible
        };
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
        const { loading, fading } = this.state;
        const { speedometerVisible, car } = this.props;

        return  (
            <>
                { loading && <LoadingScreen fading={fading} /> }
                <MainContent
                    car={car}
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