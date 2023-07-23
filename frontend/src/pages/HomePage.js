import { Link } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import Login from '../components/Login';
import '../App.css';
import mangaImage from '/home/georget/Code/Agnam/frontend/src/assets/manga-image.png';
import animeImage from '/home/georget/Code/Agnam/frontend/src/assets/anime-image.png';
import novelImage from '/home/georget/Code/Agnam/frontend/src/assets/novel-image.png';
import { useAuth } from '../api/AuthContext';

const HomePage = () => {
  const { isLoggedIn, handleLogin, handleLogout } = useAuth();

  const boxStyle = {
    width: '300px', 
    height: '400px',
    border: '2px solid #ccc',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '0',
    margin: '10px',
    textDecoration: 'none',
    color: '#fff',
    fontSize: '24px',
    fontWeight: 'bold',
  };

  const iconSize = '80';

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className='homePage'>
      <div className='app-header'>
        <AppHeader />
      </div>
      <div className='app-body'>
        <div className='container-fluid comic-app'>
          <div className='container mt-5'>
            <div className='row justify-content-center '>
              <div className='col-md-3 d-flex align-items-center'>
                {/* Manga Page Link Box */}
                <Link to='/manga' className='box' style={{ ...boxStyle }}>
                  <img 
                    src={mangaImage}
                    width={iconSize}
                    height={iconSize}
                    alt='Logout'
                    style={{ cursor: 'pointer', filter: 'brightness(100%)', WebkitFilter: 'brightness(100%)', }}
                  />
                </Link>
              </div>
              <div className='col-md-3 d-flex align-items-center'>
              {/* Anime Page Link Box */}
                <Link to='/anime' className='box' style={{ ...boxStyle }}>
                  <img 
                    src={animeImage}
                    width={iconSize}
                    height={iconSize}
                    alt='Logout'
                    style={{ cursor: 'pointer', filter: 'brightness(100%)', WebkitFilter: 'brightness(100%)', }}
                  />
                </Link>
              </div>
              <div className='col-md-3 d-flex align-items-center'>
              {/* Novel Page Link Box */}
                <Link to='/novel' className='box' style={{ ...boxStyle }}>
                  <img 
                    src={novelImage}
                    width={iconSize}
                    height={iconSize}
                    alt='Logout'
                    style={{ cursor: 'pointer', filter: 'brightness(100%)', WebkitFilter: 'brightness(100%)', }}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;