export default function TestDaisy() {
  return (
    <div className="p-6 max-w-sm mx-auto bg-base-200 rounded-xl shadow-md flex items-center space-x-4">
      <div className="flex-shrink-0">
        <button className="btn btn-primary">Click Me</button>
      </div>
      <div>
        <div className="text-xl font-medium text-primary">DaisyUI is working!</div>
        <p className="text-base-content opacity-70">This is a test component styled with DaisyUI.</p>
      </div>
    </div>
  )
}
