import ProgressBar from 'react-bootstrap/ProgressBar';
const Target = () => {
    return (
        <>
            <div className="white_box targetbox">
                <h3 className='mb-4'>Target</h3>
                <div className='mb-3 pb-3 views_target'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h5>Views</h5>
                        <h5>55%</h5>
                    </div>
                    <ProgressBar now={55} />
                </div>
                <div className='mb-3 pb-3 followers_target'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h5>Followers</h5>
                        <h5>75%</h5>
                    </div>
                    <ProgressBar now={50} variant="warning" />
                </div>
                <div className='pb-3 income_target'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h5>Income</h5>
                        <h5>65%</h5>
                    </div>
                    <ProgressBar now={65} variant="danger" />
                </div>
            </div>
        </>
    )
}
export default Target;