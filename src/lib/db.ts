// Save a message to localstorage
export const saveMessage = async (id: string, message: any) => {
    return localStorage.setItem(id, JSON.stringify(message));
  };
  
  //Create new session for chat
  export const addChat = async (id: string) => {
    return localStorage.setItem(id, JSON.stringify([]));
  };
  
  // Retrieve all messages from local storage
  export const getMessages = async (id: string) => {
    return localStorage.getItem(id);
  };
  