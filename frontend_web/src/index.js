import React from 'react';
import ReactDOM from 'react-dom'; // React 17
import { HashRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import theme from 'config/theme';
import { lang } from 'i18n';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
//
import { PersistGate } from "redux-persist/lib/integration/react";
import { Provider } from 'react-redux';
import { store, persistor } from 'store';
// 
import App from 'App';
//
// === React 17
ReactDOM.render(
<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <HashRouter basename="/">
            <ConfigProvider theme={theme} locale={lang==='en' ? enUS : zhCN}>
                    <App />
            </ConfigProvider>
        </HashRouter>
    </PersistGate>
</Provider>,
    document.getElementById('root')
);