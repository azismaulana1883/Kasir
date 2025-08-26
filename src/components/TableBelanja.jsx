function TableBelanja({ items, deleteItem }) {
  return (
    <table className="table-belanja">
      <thead>
        <tr>
          <th>No</th>
          <th>Nama Barang</th>
          <th>Harga</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {items.length === 0 ? (
          <tr>
            <td colSpan={4} style={{ textAlign: "center" }}>
              Belum ada catatan
            </td>
          </tr>
        ) : (
          items.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.nama}</td>
              <td>Rp {item.harga.toLocaleString()}</td>
              <td>
                <button onClick={() => deleteItem(item.id)}>Hapus</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default TableBelanja;
