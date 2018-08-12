import React from 'react';
import { css } from 'react-emotion';
// First way to import
import { RingLoader } from 'react-spinners';
// Another way to import
// import RingLoader from 'react-spinners/RingLoader';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class AwesomeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }
    render() {
        return (
            <div className='sweet-loading'>
                <RingLoader
                    className={override}
                    sizeUnit={"px"}
                    size={150}
                    color={'#123abc'}
                    loading={this.state.loading}
                />
            </div>
        )
    }
}


export default AwesomeComponent;
