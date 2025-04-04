import React from 'react'

function Profile() {
  return (
    <div className="flex items-center ms-3">
    <div>
      <button
        type="button"
        className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        aria-expanded="false"
        data-dropdown-toggle="dropdown-user"
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="w-8 h-8 rounded-full"
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          alt="user photo"
        />
      </button>
    </div>
  </div>
  )
}

export default Profile