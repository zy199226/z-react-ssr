import React, { Component } from 'react';
import './c.sass';

class C extends Component {
    render() {
        return (
            <div>
                <div>
                    c
                </div>
                <img src={require('../../assets/1.png')} alt="123" />
            </div>
        );
    }
}

export default C;
