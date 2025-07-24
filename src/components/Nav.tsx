export const NavbarComponent = () => {
  const username = localStorage.getItem("firstname"); // ดึงชื่อผู้ใช้

  return (
    <header className="bg-white border-b-2 border-gray-200 shadow sticky top-0 z-50">
      <nav className="flex items-center justify-between p-2 lg:px-4">
   
        <div className="flex lg:flex-1 text-xl font-bold text-gray-500">
          <div className="bg-gradient-to-r from-red-500 via-violet-500 to-sky-500 bg-clip-text text-transparent font-bold text-xl hover:scale-110">
                STORE Shop 
          </div>
        </div>

       
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-3">
     
          <div className="flex items-center gap-2">
            <span className={`text-sm font-semibold text-blue-400`}>
              {username}
            </span>
          </div>
     
          <button className="flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-red-600 duration-300 ease-in-out hover:cursor-pointer">
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};
