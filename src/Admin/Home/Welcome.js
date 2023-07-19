const Welcome = () => {
    return (
        <>
            <div className='welcome_box'>
                <h1 className="mb-4"><span className='d-block'>Hi John,</span> Welcome back!</h1>
                <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to
                    demonstrate the visual form of a document or a typeface without relying on meaningful content</p>
                <div className='illustrator_img text-center mb-4'>
                    <img src={require('../../assets/images/welcome_img.png')} alt="welcome" className='my-3' />
                </div>
                <div className='congo_box text-center'>
                    <div className='star_div d-inline-flex justify-content-center align-items-center'>
                        <i className='fa fa-star'></i>
                    </div>
                    <h2 className='text-white mt-4'>Congratulation John</h2>
                    <p className='text-white'>You have completed 75% of your profile. Your current progress is great.</p>
                    <button className='btn main_white_btn mt-2 bg-white'>View Profile</button>
                </div>
            </div>
        </>
    )
}
export default Welcome;