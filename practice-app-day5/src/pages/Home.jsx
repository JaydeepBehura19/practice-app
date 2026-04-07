import { useState, useEffect } from 'react'
import UserCard from '../components/UserCard'

// home page — loaded users from JSONPlaceholder and displayed them in a grid
function Home() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  // fetched users from the actual API with a small delay for skeletons
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await response.json()
        setUsers(data)
      } catch (error) {
        console.error("Failed to fetch users:", error)
      } finally {
        setLoading(false)
      }
    }

    // delayed API call slightly to show skeleton loading state
    const timer = setTimeout(() => {
      fetchUsers()
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="page-container">
      {/* page title */}
      <div className="page-header">
        <h1>User Directory</h1>
        <p>Browse and explore user profiles</p>
      </div>

      {/* showed skeleton while loading, then the actual grid */}
      {loading ? (
        <div className="skeleton-grid">
          {/* rendered 6 skeleton cards as placeholders */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="skeleton-card" key={i}>
              <div className="skeleton-line avatar"></div>
              <div className="skeleton-line title"></div>
              <div className="skeleton-line subtitle"></div>
              <div className="skeleton-line subtitle" style={{ width: '60%' }}></div>
              <div className="skeleton-line tag"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="user-grid">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
