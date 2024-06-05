export const handleMoreButtonClick = (
  buttonId: string,
  setPopupContent: React.Dispatch<React.SetStateAction<string[]>>,
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentCommentId?: React.Dispatch<React.SetStateAction<string | null>>,
  commentId?: string
) => {
  switch (buttonId) {
    case "comment":
      setPopupContent(["Delete", "Cancel"]);
      if (setCurrentCommentId && commentId) {
        setCurrentCommentId(commentId);
      }

      break;
    case "post":
      setPopupContent(["Share", "Report", "Cancel"]);
      break;
    default:
      setPopupContent([]);
  }
  setIsPopupOpen(true);
};
