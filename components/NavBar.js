/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from '../utils/auth';
import SearchBar from './SearchBar';

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand">
            <Image src="/images/queerly-navbar.png" width="50" height="50" alt="logo" />
          </a>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse d-flex justify-content-between align-items-center" id="navbarTogglerDemo01">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/event/event">
                <a className="nav-link">Events</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/resource/resource">
                <a className="nav-link">Resources</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/media/media">
                <a className="nav-link">Media</a>
              </Link>
            </li>

          </ul>
          <SearchBar className="me-3" />
          <button type="button" className="btn btn-danger me-3" onClick={signOut}>
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
}
