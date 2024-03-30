
import { useStore } from "./store";

export const GrobalStore = () => {
  const { 
    username, setUsername, 
    showSidebar, flipShowSidebar, 
    document, setDocument, 
    documents, setDocuments, 

  } = useStore(state => ({
    username: state.username,
    setUsername: state.setUsername,

    showSidebar: state.showSidebar,
    flipShowSidebar: state.flipShowSidebar,

    document: state.document,
    setDocument: state.setDocument,
    
    documents: state.documents,
    setDocuments: state.setDocuments,
  }));

  return { 
    username, setUsername, 
    showSidebar, flipShowSidebar, 
    document, setDocument, 
    documents, setDocuments, 
  };
}