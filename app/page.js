import Image from 'next/image'

export default function Home() {
  return (
    <div className='flex h-screen'>
    <div className='flex-1 bg-red-800 text-gray-800 flex items-center justify-center'>
      Map
    </div>
    <div className='flex-1 bg-red-300 text-gray-800 flex items-center justify-center'>
      Start
    </div>
  </div>
  
  );
}
