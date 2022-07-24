import { connect } from 'mage-engine';
import Blobs from './blobs';
import Footer from './footer';
import Header from './header';
import Hero from './hero';

const Root = ({ loadingScreenVisible, tileStats, energy, selection, option, onOptionClick }) => (
    // loadingScreenVisible ?
    //     <LoadingScreen/> :
    //     <Game
    //         option={option}
    //         tileStats={tileStats}
    //         energy={energy}
    //         selection={selection}
    //         onOptionClick={onOptionClick}/>
    <>
        <Header />
        <Blobs/>
        <Hero />
        <Footer />
    </>
);

const mapStateToProps = ({}) => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);