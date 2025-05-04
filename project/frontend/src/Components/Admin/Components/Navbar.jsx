import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="z-50 w-60 fixed h-screen p-10 bg-[#faf9f9] font-semibold shadow-md">
      <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col items gap-y-8">
                <p className="text-[#7E62FF] text-4xl mb-14 font-bold font-playfair">Loop</p>
                <div className="flex flex-row items-center gap-x-2">
                    <svg fill="#7E62FF" width="35" height="35" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="dashboard" class="icon glyph"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><rect x="2" y="2" width="9" height="11" rx="2"></rect><rect x="13" y="2" width="9" height="7" rx="2"></rect><rect x="2" y="15" width="9" height="7" rx="2"></rect><rect x="13" y="11" width="9" height="11" rx="2"></rect></g></svg>
                        <p className=" text-gray-700">
                            <NavLink
                                to="/admin/dashboard"
                                className={({ isActive }) =>
                                isActive ? "text-[#7E62FF]" : "text-gray-700"}
                            > 
                                Overview
                            </NavLink>
                        </p>
                </div>
                <div className="flex flex-row items-center gap-x-2">
                    <svg viewBox="0 0 24 24" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.0287 2.53961C11.6327 2.20402 12.3672 2.20402 12.9713 2.5396L20.4856 6.71425C20.8031 6.89062 21 7.22524 21 7.5884V15.8232C21 16.5495 20.6062 17.2188 19.9713 17.5715L12.9713 21.4604C12.3672 21.796 11.6327 21.796 11.0287 21.4604L4.02871 17.5715C3.39378 17.2188 3 16.5495 3 15.8232V7.5884C3 7.22524 3.19689 6.89062 3.51436 6.71425L11.0287 2.53961Z" stroke="#7E62FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M7.5 4.5L16.5 9.5V13" stroke="#7E62FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 12.3281L9 14" stroke="#7E62FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M3 7L12 12M12 12L21 7M12 12V21.5" stroke="#7E62FF" stroke-width="2" stroke-linejoin="round"></path> </g></svg>
                    <p className="text text-gray-700">
                        <NavLink
                            to="/admin/manage-product"
                            className={({ isActive }) =>
                            isActive ? "text-[#7E62FF]" : "text-gray-700"}
                        > 
                            Products
                        </NavLink>
                    </p>
                </div>
                <div className="flex flex-row items-center gap-x-2">
                    <svg fill="#7E62FF" viewBox="0 -64 640 640" width="35" height="35" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"></path></g></svg>
                    <p className="text text-gray-700">
                        <NavLink
                            to="/admin/manage-user"
                            className={({ isActive }) =>
                            isActive ? "text-[#7E62FF]" : "text-gray-700"}
                        > 
                            Users
                        </NavLink>
                    </p>
                </div>
                <div className="flex flex-row items-center gap-x-2">
                    <svg viewBox="0 0 24 24" width="35" height="35" xmlns="http://www.w3.org/2000/svg" id="store" class="icon glyph" fill="#7E62FF"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M20,14.81V20a2,2,0,0,1-2,2H6a2,2,0,0,1-2-2V14.81A4.25,4.25,0,0,0,5.25,15a4.3,4.3,0,0,0,2.25-.64,4.28,4.28,0,0,0,4.5,0,4.28,4.28,0,0,0,4.5,0,4.3,4.3,0,0,0,2.25.64A4.25,4.25,0,0,0,20,14.81ZM21.76,9,20.17,3.45A2,2,0,0,0,18.25,2H5.75A2,2,0,0,0,3.83,3.45L2.24,9A6.48,6.48,0,0,0,2,10.75a3.25,3.25,0,0,0,5.5,2.34,3.24,3.24,0,0,0,4.5,0,3.24,3.24,0,0,0,4.5,0A3.25,3.25,0,0,0,22,10.75,6.48,6.48,0,0,0,21.76,9Z" className="fill:#7E62FF"></path></g></svg>
                        <p className="text text-gray-700">
                            <NavLink
                                to="orders"
                                className={({ isActive }) =>
                                isActive ? "text-[#7E62FF]" : "text-gray-700"}
                            >
                                Orders
                            </NavLink>
                        </p>
                </div>
                <div className="flex flex-row items-center gap-x-2">
                    <svg version="1.1" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32.00 32.00" width="35" height="35" xml:space="preserve" fill="#7E62FF" stroke="#7E62FF" stroke-width="0.48"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.064"></g><g id="SVGRepo_iconCarrier">  <path class="feather_een fill:#7E62FF" d="M8,10.5L8,10.5C8,10.224,8.224,10,8.5,10h3c0.276,0,0.5,0.224,0.5,0.5v0c0,0.276-0.224,0.5-0.5,0.5h-3 C8.224,11,8,10.776,8,10.5z M8.5,13h3c0.276,0,0.5-0.224,0.5-0.5v0c0-0.276-0.224-0.5-0.5-0.5h-3C8.224,12,8,12.224,8,12.5v0 C8,12.776,8.224,13,8.5,13z M30,8v18c0,1.657-1.343,3-3,3H5c-1.657,0-3-1.343-3-3V8c0-1.657,1.343-3,3-3c0,0,0.448-1,1-1h3.092 C9.299,3.419,9.849,3,10.5,3s1.201,0.419,1.408,1H14c0.552,0,1,0.448,1,1h12C28.657,5,30,6.343,30,8z M6,15h8V5h-2v2.5 c0,0.892-0.783,1.605-1.697,1.487C9.547,8.89,9,8.21,9,7.448V7.25c0-0.276,0.224-0.5,0.5-0.5h0c0.276,0,0.5,0.224,0.5,0.5V7.5 c0,0.303,0.271,0.544,0.584,0.493C10.83,7.953,11,7.721,11,7.472L11,5H6V15z M28.976,26.242C28.447,26.708,27.76,27,27,27H5 c-0.76,0-1.447-0.292-1.976-0.758C3.145,27.231,3.978,28,5,28h22C28.022,28,28.855,27.231,28.976,26.242z M29,8c0-1.105-0.895-2-2-2 H15v9c0,0.552-0.448,1-1,1H6c-0.552,0-1-0.448-1-1l0-9C3.895,6,3,6.895,3,8v16c0,1.105,0.895,2,2,2h22c1.105,0,2-0.895,2-2V8z M26.691,14.038C26.63,14.013,26.565,14,26.5,14h-4c-0.276,0-0.5,0.224-0.5,0.5s0.224,0.5,0.5,0.5h2.793l-3,3h-1.586l-1.854-1.854 c-0.195-0.195-0.512-0.195-0.707,0L15.293,19H11.5c-0.133,0-0.26,0.053-0.354,0.146L8.293,22H5.5C5.224,22,5,22.224,5,22.5 S5.224,23,5.5,23h3c0.133,0,0.26-0.053,0.354-0.146L11.707,20H15.5c0.133,0,0.26-0.053,0.354-0.146l2.646-2.646l1.646,1.646 C20.24,18.947,20.367,19,20.5,19h2c0.133,0,0.26-0.053,0.354-0.146L26,15.707V18.5c0,0.276,0.224,0.5,0.5,0.5s0.5-0.224,0.5-0.5v-4 c0-0.065-0.013-0.13-0.038-0.191C26.911,14.187,26.813,14.089,26.691,14.038z"></path> </g></svg>
                    <p className="text text-gray-700">
                        <NavLink
                            to="reports"
                            className={({ isActive }) =>
                            isActive ? "text-[#7E62FF]" : "text-gray-700"}
                        >
                            Reports
                        </NavLink>
                    </p>
                </div>
                <div className="flex flex-row items-center gap-x-2">
                    <svg viewBox="0 0 24 24" width="35" height="35" xmlns="http://www.w3.org/2000/svg" id="conversation-alt" class="icon glyph" fill="#7E62FF"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M16,2H4A2,2,0,0,0,2,4V17a1,1,0,0,0,.62.92A.84.84,0,0,0,3,18a1,1,0,0,0,.71-.29L7.41,14H16a2,2,0,0,0,2-2V4A2,2,0,0,0,16,2Z" className="fill:#7E62FF"></path><path d="M21,22a1,1,0,0,1-.71-.29L16.59,18H8a1,1,0,0,1,0-2h9a1,1,0,0,1,.71.29L20,18.59V7H17a1,1,0,0,1,0-2h3a2,2,0,0,1,2,2V21a1,1,0,0,1-.62.92A.84.84,0,0,1,21,22Z" className="fill:#7E62FF"></path></g></svg>
                        <p className="text text-gray-700">
                            <NavLink
                                to="messages"
                                className={({ isActive }) =>
                                isActive ? "text-[#7E62FF]" : "text-gray-700"}
                            >
                                Messages
                            </NavLink>
                        </p>
                </div>
                <div className="flex flex-row items-center gap-x-2">
                    <svg fill="#7E62FF" width="35" height="35" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="settings" class="icon glyph"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M20.89,9.78h-.65a1.16,1.16,0,0,1-1-.74V9a1.13,1.13,0,0,1,.22-1.26l.46-.46a1.13,1.13,0,0,0,0-1.58L18.29,4.14a1.13,1.13,0,0,0-1.58,0l-.46.46A1.13,1.13,0,0,1,15,4.82h0a1.16,1.16,0,0,1-.74-1V3.11A1.11,1.11,0,0,0,13.11,2H10.89A1.11,1.11,0,0,0,9.78,3.11v.65a1.16,1.16,0,0,1-.74,1H9A1.13,1.13,0,0,1,7.75,4.6l-.46-.46a1.13,1.13,0,0,0-1.58,0L4.14,5.71a1.13,1.13,0,0,0,0,1.58l.46.46A1.13,1.13,0,0,1,4.82,9V9a1.16,1.16,0,0,1-1,.74H3.11A1.11,1.11,0,0,0,2,10.89v2.22a1.11,1.11,0,0,0,1.11,1.11h.65a1.16,1.16,0,0,1,1,.74v0a1.13,1.13,0,0,1-.22,1.26l-.46.46a1.13,1.13,0,0,0,0,1.58l1.57,1.57a1.13,1.13,0,0,0,1.58,0l.46-.46A1.13,1.13,0,0,1,9,19.18H9a1.16,1.16,0,0,1,.74,1v.65A1.11,1.11,0,0,0,10.89,22h2.22a1.11,1.11,0,0,0,1.11-1.11v-.65a1.16,1.16,0,0,1,.74-1h0a1.13,1.13,0,0,1,1.26.22l.46.46a1.13,1.13,0,0,0,1.58,0l1.57-1.57a1.13,1.13,0,0,0,0-1.58l-.46-.46A1.13,1.13,0,0,1,19.18,15v0a1.16,1.16,0,0,1,1-.74h.65A1.11,1.11,0,0,0,22,13.11V10.89A1.11,1.11,0,0,0,20.89,9.78ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16Z"></path></g></svg>
                    <p className="text text-gray-700">
                        <NavLink
                            to="settings"
                            className={({ isActive }) =>
                            isActive ? "text-[#7E62FF]" : "text-gray-700"}
                        >
                            Settings
                        </NavLink>
                    </p>
                </div>
          </div>
          <div className="flex flex-row items-center gap-x-2">
            <svg fill="#EA2F67" width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="sign-in-alt-2" class="icon glyph" stroke="#EA2F67"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M20.49,3.84l-6-1.5A2,2,0,0,0,12,4.28V5H10a1,1,0,0,0,0,2h2V17H10a1,1,0,0,0,0,2h2v.72a2,2,0,0,0,.77,1.57,2,2,0,0,0,1.23.43,2.12,2.12,0,0,0,.49-.06l6-1.5A2,2,0,0,0,22,18.22V5.78A2,2,0,0,0,20.49,3.84Z"></path><path d="M9.71,12.71a1.15,1.15,0,0,0,.21-.33.94.94,0,0,0,0-.76,1.15,1.15,0,0,0-.21-.33h0l-3-3A1,1,0,0,0,5.29,9.71L6.59,11H2a1,1,0,0,0,0,2H6.59l-1.3,1.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l3-3Z"></path></g></svg>
              <p className="text-lg text-red-700">
                <NavLink to='login'>Logout</NavLink>
              </p>
          </div>
      </div>
    </nav>
  )
}
