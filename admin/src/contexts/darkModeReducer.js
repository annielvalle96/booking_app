const DarkModeReducer = (state, action) => {
  const {
    type: actionType
    // payload: actionPayload
  } = action

  switch (actionType) {
    case 'LIGHT': {
      return {
        darkMode: false
      }
    }
    case 'DARK': {
      return {
        darkMode: true
      }
    }
    case 'TOGGLE': {
      return {
        darkMode: !state.darkMode
      }
    }
    default:
      return state
  }
}

export default DarkModeReducer
