import React, { Component } from 'react';
import { action } from 'mobx';
import { inject, observer } from 'mobx-react';
import './a.sass';

@inject('a') @observer
class A extends Component {
    @action static asyncData = store => Promise.all([
        store.a.plus()
    ])

    constructor(props) {
        super(props);
        this.store = props.a;
    }

    render() {
        const { num, minus, plus } = this.store;

        return (
            <div>
                <div>{num}</div>
                <button type="button" onClick={minus}>-</button>
                <button type="button" onClick={plus}>+</button>
            </div>
        );
    }
}

export default A;
