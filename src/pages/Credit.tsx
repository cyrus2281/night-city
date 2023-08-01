import { useNavigate } from "react-router-dom";
import Dialog from "../components/Dialog";
import "./Page.scss";
import creditMD from "./Credit.md?raw";
import MarkdownRenderer from "../components/MarkdownRenderer";

function CreditHeader() {
  return (
    <div className="page-header">Giving Credits Where Credits Are Due</div>
  );
}

function Credit({ worldPath }: { worldPath: string }) {
  const navigate = useNavigate();

  const closePage = () => {
    navigate(worldPath, { replace: true });
  };

  return (
    <>
      <Dialog visibility header={<CreditHeader />} onClose={closePage}>
        <MarkdownRenderer markdown={creditMD} className="page-content" />
      </Dialog>
    </>
  );
}

export default Credit;
