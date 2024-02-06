
const DataExport = ({data}:{data:object[]}) => {
  return (
    <div className="absolute top-0 left-0 w-full overflow-scroll h-full z-50 bg-white p-10 flex-wrap">

      <div className="drawer drawer-end">
  <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Page content here */}
    <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">Zkopírovat data</label>
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
   <p>Zkopírováno do schránky</p>
  </div>
</div>
      {JSON.stringify(data)}
      </div>
  )
}

export default DataExport