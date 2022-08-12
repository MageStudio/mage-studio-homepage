
const getLoadingScreenClassname = (fading) => `loading-container ${fading ? 'fading' : ''}`; 

const LoadingScreen = ({ fading = false }) => (
    <div className={getLoadingScreenClassname(fading)}>
        <div className="svg-wrapper">
            <svg height="60" width="500" xmlns="http://www.w3.org/2000/svg">
                <rect className="shape1" height="60" width="500" />
                <rect className="shape2" height="60" width="500" />
            </svg>
        </div>
    </div>
    
);

export default LoadingScreen;