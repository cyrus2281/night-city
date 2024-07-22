import { useNavigate } from "react-router-dom";
import Dialog from "../components/Dialog";
import "./Page.scss";
import ResumeMD from "../resume/README.md?raw";
import MarkdownRenderer from "../components/MarkdownRenderer";

function ResumeHeader() {
  return (
    <div className="page-header">Cyrus Mobini - Software Engineer</div>
  );
}

function Resume({ worldPath }: { worldPath: string }) {
  const navigate = useNavigate();

  const closePage = () => {
    navigate(worldPath, { replace: true });
  };

  return (
    <>
      <Dialog visibility header={<ResumeHeader />} onClose={closePage} closeOnDrop>
        <MarkdownRenderer markdown={ResumeMD} className="page-content" />
      </Dialog>
    </>
  );
}

export default Resume;
