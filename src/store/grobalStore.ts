import { useStore } from "./store";


export const GrobalStore = () => {
  const { 
    document, setDocument, 
    documents, setDocuments, 
    showCenterModal, flipCenterModal, 
    showSidebar, flipShowSidebar, 
    selectedWordsIndexes, setSelectedWordsIndexes,
    selectedMode, setSelectedMode, 
    isLoading, setIsLoading, 
    username, setUsername, 
    isPlaying, setIsPlaying, 
    readingNumber, setReadingNumber, 
    language, setLanguage,
    voiceType, setVoiceType, 
    voiceRate, setVoiceRate,
    translationExpression, setTranslationExpression,
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
    setUsername: state.setUsername,

    isPlaying: state.isPlaying,
    setIsPlaying: state.setIsPlaying,

    readingNumber: state.readingNumber,
    setReadingNumber: state.setReadingNumber,

    language: state.language,
    setLanguage: state.setLanguage,

    voiceType: state.voiceType,
    setVoiceType: state.setVoiceType,

    voiceRate: state.voiceRate,
    setVoiceRate: state.setVoiceRate,

    translationExpression: state.translationExpression,
    setTranslationExpression: state.setTranslationExpression,
  }));

  return { 
    document, setDocument, 
    documents, setDocuments, 
    showCenterModal, flipCenterModal, 
    showSidebar, flipShowSidebar, 
    selectedWordsIndexes, setSelectedWordsIndexes,
    selectedMode, setSelectedMode, 
    isLoading, setIsLoading, 
    username, setUsername, 
    isPlaying, setIsPlaying, 
    readingNumber, setReadingNumber, 
    language, setLanguage,
    voiceType, setVoiceType, 
    voiceRate, setVoiceRate,
    translationExpression, setTranslationExpression,
  };
}