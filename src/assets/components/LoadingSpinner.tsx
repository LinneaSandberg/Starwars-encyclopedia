import Spinner from 'react-bootstrap/Spinner'

const LoadingSpinner = () => {
    return (
        <>
            <Spinner animation="grow" className='loading-spinner'>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </>
    )
}

export default LoadingSpinner;