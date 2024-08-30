function indexRows<T>(table: T[]) {
  return table.map((value, index) => ({ ...value, index: index }));
}

export default indexRows;
