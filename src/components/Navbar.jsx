import {Upload, Download, MapIcon} from "lucide-react";
import { useRef } from "react";
import exportData from "../utils/exportData.js";
import importData from "../utils/importData.js";
import {getNextMessageId} from "../data/mockData.js";

export function Navbar({ nodes, edges, setEdges, setNodes, setMessages }) {
  const fileInputRef = useRef(null);

  const handleExportClick = () => {
    exportData(nodes, edges);
  };

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const {nodes, edges} = await importData(file);
        setNodes(nodes);
        setEdges(edges);
        setMessages(prev => [...prev, { id: getNextMessageId(), type: "info", text: "Data was imported successfully!" }]);
      } catch (error) {
        console.error('Import failed:', error);
        setMessages(prev => [...prev, { id: getNextMessageId(), type: "error", text: "Import failed for the following error: "+ error.message }]);
      }
    }
  };

  return (
    <nav className="z-10 fixed top-0 left-0 w-full flex items-center justify-between border-b-1 border-b-neutral-700 bg-neutral-950 shadow-sm px-4 py-2 h-12">

      <div className="flex items-center space-x-4">
        <div className="gap-1 h-6  rounded-lg flex items-center justify-center ">
          <MapIcon size={25} />
          <span className={"font-sans font-semibold"}>street map builder</span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1.5">
          <button
            onClick={handleImportClick}
            className="cursor-pointer flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-gray-200 px-3 py-0.5 rounded-md text-sm font-medium transition-colors"
          >
            <Download size={15} />
            <span>Import</span>
          </button>

          <button
            onClick={handleExportClick}
            className="cursor-pointer flex items-center space-x-2 bg-gray-600  hover:bg-gray-700 text-gray-200 px-3 py-0.5 rounded-md text-sm font-medium transition-colors"
          >
            <Upload size={15} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Hidden file input for import */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".json"
        onChange={handleFileChange}
      />
    </nav>
  );
}

export default Navbar;