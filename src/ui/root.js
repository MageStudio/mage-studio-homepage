import { Component } from 'inferno';
import { connect } from 'mage-engine';
import Blobs from './blobs';
import Footer from './footer';
import Header from './header';
import Hero from './hero';
import LoadingScreen from './LoadingScreen';

const MainContent = () => (
    <>
        <Header />
        <Blobs/>
        <Hero />
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

        return  (
            <>
                { loading && <LoadingScreen fading={fading} /> }
                <MainContent />
            </>
        );
    }
}

const mapStateToProps = ({ ui }) => ({
    ...ui
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Root);