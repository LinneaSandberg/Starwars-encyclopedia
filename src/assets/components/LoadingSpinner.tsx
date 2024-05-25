import Spinner from 'react-bootstrap/Spinner'

const LoadingSpinner = () => {
    return (
        <>
            <Spinner animation="grow" variant="warning" className='mt-2' />
        </>
    )
}

export default LoadingSpinner;