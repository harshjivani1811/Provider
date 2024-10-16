import * as ActionTypes from "../../action/provider/action-types"

const INITIAL_STATES = {
    providers: []
}

const providerStateManager = (state=INITIAL_STATES, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default providerStateManager;