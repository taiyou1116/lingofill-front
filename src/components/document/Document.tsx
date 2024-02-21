"use client"
import { useStore } from "@/store/store";
import TranslateDocument from "./TranslateDocument";
import ThreeWayToggle from "./ThreeWayToggle";
import SendDocumentDataButton from "./SendDocumentDataButton";
import { oswald } from "@/store/fontStore";
import InputDocument from "./InputDocument";
import PreviewDocument from "./PreviewDocument";
import { Skeleton, Typography } from "@mui/material";

function DocumentComponent() {

  const text = useStore((store) => store.document?.text);
  const words = text?.split(" ");

  const { document, selectedmode, isLoading } = useStore((store) => ({
    document: store.document,
    selectedmode: store.selectedmode,
    isLoading: store.isLoading,
  }));

  const renderContentByMode = () => {
    if (document === null) {
      return (
        <div>テキストを選択もしくは作成してください。</div>
      )
    }
    if (isLoading) {
      return (
        <Typography
            variant="h3"
            className=' w-full'
          >
            {<Skeleton />}
            {<Skeleton />}
            {<Skeleton />}
            {<Skeleton />}
            {<Skeleton />}
          </Typography>
      )
    }
    switch (selectedmode) {
      case 'edit':
        return (
          <TranslateDocument 
            words={words}
          />
        );
      case 'preview':
        return (
          <div className=" h-full">
            <PreviewDocument 
              words={words}
              translations={document.translations}
            />
          </div>
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
      <div className=" flex gap-3 items-center">
        <h1 className={` ${oswald.className}`}>{ document.title }</h1>
        <ThreeWayToggle />
        <SendDocumentDataButton />
      </div>
    )
  }

  return (
    <div className=" h-full p-5">
      { showToggle() }
      
      <div className=" h-full p-5">
      { renderContentByMode() }
      </div>
    </div>
  );
}

export default DocumentComponent