import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import FormInput from "./components/FormInput";
import TableBelanja from "./components/TableBelanja";
import UploadCSV from "./components/UploadCSV";
import SearchBox from "./components/SearchBox";
import "./css/Kasir.css";

function Kasir() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [namaBarang, setNamaBarang] = useState("");
  const [harga, setHarga] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  // const API_URL = "https://blueswift.onpella.app/:5000/api/belanja";
  // const SOCKET_URL = "https://blueswift.onpella.app/:5000";
  const API_URL = "https://blueswift.onpella.app/api/belanja";
  const SOCKET_URL = "https://blueswift.onpella.app";


  useEffect(() => {
    const socket = io(SOCKET_URL);
    socket.on("updateBelanja", (data) => {
      setItems(data);
      setFilteredItems(data);
    });
    
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredItems(items);
    } else {
      const filtered = items.filter(item =>
        item.nama.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [searchTerm, items]);

  const addItem = async (e) => {
    e.preventDefault();
    if (!namaBarang || !harga) return;
    
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nama: namaBarang,
          harga: parseFloat(harga)
        }),
      });
      setNamaBarang("");
      setHarga("");
    } catch (err) {
      console.error("Error tambah item:", err);
    }
  };

  const deleteItem = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });
    } catch (err) {
      console.error("Error hapus item:", err);
    }
  };

  const refreshData = () => {
    console.log("Data berhasil diimpor");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="kasir-container">
      <h2>📋 Daftar Harga</h2>
      
      <UploadCSV onUploadSuccess={refreshData} />
      
      <SearchBox 
        searchTerm={searchTerm}
        onSearchChange={handleSearch}
        onClearSearch={clearSearch}
        resultsCount={filteredItems.length}
        totalCount={items.length}
      />
      
      <FormInput 
        namaBarang={namaBarang}
        setNamaBarang={setNamaBarang}
        harga={harga}
        setHarga={setHarga}
        addItem={addItem}
      />
      
      <TableBelanja 
        items={filteredItems} 
        deleteItem={deleteItem}
        searchTerm={searchTerm}
      />
    </div>
  );
}

export default Kasir;