const [file, setFile] = useState(null);

const handleFileChange = (e) => {
  setFile(e.target.files[0]);
};

const processCSV = async () => {
  if (!file) return alert("Pilih file CSV dulu");

  const text = await file.text(); // baca isi CSV
  const rows = text.split("\n").map(row => row.trim()).filter(r => r);
  
  for (let row of rows) {
    const [nama, harga] = row.split(",").map(c => c.trim());
    if (!nama || !harga) continue;

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama, harga: parseFloat(harga) }),
      });
    } catch (err) {
      console.error("Error kirim CSV:", err);
    }
  }

  setFile(null);
  alert("CSV diproses!");
};
