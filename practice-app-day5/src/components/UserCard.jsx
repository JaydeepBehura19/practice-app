import { useNavigate } from 'react-router-dom'

// generated consistent gradient based on user id for unique premium feel
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

// user card component — showed name, email, company, and profile picture
function UserCard({ user }) {
  const navigate = useNavigate()

  // generated dynamic avatar properties
  const avatarProps = getAvatarProps(user)

  // navigated to profile on click
  const handleClick = () => {
    navigate(`/user/${user.id}`)
  }

  // tracked local mouse position for dynamic card spotlight
  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--x', `${x}px`)
    card.style.setProperty('--y', `${y}px`)
  }

  return (
    <div className="user-card" onClick={handleClick} onMouseMove={handleMouseMove} id={`user-card-${user.id}`}>
      <div className="user-card-inner">
        {/* profile picture — used advanced programmatic gradient avatar fallback */}
        {user.avatar ? (
          <img
            className="user-card-photo"
            src={user.avatar}
            alt={user.name}
          />
        ) : (
          <div className="user-card-avatar avatar-interactive" style={avatarProps.style}>
            {avatarProps.initials}
          </div>
        )}

        {/* user name */}
        <div className="user-card-name">{user.name}</div>

        {/* email with a subtle icon */}
        <div className="user-card-email">
          <span>✉</span>
          {user.email.toLowerCase()}
        </div>

        {/* company badge */}
        <div className="user-card-company">
          <span>◆</span>
          {user.company?.name || '—'}
        </div>
      </div>

      {/* arrow indicator — only visible on hover */}
      <div className="user-card-arrow">→</div>
    </div>
  )
}

export default UserCard
