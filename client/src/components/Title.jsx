import React from 'react'

function Title({ title, description }) {
  return (
    <div className="text-center my-10">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
        {title}
      </h2>
      <p className="text-gray-500 text-sm md:text-base">
        {description}
      </p>
    </div>
  )
}

export default Title