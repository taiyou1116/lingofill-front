export const handleStopPropagation = (e: any) => {
    e.stopPropagation();
};

export const handleCloseModal = (toggleFunction: () => void) => {
    toggleFunction();
};