import { init } from "@rematch/core";
import storage from "redux-persist/lib/storage";
import createPersistPlugin from "@rematch/persist";
import { getPersistor } from "@rematch/persist";
// 
const auths = {
    state: {}, 
    reducers: {
        AUT(state, payload) {
            return { ...state, ...payload }
        },
        DEL(state, payload) {
            storage.removeItem('persist:root');
            return {undefined, payload}
        }
    }
};
// 
const models = {
    state: {}, 
    reducers: {
        SET(state, payload) {
            return { ...state, ...payload }
        }
    }
};
// 
const persistPlugin = createPersistPlugin({
	key: 'root',
	storage,
	version: 2,
	whitelist: ['auths']
})
// 
const store = init({ 
    models: {
        auths, 
        models
    },
    plugins: [persistPlugin]
    
});
// 
const persistor = getPersistor();
// 
export{
    store,
    persistor
}