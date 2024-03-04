import { useStore } from "./store";


export const GrobaltStore = () => {
  const { 
    document, setDocument, documents, setDocuments, showCenterModal, flipCenterModal, showSidebar, flipShowSidebar, selectedWordsIndexes, setSelectedWordsIndexes,
    selectedMode, setSelectedMode, isLoading, setIsLoading, username, isPlaying, setIsPlaying,
  } = useStore(state => ({
    document: state.document,
    setDocument: state.setDocument,
    documents: state.documents,
    setDocuments: state.setDocuments,

    showCenterModal: state.showCenterModal,
    flipCenterModal: state.flipCenterModal,

    showSidebar: state.showSidebar,
    flipShowSidebar: state.flipShowSidebar,

    selectedWordsIndexes: state.selectedWordsIndexes,
    setSelectedWordsIndexes: state.setSelectedWordsIndexes,

    selectedMode: state.selectedmode,
    setSelectedMode: state.setSelectedMode,

    isLoading: state.isLoading,
    setIsLoading: state.setIsLoading,
    username: state.username,

    isPlaying: state.isPlaying,
    setIsPlaying: state.setIsPlaying,
  }));

  return { 
    document, setDocument, documents, setDocuments, showCenterModal, flipCenterModal, showSidebar, flipShowSidebar, selectedWordsIndexes, setSelectedWordsIndexes,
    selectedMode, setSelectedMode, isLoading, setIsLoading, username, isPlaying, setIsPlaying,
  };
}