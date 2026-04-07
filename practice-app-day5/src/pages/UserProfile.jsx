import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

// generated consistent gradient based on user id
const getAvatarProps = (user) => {
  const hue = (user.id * 47) % 360
  const parts = user.name.split(' ')
  const initials = parts.length > 1 
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : parts[0].substring(0, 2).toUpperCase()

  return {
    initials,
    style: {
      '--avatar-bg': `linear-gradient(135deg, hsl(${hue}, 80%, 60%), hsl(${hue + 40}, 90%, 50%))`,
      '--avatar-glow': `hsl(${hue}, 80%, 50%)`,
    }
  }
}

// user profile page — showed detailed info for a single user from API
function UserProfile() {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isZoomed, setIsZoomed] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const handleZoomOpen = () => {
    setIsZoomed(true)
    setIsClosing(false)
  }

  const handleZoomClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsZoomed(false)
      setIsClosing(false)
    }, 300)
  }

  // fetched the specific user from JSONPlaceholder API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        if (response.ok) {
          const data = await response.json()
          setUser(data)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error("Failed to fetch user:", error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    // slight delay for that smooth skeleton transition
    const timer = setTimeout(() => {
      fetchUser()
    }, 500)

    return () => clearTimeout(timer)
  }, [id])

  // handled loading state with a skeleton
  if (loading) {
    return (
      <div className="profile-skeleton">
        <div style={{ marginBottom: '32px' }}>
          <div className="skeleton-line" style={{ width: '100px', height: '36px', borderRadius: '12px' }}></div>
        </div>
        <div className="profile-skeleton-hero">
          <div className="skeleton-line avatar"></div>
          <div className="skeleton-line title" style={{ marginBottom: '8px' }}></div>
          <div className="skeleton-line subtitle" style={{ width: '40%' }}></div>
        </div>
        <div className="profile-skeleton-body">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="profile-skeleton-item" key={i}>
              <div className="skeleton-line" style={{ width: '30%', height: '10px' }}></div>
              <div className="skeleton-line" style={{ width: '70%' }}></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // handled the case where user wasn't found
  if (!user) {
    return (
      <div className="profile-wrapper">
        <Link to="/" className="profile-back">← Back</Link>
        <p style={{ textAlign: 'center', color: 'rgba(226, 232, 240, 0.4)', marginTop: '60px' }}>
          User not found.
        </p>
      </div>
    )
  }

  // setup dynamic avatar properties
  const avatarProps = getAvatarProps(user)

  // formatted the address into a single readable string with safe fallback
  const formattedAddress = user.address
    ? `${user.address.street}, ${user.address.suite}, ${user.address.city} - ${user.address.zipcode}`
    : '—'

  return (
    <div className="profile-wrapper">
      {/* back button */}
      <Link to="/" className="profile-back" id="profile-back-btn">
        ← Back
      </Link>

      <div className="profile-card">
        {/* hero section with profile photo and name */}
        <div className="profile-hero">
          {/* showed actual photo or premium gradient initial fallback */}
          {user.avatar ? (
            <img
              className="profile-photo"
              src={user.avatar}
              alt={user.name}
              onClick={handleZoomOpen}
            />
          ) : (
            <div 
              className="profile-avatar avatar-interactive" 
              style={avatarProps.style} 
              onClick={handleZoomOpen}
            >
              {avatarProps.initials}
            </div>
          )}
          <div className="profile-name">{user.name}</div>
          <div className="profile-username">@{user.username.toLowerCase()}</div>
        </div>

        {/* detailed info grid */}
        <div className="profile-body">
          {/* email */}
          <div className="profile-section profile-section-animated" style={{ animationDelay: '0.1s' }}>
            <span className="profile-label">Email</span>
            <span className="profile-value">
              <a href={`mailto:${user.email.toLowerCase()}`}>{user.email.toLowerCase()}</a>
            </span>
          </div>

          {/* phone */}
          <div className="profile-section profile-section-animated" style={{ animationDelay: '0.2s' }}>
            <span className="profile-label">Phone</span>
            <span className="profile-value">{user.phone}</span>
          </div>

          {/* website */}
          <div className="profile-section profile-section-animated" style={{ animationDelay: '0.3s' }}>
            <span className="profile-label">Website</span>
            <span className="profile-value">
              <a href={`https://${user.website}`} target="_blank" rel="noreferrer">
                {user.website}
              </a>
            </span>
          </div>

          {/* company */}
          <div className="profile-section profile-section-animated" style={{ animationDelay: '0.4s' }}>
            <span className="profile-label">Company</span>
            <span className="profile-value">{user.company?.name || '—'}</span>
            <span className="profile-tagline">"{user.company?.catchPhrase || '—'}"</span>
          </div>

          {/* address — spans full width */}
          <div className="profile-section full-width profile-section-animated" style={{ animationDelay: '0.5s' }}>
            <span className="profile-label">Address</span>
            <span className="profile-value">{formattedAddress}</span>
          </div>
        </div>
      </div>

      {/* zoom photo modal */}
      {isZoomed && (
        <div 
          className={`photo-modal-overlay ${isClosing ? 'closing' : ''}`} 
          onClick={handleZoomClose}
        >
          {user.avatar ? (
            <img 
              className="photo-modal-image" 
              src={user.avatar} 
              alt={user.name} 
            />
          ) : (
            <div className="photo-modal-initial avatar-interactive" style={avatarProps.style}>
              {avatarProps.initials}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default UserProfile
