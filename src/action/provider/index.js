import * as ActionType from "./action-types";

export const getProviderList = () => ({
    type: ActionType.GET_PROVIDER_LIST,
    payload: {
        request: {
            url: `${process.env.NEXT_PUBLIC_API_URL}/v2/providers.json`,
            method: "get",
        }
    }
})

export const getProvider = (provider_name) => ({
    type: ActionType.GET_PROVIDER,
    payload: {
        request: {
            url: `${process.env.NEXT_PUBLIC_API_URL}/v2/${provider_name}.json`,
            method: "get"
        }
    }
})

