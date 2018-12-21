import React, { Component } from 'react';
import { Switch, Link, Route } from 'react-router-dom';
// import { action } from 'mobx';
// import { inject, observer } from 'mobx-react';
import 'normalize.css'; // 重置 css

import list2 from '../router/routes2';
import './app.sass';

// @inject('a') @observer
class App extends Component {
    // @action static asyncData = store => Promise.all([
    //     store.a.plus()
    // ])

    render() {
        return (
            <div>
                <ul>
                    <li>
                        <Link to="/aaa">
                            aaa
                        </Link>
                    </li>
                    <li>
                        <Link to="/bbb">
                            bbb
                        </Link>
                    </li>
                    <li>
                        <Link to="/ccc">
                            ccc
                        </Link>
                    </li>
                </ul>
                <Switch>
                    {list2.map(v => (<Route key={v.path} {...v} />))}
                </Switch>
            </div>
        );
    }
}

export default App;
