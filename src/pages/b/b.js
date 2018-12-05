import React, { Component } from 'react';
import { action } from 'mobx';
import { inject, observer } from 'mobx-react';
import './b.sass';

@inject('b') @observer
class B extends Component {
    @action static asyncData = store => Promise.all([
        store.b.req()
    ])

    componentDidMount() {
        const { b } = this.props;
        if (!b.obj.pic) {
            B.asyncData(this.props);
        }
    }

    ppp = () => {
        console.log(this.props);
    }

    render() {
        const { b } = this.props;

        return (
            <div>
                <button type="button" onClick={this.ppp}>b</button>
                <p>{b.obj.content}</p>
                <p>{b.obj.pic}</p>
                <img src={b.obj.pic} alt="pic" />
            </div>
        );
    }
}

export default B;
