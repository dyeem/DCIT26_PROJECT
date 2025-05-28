import { useEffect } from 'react';
export default function ProductList() {
  useEffect(() => {
    document.title = "Loop | Mange Products";
  }, []);
  return (
    <div className="flex items-center justify-center w-full p-4 font-roboto">
      <div className="ml-[15rem] mt-[7rem] max-w-9xl flex flex-col justify-center items-center">
        
      </div>
    </div>
  )
}
