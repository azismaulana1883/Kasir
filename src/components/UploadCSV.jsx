import { useState } from "react";
import "..//css/UploadCSV.css"; // File CSS untuk styling

function UploadCSV({ onUploadSuccess }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");

  const processCSV = async (csvContent) => {
    setIsProcessing(true);
    setMessage("Memproses data...");
    
    try {
      // Parse CSV content
      const lines = csvContent.split("\n");
      const items = [];
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        // Parse CSV line with quoted values
        const match = line.match(/"(.*?)",\s*"([\d.,]+)"/);
        if (match && match.length === 3) {
          const nama = match[1].trim();
          // Convert harga string to number (remove dots, replace comma with dot)
          const hargaString = match[2].replace(/\./g, "").replace(",", ".");
          const harga = parseFloat(hargaString);
          
          if (nama && !isNaN(harga)) {
            items.push({ nama, harga });
          }
        }
      }
      
      // Send items to API
      let successCount = 0;
      let errorCount = 0;
      
      for (const item of items) {
        try {
          const response = await fetch("http://192.168.100.13:5000/api/belanja", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
          });
          
          if (response.ok) {
            successCount++;
          } else {
            errorCount++;
          }
        } catch (error) {
          errorCount++;
          console.error("Error mengirim item:", error);
        }
      }
      
      setMessage(`Berhasil mengimpor ${successCount} item. ${errorCount > 0 ? `${errorCount} item gagal.` : ""}`);
      
      if (onUploadSuccess && successCount > 0) {
        onUploadSuccess();
      }
    } catch (error) {
      console.error("Error processing CSV:", error);
      setMessage("Terjadi kesalahan saat memproses file CSV.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      processCSV(content);
    };
    reader.readAsText(file);
  };

  return (
    <div className="upload-csv-container">
      <div className="upload-section">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          disabled={isProcessing}
          className="file-input"
        />
        {isProcessing && <div className="processing">Memproses...</div>}
        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
}

export default UploadCSV;