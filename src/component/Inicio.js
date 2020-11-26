import React, { Fragment } from 'react';
import styled from '@emotion/styled'
import video from '../imagenes/video.mp4'

const Video = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 80vh;
`;

const Login = () => {
    return (
        <Fragment>
                <Video className='mt-1'>
                    <iframe width="560" height="315" src={video} title='video'></iframe>
                </Video>
                <footer>
                    <div className="container  text-white text-center ">
                        <a href="https://twitter.com/">
                            <i className="fab fa-twitter text-white  "></i>
                        </a>
                        
                        <a href="https://www.instagram.com/">
                            <i className="fab fa-instagram text-white mr-2 ml-2"></i>
                        </a>
                        
                    
                        <a href="https://www.facebook.com/">
                            <i className="fab fa-facebook-f  text-white ml-1 "></i>
                        </a>
                    </div>
                </footer>
        </Fragment>
       
    )
}

export default Login
