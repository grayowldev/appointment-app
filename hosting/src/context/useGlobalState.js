import React, {useState} from 'react'

function useGlobalState() {
    const [state, setState] = useState({value: '', list: []});

    const actions = (action) => {
        const {type, payload} = action;
        switch (type) {
            case 'setState':
                return setState(payload);
            default:
                return state;
        }
    }
    return {state, actions}
}

export default useGlobalState
