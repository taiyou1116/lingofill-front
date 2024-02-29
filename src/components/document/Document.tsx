"use client"
import { useStore } from "@/store/store";
import TranslateDocument from "./TranslateDocument";
import ThreeWayToggle from "./ThreeWayToggle";
import SendDocumentDataButton from "./SendDocumentDataButton";
import { oswald } from "@/store/fontStore";
import InputDocument from "./InputDocument";
import { Box, LinearProgress } from "@mui/material";

function DocumentComponent() {

  const text = useStore((store) => store.document?.text);
  const words = text?.split(" ");

  const { document, selectedmode, isLoading } = useStore((store) => ({
    document:     store.document,
    selectedmode: store.selectedmode,
    isLoading:    store.isLoading,
  }));

  const renderContentByMode = () => {
    if (document === null) {
      return (
        <div className=" dark:text-gray-300">テキストを選択もしくは作成してください。</div>
      )
    }
    if (isLoading) {
      return (
        <div className=" flex h-full items-center justify-center">
          <Box sx={{ width: '30%' }}>
            <LinearProgress />
          </Box>
        </div>
      )
    }
    switch (selectedmode) {
      case 'edit':
        return (
          <TranslateDocument 
            words={words}
          />
        );
      case 'input':
        return (
          <InputDocument />
        );
      default:
        return <div>不明なモードです。</div>;
    }
  }

  const showToggle = () => {
    if (document === null) {
      return;
    }
    return (
      <div className=" flex items-center justify-between">
        <div className=" flex gap-5 items-center">
          <h1 className={` dark:text-gray-100 text-xxs  ${oswald.className}`}>{ document.title }</h1>
          <ThreeWayToggle />
        </div>
        <SendDocumentDataButton />
      </div>
    )
  }

  return (
    <div className="h-full p-1 md:p-5 bg-gray-100 dark:bg-gray-800">
      { showToggle() }
      
      <div className=" h-5/6 pt-5">
      { renderContentByMode() }
      </div>
    </div>
  );
}

export default DocumentComponent