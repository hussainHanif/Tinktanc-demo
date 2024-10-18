// store/localStorage.js

// Function to save auth state to localStorage
export const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('auth', serializedState);
    } catch (e) {
      console.error("Could not save state", e);
    }
  };
  
  // Function to load auth state from localStorage
  export const loadState = () => {
    try {
      const serializedState = localStorage.getItem('auth');
      if (serializedState === null) {
        return undefined; // No previous state found
      }
      return JSON.parse(serializedState); // Return parsed state
    } catch (e) {
      console.error("Could not load state", e);
      return undefined; // Return undefined in case of error
    }
  };
  