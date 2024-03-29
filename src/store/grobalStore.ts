import { useStore } from "./store";


export const GrobalStore = () => {
  const { 
    document, setDocument, 
    documents, setDocuments, 
    showSidebar, flipShowSidebar, 
    selectedWordsIndexes, setSelectedWordsIndexes,
    isLoading, setIsLoading, 
    username, setUsername, 
    isPlaying, setIsPlaying, 
    readingNumber, setReadingNumber,
  } = useStore(state => ({
    document: state.document,
    setDocument: state.setDocument,
    documents: state.documents,
    setDocuments: state.setDocuments,

    showSidebar: state.showSidebar,
    flipShowSidebar: state.flipShowSidebar,

    selectedWordsIndexes: state.selectedWordsIndexes,
    setSelectedWordsIndexes: state.setSelectedWordsIndexes,

    isLoading: state.isLoading,
    setIsLoading: state.setIsLoading,

    username: state.username,
    setUsername: state.setUsername,

    isPlaying: state.isPlaying,
    setIsPlaying: state.setIsPlaying,

    readingNumber: state.readingNumber,
    setReadingNumber: state.setReadingNumber,
  }));

  return { 
    document, setDocument, 
    documents, setDocuments, 
    showSidebar, flipShowSidebar, 
    selectedWordsIndexes, setSelectedWordsIndexes,
    isLoading, setIsLoading, 
    username, setUsername, 
    isPlaying, setIsPlaying, 
    readingNumber, setReadingNumber,
  };
}