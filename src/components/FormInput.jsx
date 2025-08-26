function FormInput({ namaBarang, setNamaBarang, harga, setHarga, addItem }) {
  return (
    <form onSubmit={addItem} className="form-input">
      <input
        type="text"
        placeholder="Nama Barang"
        value={namaBarang}
        onChange={(e) => setNamaBarang(e.target.value)}
      />
      <input
        type="number"
        placeholder="Harga"
        value={harga}
        onChange={(e) => setHarga(e.target.value)}
      />
      <button type="submit">Tambah</button>
    </form>
  );
}

export default FormInput;
