import React from 'react';
import {Spin} from 'antd';
// import {Row, Col, Spin} from 'antd';

const centeringContainerStyle = {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

const Loading: React.FC = () => {
    return (
        // <Spin fullscreen tip="Loading..." size="large" />

        // <Row justify="center" align="middle" style={{height: '100vh', width: '100%'} as React.CSSProperties}>
        //     <Col style={{textAlign: 'center'} as React.CSSProperties}>
        //         <Spin size="large" tip="Loading" style={{minWidth: '200px'} as React.CSSProperties}>
        //             <div style={{ height: '80px' }}/>
        //         </Spin>
        //     </Col>
        // </Row>

        <div style={centeringContainerStyle}>
            <Spin size="large" tip="Loading">
                <div style={{ width: '100px', height: '100px' }}/>
            </Spin>
        </div>
    );
};

export default Loading;